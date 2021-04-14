import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Loader from "./Loader";
import { FaUserCircle } from "react-icons/fa";
import themes from "../styles/themes";
import breakpoints from "../styles/breakpoints";
const { colors } = themes;

const NoImage = styled(FaUserCircle)`
  font-size: 10rem;
  fill: ${colors.white};
  aspect-ratio: 1;
  border-radius: 50%;
  border: 3px solid #f742df;
`;

const ProfileSection = styled.div``;

const ProfileContainer = styled.div`
  max-width: 850px;
  width: 50vw;
  display: flex;
  justify-content: space-around;
  margin: 0px auto;
  padding: 0 2rem 2rem 1.5rem;

  @media only screen and (${breakpoints.device.med}) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  margin: auto 4rem;

  @media only screen and (${breakpoints.device.med}) {
    margin: 0;
    display: flex;
    justify-content: center;
  }
`;

const ProfileImage = styled.img`
  width: 220px;
  height: 220px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 3px solid #f742df;

  @media only screen and (${breakpoints.device.sm}) {
    width: 150px;
    height: 150px;
  }
`;

const UserDetails = styled.div`
  padding: 2rem 0;

  @media only screen and (${breakpoints.device.med}) {
    display: grid;
    justify-content: center;
    text-align: center;
  }
`;

const UserName = styled.p`
  font-size: xx-large;
  font-weight: 600;
`;

const UserData = styled.p`
  font-weight: 600;
  font-size: medium;
  line-height: 1.2;
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
                    <ProfileImage src={item.images[0].url} alt="profile_pic" />
                  ) : (
                    <NoImage />
                  )}
                </ImageContainer>
                <UserDetails>
                  <UserName>{item.id}</UserName>
                  <div
                    style={{
                      display: "list",
                      fontSize: "x-large",
                      justifyContent: "space-between",
                      width: "108%",
                      marginTop: "0.75rem",
                    }}>
                    <UserData>Followers: {item.followers.total}</UserData>
                    <UserData>{item.email}</UserData>
                    <UserData>Subscription: {item.product}</UserData>
                    <UserData>Country: {item.country}</UserData>
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
