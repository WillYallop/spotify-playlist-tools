import createPersistedState from "vuex-persistedstate";

// Modules
import siteFunction from './modules/app/site-function.js';
import actionHandler from './modules/app/action-handler.js';
import user from './modules/app/user';
import spotify from './modules/app/spotify';
import accounts from './modules/app/accounts';
import spotifyPlaylists from './modules/app/spotify-playlists';
import spotifyTracks from './modules/app/spotify-tracks';
// Frontend Modules
import spotifyFrontend from './modules/frontend/spotify';
import fe_spotifyDuplicates from './modules/frontend/spotify-duplicates';

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
  // Frontend Modules
  spotifyFrontend,
  fe_spotifyDuplicates
  
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