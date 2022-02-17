<template>
  <h2>
    <iframe
      src="https://charts.mongodb.com/charts-project-0-quszd/public/dashboards/60b1e630-20f9-4be5-8da7-90977ddaa299"
      width="1200"
      height="700">
    </iframe>
  </h2>
</template>

<script>
export default {
    async created() { 
      var userLoginTime = localStorage.getItem("timeout");
      var timeout = new Date().getTime();
      if(userLoginTime < timeout){
          localStorage.clear();
          this.$router.push("/account/login");
      }
    }
};
</script>

<style></style>
