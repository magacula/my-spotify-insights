import React, { useState, useEffect } from "react";
import styled from "styled-components";
import themes from "../styles/themes";
import Lyrics from "./Lyrics";
import TrackNotes from "./TrackNotes";
const {colors} = themes;


const EditTrack = () => {
    return (
        <React.Fragment>
            <h1>Edit Track Information</h1>
            <Lyrics/>
            <TrackNotes/>
        </React.Fragment>
    );
};

export default EditTrack;
