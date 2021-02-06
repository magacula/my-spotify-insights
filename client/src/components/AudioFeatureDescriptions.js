import React from "react";

const AudioFeatureDescriptions = () => {
    return (
        <div>
            <h1>What are audio features?</h1>
            <br></br>
            <body>
                <p>
                    Each track on Spotify is marked with quantative metrics that create a unique profle for each song.
                    Each metric is measured on a scale from 0.0 to 1.0.
                </p>
                <br></br>
                <h3>Acousticness</h3>
                <p>
                    Acousticness measures whether the track is acoustic. A higher score reflects
                    a higher confidence that the track is acoustic.
                </p>
                <br></br>
                <h3>Danceability</h3>
                <p>
                    Danceability measures how suitable a track is for dancing based on a combination of musical elements.
                    These elements include tempo, rhythm stability, beat strength, and overall regularity. A higher
                    score reflects a song being more danceable.
                </p>
                <br></br>
                <h3>Energy</h3>
                <p>
                    Energy measures the intensity and activity of a song. Some tracks feel fast, loud, and noisy
                    while others feel slower and more tones down. Dynamic range, perceived loudness, timbre, onset rate,
                    and general entropy contribute to this scale. The higher the energy score, the more energetic a
                    track is.
                </p>
                <br></br>
                <h3>Speechiness</h3>
                <p>
                    Speechiness measures the presence of spoken words in a track. Talk shows, audio books, and poetry
                    will reflect a higher speechiness score.
                </p>
                <br></br>
                <h3>Instrumentalness</h3>
                <p>
                    Instrumentalness predicts whether a track contains no vocals. Tracks with higher values refect less
                    vocal content such as singing or spoken word.
                </p>
                <br></br>
                <h3>Liveness</h3>
                <p>
                    Liveness detects the presence of an audience in the track. Higher values reflect a higher confidence
                    that the track was performed live.
                </p>
                <br></br>
                <h3>Valence</h3>
                <p>
                    Valence describes the musical positiveness conveyed by a track. Tracks with high valence can be
                    described as being more cheerful, happy, and euphoric. Tracks with low valence sound more sad,
                    depressed, and angry.
                </p>
            </body>
        </div>
    );
};

export default AudioFeatureDescriptions;
