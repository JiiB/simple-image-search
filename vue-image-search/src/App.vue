<template>
  <div class="container">
    <nav class="navbar mb-2" role="navigation" aria-label="main navigation">


    <div class="navbar-menu">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/">Search</router-link>
        <router-link class="navbar-item" to="/history">History</router-link>
      </div>

    </div>
  </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  created: function() {
    // set initial localStorage
    if (window.localStorage.getItem("searchHistory") === null) {
      window.localStorage.setItem("searchHistory", "[]");
    }
  }
};
</script>

<style>
.mb-2 {
  margin-bottom: 20px;
}
</style>
