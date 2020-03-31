import React from "react";
import PropTypes from "prop-types";
import MediaRow from "./mediaRow";

const MediaTable = props => {
  const { media } = props;
  return (
    <table>
      <tbody>
        {
        media.map((file, index) => {
          return <MediaRow file={file} key={index}/>;
        })
        }
      </tbody>
    </table>
  );
};

MediaTable.propTypes = {
  media: PropTypes.array,
};

export default MediaTable;
