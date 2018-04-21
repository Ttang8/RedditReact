import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import { requestPosts, scrapeImgur } from './actions/post_actions';

window.requestPosts = requestPosts;
window.scrapeImgur = scrapeImgur;

document.addEventListener("DOMContentLoaded", () => {
  let store = configureStore();

  window.getState = store.getState;
  window.dispatch = store.dispatch;

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}></Root>, root);
});
