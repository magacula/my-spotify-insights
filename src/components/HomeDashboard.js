import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import themes from "../styles/themes";
const { colors } = themes;

const LOGOUT_USER = "/auth/logout";

const Button = styled.a`
  display: inline-block;
  background: ${colors.lightBlue};
  color: ${colors.white};
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  border-color: transparent;
  text-transform: capitalize;
  font-size: 1rem;
  letter-spacing: 0.1rem;
  margin-top: 1rem;
  margin-left: 110px;
  margin-right: 0.5rem;
  transition: all 0.3s linear;
  cursor: pointer;

  &:hover {
    transition: 0.35s;
    background: ${colors.pink};
  }
`;

const HomeDashboard = () => {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    fetch("/user/my_profile")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.user);
        setUserInfo(data.user);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <React.Fragment>
      <div>
        <h1>User Home Page</h1>
        <Button href={LOGOUT_USER}>Logout</Button>
      </div>
      <div style={{ marginLeft: "150px" }}>
        {userInfo.map((item, index) => {
          return (
            <div key={index}>
              <p>Username: {item.display_name}</p>
              <p>{item.followers.total} followers</p>
              <p>Country: {item.country}</p>
              <img src={item.images[0].url} alt="" />
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default HomeDashboard;
