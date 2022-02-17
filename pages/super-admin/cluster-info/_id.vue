<script>
import { mapState } from "vuex";
import { FormWizard, TabContent } from "vue-form-wizard";
import Buttons from "../../ui/buttons.vue";
import Swal from "sweetalert2";

/**
 * Advanced Table component
 */
export default {
  head() {
    return {
      title: `${this.title} | Minton - Nuxtjs Responsive Admin Dashboard Template`,
    };
  },
  data() {
    console.log("0--------");
    return {radioShows: false,
        // formData:{},
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
      comments: "",
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
      formData: (state) => JSON.parse(JSON.stringify(state.cluster.selected)),
    }),
  },
  created() {
     this.$store.dispatch("cluster/getClusterById", this.$route.params.id);
  },
  mounted() {
    this.totalRows = this.items.length;
  },

  methods: {
    formatDate(dt){
        if(dt == null){
            return;
        }
      return dt.toLocaleString('en-IN');
    },
    updateStatus(status){
      this.formData.status = status;
      console.log("status", status);
      this.$store.dispatch("cluster/updateClusterStatus", {
        status: status,
        comments: this.comments,
        code: this.formData.clusterCode
      });
      
      Swal.fire({
                        position: "top-end",
                        type: "success",
                        title: "Your Request has been updated",
                        showConfirmButton: false,
                        timer: 1500,
                    });
            setTimeout(() => {
                this.$router.push('/super-admin/');
            }, 2000);
    }
  },
  middleware: "router-auth",
};
</script>

<template>
<div>
    <PageHeader :title="title" :items="items" />

    <div class="row" v-if="formData != null">

    <div class="col-lg-12">
            <div class="card">
                <div class="card-header border-bottom bg-transparent">
                    <h5 class="header-title mb-0">ClusterCode #{{formData.clusterCode}}</h5>
                </div>
                <div class="card-body">
                    <div>
                        <div class="row">
                            <div class="col-lg-3 col-sm-6">
                                <div class="media mb-2">
                                    <div class="media-body">
                                        <p class="mb-1">Name.</p>
                                        <h5 class="mt-0">
                                            {{formData.clusterName}}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-6">
                                <div class="media mb-2">
                                    <div class="media-body">
                                        <p class="mb-1">Status</p>
                                        <h5 class="mt-0">
                                            {{formData.status}}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-6">
                                <div class="media mb-2">
                                    <div class="media-body">
                                        <p class="mb-1">Date</p>
                                        <h5 class="mt-0">
                                            {{formatDate(formData.dateCreated)}}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-6">
                                <div class="media mb-2">
                                    <div class="media-body">
                                        <p class="mb-1">Cluster Code</p>
                                        <h5 class="mt-0">
                                            {{formData.clusterCode}} 
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                         <div class="row">
                            <div class="col-lg-3 col-sm-6">
                                <div class="media mb-2">
                                    <div class="media-body">
                                        <p class="mb-1">Name of the district.</p>
                                        <h5 class="mt-0">
                                            {{formData.districtName}}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-6">
                                <div class="media mb-2">
                                    <div class="media-body">
                                        <p class="mb-1">Road Approachability</p>
                                        <h5 class="mt-0">
                                           {{formData.roadApproachability}}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-6">
                                <div class="media mb-2">
                                    <div class="media-body">
                                        <p class="mb-1">No of Mandals</p>
                                        <h5 class="mt-0">
                                            {{formData.mandals}}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-6">
                                <div class="media mb-2">
                                    <div class="media-body">
                                        <p class="mb-1">Total Population</p>
                                        <h5 class="mt-0">
                                            {{formData.population}}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                         <div class="row">
                            <div class="col-lg-3 col-sm-6">
                                <div class="media mb-2">
                                    <div class="media-body">
                                        <p class="mb-1">No of Remote Villages</p>
                                        <h5 class="mt-0">
                                            {{formData.remoteVillages}}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-6">
                                <div class="media mb-2">
                                    <div class="media-body">
                                        <p class="mb-1">Total No of Villages</p>
                                        <h5 class="mt-0">
                                           {{formData.numberVillages}}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-6">
                                <div class="media mb-2">
                                    <div class="media-body">
                                        <p class="mb-1">Nearby Existing Cluster</p>
                                        <h5 class="mt-0">
                                            {{formData.existingCluster}}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-6">
                                <div class="media mb-2">
                                    <div class="media-body">
                                        <p class="mb-1">Distance From Existing Cluster</p>
                                        <h5 class="mt-0">
                                            {{formData.distanceCluster}}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                         <div class="row">
                            <div class="col-lg-3 col-sm-6">
                                <div class="media mb-2">
                                    <div class="media-body">
                                        <p class="mb-1">Name.</p>
                                        <h5 class="mt-0">
                                            {{formData.clusterName}}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-6">
                                <div class="media mb-2">
                                    <div class="media-body">
                                        <p class="mb-1">Name of the State</p>
                                        <h5 class="mt-0">
                                            {{formData.stateName}}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-6">
                                <div class="media mb-2">
                                    <div class="media-body">
                                        <p class="mb-1">AV Radius in KM</p>
                                        <h5 class="mt-0">
                                            {{formData.radiusKm}}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-6">
                                <div class="media mb-2">
                                    <div class="media-body">
                                        <p class="mb-1">NO. of Rural Villages</p>
                                        <h5 class="mt-0">
                                            {{formData.ruralVillages}}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="row">
                            <div class="col-lg-3 col-sm-6">
                                <div class="media mb-2">
                                    <div class="media-body">
                                        <p class="mb-1">Male/Femlae Ratio</p>
                                        <h5 class="mt-0">
                                            {{formData.maleFemaleRatio}}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-6">
                                <div class="media mb-2">
                                    <div class="media-body">
                                        <p class="mb-1">Total No of Outlets</p>
                                        <h5 class="mt-0">
                                            {{formData.totalOutlets}}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-6">
                                <div class="media mb-2">
                                    <div class="media-body">
                                        <p class="mb-1">Type of Cluster</p>
                                        <h5 class="mt-0">
                                            {{formData.clusterType}}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-6">
                                <div class="media mb-2">
                                    <div class="media-body">
                                        <p class="mb-1">NO. of Rural Villages</p>
                                        <h5 class="mt-0">
                                            {{formData.ruralVillages}}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                </div>
            </div>
            <!-- end card -->

            <div class="row mb-3">
               
                <div class="col-lg-4">
                    <div>
                        <h4 class="font-15 mb-2">Cost of Operating expenses</h4>

                        <div class="card p-2 mb-lg-0">
                            <table class="table table-borderless table-sm mb-0">
                                <tbody>
                                   <tr>
                                        <th scope="row">Average Margins</th>
                                        <td>{{formData.averageMargin}}</td>
                                    </tr>
                                     <tr>
                                        <th scope="row">Factor Sales</th>
                                        <td>{{formData.factorSales}}</td>
                                    </tr>
                                     <tr>
                                        <th scope="row">Target Sale</th>
                                        <td>{{formData.targetSale}}</td>
                                    </tr>
                                     <tr>
                                        <th scope="row">SP TS Ratio</th>
                                        <td>{{formData.spRatio}}</td>
                                    </tr>
                                     <tr>
                                        <th scope="row">BEP to CPP</th>
                                        <td>{{formData.bepRatio}}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">BEP to PPP</th>
                                        <td>{{formData.pppRatio}}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">BEP to PPP-RR</th>
                                        <td>{{formData.rrRatio}}</td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div>
                        <h4 class="font-15 mb-2">Remote Services Proposition</h4>

                        <div class="card p-2 mb-lg-0">
                             <table class="table table-borderless table-sm mb-0">
                                <tbody>
                                   <tr>
                                        <th scope="row">Service Parameter1</th>
                                        <td>{{formData.serviceParameter}}</td>
                                    </tr>
                                     <tr>
                                        <th scope="row">Financial Inclusion</th>
                                        <td>{{formData.financialInclusion}}</td>
                                    </tr>
                                     <tr>
                                        <th scope="row">Digital Payments</th>
                                        <td>{{formData.digitalPayment}}</td>
                                    </tr>
                                     <tr>
                                        <th scope="row">Insurance linkages</th>
                                        <td>{{formData.insuranceLinkages}}</td>
                                    </tr>
                                     <tr>
                                        <th scope="row">E Waste Procurement</th>
                                        <td>{{formData.wasteProcurement}}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Shelf Spacing Leasing</th>
                                        <td>{{formData.spacingLeasing}}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Services Integration</th>
                                        <td>{{formData.servicesIntegration}}</td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div>
                        <h4 class="font-15 mb-2">Remote Services Proposition</h4>

                        <div class="card p-2 mb-lg-0">
                             <table class="table table-borderless table-sm mb-0">
                                <tbody>
                                   <tr>
                                        <th scope="row">Employee Code</th>
                                        <td>{{formData.employeeCode}}</td>
                                    </tr>
                                     <tr>
                                        <th scope="row">Store Agreement ID</th>
                                        <td>{{formData.storeId}}</td>
                                    </tr>
                                     <tr>
                                        <th scope="row">Asset ID</th>
                                        <td>{{formData.digitalPayment}}</td>
                                    </tr>
                                     <tr>
                                        <th scope="row">Insurance linkages</th>
                                        <td>{{formData.insuranceLinkages}}</td>
                                    </tr>
                                     <tr>
                                        <th scope="row">E Waste Procurement</th>
                                        <td>{{formData.wasteProcurement}}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Shelf Spacing Leasing</th>
                                        <td>{{formData.spacingLeasing}}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">GST Number</th>
                                        <td>{{formData.GSTNumber}}</td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                 <div class="col-lg-4">
                    <div>
                        <h4 class="font-15 mb-2">Trade Viability</h4>

                        <div class="card p-2 mb-lg-0">
                            <table class="table table-borderless table-sm mb-0">
                                <tbody>
                                    <!-- <tr>
                                        <th colspan="2">
                                            <h5 class="font-15 m-0">Arnold Jackson</h5>
                                        </th>
                                    </tr> -->
                                    <tr>
                                        <th scope="row">No of Semi Urban Retail Outlets</th>
                                        <td>{{formData.semiUrbanRetailOutlets}}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">No of Rural Outlets</th>
                                        <td>{{formData.ruralOutlets}}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">No of Remote Retail Outlets</th>
                                        <td>{{formData.remoteOutlets}}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">AV Sales Per Month Semi Urban</th>
                                        <td>{{formData.avSaleUrban}}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">AV Sales Per Rural</th>
                                        <td>{{formData.avSaleRural}}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">AV Sales Per Month Remote</th>
                                        <td>{{formData.avSaleRemote}}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Target No of Outlets Semi Urban</th>
                                        <td>{{formData.urbanTarget}}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Target No of Outlets Rural</th>
                                        <td>{{formData.ruralTarget}}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Target No of Outlets Remote</th>
                                        <td>{{formData.remoteTarget}}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Sale Potential for Semi Urban</th>
                                        <td>{{formData.potentialUrban}}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Sale Potential for Rural</th>
                                        <td>{{formData.potentialRural}}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Sale Potential for Remote</th>
                                        <td>{{formData.potentialRemote}}</td>
                                    </tr>
                                     <tr>
                                        <th scope="row">Sale Potential</th>
                                        <td>{{formData.potentialSale}}</td>
                                    </tr>
                                    
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                  <div>
                      <h4 class="font-15 mb-2">Action</h4>

                      
                      <div class="card p-2 mb-lg-0">

                        <div class="form-group row mb-12">
                      <label class="col-md-5 col-form-label" for="textarea"
                        >Comments</label
                      >
                      <div class="col-md-12">
                          <textarea id="textarea" rows="4" wrap="soft" class="form-control" v-model="comments"></textarea>

                      </div>
                    </div>

                        <br/>
                        <b-button key="success" variant="success" class="ml-1" v-on:click="updateStatus('Approved')">Approved</b-button>
                        <br/>
                        <b-button key="warning" variant="warning" class="ml-1" v-on:click="updateStatus('Suspended')">Suspended</b-button>
                        <br/>
                        <b-button key="danger" variant="danger" class="ml-1" v-on:click="updateStatus('Rejected')">Rejected</b-button>
                        <br/>
                      </div>
                  </div>
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



