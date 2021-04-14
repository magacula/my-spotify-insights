import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Line, Circle } from 'rc-progress';


const Margin = styled.div`
border-top: 2px solid grey;
`;

const P = styled.p`
font-family: Arial, Helvetica, sans-serif;
padding-top: 15px;
padding-bottom:15px;
`;

const Container = styled.div`
position:fixed;
left:400;

z-index:9999;
`;

const CurrentlyPlaying = () => {

const [currentlyPlaying, setCurrentlyPlaying] = useState([]);
const [temp, setTemp] = useState(0);
useEffect(() => {
  setInterval(() => {
    setTemp((prevTemp)=>prevTemp+1)
  }, 1000)
},[])

useEffect(() => {
    fetch("/user/current_playback")
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              setCurrentlyPlaying(data);
            })
            .catch((error) => console.log(error));
}, [temp]);

  return (
    <Margin>
      
      {!Object.keys(currentlyPlaying).length || currentlyPlaying.is_playing == false ? 
      <div>Why don't you play some music</div>
    : 
        

    <div style={{marginLeft:"150px"}}>

      {currentlyPlaying != null ? 
      <div>
        
        <img src={currentlyPlaying.playback_json.item.album.images[0].url} style={{height:"400", width:"400px"}}/> 
          <Container>
            <P style={{fontWeight:"bold"}}>
            {currentlyPlaying.playback_json.item.name}
            </P>
            <P>
              {currentlyPlaying.playback_json.item.album.name}
            </P>
            <P>
              {currentlyPlaying.playback_json.item.album.artists[0].name}
            </P>
            <div>
              {console.log((currentlyPlaying.progress/currentlyPlaying.total_length) * 100)}
            <Line percent={(currentlyPlaying.progress/currentlyPlaying.total_length) * 100} strokeWidth="3" strokeColor="#3be3e3"  style={{width:"300px", paddingTop:"15px"}}/>
            </div>
          </Container>
        </div>
       :
      {}
      }
      
    </div>}
    </Margin>
  );
};

export default CurrentlyPlaying;