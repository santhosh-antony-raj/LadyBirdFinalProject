<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-between">
      <h5 class="mt-2" v-if="this.$route.params.filter">Filtered List</h5>
      <bread-crumb v-if="this.$route.params.filter"></bread-crumb>
    </div>
    <div>
      <div>
        <div class="row">
          <div class="col-12">
            <template v-if="$route.params.filter">
              <div class="card card-outline card-muted shadow-sm">
                <div class="card-header">
                  <h3 class="card-title">
                    <i class="bi bi-people-fill me-2"></i>
                    Coaches —
                    <span class="text-capitalize fw-bold">
                      {{ $route.params.filter }}
                    </span>
                  </h3>
                  <div class="d-flex justify-content-end">
                    <router-link to="/coachRegister" class="btn btn-outline-light text-dark"> <i class="bi bi-plus"></i></router-link>
                  </div>
                </div>

                <!-- table-responsive wraps the table -->
                <div class="card-body p-0">
                  <div class="table-responsive">
                    <table class="table table-bordered mb-0">
                      <thead>
                        <tr class="table-light text-center">
                          <th>#</th>
                          <th>Name</th>
                          <th>Areas</th>
                          <th>Price / hr</th>

                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-if="paginatedCoaches.length === 0">
                          <td colspan="6" class="text-center text-muted py-4">
                            <i class="bi bi-inbox fs-4 d-block"></i>
                            No coaches found for
                            <strong>{{ $route.params.filter }}</strong>
                          </td>
                        </tr>
                        <coach-item
                          v-for="(coach, index) in paginatedCoaches"
                          :key="coach.id"
                          :index="(currentPage - 1) * perPage + index + 1"
                          :firstName="coach.firstName"
                          :lastName="coach.lastName"
                          :hourlyRate="coach.hourlyRate"
                          :description="coach.description"
                          :areas="coach.areas"
                          :id="coach.id"
                          @edit="openEditModal"
                          @delete="handleDelete"
                        ></coach-item>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div class="d-flex align-items-center justify-content-between w-100">
                  <div class="ms-2">
                    <span class="badge text-bg-primary"> {{ filteredCoaches.length }} found </span>
                  </div>

                  <div class="mt-3 me-2">
                    <the-pagination :currentPage="currentPage" :totalPages="totalPages" @nextPage="nextPage" @prevPage="previousPage" @goTo="gotoPage"></the-pagination>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal update -->
    <div class="modal fade" id="editCoachModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
      <!-- <i class="bi bi-pencil-fill me-2"></i> -->
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">Edit Coach</h5>
            <button type="button" class="btn-close btn-close-dark" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="field-wrap">
              <label class="form-label">First Name<span class="text-danger">*</span></label>
              <input v-model="editForm.firstName.value" type="text" class="form-control" :class="{ invalid: !editForm.firstName.isValid }" placeholder="First Name" @blur="clearValdity('firstName')" />
              <p class="field-error" :class="{ visible: !editForm.firstName.isValid }">FirstName should not be empty</p>
            </div>

            <div class="field-wrap">
              <label class="form-label">Last Name<span class="text-danger">*</span></label>
              <input v-model="editForm.lastName.value" type="text" class="form-control" :class="{ invalid: !editForm.lastName.isValid }" placeholder="Last Name" @blur="clearValdity('lastName')" />
              <p class="field-error" :class="{ visible: !editForm.lastName.isValid }">LastName should not be empty</p>
            </div>

            <div class="field-wrap">
              <label class="form-label">Hourly Rate<span class="text-danger">*</span></label>
              <input
                v-model.number="editForm.hourlyRate.value"
                type="number"
                class="form-control"
                :class="{ invalid: !editForm.hourlyRate.isValid }"
                placeholder="Hourly Rate"
                @blur="clearValdity('hourlyRate')"
              />
              <p class="field-error" :class="{ visible: !editForm.hourlyRate.isValid }">HourlyRate should not be empty</p>
            </div>

            <div class="field-wrap">
              <label class="form-label">Areas<span class="text-danger">*</span></label>
              <div class="d-flex flex-wrap gap-2">
                <div class="form-check" v-for="area in allAreas" :key="area">
                  <input
                    class="form-check-input"
                    :class="{ invalid: !editForm.areas.isValid }"
                    type="checkbox"
                    :id="'area-' + area"
                    :value="area"
                    v-model="editForm.areas.value"
                    @change="clearValdity('areas')"
                  />
                  <label class="form-check-label text-capitalize" :for="'area-' + area">{{ area }}</label>
                </div>
              </div>
              <p class="field-error" :class="{ visible: !editForm.areas.isValid }">Select at least one area of expertise</p>
            </div>

            <div class="field-wrap">
              <label class="form-label">Description<span class="text-danger">*</span></label>
              <textarea
                v-model="editForm.description.value"
                class="form-control"
                :class="{ invalid: !editForm.description.isValid }"
                rows="3"
                placeholder="Description"
                @blur="clearValdity('description')"
              ></textarea>
              <p class="field-error" :class="{ visible: !editForm.description.isValid }">Description should not be empty</p>
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-between">
            <button type="button" class="btn btn-sm btn-light" data-bs-dismiss="modal"><i class="bi bi-x-lg"></i> Cancel</button>
            <!-- <i class="bi bi-save-fill"></i> -->
            <button type="button" class="btn btn-sm btn-primary" @click="saveEdit"><i class="fa fa-floppy-disk me-1"></i>update Changes</button>
          </div>
        </div>
      </div>
    </div>

    <!-- modal delete -->
    <div class="modal fade" id="deleteConfirmModal" tabindex="-1" aria-hidden="true">
      <!-- <i class="bi bi-trash-fill me-2"></i> -->
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete Coach</h5>
            <button type="button" class="btn-close btn-close-light" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body text-center">
            <i class="bi bi-exclamation-triangle-fill text-secondary fs-1"></i>
            <p class="mt-2 mb-0">Are you sure you want to delete this coach?</p>
            <small class="text-muted">This action cannot be undone.</small>
          </div>
          <div class="modal-footer justify-content-center d-flex justify-content-between">
            <button type="button" class="btn btn-sm btn-light" data-bs-dismiss="modal"><i class="bi bi-x-lg"></i> Cancel</button>
            <!-- <i class="bi bi-trash-fill"></i> -->
            <button data-test="delete-btn" type="button" class="btn btn-sm btn-secondary" @click="confirmDelete">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CoachItem from '../../components/CoachItem.vue';
import BreadCrumb from '../../components/layout/BreadCrumb.vue';
import ThePagination from '../../components/ThePagination.vue';

export default {
  components: { CoachItem, ThePagination, BreadCrumb },
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      allAreas: ['frontend', 'backend', 'career', 'devops'],
      pendingDeleteId: null,
      editForm: {
        id: null, //  important for update
        firstName: {
          value: '',
          isValid: true,
        },
        lastName: {
          value: '',
          isValid: true,
        },
        areas: {
          value: [],
          isValid: true,
        },
        description: {
          value: '',
          isValid: true,
        },
        hourlyRate: {
          value: '',
          isValid: true,
        },
      },
      formIsValid: true,
    };
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters['coachMod/coaches'];
      const filter = this.$route.params.filter;
      if (!filter) return [];
      return coaches.filter((c) => c.areas?.includes(filter));
    },
    paginatedCoaches() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.filteredCoaches.slice(start, start + this.perPage);
    },
    totalPages() {
      return Math.ceil(this.filteredCoaches.length / this.perPage);
    },
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    previousPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    gotoPage(page) {
      this.currentPage = page;
    },
    /*  this.editForm = { ...coachData, areas: [...coachData.areas] }; */
    openEditModal(coachData) {
      this.editForm = {
        id: coachData.id,
        firstName: { value: coachData.firstName, isValid: true },
        lastName: { value: coachData.lastName, isValid: true },
        hourlyRate: { value: coachData.hourlyRate, isValid: true },
        areas: { value: [...coachData.areas], isValid: true },
        description: { value: coachData.description, isValid: true },
      };

      const modal = new window.bootstrap.Modal(document.getElementById('editCoachModal'));
      modal.show();
    },
    clearValdity(field) {
      this.editForm[field].isValid = true;
      this.formIsValid = true;
    },
    validateForm() {
      this.formsIsValid = true;
      if (this.editForm.firstName.value === '') {
        this.formIsValid = false;
        this.editForm.firstName.isValid = false;
      }
      if (this.editForm.lastName.value === '') {
        this.formIsValid = false;
        this.editForm.lastName.isValid = false;
      }
      if (this.editForm.description.value === '') {
        this.formIsValid = false;
        this.editForm.description.isValid = false;
      }
      if (!this.editForm.hourlyRate.value || this.editForm.hourlyRate.value < 0) {
        this.formIsValid = false;
        this.editForm.hourlyRate.isValid = false;
      }
      if (this.editForm.areas.value.length === 0) {
        this.formIsValid = false;
        this.editForm.areas.isValid = false;
      }
    },
    saveEdit() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      this.formIsValid = true;
      // this.$store.dispatch('coachMod/updateCoach', { ...this.editForm });
      this.$store.dispatch('coachMod/updateCoach', {
        id: this.editForm.id,
        firstName: this.editForm.firstName.value,
        lastName: this.editForm.lastName.value,
        hourlyRate: this.editForm.hourlyRate.value,
        areas: this.editForm.areas.value,
        description: this.editForm.description.value,
      });
      document.activeElement?.blur();
      const modal = window.bootstrap.Modal.getInstance(document.getElementById('editCoachModal'));
      modal.hide();
    },
    handleDelete(id) {
      this.pendingDeleteId = id;
      const modal = new window.bootstrap.Modal(document.getElementById('deleteConfirmModal'));
      modal.show();
    },

    confirmDelete() {
      if (this.pendingDeleteId) {
        this.$store.dispatch('coachMod/deleteCoach', this.pendingDeleteId);
        this.pendingDeleteId = null;
      }
      const modal = window.bootstrap.Modal.getInstance(document.getElementById('deleteConfirmModal'));
      modal.hide();
    },
  },
  watch: {
    '$route.params.filter'() {
      this.currentPage = 1;
    },
  },
};
</script>

<style>
/* Reserve fixed height for error line — no layout shift */
.field-wrap {
  position: relative;
}

.field-error {
  margin: 0;
  padding: 0;
  min-height: 1rem; /* always occupies this height whether visible or not */
  font-size: 0.75rem;
  color: #dc3545;
  visibility: hidden; /* hidden but still takes up the reserved space */
  line-height: 1rem;
}

.field-error.visible {
  visibility: visible; /* just reveal it — no height jump */
}
</style>
