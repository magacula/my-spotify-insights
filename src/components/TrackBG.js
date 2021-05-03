import React, { useState } from "react";
import styled from "styled-components";
import themes from "../styles/themes";
import Editable from "./Editable";
import { GiPencil } from "react-icons/gi";
const { colors } = themes;

const Pencil = styled(GiPencil)`
  fill: white;
  color: white;
  font-size: 2.75rem;
  width: 100%;
  margin-top: 10px;
`;

const BGContainer = styled.div`
    size: '3em',
    color: 'white',
    margin-top: 400px;
    margin-bottom: 100px;
    margin-left: 300px;
    margin-right: 300px;
`;

const TrackBG = () => {

    const [task, setTask] = useState("");

    return (
        <React.Fragment>

            <BGContainer>
                <Pencil />
                <h1 id="accent" align="center"> Track Background Information </h1>
                <Editable align="center"
                    text={task}
                    placeholder="No background information for track provided by user."
                    type="input"
                >
                    <input
                        type="text"
                        name="task"
                        placeholder="Update user's track notes"
                        value={task}
                        onChange={e => setTask(e.target.value)}
                    />
                </Editable>
            </BGContainer>
        </React.Fragment>
    );
};

export default TrackBG;
