<template>
  <div class="background">
    <div width="1600" class="mytable">
      <table>
        <tr align="center">
          <th class="id_center">Id</th>
          <th width="300">Name</th>
          <th width="200">Vaccined_status</th>
          <th width="350">Firstdose_name</th>
          <th width="150">Firstdose_time</th>
          <th width="350">Seconddose_name</th>
          <th width="150">Deconddose_time</th>
          <th width="300">Update</th>
        </tr>
      </table>
    </div>
    <br />
    <VaccineItem
      v-for="vaccine in vaccines"
      :key="vaccine.id"
      :vaccine="vaccine"
    ></VaccineItem>
  </div>
</template>

<script>
// @ is an alias to /src
import VaccineItem from '@/components/VaccineItem.vue'
import VaccineService from '@/services/VaccineService.js'
import { watchEffect } from '@vue/runtime-core'
export default {
  name: 'HomeView',
  components: {
    VaccineItem
  },
  data() {
    return {
      vaccines: [],
      first_dose: 0,
      second_dose: 0,
      length: 0
    }
  },
  created() {
    watchEffect(() => {
      VaccineService.getTotalVaccines().then((response) => {
        this.vaccines = response.data
      })
    })
  },
  method: {
    click() {
      this.$router.push({
        name: 'PatientDetail',
        params: { id: this.vaccine.patient.id }
      })
    }
  }
}
</script>
<style scoped>
.home-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.mytable {
  margin: 0, auto;
  display: flex;
  text-align: center;
}
.id_center {
  padding-left: 150px;
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
