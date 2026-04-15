<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-between">
      <h5 class="mt-2">Coach Message</h5>
      <bread-crumb></bread-crumb>
    </div>
    <div>
      <div class="row">
        <div class="col-12 col-md-12">
          <div class="timeline">
            <!-- ✓ Loop over all messages -->
            <template v-if="coachMessage">
              <template v-for="message in coachMessage" :key="message.id">
                <!-- <div class="time-label">
                <span class="text-bg-danger">{{ message.id }}</span>
              </div> -->

                <div>
                  <i class="timeline-icon bi bi-envelope text-bg-primary"></i>
                  <div class="timeline-item">
                    <span class="time"> <i class="bi bi-clock-fill"></i> just now </span>
                    <h3 class="timeline-header fs-6">
                      <a href="#">{{ message.email }}</a> sent you an email
                    </h3>
                    <div class="timeline-body">
                      {{ message.msg }}
                    </div>
                    <div class="timeline-footer">
                      <a class="btn btn-danger btn-sm fs-6" @click="msgDelete(message.id)">Delete</a>
                    </div>
                  </div>
                </div>
              </template>
            </template>

            <!-- show when no messages -->
            <div v-else class="text-center mt-3">
              <p>No messages yet</p>
            </div>

            <div>
              <i class="timeline-icon bi bi-clock-fill text-bg-secondary"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from '../../components/layout/BreadCrumb.vue';

export default {
  components: {
    BreadCrumb,
  },
  computed: {
    coachMessage() {
      return this.$store.getters['contactMod/getMsg'];
    },
  },
  methods: {
    msgDelete(id) {
      this.$store.dispatch('contactMod/delMsg', id);
    },
  },
};
</script>
