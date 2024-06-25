import React from "react";
import { Checkbox, Popover } from "antd";
import "../../css/Queue.css";

const Queue = (props) => {
  const handleCheck = (e) => {
    props.updateQueueVote(e.target.id);
  };

  /* Function to return the queue view */
  const renderQueue = () => {
    const songPopupContent = (track) => {
      return (
        <div>
          <strong>Title:</strong> {track.songName} <br />
          <strong> Artist:</strong> {track.songArtist}
        </div>
      );
    };

    /* Set message if queue is missing */
    if (
      typeof props.queueSongs === "undefined" ||
      props.queueSongs.length === 0 ||
      (props.queueSongs.length === 1 && props.queueSongs[0].queueItemId === -1)
    ) {
      return (
        <div class="queue-says">
          <em>Click on "Search for a Song" to add a song to the queue!</em>
        </div>
      );
    }
    /* Gather all items in queue for display */
    if (props.queueSongs) {
      return props.queueSongs.map((song) => {
        if (!(song.queueItemId === -1)) {
          return (
            <div class="songdiv">
              {/* Popup to display song title an artist more clearly */}
              <Popover
                placement="left"
                content={songPopupContent(song)}
                trigger="hover"
              >
                {/* Main display for song information */}
                <div className="songdiv-song-title">
                  <img className="songdiv-img" src={song.smallSongImageUrl} />
                  <div>
                    <div>{song.songName}</div>
                    <div style={{ color: "var(--color2-brighter)" }}>
                      {song.songArtist}
                    </div>
                  </div>
                </div>
              </Popover>

              {/* Display vote count and vote checkbox */}
              <div className="song-vote-checkbox">
                <div className="song-vote">
                  {props.voteMapForQueue.has(song.queueItemId)
                    ? props.voteMapForQueue.get(song.queueItemId).voteCount
                    : 0}
                </div>
                <Checkbox
                  className="song-checkbox"
                  type="checkbox"
                  id={song.queueItemId}
                  onChange={handleCheck}
                  checked={
                    props.voteMapForQueue.has(song.queueItemId)
                      ? props.voteMapForQueue.get(song.queueItemId).userVote
                      : false
                  }
                />
              </div>
            </div>
          );
        }
      });
    }
  };

  return (
    <div className="queue-main">
      <div class="queue-header">
        <strong>Queue</strong>
        <strong>Votes</strong>
      </div>
      <div className="queue-render">{renderQueue()}</div>
    </div>
  );
};

export default Queue;
