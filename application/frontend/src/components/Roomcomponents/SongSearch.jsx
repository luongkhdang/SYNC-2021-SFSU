import React, { useState, useEffect } from "react";
import { Divider } from "antd";
import { Container, Form } from "react-bootstrap";
import "../../css/SongSearch.css";
import SpotifyWebApi from "spotify-web-api-node";
import Cookies from "js-cookie";
import SearchResultCard from "./SearchReultCard";
import { SpotifyAuthListener } from "react-spotify-auth";

const spotifyApi = new SpotifyWebApi({
  clientId: "ad4f63abc34f445d9f82549d5dcfeb67",
});

const SongSearch = (props) => {
  /* functions for user data in local storage */
  const deleteCurrentUser = () => {
    localStorage.removeItem("currentUser");
    Cookies.remove("spotifyAuthToken");
  };

  const updateCurrentUser = (updateUserInfo) => {
    const stringUpdateUserInfo = JSON.stringify(updateUserInfo);
    localStorage.setItem("currentUser", stringUpdateUserInfo);
  };

  const retrieveCurrentUser = () => {
    const stringRetrieveUserInfo = localStorage.getItem("currentUser");
    const retrieveUserInfo = JSON.parse(stringRetrieveUserInfo);
    return retrieveUserInfo;
  };

  const handleAddClick = (e) => {
    props.addSongToQueue(e);
  };

  /* Store user information for use */
  const user = retrieveCurrentUser();

  /* Store Spotify access token */
  const [accessToken, setAccessToken] = useState(
    Cookies.get("spotifyAuthToken")
  );

  /* Store search related data */
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recommendedResults, setRecommendedResults] = useState([]);

  /* Retreive Spotify token if needed. */
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  /* get results from search */
  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    let cancel = false;

    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          const largestAlbumImage = track.album.images.reduce(
            (largest, image) => {
              if (image.height > largest.height) return image;
              return largest;
            },
            track.album.images[0]
          );

          return {
            songId: track.id,
            songName: track.name,
            songArtist: track.artists[0].name,
            songTrackUrl: track.uri,
            smallSongImageUrl: smallestAlbumImage.url,
            largeSongImageUrl: largestAlbumImage.url,
            songDuration: track.duration_ms,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  /* get recommended results */
  useEffect(() => {
    if (!accessToken) return;
    let cancel = false;

    spotifyApi.searchTracks("genre:" + props.roomGenre).then((res) => {
      if (cancel) return;
      setRecommendedResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          const largestAlbumImage = track.album.images.reduce(
            (largest, image) => {
              if (image.height > largest.height) return image;
              return largest;
            },
            track.album.images[0]
          );

          return {
            songId: track.id,
            songName: track.name,
            songArtist: track.artists[0].name,
            songTrackUrl: track.uri,
            smallSongImageUrl: smallestAlbumImage.url,
            largeSongImageUrl: largestAlbumImage.url,
            songDuration: track.duration_ms,
          };
        })
      );
    });

    return () => (cancel = true);
  }, ["genre:" + props.roomGenre, accessToken]);

  /* Functions for spotify search END */

  return (
    <div className="songsearch-main">
      <SpotifyAuthListener
        onAccessToken={(token) => {
          setAccessToken(Cookies.get("spotifyAuthToken"));
        }}
      />
      <div class="main">
        <div className="searchsong-text searchsong-title-text">
          Search for a Song
        </div>
      </div>

      <div className="searchsong-results">
        {/* Spotify song search START */}
        <Container
          /* className="d-flex flex-column py-2" */
          style={{ padding: "0px" }}
        >
          <Form.Control
            type="search"
            placeholder="Search Songs / Artists"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            style={{ marginBottom: "20px" }}
          />
          <div>
            {searchResults.map((track) => (
              <SearchResultCard track={track} handleAddClick={handleAddClick} />
            ))}
          </div>
        </Container>

        <Divider />

        <div class="main">
          <div className="searchsong-text">{"Recommended Songs"}</div>
        </div>

        {recommendedResults.map((track) => (
          <SearchResultCard track={track} handleAddClick={handleAddClick} />
        ))}
      </div>
    </div>
  );
};

export default SongSearch;
