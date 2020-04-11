import React, { useState, useEffect } from "react";
import MediaRow from "./mediaRow";

const baseUrl = "http://media.mw.metropolia.fi/wbma/";

const MediaTable = () => {
  const [picArray, setPicArray] = useState([]);
  const loadMedia = async () => {
    const response = await fetch(baseUrl + 'media');
    const json = await response.json();
    // haetaan yksittäiset kuvat, jotta saadaan thumbnailit

    const items = await Promise.all(json.map(async (item) => {
        const response = await fetch(baseUrl + 'media/' + item.file_id)
        return await response.json();
      }));
      console.log(items);
      setPicArray(items);
  };

  useEffect(() => {
    loadMedia();
  }, []);
  
  return (
    <table>
      <tbody>
        {
        picArray.map((file, index) => {
          return <MediaRow file={file} key={index}/>;
        })
        }
      </tbody>
    </table>
  );
};

export default MediaTable;
