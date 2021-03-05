import React, { useState } from "react";
import styled from "styled-components";
import themes from "../styles/themes";
import Editable from "./Editable";
const { colors } = themes;

const lyricStyle = {

    size: '1em',
    color: 'white',
    padding: '15em'
};


const Lyrics = () => {

    const [task, setTask] = useState("");

    return (
        <React.Fragment>

            <div style= {lyricStyle}>

                <h1> Track Lyrics </h1>
                <Editable
                    text={task}
                    placeholder=" - Track Lyrics -"
                    type="input"
                >
                    <input
                        type="text"
                        name="task"
                        placeholder="Update lyrics"
                        value={task}
                        onChange={e => setTask(e.target.value)}
                    />
                </Editable>

            </div>
        </React.Fragment>
    );
};

export default Lyrics;
