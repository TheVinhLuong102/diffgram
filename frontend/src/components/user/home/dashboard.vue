<template>
  <div id="home" class="home-container">

    <div v-if="$store.state.user.logged_in == true">
      <div v-if="!$store.state.builder_or_trainer.mode">
        <v-card>

          <v-alert type="success"

          >
            Account created! Now enable the builder API
          </v-alert>

          <v-container>

            <v-layout>
              <v-flex xs12>

                <v-card>

                  <!-- TODO include more context, ie the project invited to etc. etc -->

                  <h1 class="black--text text--lighten-2 text-center pt-4">
                    Build on Diffgram
                  </h1>

                  <h2 class="blue--text text--lighten-1 text-center pa-2">
                    Bring your ideas to life.
                  </h2>

                  <div class="text-center pa-4">
                    <v-btn large
                           outlined
                           color="primary"
                           @click="route_builder_signup()">
                      Enable Builder API
                    </v-btn>
                  </div>

                </v-card>

              </v-flex>

            </v-layout>
          </v-container>


        </v-card>
      </div>

      <v-card
        v-if="!$store.state.project.current.project_string_id
              && $store.state.user.current.security_email_verified != true">
        <v-card-title>
          Please verify your email. Some actions may be restricted until verification.
        </v-card-title>

        <v_resend_verify_email class="pa-4">
        </v_resend_verify_email>

        <div class="pa-4"> </div>

      </v-card>


      <v-card v-if="$store.state.builder_or_trainer.mode == 'builder'
            && !$store.state.project.current.project_string_id">
        <v-btn large
               color="primary"
               @click="$router.push('/a/project/new')">
          New Project
        </v-btn>

        <v-btn large
               color="primary"
               @click="$router.push('/projects')">
          Change Project
        </v-btn>
      </v-card>

      <div v-if="$store.state.builder_or_trainer.mode == 'builder' &&
               $store.state.project.current.project_string_id">

        <h1 class="black--text text--lighten-2 text-center pa-4">
          {{$store.state.user.current.first_name}}, welcome back!
        </h1>

        <v-layout>
          <v-row>
            <v-col cols="3">
              <v-card>
                <v-card-title>Visit History:</v-card-title>
                <v-card-text>
                  <user_visit_history_list :project_string_id="project_string_id"></user_visit_history_list>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="9">

              <v-card >
                <v-card-title>Reports: </v-card-title>
                <!-- Note we assume default dashboard is ok here -->
                <report_dashboard
                  v-if="$store.state.builder_or_trainer.mode == 'builder'"
                  :report_dashboard_id="$store.state.project.current.default_report_dashboard_id"
                >
                </report_dashboard>

              </v-card>
            </v-col>

          </v-row>
        </v-layout>
        <div v-if="$store.state.builder_or_trainer.mode == 'builder'"
             class="text-center"
        >


        </div>
      </div>

      <div v-if="$store.state.user.current.is_super_admin == true">
        Project ID {{$store.state.project.current.id}}
      </div>
    </div>

    <div v-if="$store.state.user.logged_in != true">
      <v-container>

        <v-layout>
          <v-flex xs12>

            <v-card>

              <!-- TODO include more context, ie the project invited to etc. etc -->

              <h1 class="black--text text--lighten-2 text-center pt-4">
                Welcome to Diffgram!
              </h1>

              <h2 class="blue--text text--lighten-1 text-center pa-2">
                Please login to start:
              </h2>

              <div class="text-center pa-4">
                <v-btn large
                       outlined
                       color="primary"
                       @click="route_login">
                  Login
                </v-btn>
              </div>

            </v-card>

          </v-flex>

        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">

import axios from 'axios';
import report_dashboard from '../../report/report_dashboard'
import user_visit_history_list from '../../event/user_visit_history_list.vue'
import project_pipeline from '../../project/project_pipeline'

import Vue from "vue";

export default Vue.extend( {
  name: 'user_dashboard',
  components: {
    report_dashboard,
    user_visit_history_list,
    project_pipeline,

  },
  data () {
    return {


    }
  },
  created() {

  },
  mounted() {

  },
  computed: {
    project_string_id: function(){
      return this.$store.state.project.current.project_string_id;
    }
  },
  methods: {
    route_trainer_signup: function () {
      this.$router.push('/user/trainer/signup')
    },
    route_login: function () {
      this.$router.push('/user/login')
    },
    route_builder_signup: function () {
      this.$router.push('/user/builder/signup')
    }
  }
}
) </script>
<style scoped>
  .home-container{
    padding: 0 10rem;
  }
</style>

