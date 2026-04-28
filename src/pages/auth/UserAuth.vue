<template>
  <div class="login-page">
    <div class="login-box">
      <div class="login-logo">
        <a href="../index2.html"><b>Find</b>Coach</a>
      </div>
      <!-- /.login-logo -->
      <div class="card">
        <div class="card-body login-card-body">
          <p class="login-box-msg">
            Sign in to start your session
            <span class="icon-tooltip-wrap">
              <i class="bi bi-info-circle" id="iconLogin"></i>
              <span class="icon-tooltip">demo@gmail.com / 12345678</span>
            </span>
          </p>

          <form @submit.prevent="onSubmitData">
            <!-- Spinner centered at top -->
            <div class="spinner-wrapper">
              <base-spinner v-show="isLoading"></base-spinner>
            </div>

            <div class="field-wrap mb-1">
              <div class="input-group">
                <input type="email" class="form-control" placeholder="Email" aria-label="Email" v-model.trim="email.value" :class="{ invalid: !email.isValid }" @blur="clearValidity('email')" />
                <div class="input-group-text">
                  <span class="bi bi-envelope"></span>
                </div>
              </div>
              <p class="field-error" :class="{ visible: !email.isValid }">Enter Valid email address</p>
            </div>

            <div class="field-wrap mb-1">
              <div class="input-group">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  class="form-control"
                  placeholder="Password"
                  v-model.trim="password.value"
                  :class="{ invalid: !password.isValid }"
                  @blur="clearValidity('password')"
                />
                <div class="input-group-text showpassword">
                  <span :class="showPassword ? 'bi bi-eye' : 'bi bi-eye-slash'" @click="togglePassword"></span>
                </div>
              </div>
              <p class="field-error" :class="{ visible: !password.isValid }">Password Should Not Be Empty</p>
            </div>

            <!--begin::Row-->
            <div class="row">
              <div class="col-8">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                  <label class="form-check-label" for="flexCheckDefault"> Remember </label>
                </div>
              </div>
              <!-- /.col -->
              <div class="col-4">
                <div class="d-grid gap-2">
                  <router-link class="text-center" to="/signup"> To Register</router-link>
                </div>
              </div>
              <button class="btn btn-primary" type="submit"><i class="bi bi-person-fill me-1"></i> Login</button>
              <!-- Toast Container -->
              <div class="toast-container position-fixed top-0 end-0 p-3">
                <div id="toastDefault" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                  <div class="toast-header">
                    <span :class="error ? 'bi bi-x-circle-fill text-danger me-2' : 'bi bi-check-circle-fill text-success me-2'"></span>
                    <strong class="me-auto">Success</strong>
                    <small>Just now</small>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                  </div>
                  <div class="toast-body">
                    {{ error ? 'Login Failed' : 'Login done successfully' }}
                  </div>
                </div>
              </div>

              <!-- /.col -->
            </div>
            <!--end::Row-->
          </form>
        </div>
        <!-- /.login-card-body -->
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    let email = reactive({
      value: '',
      isValid: true,
    });
    let password = reactive({
      value: '',
      isValid: true,
    });
    let showPassword = ref(false);
    let formIsValid = ref(true);
    let isLoading = ref(false);
    let error = ref(null);
    //clearvalidity through blur
    function clearValidity(input) {
      if (input === 'email') {
        email.isValid = true;
        formIsValid.value = true;
      }
      if (input === 'password') {
        password.isValid = true;
        formIsValid.value = true;
      }
    }
    //funct for passord icon
    function togglePassword() {
      showPassword.value = !showPassword.value;
    }
    //validation logic
    function validateForm() {
      formIsValid.value = true;
      if (email.value === '' || !email.value.includes('@')) {
        email.isValid = false;
        formIsValid.value = false;
      }
      if (password.value.length < 6) {
        password.isValid = false;
        formIsValid.value = false;
      }
    }
    //submit logic
    async function onSubmitData() {
      formIsValid.value = true;
      validateForm();
      error.value = null;
      if (!formIsValid.value) {
        return;
      }
      //send http request
      const payloadAction = {
        email: email.value,
        password: password.value,
      };
      isLoading.value = true;
      try {
        await store.dispatch('userAuthMod/login', payloadAction);
        const toastEl = document.getElementById('toastDefault');
        const toast = new window.bootstrap.Toast(toastEl);
        toast.show();
        isLoading.value = false;
        setTimeout(() => {
          const redirectUrl = '/' + (route.query.redirect || 'home');
          router.replace(redirectUrl);
        }, 1500);
      } catch (err) {
        console.log(err);
        error.value = err.message || 'signup failed';
        isLoading.value = false;
        const toastEl = document.getElementById('toastDefault');
        const toast = new window.bootstrap.Toast(toastEl);
        toast.show();
      }
    }

    return {
      email,
      password,
      showPassword,
      formIsValid,
      isLoading,
      error,
      clearValidity,
      togglePassword,
      validateForm,
      onSubmitData,
    };
  },
};
</script>

<style scoped>
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
  /* or wherever you want it to float */
}

/* Make the parent a positioning context */
.login-card-body {
  position: relative;
}
.icon-tooltip-wrap {
  position: relative;
  display: inline-block;
  margin-left: 4px;
}

#iconLogin {
  cursor: pointer;
  color: #6c757d;
  font-size: 15px;
  vertical-align: middle;
}

.icon-tooltip {
  display: none;
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: #fff;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 5px;
  white-space: nowrap;
  z-index: 999;
  pointer-events: none;
}

/* Arrow under the tooltip */
.icon-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: #333;
}

/* Show on hover */
.icon-tooltip-wrap:hover .icon-tooltip {
  display: block;
}
.showpassword {
  cursor: pointer;
}
</style>
