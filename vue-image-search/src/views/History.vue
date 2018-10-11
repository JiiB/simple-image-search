<template>
  <div class="wrapper">
    <h1 class="title">Here are the last 20 results from your search history:</h1>
    <article v-if="searchHistory.length === 0" class="message is-info">
      <div class="message-body">
        Your search history is empty.
        <br>
        <br>
        <router-link class="button is-info" to="/">Go to home</router-link>
      </div>
    </article>
    <div v-for="(entry, index) in searchHistory" :key="`${index}-history-item`" class="box">
      <router-link class="link" :to="{name: 'home', query: { query: entry.query }}">
  
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img :src="entry.image_url" class="img" alt="Image">
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{entry.query}}</strong>
                <br>
                <small>{{entry.date}}</small>
              </p>
            </div>
          </div>
        </article>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchHistory: JSON.parse(window.localStorage.getItem("searchHistory"))
    };
  }
};
</script>

<style scoped>
.title {
  font-size: 2rem;
}

.link {
  color: inherit;
}

.link:hover {
  color: black;
}

.img {
  height: 100%;
  object-fit: cover;
}

.wrapper {
  margin: 20px;
}
</style>
