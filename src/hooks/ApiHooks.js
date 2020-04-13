import {useState, useEffect} from 'react';

const baseUrl = "http://media.mw.metropolia.fi/wbma/";

const useAllMedia = () => {
    const [data, setData] = useState ([]);
    const fetchUrl = async () => {
        const response = await fetch(baseUrl + "media");
        const json = await response.json();

        // haetaan yksittäiset kuvat, jotta saadaan thumbnailit
        const items = await Promise.all(
          json.map(async (item) => {
            const response = await fetch(baseUrl + "media/" + item.file_id);
            return await response.json();
          })
        );
        console.log(items);
        setData(items);
    };

    useEffect(() => {
      fetchUrl();
    }, []);

    return data;
};

export {
    useAllMedia,
};