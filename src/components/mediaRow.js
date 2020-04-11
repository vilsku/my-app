import React from "react";
import PropTypes from "prop-types";

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const MediaRow = (props) => {
    const {file} = props;
    return (
      <tr>
        <td>
          <img src={mediaUrl + file.thumbnails.w160} alt={file.title} />
        </td>
        <td>
          <h3>{file.title}</h3>
          <p>{file.description}</p>
        </td>
        <td>
          <a href={mediaUrl + file.filename}>View</a>
        </td>
      </tr>
    );
};

MediaRow.propTypes = {
    file: PropTypes.object,
};

export default MediaRow;