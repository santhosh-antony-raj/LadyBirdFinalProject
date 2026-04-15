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
export default {
  data() {
    return {
      email: {
        value: '',
        isValid: true,
      },
      msg: {
        value: '',
        isValid: true,
      },
      isFormValid: true,
    };
  },
  methods: {
    clearValdity(input) {
      this[input].isValid = true;
      this.isFormValid = true;
    },
    ValidateForm() {
      if (this.email.value === '') {
        this.email.isValid = false;
        this.isFormValid = false;
      }
      if (this.msg.value === '') {
        this.msg.isValid = false;
        this.isFormValid = false;
      }
    },
    saveData() {
      this.isFormValid = true;
      this.ValidateForm();
      //alert('saved');
      if (!this.isFormValid) {
        return;
      }
      this.$store.dispatch('contactMod/addMsg', {
        email: this.email.value,
        msg: this.msg.value,
        coachId: this.$route.params.id,
      });

      const toastEl = document.getElementById('toastDefault');
      const toast = new window.bootstrap.Toast(toastEl);
      toast.show();
      //reset value
      this.email = { value: '', isValid: true };
      this.msg = { value: '', isValid: true };
    },
  },
};
</script>

<style>
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
