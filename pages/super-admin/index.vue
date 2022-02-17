<script>
import { mapState } from "vuex";
import { FormWizard, TabContent } from "vue-form-wizard";
import Buttons from "../ui/buttons.vue";

/**
 * Advanced Table component
 */
export default {
  head() {
    console.log("2--------");
    return {
      title: `${this.title} | Minton - Nuxtjs Responsive Admin Dashboard Template`,
      
    };
  },
  data() {
    console.log("0--------");
    return {radioShows: false,
        formData:{},
        viewRowData:{},
      list: [],
      message: "",
      title: "Cluster",
      items: [
        {
          text: "Minton",
          href: "/",
        },
        {
          text: "Tables",
          href: "/",
        },
        {
          text: "Advanced",
          active: true,
        },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filterOptions: ["All", "Pending","Rejected", "Approved", "Suspended"],
      byStatus: "All",
      filter: null,
      filterOn: [],
      sortBy: "id",
      sortDesc: false,
      //id', 'clusterName', 'clusterCode', 'districtName'
      fields: [
        {
          key: "clusterName",
          sortable: true,
        },
        {
          key: "clusterCode",
          sortable: true,
        },
      ],
    };
  },
    components: {
    FormWizard,
    TabContent,
  },
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.clusterData.length;
    },
    ...mapState({
      clusterData: (state) => state.cluster.list,
    }),
  },
  created() {
     this.$store.dispatch("cluster/getClusters", []);
  },
  mounted() {
    this.totalRows = this.items.length;
    console.log("3--------");
  },

  methods: {
    /**
     * Search the table data with search input
     */
    info(item, index, button) {
      console.log(item, index, button);
      this.$store.dispatch("cluster/deleteClusterById", index);

      // this.infoModal.title = `Row index: ${index}`
      // this.infoModal.content = JSON.stringify(item, null, 2)
      // this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    addClusterData() {
      let item = {
        id: 1,
        name: this.message,
      };

      this.$store.dispatch("cluster/createCluster", item);
      // this.$notify({
      //     group: 'addCartSuccess',
      //     title: 'Add to wishlist!',
      //     text: ` has been added to your wishlist !`
      // });
      console.log("----------------------111", this.clusterData);
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    filterOnChange(event) {
      console.log(event);
      this.$store.dispatch("cluster/getClusterFilterData", event);
    },
    TestBtn() {
      this.radioShows = true;
    },
    TestBtn1(){
        
      this.radioShows = false;
    },
    onComplete(){
             this.formData.status="Rejected";
             this.formData.dateCreated=new Date();
             console.log(this.formData);
             this.$store.dispatch("cluster/createCluster", this.formData);
             alert("Successfully Completed");
    },
    viewDetails(item, index, button) {      
        this.viewRowData=item;
        this.$bvModal.show('modal-1');
    },
    formatDate(dt){
      return dt.toLocaleDateString('en-IN');
    },
    formatURL(code){
      return `/super-admin/cluster-info/${code}`;
    }
  },
  middleware: "router-auth",
};
</script>

<template>
<div>
    <PageHeader :title="title" :items="items" />
    <div class="row">

        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <p class="text-muted font-13 mb-4"></p>
                    <div class="row mb-md-2">
                        <div class="col-sm-12 col-md-6">
                            <div id="tickets-table_length" class="dataTables_length">
                                <label class="d-inline-flex align-items-center">
                                    Show&nbsp;
                                    <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entries
                                </label>
                            </div>
                        </div>
                        <!-- Search -->
                        <div class="col-sm-12 col-md-3">
                        <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                                <label class="d-inline-flex align-items-center">
                                    Status:
                                    <b-form-select class="form-control form-control-sm ml-2" v-model="byStatus" size="sm" :options="filterOptions" @change="filterOnChange($event)"></b-form-select>
                                </label>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-3">
                            <div id="tickets-table_filter" class="dataTables_filter text-md-right">                               
                                <label class="d-inline-flex align-items-center">
                                    Search:
                                    <b-form-input v-model="filter" type="search" placeholder="Search..." class="form-control form-control-sm ml-2"></b-form-input>
                                </label>
                            </div>
                        </div>
                        <!-- End search -->
                    </div>
                    <!-- Table -->
                    <div class="table-responsive mb-0">
                        <b-table :items="this.clusterData"  :fields="[{ key: 'id', label: 'ID' },{ key: 'clusterName', label: 'Cluster Name' }, 'clusterCode', 'districtName','status', { key: 'dateCreated', label: 'Date' },{ key: 'actions', label: 'Actions' }]" responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
                             <template #cell(id)="row">
                                    {{row.index+1}}
                             </template>
                             <template #cell(clusterName)="row">   
                                    <a :href="formatURL(row.item.clusterCode)" class="text-body font-weight-medium">{{row.item.clusterName}}</a>
                             </template>
                             <template #cell(status)="row">   
                                    <span class="badge badge-soft-success" :class="{'badge-soft-warning': row.item.status === 'Approved', 'badge-soft-danger': row.item.status === 'Rejected', 'badge-soft-warning': row.item.status === 'Suspend ', 'badge-soft-info': row.item.status === 'Pending'}">
                                      {{row.item.status}}
                                    </span>
                             </template>
                              <template #cell(dateCreated)="row"> 
                                    {{formatDate(row.item.dateCreated )}}
                             </template>
                             
                             <template #cell(actions)="row">
                              
                                <a href="javascript:void(0);" class="action-icon" @click="viewDetails(row.item, row.index, $event.target)"><i class="mdi mdi-eye"></i></a>
                               
                                <a size="md" href="javascript: void(0);" v-b-modal.modal-1 class="mr-1">
                                    <i class="bx bx-trash"></i>
                                </a>                        
                             </template>	
                        </b-table>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="dataTables_paginate paging_simple_numbers float-right">
                                <ul class="pagination pagination-rounded mb-0">
                                    <!-- pagination -->
                                    <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <b-modal id="modal-1" title="View Cluster Details"  size="lg" centered hide-footer>
                        <div class="card-body">
                                <v-list>
                                    <v-list-item v-for="(value,key) in viewRowData" :key="`${key}`">
                                        <v-list-item-title >
                                            <span class="language-item">{{ key }} : {{ value }} </span><br>
                                        </v-list-item-title>
                                    </v-list-item>
                                </v-list>
                        </div>
                    </b-modal>
                </div>
            </div>
        </div>
    </div>
</div>

</template>
<style scoped>
.wizard-radio {
  margin-left: 10px;
  position: relative;
  top: 10px;
}

.wizard-one {
  position: relative;
  top: 10px;
}

.wizard-align {
  text-align: center;
  position: relative;
  bottom: 20px;
}

.wizardradio-no {
  margin-left: 60px;
  position: relative;
  bottom: 15px;
}

.wizardradio-yes {
  position: relative;
  top: 7px;
}

.note-wizard{
font-size:11px;

}

 
</style>



