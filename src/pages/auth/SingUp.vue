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
                  :type="showPassWord ? 'text' : 'password'"
                  class="form-control"
                  placeholder="Password"
                  v-model.trim="password.value"
                  :class="{ invalid: !password.isValid }"
                  @blur="clearValidity('password')"
                />
                <div class="input-group-text showpassword">
                  <span :class="showPassWord ? 'bi bi-eye' : 'bi bi-eye-slash'" @click="togglePassword"></span>
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
    let showPassWord = ref(false);
    let formIsValid = ref(true);
    let isLoading = ref(false);
    let error = ref(null);
    //clear validity through blur
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
    //func for pasword icon
    function togglePassword() {
      showPassWord.value = !showPassWord.value;
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
    //submit function logic
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
        await store.dispatch('userAuthMod/signup', payloadAction);
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
      showPassWord,
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
}
/* or wherever you want it to float */

/* Make the parent a positioning context */
.login-card-body {
  position: relative;
}
.showpassword {
  cursor: pointer;
}
</style>
