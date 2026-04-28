<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-12 col-sm-6">
        <div class="card mb-4">
          <div class="card-header">
            <div class="card-title">Contact Coach</div>
          </div>

          <form @submit.prevent="saveData">
            <div class="card-body">
              <!-- Email -->
              <div class="mb-1">
                <label for="email" class="form-label">Email address <span class="text-danger">*</span></label>
                <div class="field-wrap">
                  <input type="email" class="form-control" :class="{ invalid: !email.isValid }" id="email" v-model.trim="email.value" @blur="clearValdity('email')" />
                  <p class="field-error" :class="{ visible: !email.isValid }">Email must be in valid format</p>
                </div>
              </div>

              <!-- Message -->
              <div class="mb-1">
                <label class="form-label">Message <span class="text-danger">*</span></label>
                <div class="field-wrap">
                  <textarea id="msg" class="form-control" :class="{ invalid: !msg.isValid }" v-model.trim="msg.value" @blur="clearValdity('msg')"></textarea>
                  <p class="field-error" :class="{ visible: !msg.isValid }">Message should not be empty</p>
                </div>
              </div>
            </div>

            <!-- <i class="bi bi-save-fill me-1"></i> -->
            <div class="card-footer d-flex justify-content-end">
              <button data-test="contactcoach-btn" class="btn btn-primary" type="submit"><i class="fa fa-floppy-disk me-2"></i>Submit</button>
              <!-- Toast Container -->
              <div class="toast-container position-fixed top-0 end-0 p-3">
                <div id="toastDefault" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                  <div class="toast-header">
                    <i class="bi bi-check-circle-fill text-success me-2"></i>
                    <strong class="me-auto">Success</strong>
                    <small>Just now</small>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                  </div>
                  <div class="toast-body">Contacted Coach successfully!</div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
export default {
  setup() {
    const route = useRoute();
    const store = useStore();
    let email = reactive({
      value: '',
      isValid: true,
    });
    let msg = reactive({
      value: '',
      isValid: true,
    });
    let isFormValid = ref(true);
    function clearValdity(input) {
      if (input === 'email') {
        email.isValid = true;
      }
      if (input === 'msg') {
        msg.isValid = true;
      }
      isFormValid.value = true;
    }
    //valiadtion form
    function ValidateForm() {
      if (email.value === '') {
        email.isValid = false;
        isFormValid.value = false;
      }
      if (msg.value === '') {
        msg.isValid = false;
        isFormValid.value = false;
      }
    }
    //submit form logic
    function saveData() {
      isFormValid.value = true;
      ValidateForm();
      if (!isFormValid.value) {
        return;
      }
      store.dispatch('contactMod/addMsg', {
        email: email.value,
        msg: msg.value,
        coachId: route.params.id,
      });
      const toastEl = document.getElementById('toastDefault');
      const toast = new window.bootstrap.Toast(toastEl);
      toast.show();
      email.value = '';
      email.isValid = true;
      msg.value = '';
      msg.isValid = true;
    }
    return {
      email,
      msg,
      isFormValid,
      clearValdity,
      ValidateForm,
      saveData,
    };
  },
};
</script>

<style scoped>
input.invalid,
textarea.invalid {
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
</style>
