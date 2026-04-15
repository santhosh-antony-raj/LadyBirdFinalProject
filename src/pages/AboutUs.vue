<template>
  <div class="container-fluid">
    <div>
      <div class="d-flex justify-content-between">
        <h5 class="mt-2">About Us</h5>
        <bread-crumb></bread-crumb>
      </div>
    </div>
    <div>
      <div class="row d-flex justify-content-center">
        <div class="col-12 col-md-12 col-sm-8">
          <div class="card mb-4">
            <!--begin::Header-->
            <div class="card-header">
              <div class="card-title">FindCoach Why?</div>
            </div>
            <!--end::Header-->
            <!--begin::Body-->
            <div class="card-body">
              <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                      what problem does find a coach solve?
                    </button>
                  </h2>
                  <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample" style="">
                    <div class="accordion-body">
                      Finding the right coach is overwhelming — most people don't know where to start, and generic search results return hundreds of unvetted options. Find a Coach solves this by
                      matching you with coaches who are aligned to your specific goals, availability, and budget — cutting out the guesswork so you can start making progress faster.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      How is this different from just googling a coach?
                    </button>
                  </h2>
                  <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      A Google search gives you a long list — no context, no fit, no trust signals. Find a Coach uses a structured matching process that factors in your coaching category (career,
                      fitness, mindset, etc.), your preferred style, and your schedule. Every coach on the platform has a verified profile, ratings, and session history — so you can book with
                      confidence, not just hope.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      Who is this built for?
                    </button>
                  </h2>
                  <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      Find a Coach is built for anyone who knows they want support but doesn't know where to turn — whether you're a professional looking for a career mentor, someone working on
                      personal growth, or an athlete wanting structured training guidance. If you've ever thought "I wish I had someone to help me through this," this platform is for you.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--end::Body-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from '../components/layout/BreadCrumb.vue';

export default {
  components: {
    BreadCrumb,
  },
};
</script>
