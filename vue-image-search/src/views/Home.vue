<template>
  <div>
    <div class="columns">
      <div class="column" />
      <div class="column is-three-quarters">
        <form @submit.prevent="onSubmit()" class="field has-addons">
          <div class="control is-expanded" v-bind:class="{ 'is-loading': isLoading }">
            <input v-model="searchQuery" class="input loading" type="text" placeholder="Search... (e.g Cat, Dog)">
          </div>
          <div class="control">
            <button type="submit" class="button is-info">
                    Search
                  </button>
          </div>
        </form>
      </div>
      <div class="column" />
    </div>
    <article v-if="error" class="message is-dark">
      <div class="message-body">
        No Image Found. Please try again
      </div>
    </article>
    <div class="images">
      <img v-for="image in images" :key="image.id" :src="image.largeImageURL" alt="">
    </div>
  </div>
</template>

<script>
import API from "@/API";
import moment from "moment";

export default {
  name: "home",
  data() {
    return {
      searchQuery: "",
      images: [],
      isLoading: false,
      error: false
    };
  },
  mounted: function() {
    this.querySearchFromURL();
  },
  watch: {
    $route() {
      this.querySearchFromURL();
    }
  },
  methods: {
    onSubmit(addToSeachHistory = true) {
      this.images = [];
      this.error = false;
      this.isLoading = true;
      if (this.searchQuery) {
        API.search(this.searchQuery).then(images => {
          if (images.length === 0) this.error = true;

          // successful search
          // add to search history
          if (addToSeachHistory) {
            const searchEntry = {
              date: moment().format("MMMM Do YYYY, hh:mm:ss a"),
              query: this.searchQuery,
              image_url: images[0].previewURL
            };

            const currentSeachHistory = JSON.parse(
              window.localStorage.getItem("searchHistory")
            );

            if (currentSeachHistory.length >= 20) {
              currentSeachHistory.pop();
            }

            currentSeachHistory.unshift(searchEntry);

            window.localStorage.setItem(
              "searchHistory",
              JSON.stringify(currentSeachHistory)
            );
          }

          this.images = images;
          this.$router.push({
            name: "home",
            query: { query: this.searchQuery }
          });

          this.isLoading = false;
        });
      } else {
        this.error = true;
        this.isLoading = false;
      }
    },
    querySearchFromURL() {
      if (this.$router.history.current.query.query) {
        this.searchQuery = this.$router.history.current.query.query;
        this.onSubmit(false);
      } else {
        this.searchQuery = "";
        this.images = [];
        this.isLoading = false;
        this.error = false;
      }
    }
  }
};
</script>

<style scoped>
.images {
  column-count: 3;
}

.images img {
  width: 100%;
}
</style>
