<script>
import { mapState } from "vuex";
import { FormWizard, TabContent } from "vue-form-wizard";
import Buttons from "../ui/buttons.vue";
import Swal from "sweetalert2";

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
      title: "Cluster Activation Form",
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
    // Set the initial number of items
    this.totalRows = this.items.length;
    //  this.list=this.clusterData;
    //  console.log("----------------------222", this.clusterData);
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
      var form = JSON.parse(JSON.stringify(this.formData));
      this.$store.dispatch("cluster/createCluster", form);
      Swal.fire({
                position: "top-end",
                type: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500,
            });
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    filterOnChange(event) {
      this.$store.dispatch("cluster/getClusterFilterData", event);
    },
    TestBtn() {
      this.radioShows = true;
    },
    TestBtn1(){
      this.radioShows = false;
    },
    onComplete(){
            var form = JSON.parse(JSON.stringify(this.formData));
            form.status = "Pending";
            form.dateCreated = new Date();
            this.$store.dispatch("cluster/createCluster", form);
            Swal.fire({
                        position: "top-end",
                        type: "success",
                        title: "Your Application has been submited",
                        showConfirmButton: false,
                        timer: 1500,
                    });
            setTimeout(() => {
                this.$router.push('/sales-admin/');
            }, 2000);
    },
    viewDetails(item, index, button) {
            this.viewRowData=item;
            this.$bvModal.show('modal-1');
    },
    formatDate(dt){
      if(dt == null){
          return;
      }
      return dt.toLocaleString('en-IN');
    },
    formatURL(code){
      return `/cluster-details/${code}`;
    }
  },
  middleware: "router-auth",
};
</script>

<template>
<div>
    <PageHeader :title="title" :items="items" />
    <div class="row">

<!--start form-------------------------------------------------------------------->
<div class="col-xl-12">
        <div class="card">
          <div class="card-body">
            <!-- <h4 class="header-title mb-3">Basic Wizard</h4> -->
            <form-wizard @submit.prevent="addClusterData" color="#3bafda" @on-complete="onComplete($event)">

              <tab-content icon="mdi mdi-account-circle"  >
                <h3 class="wizard-align">General Information</h3>

                <div class="row">
                  <div class="col-6">
                    <div class="form-group row mb-3">
                      <label class="col-md-5 col-form-label" for="userName"
                        >Name of the Cluster</label
                      >
                      <div class="col-md-7">
                            <!-- <input
                          type="text"
                          class="form-control"
                          v-model="formData.status"
                          value="" style="display:none"
                        />
                         <input
                          type="text"
                          class="form-control"
                          v-model="formData.comments"
                          value="" style="display:none"
                        /> -->
                        <input
                          type="text"
                          class="form-control"
                          v-model="formData.clusterName"
                          value=""
                        />
                      </div>
                    </div>
                    <div class="form-group row mb-3">
                      <label class="col-md-5 col-form-label" for="password"
                        >Cluster code</label
                      >
                      <div class="col-md-7">
                        <input
                          type=""
                          v-model="formData.clusterCode"
                          class="form-control"
                          value=""
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-5 col-form-label" for="confirmpass"
                        >Name of the district</label
                      >
                      <div class="col-md-7">
                        <input
                          id="confirmpass"
                          type=""
                          v-model="formData.districtName"
                          class="form-control"
                          value=""
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-5 col-form-label" for="confirmpass"
                        >Road Approachability</label
                      >
                      <div class="col-md-7">
                        <select class="custom-select custom-select-sm" v-model="formData.roadApproachability">
                          <option value="2">pakka</option>
                          <option value="3">Kuchha</option>
                        </select>
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-5 col-form-label" for="confirmpass"
                        >No of Mandals</label
                      >
                      <div class="col-md-7">
                        <input
                          id="confirmpass"
                          type=""
                          v-model="formData.mandals"
                          class="form-control"
                          value=""
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-5 col-form-label" for="confirmpass"
                        >Total Population</label
                      >
                      <div class="col-md-7">
                        <input
                          id="confirmpass"
                          type=""
                          v-model="formData.population"
                          class="form-control"
                          value=""
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-5 col-form-label" for="confirmpass"
                        >No of Remote Villages</label
                      >
                      <div class="col-md-7">
                        <input
                          id="confirmpass"
                          type=""
                          v-model="formData.remoteVillages"
                          class="form-control"
                          value=""
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-5 col-form-label" for="confirmpass"
                        >Total No of Villages</label
                      >
                      <div class="col-md-7">
                        <input
                          id="confirmpass"
                          type=""
                          v-model="formData.numberVillages"
                          class="form-control"
                          value=""
                        />
                      </div>
                    </div>
                  </div>

                  <div class="col-6">
                    <div class="form-group row mb-3">
                      <label class="col-md-5 col-form-label" for="userName"
                        >Nearby Existing Cluster</label
                      >
                      <div class="col-md-7">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.existingCluster"
                          value=""
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-5 col-form-label" for="userName"
                        >Distance From Existing Cluster</label
                      >
                      <div class="col-md-7">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.distanceCluster"
                          value=""
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-5 col-form-label" for="userName"
                        >Name of the State</label
                      >
                      <div class="col-md-7">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.stateName"
                          value=""
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-5 col-form-label" for="userName"
                        >AV Radius in KM</label
                      >
                      <div class="col-md-7">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.radiusKm"
                          value=""
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-5 col-form-label" for="userName"
                        >NO. of Rural Villages</label
                      >
                      <div class="col-md-7">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.ruralVillages"
                          value=""
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-5 col-form-label" for="userName"
                        >Male/Femlae Ratio</label
                      >
                      <div class="col-md-7">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.maleFemaleRatio"
                          value=""
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-5 col-form-label" for="userName"
                        >Total No of Outlets</label
                      >
                      <div class="col-md-7">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.totalOutlets"
                          value="120"
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-5 col-form-label" for="userName"
                        >Type of Cluster</label
                      >
                      <div class="col-md-7">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.clusterType"
                          value=""
                        />
                      </div>
                    </div>
                  </div>

                  <!-- end col -->
                </div>
                <!-- end row -->
              </tab-content>

              <tab-content icon="mdi mdi-face-profile">
                <h3 class="wizard-align">Trade Viability</h3>

                <div class="row">
                  <div class="col-6">
                    <div class="form-group row mb-3">
                      <label class="col-md-7 col-form-label" for="userName"
                        >No of Semi Urban Retail Outlets</label
                      >
                      <div class="col-md-5">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.semiUrbanRetailOutlets"
                          value=""
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-7 col-form-label" for="userName"
                        >No of Rural Outlets</label
                      >
                      <div class="col-md-5">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.ruralOutlets"
                          value=""
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-7 col-form-label" for="userName"
                        >No of Remote Retail Outlets</label
                      >
                      <div class="col-md-5">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.remoteOutlets"
                          value=""
                        />
                      </div>
                    </div>
                    <br />
                    <div class="form-group row mb-3">
                      <label class="col-md-7 col-form-label" for="userName"
                        >AV Sales Per Month Semi Urban</label
                      >
                      <div class="col-md-5">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.avSaleUrban"
                          value=""
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-7 col-form-label" for="userName"
                        >AV Sales Per Rural</label
                      >
                      <div class="col-md-5">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.avSaleRural"
                          value=""
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-7 col-form-label" for="userName"
                        >AV Sales Per Month Remote</label
                      >
                      <div class="col-md-5">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.avSaleRemote"
                          value=""
                        />
                      </div>
                    </div>
                  </div>
                  <!-- end col -->

                  <div class="col-6">
                    <div class="form-group row mb-3">
                      <label class="col-md-7 col-form-label" for="userName"
                        >Target No of Outlets Semi Urban</label
                      >
                      <div class="col-md-5">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.urbanTarget"
                          value=""
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-7 col-form-label" for="userName"
                        >Target No of Outlets Rural</label
                      >
                      <div class="col-md-5">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.ruralTarget"
                          value=""
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-7 col-form-label" for="userName"
                        >Target No of Outlets Remote</label
                      >
                      <div class="col-md-5">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.remoteTarget"
                          value=""
                        />
                      </div>
                    </div>
                    <br />

                    <div class="form-group row mb-3">
                      <label class="col-md-7 col-form-label" for="userName"
                        >Sale Potential for Semi Urban
                      </label>
                      <div class="col-md-5">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.potentialUrban"
                          value=""
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-7 col-form-label" for="userName"
                        >Sale Potential for Rural</label
                      >
                      <div class="col-md-5">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.potentialRural"
                          value=""
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-7 col-form-label" for="userName"
                        >Sale Potential for Remote</label
                      >
                      <div class="col-md-5">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.potentialRemote"
                          value=""
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-7 col-form-label" for="userName"
                        >Sale Potential</label
                      >
                      <div class="col-md-5">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.potentialSale"
                          value=""
                        />
                      </div>
                    </div>
                  </div>
                  <!-- end col -->
                </div>
                <!-- end row -->

                <h4>Cost of Operating expenses</h4>
                <div class="row">
                  <div class="col-12">
                    <div class="form-group row mb-3">
                      <label class="col-md-2 col-form-label" for="userName"
                        >Average Margins</label
                      >
                      <div class="col-md-3">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.averageMargin"
                          value=""
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-2 col-form-label" for="userName"
                        >Factor Sales</label
                      >
                      <div class="col-md-3">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.factorSales"
                          value=""
                        />
                        <span class="text-muted note-wizard">Not More Than 15%</span>
                      </div>
                    
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-2 col-form-label" for="userName"
                        >Target Sale</label
                      >
                      <div class="col-md-3">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.targetSale"
                          value=""
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-2 col-form-label" for="userName"
                        >SP TS Ratio</label
                      >
                      <div class="col-md-3">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.spRatio"
                          value=""
                        />
                        <span class="text-muted note-wizard">Above 65%</span>
                      </div>

                     
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-2 col-form-label" for="userName"
                        >BEP to CPP</label
                      >
                      <div class="col-md-3">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.bepRatio"
                          value=""
                        />
                        <span class="text-muted note-wizard">Less Than 1.5%</span>
                      </div>
                      
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-2 col-form-label" for="userName"
                        >BEP to PPP</label
                      >
                      <div class="col-md-3">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.pppRatio"
                          value=""
                        />
                        <span class="text-muted note-wizard">Less Than 6%</span>
                      </div>
                     
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-2 col-form-label" for="userName"
                        >BEP to PPP-RR</label
                      >
                      <div class="col-md-3">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.rrRatio"
                          value=""
                        />
                        <span class="text-muted note-wizard">Less Than 12%</span>
                      </div>
                      
                    </div>
                  </div>
                  <!-- end col -->
                </div>
                <!-- end col -->
              </tab-content>

              <tab-content icon="mdi mdi-face-profile">
                <h3 class="wizard-align">Remote Services Proposition</h3>

                <div class="row">
                  <div class="col-12">
                    <div class="form-group row mb-3">
                      <label class="col-md-2 col-form-label" for="userName"
                        >Service Parameter1</label
                      >
                      <div class="col-md-3">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.serviceParameter"
                          value=""
                          placeholder="Willingness in %"
                        />
                        <span class="text-muted note-wizard">Test Parameter</span>
                      </div>
                     
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-2 col-form-label" for="userName"
                        >Financial Inclusion</label
                      >
                      <div class="col-md-3">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.financialInclusion"
                          value=""
                        />
                        <span class="text-muted note-wizard">Not less than 25%</span>
                      </div>
                   
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-2 col-form-label" for="userName"
                        >Digital Payments</label
                      >
                      <div class="col-md-3">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.digitalPayment"
                          value=""
                        />
                        <span class="text-muted note-wizard">Not less than 50%</span>
                      </div>
                    
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-2 col-form-label" for="userName"
                        >Insurance linkages</label
                      >
                      <div class="col-md-3">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.insuranceLinkages"
                          value=""
                        />
                        <span class="text-muted note-wizard">Not less than 30%</span>
                      </div>
                      
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-2 col-form-label" for="userName"
                        >E Waste Procurement</label
                      >
                      <div class="col-md-3">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.wasteProcurement"
                          value=""
                        />
                        <span class="text-muted note-wizard">Not less than 20%</span>
                      </div>
                     
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-2 col-form-label" for="userName"
                        >Shelf Spacing Leasing</label
                      >
                      <div class="col-md-3">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.spacingLeasing"
                          value=""
                        />
                        <span class="text-muted note-wizard">Not less than 30%</span>
                      </div>
                      
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-2 col-form-label" for="userName"
                        >Services Integration</label
                      >
                      <div class="col-md-3">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.servicesIntegration"
                          value=""
                        />
                        <span class="text-muted note-wizard">Not less than 40%</span>
                      </div>
                    
                    </div>
                  </div>
                  <!-- end col -->
                </div>
                <!-- end row -->

                <h3 class="wizard-align">Activation Criteria</h3>

                <div class="row">
                  <div class="col-12">
                    <div class="form-group row mb-3">
                      <label class="col-md-3 col-form-label" for="userName"
                        >FSSAI Inclusion</label
                      >
                      <div class="col-md-2">
                        <b-form-group>
                          <b-form-radio
                            name="radio1"
                            class="wizardradio-yes"
                            value=""
                            v-on:change="TestBtn()" 
                            >YES</b-form-radio
                          >

                          <b-form-radio
                            name="radio1"
                            class="wizardradio-no"
                            value=""
                            v-on:change="TestBtn1()"
                            >NO</b-form-radio
                          >
                        </b-form-group>
                      </div>
                      <div class="form-group mb-0 text-center" v-if="radioShows">
                        <button class="btn btn-primary btn-block">Upload</button>
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-3 col-form-label" for="userName"
                        >Shop & Estd. Inclusion
                      </label>
                      <div class="col-md-2">
                        <b-form-group>
                          <b-form-radio
                            name="radio2"
                            class="wizardradio-yes"
                            value=""
                            >YES</b-form-radio
                          >
                          <b-form-radio
                            name="radio2"
                            class="wizardradio-no"
                            value=""
                            >NO</b-form-radio
                          >
                        </b-form-group>
                      </div>
                      <div class="form-group mb-0 text-center">
                        <button class="btn btn-primary btn-block" type="submit">
                          Upload
                        </button>
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-3 col-form-label" for="userName"
                        >Vechile Availability</label
                      >
                      <div class="col-md-2">
                        <b-form-group>
                          <b-form-radio
                            name="radio3"
                            class="wizardradio-yes"
                            value="A"
                            >YES</b-form-radio
                          >
                          <b-form-radio
                            name="radio3"
                            class="wizardradio-no"
                            value="B"
                            >NO</b-form-radio
                          >
                        </b-form-group>
                      </div>
                      <label class="col-md-2 col-form-label" for="vechileCode"
                        >Vechile Code</label
                      >
                      <div class="col-md-3">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.vechileCode"
                          value=""
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-3 col-form-label" for="userName"
                        >Manpower Availability
                      </label>
                      <div class="col-md-2">
                        <b-form-group>
                          <b-form-radio
                            name="radio4"
                            class="wizardradio-yes"
                            value="A"
                            >YES</b-form-radio
                          >
                          <b-form-radio
                            name="radio4"
                            class="wizardradio-no"
                            value="B"
                            >NO</b-form-radio
                          >
                        </b-form-group>
                      </div>
                      <label class="col-md-2 col-form-label" for="employeeCode"
                        >Employee Code</label
                      >
                      <div class="col-md-3">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.employeeCode"
                          value=""
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-3 col-form-label" for="userName"
                        >Store Agreement
                      </label>
                      <div class="col-md-2">
                        <b-form-group>
                          <b-form-radio
                            name="radio5"
                            class="wizardradio-yes"
                            value="A"
                            >YES</b-form-radio
                          >
                          <b-form-radio
                            name="radio5"
                            class="wizardradio-no"
                            value="B"
                            >NO</b-form-radio
                          >
                        </b-form-group>
                      </div>
                      <label class="col-md-2 col-form-label" for="storeId"
                        >Store ID</label
                      >
                      <div class="col-md-3">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.storeId"
                          value=""
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-3 col-form-label" for="userName"
                        >Grading Equipment
                      </label>
                      <div class="col-md-2">
                        <b-form-group>
                          <b-form-radio
                            name="radio6"
                            class="wizardradio-yes"
                            value="A"
                            >YES</b-form-radio
                          >
                          <b-form-radio
                            name="radio6"
                            class="wizardradio-no"
                            value="B"
                            >NO</b-form-radio
                          >
                        </b-form-group>
                      </div>
                      <label class="col-md-2 col-form-label" for="userName"
                        >Asset ID</label
                      >
                      <div class="col-md-3">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          name="userName"
                          value=""
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-3 col-form-label" for="userName"
                        >Testing Equipment</label
                      >
                      <div class="col-md-2">
                        <b-form-group>
                          <b-form-radio
                            name="radio7"
                            class="wizardradio-yes"
                            value="A"
                            >YES</b-form-radio
                          >
                          <b-form-radio
                            name="radio7"
                            class="wizardradio-no"
                            value="B"
                            >NO</b-form-radio
                          >
                        </b-form-group>
                      </div>
                      <label class="col-md-2 col-form-label" for="assetID"
                        >Asset ID</label
                      >
                      <div class="col-md-3">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.assetID"
                          value=""
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-3 col-form-label" for="userName"
                        >Pacing Equipment</label
                      >
                      <div class="col-md-2">
                        <b-form-group>
                          <b-form-radio
                            name="radio8"
                            class="wizardradio-yes"
                            value="A"
                            >YES</b-form-radio
                          >
                          <b-form-radio
                            name="radio8"
                            class="wizardradio-no"
                            value="B"
                            >NO</b-form-radio
                          >
                        </b-form-group>
                      </div>
                      <label class="col-md-2 col-form-label" for="userName"
                        >Asset ID</label
                      >
                      <div class="col-md-3">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          name="userName"
                          value=""
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-3 col-form-label" for="userName"
                        >GST</label
                      >
                      <div class="col-md-2">
                        <b-form-group>
                          <b-form-radio
                            name="radio9"
                            class="wizardradio-yes"
                            value="A"
                            >YES</b-form-radio
                          >
                          <b-form-radio
                            name="radio9"
                            class="wizardradio-no"
                            value="B"
                            >NO</b-form-radio
                          >
                        </b-form-group>
                      </div>
                      <label class="col-md-2 col-form-label" for="GSTNumber"
                        >GST Number</label
                      >
                      <div class="col-md-3">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          v-model="formData.GSTNumber"
                          value=""
                        />
                      </div>
                    </div>
                  </div>
                  <!-- end col -->
                </div>
                <!-- end row -->
              </tab-content>              

            </form-wizard>
          </div>
        </div>
</div>
        <!--end form----------------------------------------------------------->


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



