import { API, graphqlOperation } from "aws-amplify";
import { createAlbum as createAlbumMutation } from "../../graphql/mutations";
import {
  getAlbum as getAlbumQuery,
  listAlbums as listAlbumsQuery,
} from "../../graphql/queries";

export const albumInfo = {
  namespaced: true,
  state: {
    albums: null,
  },
  mutations: {
    setAlbums(state, payload) {
      state.albums = payload;
    },
  },
  actions: {
    createAlbum: async ({ dispatch }, payload) => {
      try {
        await API.graphql(
          graphqlOperation(createAlbumMutation, {
            input: payload,
          }),
        );
        await dispatch("listAlbums");
      } catch (error) {
        console.log(error);
      }
    },
    getAlbum: async (_context, payload) => {
      return await API.graphql(
        graphqlOperation(getAlbumQuery, {
          id: payload,
        }),
      );
    },
    listAlbums: async ({ commit }, _payload) => {
      const albumsData = await API.graphql(graphqlOperation(listAlbumsQuery));
      commit("setAlbums", albumsData.data.listAlbums.items);
    },
    resetAlbums: ({ commit }, _payload) => {
      commit("setAlbums", null);
    },
  },
  getters: {
    albums: state => state.albums,
  },
};
