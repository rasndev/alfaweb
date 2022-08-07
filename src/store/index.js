import { db } from '@/firebase/firebaseConfig'
import { onSnapshot, query, orderBy, collection } from 'firebase/firestore'
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
      state.cursos.push(curso)  
    },
    RESET_CURSO(state){
      state.cursos = [];
    }
  },
  actions: {
    async addCurso({commit}){
      const q = query(collection(db, "cursos"), orderBy("fechaReg"));
      onSnapshot(q, (querySnapshot) => {
        commit('RESET_CURSO');
        querySnapshot.forEach((doc)=>{
          let nuevaFecha = new Intl.DateTimeFormat('es-CL').format(doc.data().fechaReg.toDate());
          let nuevoPrecio = "$" + (new Intl.NumberFormat({currency: 'EUR'}).format(doc.data().costo)).toString();
          let nuevoCurso = {
            codigo: doc.data().codigo,
            urlImg: doc.data().urlImg,
            nombre: doc.data().nombre,
            cupos: doc.data().cupos,
            inscritos: doc.data().inscritos,
            duracion: doc.data().duracion,
            costo: nuevoPrecio,
            terminado: doc.data().terminado,
            fechaReg: nuevaFecha,
          }
          doc.fechaReg = nuevaFecha;

          commit('ADD_CURSO', nuevoCurso) 
        })
      })
    }
  },
  modules: {
  }
})
