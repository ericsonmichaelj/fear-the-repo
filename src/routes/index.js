import React from 'react';
import { Route, IndexRoute } from 'react-router';
import $ from 'jquery';

import CoreLayout from 'layouts/CoreLayout';
import HomeView from 'views/HomeView';
import ResumeView from 'views/ResumeView';
import AboutView from 'views/AboutView';
import SecretView from 'views/SecretView';
import LinkedinLoginView from 'views/LinkedInLoginView'

function requireAuth(nextState, replaceState) {
  // NOTE: will change url address when deployed
  $.ajax({
    url: 'http://localhost:3000/authentication',
    async: false,
    type: 'POST',
    contentType: 'application/json',
    success: (data) => {
      if (data.Auth === false) {
        replaceState({
          nextPathname: nextState.location.pathname
        }, '/');
      }
    },
    error: (xhr, status, err) => console.error(err)
  });
}

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path='/resume' component={ResumeView} />
    <Route path='/about' component={AboutView} />
    <Route path='/secretpage' component={SecretView} onEnter={requireAuth} />
    <Route path = '/cookies' component={LinkedinLoginView} />
  </Route>
);
