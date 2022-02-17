<template>
  <h2>sample Local Storage page</h2>
</template>

<script>
export default {
   async created() {
        console.log('QQQ', this.$route.query.role);
        localStorage.setItem('role',this.$route.query.role)
       location.replace("/")
   }
   ,
}
</script>

<style>

</style>