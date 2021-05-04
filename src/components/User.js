import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Discover from "./Discover";
import FilmMaker from "./FilmMaker";
import HomeDashboard from "./HomeDashboard";
import Navbar from "./Navbar";
import PopularArtists from "./PopularArtists";
import Rank from "./Rank";
import LoginPage from "./LoginPage";
import Tops from "./Tops";
import RecentlyPlayed from "./RecentlyPlayed";
import TopTracksGraph from "./TopTracksGraph";
import Playlists from "./Playlists";
import TrackItem from "./TrackItem";
import ArtistItem from "./ArtistItem";
import AlbumItem from "./AlbumItem";
import PlaylistItem from "./PlaylistItem";
import EditTrack from "./EditTrack";
import SampleTrack from "./SampleTrack";

// For LOGGING OUT OUT User, just route to path="/" after clicking button

//Sample using react router
const User = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <div>
          <Navbar />
          <Route exact path="/home">
            <HomeDashboard />
          </Route>
          <Route path="/discover">
            <Discover />
          </Route>
          <Route path="/popular_artists">
            <PopularArtists />
          </Route>
          <Route path="/track_lyrics">
            <FilmMaker />
          </Route>
          <Route path="/ranks">
            <Rank />
          </Route>
          <Route path="/Tops">
            <Tops />
          </Route>
          <Route path="/RecentlyPlayed">
            <RecentlyPlayed />
          </Route>
          <Route path="/TopTracksGraph">
            <TopTracksGraph />
          </Route>
          <Route path="/Playlists">
            <Playlists />
          </Route>
          <Route path="/EditTrack">
            <EditTrack />
          </Route>
          <Route path="/SampleTrack">
            <SampleTrack />
          </Route>

          <Route path="/track/:trackId" component={TrackItem} />
          <Route path="/artist/:artistId" component={ArtistItem} />
          <Route path="/album/:albumId" component={AlbumItem} />
          <Route path="/playlist/:playlistId" component={PlaylistItem} />
          <Route path="/EditTrack/:trackId" component={EditTrack} />
          <Route path="/SampleTrack/:trackId" component={SampleTrack} />
        </div>
      </Switch>
    </Router>
  );
};

export default User;
