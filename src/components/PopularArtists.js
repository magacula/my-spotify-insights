import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TrackContainer = styled.div`
  
  text-align: center;
  justify-content: left;
  align-items: left;
  display: flex;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid grey;
  border-top: 1px solid grey;
`;

const TrackList = styled.ol`
  background-color: black;
  justify-content:space-evenly;
`

const TrackImage = styled.img`
width: 60px;
height: 100%;
`;

const IndexStyling = styled.p`
font-weight: bold;
padding-top: 19px;
padding-left: 50px;
padding-right: 50px;
`;

const TextItem = styled.p`
padding-top: 19px;
display: flex;
justify-content: space-evenly;
`;

const PopularArtists = () => {
const [popularTracks, setPopularTracks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/main/playlist_details/37i9dQZEVXbMDoHDwVN2tF", {
      credentials: "include",
      //credentials: 'include',
      //referrerPolicy: 'no-referrer-when-downgrade
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.tracks.items);
        setPopularTracks(data.tracks.items);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);



  var TrackString = "";

  return (
    <div>
      <h1>50 Most Popular Artist Page</h1>
      <div style={{ marginLeft: "110px", marginTop:"30px" }}>
        <div style= {{display:"flex"}}>
          <h4 style={{marginLeft: "165px", padding:"5px 5px"}}>Track</h4>
          
        </div>
      
      

      <div style={{borderBottom:"1px solid grey"}}></div>
      {popularTracks.map((track, index) => {
          return (
            <div>
              
              <TrackList>
                <TrackContainer key={index} track={track}>
                  <div>{console.log(track)}</div>
                  <TrackImage src={track.track.album.images[0].url} />
                  <IndexStyling>{index+1}</IndexStyling>
                  <TextItem>
                    
                    <strong>{track.track.name} &nbsp;</strong> 
                     
                    <p>by {track.track.artists[0].name}</p>
                  </TextItem>
                  
                  

                </TrackContainer>
              </TrackList>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularArtists;
