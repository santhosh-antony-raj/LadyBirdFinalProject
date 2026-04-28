<template>
  <div class="container-fluid">
    <div>
      <div class="d-flex justify-content-between">
        <h5 class="mt-2">Coach Register</h5>
        <bread-crumb></bread-crumb>
      </div>
      <div>
        <div class="row d-flex justify-content-center">
          <div class="col-12 col-md-12 col-sm-8">
            <div class="card mb-4">
              <div class="card-header">
                <div class="card-title">Register as a Coach</div>
              </div>

              <form @submit.prevent="onSubmitData" class="needs-validation" novalidate="">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-6">
                      <label for="validationCustom01" class="form-label">First name</label>
                      <label class="text-danger">*</label>
                      <div class="field-wrap">
                        <input type="text" class="form-control" :class="{ invalid: !firstName.isValid }" v-model.trim="firstName.value" @blur="clearValidity(firstName)" />
                        <p class="field-error" :class="{ visible: !firstName.isValid }">First name should not be empty</p>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <label for="validationCustom02" class="form-label">Last name</label>
                      <label class="text-danger">*</label>
                      <div class="field-wrap">
                        <input type="text" class="form-control" :class="{ invalid: !lastName.isValid }" v-model.trim="lastName.value" @blur="clearValidity(lastName)" />
                        <p class="field-error" :class="{ visible: !lastName.isValid }">Last name should not be empty</p>
                      </div>
                    </div>

                    <div>
                      <label for="rate" class="form-label">Hourly rate</label>
                      <label class="text-danger">*</label>
                      <div class="field-wrap">
                        <input type="number" class="form-control" :class="{ invalid: !rate.isValid }" v-model.number="rate.value" @blur="clearValidity(rate)" />
                        <p class="field-error" :class="{ visible: !rate.isValid }">Hourly rate should not be empty</p>
                      </div>
                    </div>

                    <div>
                      <label for="desc" class="fs-6">Description</label>
                      <label class="text-danger">*</label>
                      <div class="field-wrap">
                        <textarea class="form-control" :class="{ invalid: !description.isValid }" v-model="description.value" @blur="clearValidity(description)" rows="3"></textarea>
                        <p class="field-error" :class="{ visible: !description.isValid }">Description should not be empty</p>
                      </div>
                    </div>

                    <div class="col-12">
                      <label class="form-label">Area of expertise <span class="text-danger">*</span></label>
                      <div class="field-wrap p-2">
                        <div class="row g-2">
                          <div class="col-12 col-sm-4">
                            <div class="form-check">
                              <input type="checkbox" class="form-check-input" id="frontend" value="frontend" v-model="areas.value" @change="clearValidity(areas)" />
                              <label class="form-check-label" for="frontend">Frontend</label>
                            </div>
                          </div>
                          <div class="col-12 col-sm-4">
                            <div class="form-check">
                              <input type="checkbox" class="form-check-input" id="backend" value="backend" v-model="areas.value" @change="clearValidity(areas)" />
                              <label class="form-check-label" for="backend">Backend</label>
                            </div>
                          </div>
                          <div class="col-12 col-sm-4">
                            <div class="form-check">
                              <input type="checkbox" class="form-check-input" id="career" value="career" v-model="areas.value" @change="clearValidity(areas)" />
                              <label class="form-check-label" for="career">Career</label>
                            </div>
                          </div>
                        </div>
                        <p class="field-error" :class="{ visible: !areas.isValid }">Select at least one area of expertise</p>
                      </div>
                    </div>

                    <div class="col-12">
                      <div class="form-check">
                        <div class="field-wrap">
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="agreed" v-model="agree.value" id="invalidCheck" @change="clearValidity(agree)" />
                            <label class="form-check-label" for="invalidCheck">Agree to terms and conditions</label>
                          </div>
                          <p class="field-error" :class="{ visible: !agree.isValid }">You must agree before submitting</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card-footer d-flex justify-content-end">
                  <!--  <i class="bi bi-save-fill me-1"></i> -->
                  <button class="btn btn-primary" type="submit"><i class="fa fa-floppy-disk me-1"></i>Submit</button>

                  <!-- Toast container -->
                  <div class="toast-container position-fixed top-0 end-0 p-3">
                    <div id="toastDefault" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                      <div class="toast-header">
                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                        <strong class="me-auto">Success</strong>
                        <small>Just now</small>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                      </div>
                      <div class="toast-body">Coach registered successfully!</div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import BreadCrumb from '../../components/layout/BreadCrumb.vue';
import { useStore } from 'vuex';

export default {
  components: {
    BreadCrumb,
  },

  setup() {
    const store = useStore();
    let firstName = reactive({
      value: '',
      isValid: true,
    });
    let lastName = reactive({
      value: '',
      isValid: true,
    });
    let description = reactive({
      value: '',
      isValid: true,
    });
    let rate = reactive({
      value: '',
      isValid: true,
    });
    let areas = reactive({
      value: [],
      isValid: true,
    });
    let agree = reactive({
      value: false,
      isValid: true,
    });
    let formIsValid = ref(true);
    function clearValidity(field) {
      field.isValid = true;
      this.formIsValid = true;
    }
    //validate form
    function validateForm() {
      formIsValid.value = true;

      const fields = ['firstName', 'lastName', 'description', 'rate', 'areas', 'agree'];

      const fieldMap = {
        firstName,
        lastName,
        description,
        rate,
        areas,
        agree,
      };

      fields.forEach((field) => {
        switch (field) {
          case 'firstName':
          case 'lastName':
          case 'description':
            if (fieldMap[field].value === '') {
              formIsValid.value = false;
              fieldMap[field].isValid = false;
            }
            break;

          case 'rate':
            if (!rate.value || rate.value < 0) {
              formIsValid.value = false;
              rate.isValid = false;
            }
            break;

          case 'areas':
            if (areas.value.length === 0) {
              formIsValid.value = false;
              areas.isValid = false;
            }
            break;

          case 'agree':
            if (!agree.value) {
              formIsValid.value = false;
              agree.isValid = false;
            }
            break;

          default:
            console.warn(`Unknown field: ${field}`);
        }
      });
    }
    //form submit logic
    function onSubmitData() {
      validateForm();
      // alert('hello');
      if (!formIsValid.value) {
        return;
      }
      const submitData = {
        first: firstName.value,
        last: lastName.value,
        desc: description.value,
        rate: rate.value,
        areas: areas.value,
        agree: agree.value,
      };
      console.log(submitData);
      store.dispatch('coachMod/addCoach', submitData);
      const toastEl = document.getElementById('toastDefault');
      const toast = new window.bootstrap.Toast(toastEl);
      toast.show();
      //reset form
      firstName.value = '';
      firstName.isValid = true;

      lastName.value = '';
      lastName.isValid = true;

      description.value = '';
      description.isValid = true;

      rate.value = null;
      rate.isValid = true;

      areas.value = [];
      areas.isValid = true;

      agree.value = '';
      agree.isValid = true;
      formIsValid.value = true;
    }
    return {
      onSubmitData,
      validateForm,
      clearValidity,
      firstName,
      lastName,
      rate,
      description,
      areas,
      agree,
    };
  },
};
</script>

<style scoped>
input.invalid,
textarea.invalid {
  border: 1px solid red !important;
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
