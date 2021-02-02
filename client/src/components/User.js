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

// For LOGGING OUT OUT User, just route to path="/" after clicking button

//Sample using react router
const User = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <div className="container">
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
          <Route path="/film_maker">
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
        </div>
      </Switch>
    </Router>
  );
};

export default User;
