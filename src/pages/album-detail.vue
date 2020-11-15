<template>
  <div class="page-album-detail">
    <h1 class="text-3xl font-semibold">Album: {{ albumName }}</h1>
    <div class="flex w-full mt-10 items-center justify-center bg-grey-lighter">
      <form enctype="multipart/form-data" novalidate>
        <label
          class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-green-600"
        >
          <svg
            class="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
            />
          </svg>
          <span class="mt-2 text-base leading-normal">Select a file</span>
          <input
            @change="handleFileChange"
            accept="image/*"
            type="file"
            class="hidden"
          />
        </label>
      </form>
    </div>
    <hr class="mt-4" />
    <h2 class="text-2xl mt-4">List Of Photos</h2>
    <div class="flex flex-wrap p-10 justify-center m-auto w-full" v-if="photos">
      <div
        class="shadow-xl ml-4 mt-4 w-4/12"
        v-for="(photo, idx) in photos"
        :key="idx"
      >
        <amplify-s3-image
          level="protected"
          :img-key="photo.thumbnail ? photo.thumbnail.key : photo.fullsize.key"
          class="w-4/12"
        ></amplify-s3-image>
        <div class="mt-2" v-if="photo.createdAt && photo.gps">
          <ul>
            <li>Created At {{ photo.createdAt }}</li>
            <li>
              latitude
              {{ photo.gps.latitude }}
            </li>
            <li>longitude At {{ photo.gps.longitude }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//#region Imports
import { computed, onMounted, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
//#endregion

export default {
  name: "page-album-detail",
  setup() {
    //#region useComposables
    const store = useStore();
    const route = useRoute();
    //#endregion

    //#region Reactive References
    const state = reactive({
      photos: [],
      albumName: "",
      id: computed(() => route.params.id),
    });
    //#endregion

    //#region Watchers
    //#endregion

    //#region Lifecycle hooks
    onMounted(() => {
      listPhotos();
    });
    //#endregion

    //#region Methods
    async function listPhotos() {
      const album = await store.dispatch("albumInfo/getAlbum", state.id);
      state.photos = album.data.getAlbum.photos.items;
      state.albumName = album.data.getAlbum.name;
    }

    async function handleFileChange(file) {
      if (!file.target?.files[0]) return;

      try {
        await store.dispatch("albumInfo/createPhoto", {
          file: file.target.files[0],
          id: state.id,
        });
        listPhotos();
      } catch (error) {
        console.log(error);
      }
    }
    //#endregion

    return {
      ...toRefs(state),
      handleFileChange,
    };
  },
};
</script>

<style scoped lang="scss">
.page-album-detail {
  amplify-s3-image {
    --width: 75%;
  }
}
</style>
