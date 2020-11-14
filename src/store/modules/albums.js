import { API, graphqlOperation, Storage } from "aws-amplify";
import {
  createAlbum as createAlbumMutation,
  createPhoto as createPhotoMutation,
} from "../../graphql/mutations";
import {
  getAlbum as getAlbumQuery,
  listAlbums as listAlbumsQuery,
} from "../../graphql/queries";
import { uuid } from "uuidv4";
import awsExports from "../../aws-exports";

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
    createPhoto: async (_context, payload) => {
      const {
        aws_user_files_s3_bucket: bucket,
        aws_user_files_s3_bucket_region: region,
      } = awsExports;
      const { file, type: mimeType, id } = payload;
      const extension = file.name.substr(file.name.lastIndexOf(".") + 1);
      const photoId = uuid();
      const key = `images/${photoId}.${extension}`;

      const inputData = {
        id: photoId,
        photoAlbumId: id,
        contentType: mimeType,
        fullsize: {
          key,
          region,
          bucket,
        },
      };

      try {
        await Storage.put(key, file, {
          level: "protected",
          contentType: mimeType,
          metadata: {
            albumId: id,
            photoId,
          },
        });

        await API.graphql(
          graphqlOperation(createPhotoMutation, { input: inputData }),
        );

        return Promise.resolve("Success");
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },
  },
  getters: {
    albums: state => state.albums,
  },
};
