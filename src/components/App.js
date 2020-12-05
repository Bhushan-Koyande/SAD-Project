import React, { Suspense } from 'react';
import { Route, Switch, useLocation } from "react-router-dom";
import Auth from "../hoc/auth";
import { AnimatePresence, motion } from 'framer-motion';
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import UploadVideoPage from './views/UploadVideoPage/UploadVideoPage';
import DetailVideoPage from './views/DetailVideoPage/DetailVideoPage';
import SearchPage from './views/SearchPage/SearchPage';
import Profile from './views/Profile/Profile';
import EditProfile from './views/Profile/EditProfile';
import FollowingPage from './views/FollowingPage/FollowingPage';
import PopularVideoPage from './views/PopularVideoPage/PopularVideoPage';
import CircleLoader from './views/CircleLoader/CircleLoader';

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  const location = useLocation();
  return (
    <Suspense fallback={(<CircleLoader/>)}>
      <NavBar />
      <div style={{ paddingTop: '70px', minHeight: 'calc(100vh - 80px)' }}>
        <AnimatePresence exitBeforeEnter>
          <Switch location = {location} key = {location.pathname}>
            <Route exact path="/" component={Auth(LandingPage, true)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
            <Route exact path="/profile" component={Auth(Profile, true)} />
            <Route exact path="/profile/edit" component={Auth(EditProfile, true)} />
            <Route exact path="/video/upload" component={Auth(UploadVideoPage, true)} />
            <Route exact path="/video/search" component={Auth(SearchPage, true)} />
            <Route exact path="/video/:videoId" component={Auth(DetailVideoPage, true)} />
            <Route exact path="/following" component={Auth(FollowingPage, null)} />
            <Route exact path="/trending" component={Auth(PopularVideoPage, true)} />
          </Switch>
        </AnimatePresence>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;