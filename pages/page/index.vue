<template>
  <h1>{{slug}}</h1>
  <!-- <iframe  :src="url" height="600px" width="1500px"></iframe> -->
</template>

<script>
// import {
//     adminMenuItems,
//     userMenuItems
// } from "~/components/sidemenu";
export default {
    data() {
        return {
            url:"",
            slug:"OK",
            //slug: this.$route.query.id,
            breadCrumb: null,
            pageLoading: true,
        };
    },
    // created:{
    //     //Get Role in local storage 
    // }
}
</script>
