<template>
  <div class="page-albums">
    <h1 class="text-2xl">Create an Album</h1>
    <div class="flex flex-col m-auto w-64">
      <input
        class="my-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        placeholder="Album Name..."
        type="text"
        v-model="albumName"
      />
      <button class="btn-blue mb-4" @click="createAlbum">Create Album</button>
    </div>
    <div class="text-red-500">{{ error }}</div>
    <hr />
    <h5 class="mt-4 text-2xl">List Of Albums</h5>
    <div class="flex flex-wrap w-full m-auto justify-center">
      <div
        v-for="(album, idx) in albums"
        :key="idx"
        class="cursor-pointer mt-4 ml-4 w-3/12 h-24 border border-solid border-gray-400 shadow-xl flex items-center justify-center"
        @click="openAlbumDetail(album)"
      >
        <div class="text-2xl">{{ album.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
//#region Imports
import { reactive, toRefs, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
//#endregion

export default {
  name: "page-albums",
  setup() {
    //#region useComposables
    const store = useStore();
    const router = useRouter();
    //#endregion

    //#region Reactive References
    const state = reactive({
      albumName: "",
      error: "",
      user: computed(() => store.getters["auth/user"]),
      albums: computed(() => store.getters["albumInfo/albums"]),
    });
    //#endregion

    //#region Watchers
    //#endregion

    //#region Lifecycle hooks
    onMounted(() => {
      initListAlbums();
    });
    //#endregion

    //#region Methods
    async function initListAlbums() {
      try {
        await store.dispatch("albumInfo/listAlbums");
      } catch (error) {
        console.log(error);
      }
    }

    function openAlbumDetail(album) {
      router.push(`/album/${album.id}`);
    }

    async function createAlbum() {
      state.error = "";

      if (!state.albumName) {
        state.error = "Please enter an album name.";
        return;
      }

      const newAlbum = {
        name: state.albumName,
        owner: state.user.username,
        ownerId: state.user.id,
      };

      await store.dispatch("albumInfo/createAlbum", newAlbum);
      state.albumName = "";
    }
    //#endregion

    return {
      ...toRefs(state),
      openAlbumDetail,
      createAlbum,
    };
  },
};
</script>

<style scoped lang="scss">
.page-albums {
}
</style>
