import React, { useEffect, useState } from "react";
import { Button, Popover } from "antd";
import Axios from "axios";
import MusicPlayer from "./Roomcomponents/MusicPlayer.jsx";
import Queue from "./Roomcomponents/Queue.jsx";
import SongSearch from "./Roomcomponents/SongSearch.jsx";
import Chatroom from "./Chatroom.jsx";
import "../css/Room.css";
import { Redirect } from "react-router-dom";
import { CopyFilled } from "@ant-design/icons";
import Cookies from "js-cookie";
import { serverPath } from '../path.js'

const useForceUpdate = () => {
  const [_, setState] = useState(false);
  return () => setState((val) => !val);
};

const Room = (props) => {
  /* Store room id for easy access. */
  const roomId = props.match.params.roomId;

  /* Store and initialize data for room information and the current song. */
  const [viewData, setViewData] = useState({
    room_name: "",
    genre: "",
    roomImageUrl: "",
    population: "",
    roomType: "",
    room_id: "",
    current_song_end_time: "",
    current_song_track_url: "",
    current_track_id: "",
    current_song_artist: "",
    current_song_name: "",
    current_song_start_time: "",
    room_song_number: "",
    current_song_duration: "",
  });

  /* Store access token */
  const [accessToken, setAccessToken] = useState(
    Cookies.get("spotifyAuthToken")
  );

  /* Function to retrieve user information from local storage */
  const retrieveCurrentUser = () => {
    const stringRetrieveUserInfo = localStorage.getItem("currentUser");
    const retrieveUserInfo = JSON.parse(stringRetrieveUserInfo);
    return retrieveUserInfo;
  };

  /* Store user information for quick access */
  const [userInfo, setUserInfo] = useState(retrieveCurrentUser());

  /* Keeps window scrolled to top when entering room */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* Calls function to gather room data if it is empty */
  useEffect(() => {
    if (viewData.room_name === "") {
      updateViewData();
    }
  });

  /* Regularly calls function to update the queue */
  useEffect(() => {
    updateQueueView();
    const interval = setInterval(() => {
      updateQueueView();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  /* Reqularly calls function to update vote counts */
  useEffect(() => {
    const interval = setInterval(() => {
      updateVoteCounts();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  /* store room url */
  const roomUrl = window.location.href;

  /* used to force render update */
  const forceUpdate = useForceUpdate();

  /* Setting up starting object for queue */
  var initialSongsForQueue = new Map();
  initialSongsForQueue.set(-1, {
    largeSongImageUrl: "-1",
    queueItemId: -1,
    smallSongImageUrl: "-1",
    songArtist: "-1",
    songDuration: -1,
    songId: "-1",
    songName: "-1",
    songTrackUrl: "-1",
    voteCount: -1,
    userVote: false,
    timeAddedToQueue: -1,
  });
  /* Storing queue information in both map and array for different uses. */
  const [songsForQueue, setSongsForQueue] = useState(initialSongsForQueue);
  const [arrayForQueue, setArrayForQueue] = useState(
    Array.from(songsForQueue.values())
  );

  /* Store vote data */
  const [voteMapForQueue, setVoteMapForQueue] = useState(new Map());

  /* Initial setup for next song data */
  const [nextSong, setNextSong] = useState({
    largeSongImageUrl: "",
    roomSongNumber: "",
    smallSongImageUrl: "",
    songArtist: "",
    songDuration: "",
    songName: "",
    songTrackId: "",
    songTrackUrl: "",
  });

  /* Manage switching between queue window and song search window */
  const [showQueue, setShowQueue] = useState(true);
  const [displayTypeSwitchButton, setDisplayTypeSwitchButton] =
    useState("Search for a Song");

  const switchQueueSearchsong = () => {
    setShowQueue(!showQueue);
    if (showQueue) {
      setDisplayTypeSwitchButton("Return to Queue");
    } else {
      setDisplayTypeSwitchButton("Search for a Song");
    }
  };

  /* Calls the function to update the current song regularly */
  useEffect(() => {
    const interval = setInterval(() => {
      updateCurrentSong();
    }, 1000);
    return () => clearInterval(interval);
  }, [viewData, nextSong]);

  /* Calls the function to submit a next song option, and recieve a new next song regularly */
  useEffect(() => {
    submitNextSong();
    const interval = setInterval(() => {
      submitNextSong();
    }, 5000);
    return () => clearInterval(interval);
  }, [viewData, nextSong]);

  /* Function that calls the Sync api and database to update vote counts */
  const updateQueueVote = (incomingQueueSongId) => {
    if (
      voteMapForQueue.has(incomingQueueSongId) &&
      voteMapForQueue.get(incomingQueueSongId).userVote === false
    ) {
      var data = {
        vote_id: incomingQueueSongId + userInfo.userId,
        room_id: roomId,
        user_id: userInfo.userId,
        song_id: incomingQueueSongId,
      };
      Axios.post(serverPath.local + '/api/votes/', data)
        .then((res) => {})
        .catch((er) => {});

      voteMapForQueue.get(incomingQueueSongId).userVote = true;
      voteMapForQueue.get(incomingQueueSongId).voteCount += 1;
    } else if (
      voteMapForQueue.has(incomingQueueSongId) &&
      voteMapForQueue.get(incomingQueueSongId).userVote === true
    ) {
      var deleteCode = incomingQueueSongId + userInfo.userId;
      Axios.delete(serverPath.local + '/api/votes/' + deleteCode + "/")
        .then((res) => {})
        .catch((er) => {});

      voteMapForQueue.get(incomingQueueSongId).userVote = false;
      voteMapForQueue.get(incomingQueueSongId).voteCount -= 1;
    } else if (!voteMapForQueue.has(incomingQueueSongId)) {
      var data = {
        vote_id: incomingQueueSongId + userInfo.userId,
        room_id: roomId,
        user_id: userInfo.userId,
        song_id: incomingQueueSongId,
      };
      Axios.post(serverPath.local + '/api/votes/', data)
        .then((res) => {})
        .catch((er) => {});

      voteMapForQueue.set(incomingQueueSongId, {
        queueItemId: incomingQueueSongId,
        voteCount: 1,
        userVote: true,
      });
    }

    setVoteMapForQueue(voteMapForQueue);
    forceUpdate();
  };

  /* Function takes in a song to add to the queue database */
  const addSongToQueue = (song) => {
    var data = {
      queue_item_id: Math.floor(Math.random() * 2000000000),
      room_id: roomId,
      song_id: song.songId,
      large_song_image_url: song.largeSongImageUrl,
      small_song_image_url: song.smallSongImageUrl,
      song_artist: song.songArtist,
      song_duration: song.songDuration,
      song_name: song.songName,
      song_track_url: song.songTrackUrl,
      time_added_to_queue: new Date().getTime(),
    };
    Axios.post(serverPath.local + '/api/queues/', data)
      .then((res) => {})
      .catch((er) => {});

    updateQueueView();
    switchQueueSearchsong();
  };

  /* Contacts the database queue to get current queue list */
  const updateQueueView = () => {
    Axios.get(serverPath.local + '/api/queues/')
      .then((res) => {
        res.data.map((queueItem) => {
          if (queueItem.room_id === roomId) {
            if (!songsForQueue.has(queueItem.queue_item_id)) {
              songsForQueue.set(queueItem.queue_item_id, {
                largeSongImageUrl: queueItem.large_song_image_url,
                queueItemId: queueItem.queue_item_id,
                smallSongImageUrl: queueItem.small_song_image_url,
                songArtist: queueItem.song_artist,
                songDuration: queueItem.song_duration,
                songId: queueItem.song_id,
                songName: queueItem.song_name,
                songTrackUrl: queueItem.song_track_url,
                voteCount: 0,
                userVote: false,
                timeAddedToQueue: queueItem.time_added_to_queue,
              });
            }
          }
        });

        var queueItemsToDelete = [];
        var queueArray = Array.from(songsForQueue.values());
        queueArray.map((take) => {
          queueItemsToDelete.push(take.queueItemId);
        });

        res.data.map((queueItem) => {
          if (queueItem.room_id === roomId) {
            for (var i = 0; i < queueItemsToDelete.length; i++) {
              if (queueItem.queue_item_id === queueItemsToDelete[i]) {
                queueItemsToDelete[i] = -1;
              }
            }
          }
        });

        for (var i = 0; i < queueItemsToDelete.length; i++) {
          if (
            queueItemsToDelete[i] !== -1 &&
            songsForQueue.has(queueItemsToDelete[i])
          ) {
            songsForQueue.delete(queueItemsToDelete[i]);
          }
        }

        setSongsForQueue(songsForQueue);
        var arrayToSort = Array.from(songsForQueue.values());
        arrayToSort.sort(function (a, b) {
          return a.timeAddedToQueue - b.timeAddedToQueue;
        });
        setArrayForQueue(arrayToSort);
      })
      .catch((er) => {
        {
        }
      });
  };

  /* Contacts the vote database table to update currently recorded vote counts */
  const updateVoteCounts = () => {
    var tempVoteMap = new Map();

    Axios.get(serverPath.local + '/api/votes/')
      .then((res) => {
        res.data.map((vote) => {
          if (vote.room_id === roomId) {
            if (tempVoteMap.has(vote.song_id)) {
              tempVoteMap.get(vote.song_id).voteCount += 1;
            } else {
              tempVoteMap.set(vote.song_id, {
                queueItemId: vote.song_id,
                voteCount: 1,
                userVote: false,
              });
            }
          }
        });

        var tempVoteArray = Array.from(tempVoteMap.values());
        tempVoteArray.map((votes) => {
          if (voteMapForQueue.has(votes.queueItemId)) {
            voteMapForQueue.get(votes.queueItemId).voteCount = votes.voteCount;
          } else {
            voteMapForQueue.set(votes.queueItemId, {
              queueItemId: votes.queueItemId,
              voteCount: 1,
              userVote: false,
            });
          }
        });
      })
      .catch((er) => {
        {
        }
      });
    setVoteMapForQueue(voteMapForQueue);
  };

  /* store format for share room popup  */
  const sharePopOver = (
    <div className="share-popover">
      <strong>Copy room link and share with friends:</strong>
      <a href={roomUrl}>{roomUrl}</a>
    </div>
  );

  /* Called the database to get current room data */
  const updateViewData = () => {
    Axios.get(serverPath.local + '/api/adds/' + roomId + "/")
      .then((res) => {
        var newViewData = {
          room_name: res.data.room_name,
          genre: res.data.genre,
          roomImageUrl: res.data.roomImageUrl,
          population: res.data.population,
          roomType: res.data.roomType,
          room_id: res.data.room_id,
          current_song_end_time: res.data.current_song_end_time,
          current_song_track_url: res.data.current_song_track_url,
          current_track_id: res.data.current_track_id,
          current_song_artist: res.data.current_song_artist,
          current_song_name: res.data.current_song_name,
          current_song_start_time: new Date().getTime(),
          room_song_number: res.data.room_song_number,
          current_song_duration: res.data.current_song_duration,
        };

        setViewData(newViewData);
      })
      .catch((er) => {});
  };

  /* Counts votes and submits potantial next song to the database */
  const submitNextSong = () => {
    if (nextSong.songTrackId === "" && songsForQueue.size > 1) {
      var queueArray = Array.from(songsForQueue.values());
      queueArray.sort(function (a, b) {
        return a.timeAddedToQueue - b.timeAddedToQueue;
      });

      var topCount = -1;
      var topCountQueueItem = queueArray[0];

      if (queueArray.length > 1) {
        for (var i = 1; i < queueArray.length; i++) {
          if (voteMapForQueue.has(queueArray[i].queueItemId)) {
            if (
              voteMapForQueue.get(queueArray[i].queueItemId).voteCount >
              topCount
            ) {
              topCount = voteMapForQueue.get(
                queueArray[i].queueItemId
              ).voteCount;
              topCountQueueItem = queueArray[i];
            }
          } else if (0 > topCount) {
            topCount = 0;
            topCountQueueItem = queueArray[i];
          }
        }

        var data = {
          room_id: roomId,
          queue_item_id: topCountQueueItem.queueItemId,
          time_submitted: new Date().getTime(),
          room_song_number: parseInt(viewData.room_song_number, 10) + 1,
          song_track_id: topCountQueueItem.songId,
          song_name: topCountQueueItem.songName,
          song_artist: topCountQueueItem.songArtist,
          song_track_url: topCountQueueItem.songTrackUrl,
          small_song_image_url: topCountQueueItem.smallSongImageUrl,
          large_song_image_url: topCountQueueItem.largeSongImageUrl,
          song_duration: topCountQueueItem.songDuration,
        };

        Axios.post(serverPath.local + '/api/nextsong/', data)
          .then((res) => {
            getNextSong();
          })
          .catch((er) => {
            getNextSong();
          });
      }
    }
  };

  /* Retrieves chosen next song from the database */
  const getNextSong = () => {
    Axios.get(serverPath.local + '/api/nextsong/')
      .then((res) => {
        var highestRoomSongNumber = 0;

        res.data.map((next) => {
          if (next.room_id === roomId) {
            if (
              parseInt(next.room_song_number, 10) >
              parseInt(highestRoomSongNumber, 10)
            ) {
              highestRoomSongNumber = parseInt(next.room_song_number, 10);
            }
          }
        });

        if (highestRoomSongNumber > parseInt(viewData.room_song_number, 10)) {
          var firstPickTime = 9999999999999;
          var firstPickSong;
          res.data.map((next) => {
            if (
              next.room_id === roomId &&
              parseInt(next.room_song_number, 10) === highestRoomSongNumber
            ) {
              if (parseInt(next.time_submitted, 10) < firstPickTime) {
                firstPickTime = parseInt(next.time_submitted, 10);
                firstPickSong = next;
              }
            }
          });

          var newNextSong = {
            largeSongImageUrl: firstPickSong.large_song_image_url,
            roomSongNumber: firstPickSong.room_song_number,
            smallSongImageUrl: firstPickSong.small_song_image_url,
            songArtist: firstPickSong.song_artist,
            songDuration: firstPickSong.song_duration,
            songName: firstPickSong.song_name,
            songTrackId: firstPickSong.song_track_id,
            songTrackUrl: firstPickSong.song_track_url,
          };
          setNextSong(newNextSong);

          Axios.delete(
            serverPath.local + '/api/queues/' +
              firstPickSong.queue_item_id +
              "/"
          )
            .then((res) => {})
            .catch((er) => {});
        }
      })
      .catch((er) => {
        {
        }
      });
  };

  /* Funtion that updates the current song from the next song selection, and clears next song */
  const updateCurrentSong = () => {
    var timeEval = new Date().getTime() - 3000;
    var songEndTime =
      parseInt(viewData.current_song_start_time, 10) +
      parseInt(viewData.current_song_duration, 10);

    if (songEndTime < timeEval && nextSong.songTrackId !== "") {
      var newViewData = {
        current_song_artist: nextSong.songArtist,
        current_song_end_time: viewData.current_song_end_time,
        current_song_name: nextSong.songName,
        current_song_start_time: new Date().getTime(),
        current_song_track_url: nextSong.songTrackUrl,
        current_track_id: nextSong.songTrackId,
        current_song_duration: nextSong.songDuration,
        genre: viewData.genre,
        population: viewData.population,
        roomImageUrl: nextSong.largeSongImageUrl,
        roomType: viewData.roomType,
        room_id: viewData.room_id,
        room_name: viewData.room_name,
        room_song_number: nextSong.roomSongNumber,
      };

      setViewData(newViewData);
      setNextSong({
        largeSongImageUrl: "",
        roomSongNumber: "",
        smallSongImageUrl: "",
        songArtist: "",
        songDuration: "",
        songName: "",
        songTrackId: "",
        songTrackUrl: "",
      });

      Axios.get(serverPath.local + '/api/adds/'+ roomId + "/")
        .then((res) => {
          if (
            parseInt(res.data.room_song_number, 10) <
            parseInt(newViewData.room_song_number, 10)
          ) {
            var data = {
              roomImageUrl: newViewData.roomImageUrl,
              current_song_track_url: newViewData.current_song_track_url,
              current_track_id: newViewData.current_track_id,
              current_song_artist: newViewData.current_song_artist,
              current_song_name: newViewData.current_song_name,
              room_song_number: newViewData.room_song_number,
              current_song_duration: newViewData.current_song_duration,
            };

            Axios.patch(serverPath.local + '/api/adds/' + roomId + "/", data)
              .then((res) => {})
              .catch((er) => {});
          }
        })
        .catch((er) => {});
    }
  };

  /* Kicks out users who are not logged in */
  if (userInfo == null || !userInfo) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <div class="main room-main">
        <div class="grid1">
          <div class="queue1">
            {/* Queue component */}
            {showQueue && (
              <Queue
                queueSongs={arrayForQueue}
                voteMapForQueue={voteMapForQueue}
                updateQueueVote={updateQueueVote}
              />
            )}
            {/* Song Search component */}
            {!showQueue && (
              <SongSearch
                addSongToQueue={addSongToQueue}
                roomGenre={viewData.genre}
              />
            )}
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => switchQueueSearchsong()}
              className="sync-button-color queue-songsearch-switch"
            >
              {displayTypeSwitchButton}
            </Button>
          </div>
          <div class="musicplayer">
            {/* Display room information */}
            <div className="room-info">
              <strong style={{ fontSize: "xxx-large" }}>
                {viewData.room_name.length > 10
                  ? viewData.room_name.substring(0, 10) + "..."
                  : viewData.room_name}
              </strong>
              <em>Room Genre: {viewData.genre}</em>
              <em>{viewData.roomType ? "Private Room" : "Public Room"}</em>

              <div className="icon-row">
                <div>
                </div>
                <Popover content={sharePopOver} trigger="click">
                  <button className="share-button">
                    <CopyFilled
                      style={{ fontSize: "18pt", color: "var(--color3)" }}
                    />
                    <strong style={{ color: "var(--color3)" }}> Share</strong>
                  </button>
                </Popover>
              </div>
            </div>
            {/* Music Player Component */}
            {userInfo.product === "premium" ? 
            (<MusicPlayer
              viewData={viewData}
              nextSong={nextSong}
              submitNextSong={submitNextSong}
              updateCurrentSong={updateCurrentSong}
              accessToken={userInfo.spotifyToken}
            />) : (<div className="premium-required">
              Spotify premium is required.
            </div>) }
          </div>
          <div class="chatflex">
            {/* Chatroom Component */}
            {viewData.room_id !== "" ? (
              <Chatroom
                roomName={viewData.room_name}
                roomId={viewData.room_id}
                displayName={userInfo.displayName}
                profilePictureUrl={userInfo.profilePictureUrl}
              />
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
