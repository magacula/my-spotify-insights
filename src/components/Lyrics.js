import React, { useState } from "react";
import styled from "styled-components";
import themes from "../styles/themes";
import Editable from "./Editable";
import { GiMusicalNotes } from "react-icons/gi";
const { colors } = themes;

const Notes = styled(GiMusicalNotes)`
  fill: white;
  color: white;
  font-size: 2.75rem;
  width: 100%;
  margin-top: 70px;
`;

const LyricsContainer = styled.div`
    size: '3em',
    color: 'white',
    margin-top: 400px;
    margin-bottom: 100px;
    margin-left: 300px;
    margin-right: 300px;
`;


const Lyrics = () => {

    const [task, setTask] = useState("");

    return (
        <React.Fragment>
            <LyricsContainer>
                <Notes />
                <h1 id="accent" align="center"> Track Lyrics </h1>
                <Editable align="center"
                    text={task}
                    placeholder="No lyrics for track provided by user."
                    type="input"
                >
                    <input
                        type="text"
                        name="task"
                        placeholder="Update lyrics for track."
                        value={task}
                        onChange={e => setTask(e.target.value)}
                    />
                </Editable>
            </LyricsContainer>
        </React.Fragment>
    );
};

export default Lyrics;
