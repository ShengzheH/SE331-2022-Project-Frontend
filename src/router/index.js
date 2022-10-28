import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import PatientDetailView from '../views/PatientDetailView.vue'
import PatientVaccineDetailView from '../views/PatientVaccineDetailView'
import VaccineDetailView from '../views/VaccineDetailView.vue'
import LayoutView from '../views/LayoutView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import NetWorkErrorView from '../views/NetworkErrorView.vue'
import PatientService from '../services/PatientService.js'
import DoctorLayoutView from '@/views/DoctorLayoutView'
import DoctorCommentView from '@/views/DoctorCommentView'
import DoctorPatientView from '@/views/DoctorPatientView'
import DoctorPatientDetailView from '@/views/DoctorPatientDetailView'
import DoctorDetailView from '@/views/DoctorDetailView'
import NProgress from 'nprogress'
import GStore from '@/store'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    props: (route) => ({
      page: parseInt(route.query.page) || 1
    })
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/patient/:id',
    name: 'Layout',
    component: LayoutView,
    props: true,
    beforeEnter: (to) => {
      return PatientService.getPeople(to.params.id)
        .then((response) => {
          GStore.patient = response.data
        })
        .catch((error) => {
          if (error.response && error.response.status == 404) {
            this.$router.push({
              name: '404Resource',
              params: { resoutce: 'patient' }
            })
          } else {
            this.$router.push({ name: 'NetworkError' })
          }
        })
    },
    children: [
      {
        path: '',
        name: 'PatientDetail',
        component: PatientDetailView,
        props: true
      },
      {
        path: '',
        name: 'PatientVaccineDetail',
        component: PatientVaccineDetailView,
        props: true
      }
    ]
  },
  {
    path: '/DoctorLayout/:id',
    name: 'DoctorLayoutView',
    component: DoctorLayoutView,
    props: true,
    beforeEnter: (to) => {
      return PatientService.getPeople(to.params.id)
        .then((response) => {
          GStore.patient = response.data
        })
        .catch((error) => {
          if (error.response && error.response.status == 404) {
            this.$router.push({
              name: '404Resource',
              params: { resoutce: 'patient' }
            })
          } else {
            this.$router.push({ name: 'NetworkError' })
          }
        })
    },
    children: [
      {
        path: '/DoctorPatientDetai',
        name: 'DoctorPatientDetailView',
        component: DoctorPatientDetailView,
        props: true
      },
      {
        path: '/DoctorComment',
        name: 'DoctorCommentView',
        component: DoctorCommentView,
        props: true
      }
    ]
  },
  {
    path: '/VaccineDetail',
    name: 'VaccineDetail',
    component: VaccineDetailView,
    props: true
  },
  {
    path: '/',
    name: 'DoctorDetailView',
    component: DoctorDetailView,
    props: true
  },
  {
    path: '/DoctorPatient',
    name: 'DoctorPatientView',
    component: DoctorPatientView,
    props: true
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFoundView
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFoundView,
    props: true
  },
  {
    path: '/network-error',
    name: 'NetworkEorror',
    component: NetWorkErrorView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
router.beforeEach(() => {
  NProgress.start
  NProgress.set(0.4)
})
router.afterEach(() => {
  NProgress.done()
})

export default router
