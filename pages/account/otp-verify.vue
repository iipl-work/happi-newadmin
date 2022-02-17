<script>
import { required, otp } from "vuelidate/lib/validators";
import axios from "axios";
import { appUrl } from "../../repositories/Repo";
import Swal from "sweetalert2";

/**
 * Login component
 */
export default {
  data() {
    return {
      otp: "",
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false,
      userLoginNumber : {}
    };
  },

 async created() {
        this.userLoginNumber = localStorage.getItem("userLoginPhone"); 
  },
  validations: {
    otp: { required, otp },
  },
  methods: {
    async tryToLogIn() {
      let temp = await this.$store.dispatch("auth/setOtpStatus", this.otp);
      console.log("TTT", temp);
      if (temp.status) {
        this.$router.push("/");
      } else {
        Swal.fire(temp.message);
      }
    },
    // resend otp function
       async resendOTPDetails() {
       let temp = await this.$store.dispatch('auth/setAuthStatus',this.userLoginNumber);
                console.log('TTT', temp);
               if (temp.status) {  
                       Swal.fire(temp.message)
                }else{
                Swal.fire(temp.message)
          } 
       }
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
                  <img
                    src="~/assets/images/OneConnect-images/cropped-OneConnect-logo.jpeg"
                    alt=""
                    style="background-color: orange"
                    height="80"
                  />
                </span>
              </nuxt-link>

              <nuxt-link to="/" class="logo logo-light text-center">
                <span class="logo-lg">
                  <img
                    src="~/assets/images/OneConnect-images/cropped-OneConnect-logo.jpeg"
                    alt=""
                    height="80"
                  />
                </span>
              </nuxt-link>
            </div>
          </div>

          <form action="#" @submit.prevent="tryToLogIn">
            <div class="form-group mb-3">
              <label for="otp" style="margin-left: 182px;">OTP</label>
              <input type="number" class="form-control form-control-lg" v-model="otp" placeholder="Enter OTP"/>
              <div class="text-center mt-5">
             <span class="d-block mobile-text">Don't receive the code?</span><span class="font-weight-bold text-danger cursor" style="cursor:pointer" @click="resendOTPDetails">Resend</span>
             </div>
            </div>
            <div class="form-group mb-0 text-center">
              <button class="btn btn-primary btn-block" style="background: orange" type="submit">Log In</button>
            </div>
          </form>
        </div>
        <!-- end card-body -->
      </div>
      <!-- end card -->

      <div class="row mt-3"></div>
      <!-- end row -->
    </div>
    <!-- end col -->
  </div>
  <!-- end row -->
</template>
<style lang="scss" scoped>
.show {
  cursor: pointer;
  position: relative;
  bottom: 20px;
  left: 100px;
}
</style>
