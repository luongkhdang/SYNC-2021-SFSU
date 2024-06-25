import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { Image } from "antd";
import "../../css/MusicPlayer.css";

function MusicPlayer(props) {
  const [play, setPlay] = useState(true);
  useEffect(() => setPlay(true), [props.viewData.current_song_track_url]);

  /* Retricts access if there is no Spotify token */
  if (!props.accessToken) return null;

  return (
    <div className="music-player">
      {/* Album art image */}
      <Image
        src={props.viewData.roomImageUrl}
        style={{ width: "250" }}
        preview={false}
        fallback="/assets/logoImage2.png"
      />
      {/* Spotify Player component shows if there is valid data for it */}
      {props.viewData.room_song_number !== "0" && props.viewData.room_song_number !== "" ? (<div className="spotify-music-player-controls">
        <SpotifyPlayer
          styles={{ sliderHeight: "0", loaderSize: "110" }}
          initialVolume={0.25}
          token={props.accessToken}
          callback={(state) => {
            if (!state.isPlaying) setPlay(true);
          }}
          uris={
            props.viewData.current_song_track_url
              ? [props.viewData.current_song_track_url]
              : []
          }
          autoPlay={true}
          play={true}
        /> 
      </div>) : (<div></div>) }
      {/* Next song is shown if there is valid data for it */}
      {props.nextSong.largeSongImageUrl ? (<div className="music-player-next-song">
          <div>
            <img
              src={props.nextSong.largeSongImageUrl}
              preview={false}
              className="next-image"
            />
          </div>
          <div className="next-song-text">
            <strong>Next Song:</strong>
            <div>
              {props.nextSong.songName.length > 20
                ? props.nextSong.songName.substring(0, 20) + "..."
                : props.nextSong.songName}
            </div>
            <div>
              {props.nextSong.songArtist.length > 20
                ? props.nextSong.songArtist.substring(0, 20) + "..."
                : props.nextSong.songArtist}
            </div>
          </div>
      </div>) : (<div></div>)}
    </div>
  );
}

export default MusicPlayer;
