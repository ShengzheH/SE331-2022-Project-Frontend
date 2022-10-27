<template>
  <div class="background">
    <div class="home">
      <h1>People who have been vaccinated with the defferent doses</h1>
      <h2>
        Number of people vaccinated with first dose vaccine :
        {{ this.first_dose }}
      </h2>
      <div class="home-list">
        <FirstDose
          v-for="patient in patients"
          :key="patient.id"
          :patient="patient"
        />
      </div>
      <h2>
        Number of patient vaccinated with second dose vaccine :
        {{ this.second_dose }}
      </h2>
      <div class="home-list">
        <SecondDose
          v-for="patient in patients"
          :key="patient.id"
          :patient="patient"
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import FirstDose from '@/components/FirstDose.vue'
import SecondDose from '@/components/SecondDose.vue'
import PatientService from '@/services/PatientService.js'
import { watchEffect } from '@vue/runtime-core'
export default {
  name: 'HomeView',
  components: {
    FirstDose,
    SecondDose
  },
  data() {
    return {
      patients: null,
      first_dose: 0,
      second_dose: 0,
      length: 0
    }
  },
  created() {
    watchEffect(() => {
      PatientService.getTotalPeoples().then((response) => {
        this.patients = response.data
        for (let i = 0; i < this.patients.length; i++) {
          if (this.patients[i].First_dose == true) {
            this.first_dose = this.first_dose + 1
          }
          if (this.patients[i].Second_dose == true) {
            this.second_dose = this.second_dose + 1
          }
        }
      })
    })
  }
}
</script>
<style scoped>
.home-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
  margin-right: 100px;
  padding-bottom: 100px;
}

#page-next {
  text-align: right;
  margin-left: 100px;
  padding-bottom: 100px;
}
</style>
