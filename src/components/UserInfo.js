import React, { useState, useEffect } from "react";

const UserInfo = () => {
  // example to display userInfo using useState & fetch call
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    fetch("user.json")
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data);
        console.log(data);
      });
  }, []);

  return (
    <>
      <div style={{ marginLeft: "150px" }}>
        {Object.values(userInfo).forEach((item, index) => {
          return (
            <div key={index}>
              <p>Username: {item.display_name}</p>
              {/* <p>Followers: {item.followers.total}</p> */}
              {/* <img src={item.images[0].url} alt="" /> */}
              <p>Country: {item.country}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UserInfo;
