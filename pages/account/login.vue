<script>
import { required, phonenumber } from "vuelidate/lib/validators";
import axios from "axios";
import { appUrl } from '../../repositories/Repo';
import Swal from "sweetalert2";

/**
 * Login component
 */
export default {
  data() {
    return {
      phonenumber: "", 
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false,
      
    };
  },
 
  created() {},
  validations: {
    phonenumber: {required,phonenumber,},
  },
  methods: {
    async tryToLogIn() {
       let temp = await this.$store.dispatch('auth/setAuthStatus',this.phonenumber);
                console.log('TTT', temp);
                if (temp.status) {  
                        this.$router.push("/account/otp-verify");
                }else{
                    Swal.fire(temp.message)
                } 
      // this.submitted = true;
      // this.$v.$touch();
      // if (this.$v.$invalid) {
      //   return;
      // } else {
        // axios.post(appUrl.liveBaseUrl+"/dev/api/auth/weblogin", {phonenumber: this.phonenumber})
        //   .then(function (response) {
        //     console.log(response);
        //     if(response.data.status)
        //     {
        //     localStorage.setItem('userData',JSON.stringify(response.data.userData));
        //     window.location.replace("/");
        //     }
        //     else
        //     {
                     
        //     }
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
      // }
      
    },
  },
  layout: "auth",
};     
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-6 col-xl-5">
      <div class="card">
        <div class="card-body p-4">
          <div class="text-center w-100 m-auto mb-5">
            <div class="auth-logo">
              <nuxt-link to="/" class="logo logo-dark text-center">
                <span class="logo-lg">
                  <!-- ~/assets/images/logo-dark.png -->
                  <img
                    src="~/assets/images/oneconnect-images/cropped-oneconnect-logo.jpeg"
                    alt="" style="background-color: orange;"
                    height="80"
                  />
                </span>
              </nuxt-link>

              <nuxt-link to="/" class="logo logo-light text-center">
                <span class="logo-lg">
                  <img
                    src="~/assets/images/oneconnect-images/cropped-oneconnect-logo.jpeg"
                    alt=""
                    height="80"
                  />
                </span>
              </nuxt-link>
            </div>
            <!-- <p class="text-muted mb-4 mt-3">Enter your phonenumber address and password to access admin panel.</p> -->
          </div>

          <form action="#" @submit.prevent="tryToLogIn">
            <!--<b-alert :variant="notification.type" class="mt-3"v-if="notification.message":show="notificationAutoCloseDuration"dismissible>{{ notification.message }}</b-alert>
            <b-alert variant="danger" class="mt-3" v-model="isAuthError" :show="notificationAutoCloseDuration" dismissible >{{ authError }}</b-alert> -->
            <div class="form-group mb-3">
              <label for="phonenumber" style="margin-left: 142px;">Phone Number</label>
               <input type="number" class="form-control form-control-lg" v-model="phonenumber" placeholder="Enter PhoneNo"/>
            <!--  <input class="form-control" v-model="phonenumber" type="number" id="phonenumber" placeholder="Enter your phone number" :class="{ 'is-invalid': submitted && $v.phonenumber.$error }"/> -->
             <!--  <div v-if="submitted && $v.phonenumber.$error" class="invalid-feedback">
                <span v-if="!$v.phonenumber.required">phonenumber is required.</span>
                <span v-if="!$v.phonenumber.phonenumber">Please enter valid phonenumber.</span>
              </div> -->
            </div>
            <div class="form-group mb-0 text-center">
              <button class="btn btn-primary btn-block" style="background:orange" type="submit">
                Log In
              </button>
            </div>
          </form>
        </div>
        <!-- end card-body -->
      </div>
      <!-- end card -->

      <div class="row mt-3">
        <!-- <div class="col-12 text-center">
                <p>
                    <nuxt-link to="/account/forgot-password" class="text-muted ml-1">Forgot your password?</nuxt-link>
                </p>
                <p class="text-muted">Don't have an account? <nuxt-link to="/account/register" class="text-primary font-weight-medium ml-1">Sign Up</nuxt-link>
                </p>
            </div>  -->
        <!-- end col -->
      </div>
      <!-- end row -->
    </div>
    <!-- end col -->
  </div>
  <!-- end row -->
</template>
<style lang="scss" scoped>
.show{
  cursor: pointer;
  position: relative;
  bottom:20px;
  left: 100px;
}

</style>

