<template>
  <div class="background">
    <div class="home">
      <h1>Doctor {{ doctor.name }} {{ doctor.sur_name }}'s patients</h1>
      <div class="home-list">
        <ListItem
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
import ListItem from '@/components/ListItem.vue'
import DoctorService from '@/services/DoctorService'
export default {
  name: 'DoctorPatient',
  props: ['id'],
  inject: ['GStore'],
  components: {
    ListItem
  },
  data() {
    return {
      patients: null,
      doctor: null
    }
  },
  created: function () {
    // console.log(this.id, this.GStore)
    DoctorService.getDoctor(this.GStore.doctor.id).then((response) => {
      this.doctor = response.data
      this.patients = response.data.patients
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
