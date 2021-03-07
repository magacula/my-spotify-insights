import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ChangeBackground from "./ChangeBackground";
import Loader from "./Loader";
import themes from "../styles/themes";
const { colors } = themes;

const PageTitle = styled.h1`
  margin-left: 0;
`;

const SubHeading = styled.h2`
  margin-left: 0;
`;

const RankContainer = styled.div`
  display: flex;
`;

const ProfileSection = styled.div`
  display: grid;
  text-align: center;
`;

const ProfilePic = styled.img`
  width: 220px;
  height: 220px;
  aspect-ratio: 1;
  border-radius: 50%;
  margin-top: 1.5rem;
`;

const UserName = styled.p`
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

const RankStatus = styled.div`
  margin-left: 2rem;
`;

const RankTitle = styled.div``;

const Icon = styled.div``;

const RankNumber = styled.p`
  font-size: 2.25rem;
  font-weight: 600;
`;

const PointsContainer = styled.div`
  display: flex;
`;

const TotalPoints = styled.p`
  font-size: 1.85rem;
  font-weight: 600;
`;

const Description = styled.p``;

const Rank = () => {
  const [rankProgress, setRankProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("/user/rank_progress")
      .then((res) => res.json())
      .then((data) => {
        setRankProgress(data.rank_progress.toString());
        setLoading(false);
      })
      .catch((error) => console.log(error));

    fetch("/user/my_profile")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.user);
        setUserInfo(data.user);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  // Determining Rank Level
  let RankLevel;
  if (rankProgress < 50) {
    RankLevel = (
      <div>
        <RankNumber>Level 0</RankNumber>
        <Icon></Icon>
      </div>
    );
  } else if (rankProgress > 50 && rankProgress < 150) {
    RankLevel = (
      <div>
        <RankNumber>Level 1</RankNumber>
        <Icon></Icon>
      </div>
    );
  } else if (rankProgress > 150 && rankProgress < 250) {
    RankLevel = (
      <div>
        <RankNumber>Level 2</RankNumber>
        <Icon></Icon>
      </div>
    );
  } else if (rankProgress > 250) {
    RankLevel = (
      <div>
        <RankNumber>Level 3</RankNumber>
        <Icon></Icon>
      </div>
    );
  }

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div style={{ marginLeft: "110px", marginTop: "30px" }}>
          <PageTitle>Your Rank</PageTitle>
          <RankContainer>
            {userInfo.map((item, index) => {
              return (
                <ProfileSection>
                  <ProfilePic src={item.images[0].url} alt="profile_pic" />
                  <UserName>{item.display_name}</UserName>
                </ProfileSection>
              );
            })}
            <RankStatus>
              <RankTitle>
                {RankLevel}
                <TotalPoints>{`Total Points: ${rankProgress.toString()} pts`}</TotalPoints>
              </RankTitle>
              <Description></Description>
            </RankStatus>
          </RankContainer>
          <div>
            <SubHeading>Change Background</SubHeading>
          </div>
          <ChangeBackground />
        </div>
      )}
    </React.Fragment>
  );
};

export default Rank;
