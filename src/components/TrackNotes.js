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

const TrackNotes = () => {

    const [task, setTask] = useState("");

    return (
        <React.Fragment>

            <div style= {noteStyle}>

                <h1> Track Notes </h1>
                <Editable
                    text={task}
                    placeholder=" - User Notes -"
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

export default TrackNotes;
