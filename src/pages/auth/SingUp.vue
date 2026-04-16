<template>
  <div class="register-page">
    <div class="login-box">
      <div class="login-logo">
        <a href="../index2.html"><b>Find</b>Coach</a>
      </div>
      <!-- /.login-logo -->
      <div class="card">
        <div class="card-body login-card-body">
          <p class="login-box-msg">Register a new membership</p>

          <form @submit.prevent="onSubmitData">
            <div class="spinner-wrapper">
              <base-spinner v-show="isLoading"></base-spinner>
            </div>
            <div class="field-wrap mb-1">
              <div class="input-group">
                <input type="email" class="form-control" placeholder="Email" aria-label="Email" v-model.trim="email.value" :class="{ invalid: !email.isValid }" @blur="clearValdity('email')" />
                <div class="input-group-text">
                  <span class="bi bi-envelope"></span>
                </div>
              </div>
              <p class="field-error" :class="{ visible: !email.isValid }">Enter Valid email address</p>
            </div>
            <div class="field-wrap mb-1">
              <div class="input-group">
                <input
                  :type="showPassWord ? 'text' : 'password'"
                  class="form-control"
                  placeholder="Password"
                  v-model.trim="password.value"
                  :class="{ invalid: !password.isValid }"
                  @blur="clearValdity('password')"
                />
                <div class="input-group-text">
                  <span :class="showPassWord ? 'bi bi-eye' : 'bi bi-eye-slash'" @click="togglePassword" style="cursor: pointer"></span>
                </div>
              </div>
              <p class="field-error" :class="{ visible: !password.isValid }">Password Should Not Be Empty</p>
            </div>
            <!--begin::Row-->
            <div class="row">
              <div class="col-8">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                  <label class="form-check-label" for="flexCheckDefault"> Remember Me </label>
                </div>
              </div>
              <!-- /.col -->
              <div class="col-4">
                <div class="d-grid gap-2">
                  <router-link class="text-center" to="/login"> To Login</router-link>
                </div>
              </div>
              <button class="btn btn-primary" type="submit">Signup</button>
              <!-- Toast Container -->
              <div class="toast-container position-fixed top-0 end-0 p-3">
                <div id="toastDefault" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                  <!--  <i class="bi bi-check-circle-fill text-success me-2"></i> -->
                  <div class="toast-header">
                    <span :class="error ? 'bi bi-x-circle-fill text-danger me-2' : ' bi bi-check-circle-fill text-success me-2'"></span>
                    <strong class="me-auto">Success</strong>
                    <small>Just now</small>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                  </div>
                  <div class="toast-body">
                    {{ error ? 'Account Already Exists' : 'Signed Up successfully' }}
                  </div>
                </div>
              </div>

              <!-- /.col -->
            </div>
            <!--end::Row-->
          </form>

          <!-- /.social-auth-links -->
        </div>
        <!-- /.login-card-body -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: {
        value: '',
        isValid: true,
      },
      password: {
        value: '',
        isValid: true,
      },
      showPassWord: false,
      formIsValid: true,
      isLoading: false,
      error: null,
    };
  },

  methods: {
    clearValdity(input) {
      this[input].isValid = true;
      this.formIsValid = true;
    },
    togglePassword() {
      this.showPassWord = !this.showPassWord;
    },
    validateForm() {
      if (this.email === '' || !this.email.value.includes('@')) {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.password.value.length < 6) {
        this.password.isValid = false;
        this.formIsValid = false;
      }
    },
    async onSubmitData() {
      this.formIsValid = true;
      this.validateForm();
      this.handleError();

      if (!this.formIsValid) {
        return;
      }

      //send http request
      const payloadAction = {
        email: this.email.value,
        password: this.password.value,
      };
      this.isLoading = true;
      try {
        await this.$store.dispatch('userAuthMod/signup', payloadAction);
        const toastEl = document.getElementById('toastDefault');
        const toast = new window.bootstrap.Toast(toastEl);
        toast.show();
        this.isLoading = false;
        setTimeout(() => {
          const redirectUrl = '/' + (this.$route.query.redirect || 'home');
          this.$router.replace(redirectUrl);
        }, 1500);
      } catch (err) {
        console.log(err);
        this.error = err.message || 'signup failed';
        this.isLoading = false;
        const toastEl = document.getElementById('toastDefault');
        const toast = new window.bootstrap.Toast(toastEl);
        toast.show();
      }

      //loading
    },

    handleError() {
      this.error = null;
    },
  },
};
</script>

<style>
input.invalid {
  border: 1px solid red;
}

.field-wrap {
  position: relative;
}

.field-error {
  margin: 0;
  padding: 0;
  min-height: 1rem;
  font-size: 0.75rem;
  color: #dc3545;
  visibility: hidden;
  line-height: 1rem;
}

.field-error.visible {
  visibility: visible;
}
.spinner-wrapper {
  position: absolute;
  top: 40px;
  right: 50%;
  text-align: center;
}
/* or wherever you want it to float */

/* Make the parent a positioning context */
.login-card-body {
  position: relative;
}
</style>
