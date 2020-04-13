import React from "react";
import MediaRow from "./mediaRow";
import { useAllMedia } from "../hooks/ApiHooks";


const MediaTable = () => {
  const picArray = useAllMedia();

  console.log(picArray);

  return (
    <table>
      <tbody>
        {picArray.map((file, index) => {
          return <MediaRow file={file} key={index} />;
        })}
      </tbody>
    </table>
  );
};

export default MediaTable;
