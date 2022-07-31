import { db } from '@/firebase/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cursos:[]
  },
  getters: {
  },
  mutations: {
    ADD_CURSO(state, curso){
      state.cursos.push({
        id: curso.id,
        nombre: curso.data().nombre,
        cupos: curso.data().cupos,
        inscritos: curso.data().inscritos,
        duracion: curso.data().duracion, //TODO: pasar a date
        costo: curso.data().costo,
        terminado: curso.data().terminado,
        fechaInicio: curso.data().inicio,
        descripcion: curso.data().descripcion
      })
    }
  },
  actions: {
    async addCurso({commit}){
      let querySnapShot = await getDocs(collection(db, 'cursos'));
      querySnapShot.forEach(curso =>{
        commit('ADD_CURSO', curso)
      })
    }
  },
  modules: {
  }
})
