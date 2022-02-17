<template>
<div>
  <iframe  :src="url" :height="pageHeight" width="100%"></iframe>
</div> 
</template>

<script>
import {
    superAdminMenuItems,
    salesAdminMenuItems,
    clusterAdminMenuItems,
    purchaseAdminMenuItems,
    salesExecutiveMenuItems
} from "../components/sidemenu";
export default {
    data() {
        return {
             userData : JSON.parse(localStorage.getItem('userDetails')),
            //  states : JSON.parse(localStorage.getItem('userData')).role,
             url:"",
             pageHeight:"500px",
             menuList:[],
            //slug:"OK", 
            slug: this.$route.params.slug,
            breadCrumb: null,
            pageLoading: true,
        };
    },
    created() {
        let self = this; 
        setTimeout(()=>{
       let box = document.querySelector('body');
        console.log("Box",box.clientHeight)
        self.pageHeight = box.clientHeight+"px";
        },1000)
        //  var menuListData = this.userData.role == 'super-admin' ? superAdminMenuItems : this.userData.role == 'sales-admin' ?   salesAdminMenuItems : this.userData.role == 'cluster-admin' ?  clusterAdminMenuItems : this.userData.role == 'sales-executive' ? salesExecutiveMenuItems  : purchaseAdminMenuItems  ;
        var menuListData = salesAdminMenuItems;
         superOuterLoop:
         for(let i=0;i<menuListData.length;i++)
         {
             if(menuListData[i]["subItems"] !== undefined || menuListData[i]["subItems"] )
             {
                console.log( )
               for(let j=0;j<menuListData[i].subItems.length;j++)  
               {
                 if(menuListData[i].subItems[j].link == "/"+this.slug)
                 {
                     console.log( menuListData[i].subItems[j].link  ,  "/"+this.slug);
                     console.log(menuListData[i].subItems[j].iframe)
                      this.url = menuListData[i].subItems[j].iframe +"?user_id="+this.userData.phone;
                       break superOuterLoop;
                 }
               }
             }
         }

        //   if(this.userData && this.userData.cluster_code !== null)
        //      this.url += '?clustercode='+this.userData.cluster_code;
         
        //  if(this.states == 'super-admin')
        // {
        //  console.log("superAdminMenuItems==========>");
        //  console.log(superAdminMenuItems);
        //  superOuterLoop:
        //  for(let i=0;i<superAdminMenuItems.length;i++)
        //  {
        //      if(superAdminMenuItems[i]["subItems"] !== undefined || superAdminMenuItems[i]["subItems"] )
        //      {
        //         console.log( )
        //        for(let j=0;j<superAdminMenuItems[i].subItems.length;j++)  
        //        {
        //          if(superAdminMenuItems[i].subItems[j].link == "/"+this.slug)
        //          {
        //              console.log( superAdminMenuItems[i].subItems[j].link  ,  "/"+this.slug);
        //              console.log(superAdminMenuItems[i].subItems[j].iframe)
        //               this.url = superAdminMenuItems[i].subItems[j].iframe;
        //                break superOuterLoop;
        //          }
        //        }
        //      }
        //  }
        // // console.log(data.iframe)
        // }
        // else if(this.states == 'sales-admin')
        // {
        // salesOuterLoop:  
        // for(let i=0;i<salesAdminMenuItems.length;i++)
        //  {
        //      if(salesAdminMenuItems[i]["subItems"] !== undefined || salesAdminMenuItems[i]["subItems"] )
        //      {
        //         console.log( )
        //        for(let j=0;j<salesAdminMenuItems[i].subItems.length;j++)  
        //        {
        //          if(salesAdminMenuItems[i].subItems[j].link == "/"+this.slug)
        //          {
        //              console.log( salesAdminMenuItems[i].subItems[j].link  ,  "/"+this.slug);
        //              console.log(salesAdminMenuItems[i].subItems[j].iframe)
        //               this.url = salesAdminMenuItems[i].subItems[j].iframe;
        //                break salesOuterLoop;
        //          }
        //        }
        //      }
        //  }
        // }
        // else
        // {
        // clusterOuterLoop:  
        // for(let i=0;i<clusterAdminMenuItems.length;i++)
        //  {
        //      if(clusterAdminMenuItems[i]["subItems"] !== undefined || clusterAdminMenuItems[i]["subItems"] )
        //      {
        //         console.log( )
        //        for(let j=0;j<clusterAdminMenuItems[i].subItems.length;j++)  
        //        {
        //          if(clusterAdminMenuItems[i].subItems[j].link == "/"+this.slug)
        //          {
        //              console.log( clusterAdminMenuItems[i].subItems[j].link  ,  "/"+this.slug);
        //              console.log(clusterAdminMenuItems[i].subItems[j].iframe)
        //               this.url = clusterAdminMenuItems[i].subItems[j].iframe;
        //                break clusterOuterLoop;
        //          }
        //        }
        //      }
        //  }
        // }
        console.log(this.slug)
    }
    // created:{
    //     //Get Role in local storage 
    // }
}

</script>

<style scoped>

div{
overflow: hidden!important;
}
</style>
