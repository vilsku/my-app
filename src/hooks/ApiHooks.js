import { useState, useEffect } from "react";

const baseUrl = "http://media.mw.metropolia.fi/wbma/";

const useAllMedia = () => {
  const [data, setData] = useState([]);
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

const useSingleMedia = (id) => {
  const [data, setData] = useState({});
  const fetchUrl = async (fileid) => {
    const response = await fetch(baseUrl + "media/" + fileid);
    const item = await response.json();
    console.log(item);
    setData(item);
  };

  useEffect(() => {
    fetchUrl(id);
  }, [id]);

  return data;
};

const register = async (inputs) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputs),
  };
  const response = await fetch(baseUrl + "users", fetchOptions);
  return await response.json();
};

const login = async (inputs) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputs),
  };
  const response = await fetch(baseUrl + "login", fetchOptions);
  return await response.json();
};

const checkUserAvailable = async (name) => {
  const response = await fetch(baseUrl + "users/username/" + name)
  return await response.json();
};

export {
  useAllMedia,
  useSingleMedia,
  register,
  login,
  checkUserAvailable,
};
