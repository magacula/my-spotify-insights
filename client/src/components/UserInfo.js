import React, { useState, useEffect } from "react";

const UserInfo = () => {
  // example to display userInfo using useState & fetch call
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    fetch("user.json")
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data.top_tracks);
      });
  }, []);

  return (
    <>
      <ol style={{ marginLeft: "110px" }}>
        {userInfo.map((track, index) => {
          return (
            <li key={index} style={{ marginLeft: "25px" }}>
              {track.track.album.name}
            </li>
          );
        })}
      </ol>
    </>
  );
};

export default UserInfo;
