import React from "react";
import { Popover } from "antd";

import "../../css/SongSearch.css";
import { PlusOutlined } from "@ant-design/icons";

const SearchResultCard = (props) => {
  const track = props.track;

  const songPopupContent = (track) => {
    return (
      <div>
        <strong>Title:</strong> {track.songName} <br />
        <strong> Artist:</strong> {track.songArtist}
      </div>
    );
  };

  return (
    <div className="songsearch-result-card">
      <Popover
        placement="left"
        content={songPopupContent(track)}
        trigger="hover"
        className="songsearch-result-card-image-title"
      >
        <img
          alt="example"
          src={track.smallSongImageUrl}
          style={{ width: "50px" }}
        />
        <div>
          <div>{track.songName}</div>
          <div style={{ color: "var(--color2-brighter)" }}>
            {" "}
            {track.songArtist}
          </div>
        </div>
      </Popover>
      <button
        className="songsearch-add-icon-button"
        onClick={() => props.handleAddClick(track)}
      >
        <PlusOutlined className="searchsong-add-icon" />
      </button>
    </div>
  );
};

export default SearchResultCard;
