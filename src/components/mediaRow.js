import React from "react";
import PropTypes from "prop-types";

const MediaRow = (props) => {
    const {file} = props;
    return (
      <tr>
        <td>
          <img src={file.thumbnails.w160} alt={file.title} />
        </td>
        <td>
          <h3>{file.title}</h3>
          <p>{file.description}</p>
        </td>
        <td>
          <a href={file.filename}>View</a>
        </td>
      </tr>
    );
};

MediaRow.propTypes = {
    file: PropTypes.object,
};

export default MediaRow;