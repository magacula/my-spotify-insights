import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ChangeBackground from "./ChangeBackground";
import Loader from "./Loader";
import themes from "../styles/themes";
import { FaUserCircle } from "react-icons/fa";
import { BiCrown } from "react-icons/bi";
import { GiPaintBrush } from "react-icons/gi"
import { RiPaintFill } from "react-icons/ri";
import { AiOutlineFontColors } from "react-icons/ai"
import ChangeAccentColor from "./ChangeAccentColor";
import ChangeFontColor from "./ChangeFontColor";
const { colors } = themes;

const NoImage = styled(FaUserCircle)`
  font-size: 10rem;
  fill: ${colors.white};
  aspect-ratio: 1;
  border-radius: 50%;
  border: 3px solid #f742df;
`;

const PageTitle = styled.h1`
  margin-left: 0;
`;

const SubHeading = styled.h2`
  margin-left: 0;
`;

const RankContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ProfileSection = styled.div`
  display: grid;
  text-align: center;
`;

const ProfilePic = styled.img`
  width: 250px;
  height: 250px;
  aspect-ratio: 1;
  border-radius: 50%;
  margin-top: 1.5rem;
  margin-left: 2rem;
  margin-right: 2.5rem;
`;

const UserName = styled.p`
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

const RankStatus = styled.div`
  margin-right: 2rem;
  margin-left: 3.5rem;
  margin-top: auto;
  margin-bottom: auto;
`;

const RankTitle = styled.div`
  display: flex;
`;

const Icon = styled.div``;

const RankNumber = styled.p`
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
`;

const TotalPoints = styled.p`
  font-size: 1.75rem;
  font-weight: 600;
  margin-top: 0.5rem;
`;

const Description = styled.p`
  margin-top: 1.5rem;
  max-width: 385px;
  font-size: 1.15rem;
  line-height: 1.3;
`;

const ChangeBackgroundContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  justify-items: center;
  margin-top: 4rem;
`;

const ChangeFontColorContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  justify-items: center;
  margin-top: 4rem;
`;

const ChangeAccentContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  justify-items: center;
  margin-top: 4rem;
`;

const Paint = styled(RiPaintFill)`
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-left: 1rem;
`;

const FontColor = styled(AiOutlineFontColors)`
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-left: 1rem;
`;

const Accent = styled(GiPaintBrush)`
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-left: 1rem;
`;

const HeadingWrapper = styled.div`
  display: flex;
`;

const Rank = () => {
  const [rankProgress, setRankProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("/user/rank_progress")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.rank_progress);
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
        setProfileImage(data.user[0].images[0].url);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  // Determining Rank Level
  let RankLevel;
  if (rankProgress <= 50) {
    RankLevel = (
      <RankTitle>
        <RankNumber>Level 0</RankNumber>
        <BiCrown style={{ fill: "#b08d57", fontSize: "1.25rem" }} />
      </RankTitle>
    );
  } else if (rankProgress > 50 && rankProgress <= 150) {
    RankLevel = (
      <RankTitle>
        <RankNumber>Level 1</RankNumber>
        <BiCrown style={{ fill: "#c0c0c0", fontSize: "1.25rem" }} />
      </RankTitle>
    );
  } else if (rankProgress > 150 && rankProgress < 250) {
    RankLevel = (
      <RankTitle>
        <RankNumber>Level 2</RankNumber>
        <BiCrown style={{ fill: "#FFD700", fontSize: "1.25rem" }} />
      </RankTitle>
    );
  } else if (rankProgress >= 250) {
    RankLevel = (
      <RankTitle>
        <RankNumber>Level 3</RankNumber>
        <BiCrown style={{ fill: "#e5e4e2", fontSize: "1.25rem" }} />
      </RankTitle>
    );
  }

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div style={{ marginLeft: "110px", marginTop: "2rem" }}>

          <PageTitle id = "accent">Your Rank</PageTitle>

          <RankContainer>
            {userInfo.map((item, index) => {
              return (
                <ProfileSection>
                  {profileImage ? (
                    <ProfilePic src={item.images[0].url} alt="profile_pic" />
                  ) : (
                    <NoImage />
                  )}
                  <UserName>{item.display_name}</UserName>
                </ProfileSection>
              );
            })}
            <RankStatus>
              {RankLevel}
              <TotalPoints>{`Total Points: ${rankProgress.toString()}/250 pts`}</TotalPoints>
              <Description>
                Get 50+ pts by logging into your account daily and interacting
                with our application by sharing our features to social media!
              </Description>
            </RankStatus>
          </RankContainer>

          <ChangeBackgroundContainer>
            <HeadingWrapper>
              <SubHeading>Change Background Color</SubHeading>
              <Paint />
            </HeadingWrapper>
            <ChangeBackground />
          </ChangeBackgroundContainer>

            <ChangeFontColorContainer>
                <HeadingWrapper>
                    <SubHeading>Change Font Color</SubHeading>
                    <FontColor />
                </HeadingWrapper>
                <ChangeFontColor />
            </ChangeFontColorContainer>

            <ChangeAccentContainer>
                <HeadingWrapper>
                    <SubHeading>Change Accent Color</SubHeading>
                    <Accent />
                </HeadingWrapper>
                <ChangeAccentColor />
            </ChangeAccentContainer>

        </div>
      )}
    </React.Fragment>
  );
};

export default Rank;
