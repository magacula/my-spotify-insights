import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Loader from "./Loader";
import { FaUserCircle } from "react-icons/fa";
import themes from "../styles/themes";
const { colors } = themes;

const NoImage = styled(FaUserCircle)`
  font-size: 10rem;
  fill: ${colors.white};
  aspect-ratio: 1;
  border-radius: 50%;
  border: 3px solid #f742df;
`;

const ProfileSection = styled.div`
  /* border-bottom: 3px solid grey; */
`;

const ProfileContainer = styled.div`
  max-width: 850px;
  width: 50vw;
  display: flex;
  justify-content: space-around;
  margin: 0px auto;
  padding: 0 2rem 2rem 1.5rem;
`;

const ImageContainer = styled.div`
  margin: auto 4rem;
`;

const UserDetails = styled.div`
  padding: 2rem 0;
`;

const UserProfile = () => {
  // example to display userInfo using useState & fetch call
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("/user/my_profile")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.user);
        setUserInfo(data.user);
        setLoading(false);
        setProfileImage(data.user[0].images[0].url);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div style={{ marginLeft: "100px" }}>
        {userInfo.map((item, index) => {
          return (
            <ProfileSection key={index}>
              <ProfileContainer>
                <ImageContainer>
                  {profileImage ? (
                    <img
                      style={{
                        width: "220px",
                        height: "220px",
                        aspectRatio: "1.0",
                        borderRadius: "50%",
                        border: "3px solid #f742df",
                      }}
                      src={item.images[0].url}
                      alt="profile_pic"
                    />
                  ) : (
                    <NoImage />
                  )}
                </ImageContainer>
                <UserDetails>
                  <h4 style={{ fontSize: "xx-large" }}>
                    {item.display_name}'s Profile
                  </h4>
                  <div
                    style={{
                      display: "list",
                      fontSize: "x-large",
                      justifyContent: "space-between",
                      width: "108%",
                    }}>
                    <h5>ID: {item.id}</h5>
                    <h5>Followers: {item.followers.total}</h5>
                    <h5>Email: {item.email}</h5>
                    <h5>Subscription: {item.product}</h5>
                    <h5>Country: {item.country}</h5>
                  </div>
                </UserDetails>
              </ProfileContainer>
            </ProfileSection>
          );
        })}
      </div>
      {/* uses conditional rendering to render our loading component */}
      {loading && <Loader />}
    </>
  );
};

export default UserProfile;
