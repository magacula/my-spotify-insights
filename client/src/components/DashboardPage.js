import React, { useState, useEffect } from "react";

const DashboardPage = () => {
  // example to display userInfo using useState & fetch call
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    fetch("user.json")
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data);
      });
  }, []);

  return (
    //example for displaying user's profile info
    <div>
      <p>Username: {userInfo.user_name}</p>
      <p>Followers: {userInfo.num_followers}</p>
      <p>Following: {userInfo.user_following_num}</p>
      <p>Public playlists: {userInfo.num_public_playlists}</p>
      <p>Private playlists: {userInfo.num_private_playlists}</p>
      <p>Country: {userInfo.country}</p>
      <p>Saved Songs: {userInfo.user_saved_songs}</p>
    </div>
  );
};
