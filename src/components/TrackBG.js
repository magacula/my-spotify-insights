import React, { useState } from "react";
import styled from "styled-components";
import themes from "../styles/themes";
import Editable from "./Editable";
const { colors } = themes;

const noteStyle = {

    size: '1em',
    color: 'white',
    padding: '15em'
};

const TrackBG = () => {

    const [task, setTask] = useState("");

    return (
        <React.Fragment>

            <div style= {noteStyle}>

                <h1> Track Background Information </h1>
                <Editable
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

            </div>
        </React.Fragment>
    );
};

export default TrackBG;
