import createPersistedState from "vuex-persistedstate";

// Modules
import siteFunction from './modules/site-function.js';
import actionHandler from './modules/action-handler.js';
import user from './modules/user';
import spotify from './modules/spotify';
import spotifyFrontend from './modules/frontend/spotify'
import accounts from './modules/accounts';
import spotifyPlaylists from './modules/spotify-playlists';
import spotifyTracks from './modules/spotify-tracks';

const state = () => ({
  
});

const mutations = {
  
};

const actions = {
  
};

const modules = {
  siteFunction,
  actionHandler,
  user,
  spotify,
  accounts,
  spotifyPlaylists,
  spotifyTracks,
  spotifyFrontend
  
};

const plugins = [
  createPersistedState({
    paths: ['spotifyFrontend']
  }),
]

export default {
  state,
  mutations,
  actions,
  modules,
  plugins
}