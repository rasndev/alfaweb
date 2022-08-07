<template>
<v-container>
  <v-dialog
      v-model="dialog"
      width="500"
      persistent
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on" 
        >
          Agregar curso
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Agregando curso
        </v-card-title>
          <v-card-text>
            <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            >
            <v-text-field
              v-model="nombre"
              :counter="40"
              :rules="nombreRules"
              label="Nombre"
              required
            ></v-text-field>

            <v-text-field
              v-model="imgUrl"
              :rules="imgUrlRules"
              label="URL de la imagen del curso"
              required
            ></v-text-field>

            <v-row >
              <v-col cols="3">
                <v-text-field
                  v-model="cupos"
                  type="number"
                  :rules="cuposRules"
                  label="Cupos "
                  @change="soloNum"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="inscritos"
                  type="number"
                  :rules="inscritosRules"
                  label="Inscritos"
                  @change="soloNum"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="duracionCantidad"
                  type="number"
                  :rules="duracionRules"
                  label="Duración"
                  @change="soloNum"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="duracionUnidad"
                  :items="items"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="costo"
                  :rules="costoRules"
                  label="Costo del curso"
                  @keypress="soloNum"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="codigo"
                  :rules="codigoRules"
                  label="Código del curso"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-textarea
              v-model="desc"
              :rules="descRules"
              label="Descripción del curso"
              required
            ></v-textarea>

            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click.prevent="validar"
            >
            AGREGAR
            </v-btn>

            <v-btn
              color="error"
              class="mr-4"
              @click="cancelar"
            >
              Cancelar
            </v-btn>

          </v-form>
        </v-card-text>
        <v-card-actions>

        </v-card-actions>
      </v-card>

    </v-dialog>
</v-container>
</template>

<script>
/**
* Para que se haga modular, este componente debe $emit un objeto que será tratado por el componente hijo
*/
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig'

export default {
  data () {
    return {
      
      items:["días", "semanas", "meses", "años"],
      dialog: false,
      valid: true,
      nombre: '',
      nombreRules: [
        v => !!v || 'Se requiere un nombre',
        v => (v && v.length >= 10) || 'El nombre debe contener un mínimo de 10 caracteres',
      ],
      imgUrl: '',
      imgUrlRules: [
        v => !!v || 'Se requiere un enlace',
        v => !/.*\s.*/.test(v) || 'Enlace no es válido',
      ],
      cupos: '',
      cuposRules: [
        v => !!v || 'Favor indicar cantidad de cupos',
        v => v > 0 || 'Cantidad no es válida',
        v => /\d/.test(v) || 'Cantidad no es válida',
      ],
      inscritos:'',
      inscritosRules:[
        v => !!v || 'Favor indicar cantidad de inscritos',
        v => v > 0 || 'Cantidad no es válida',
        v => (!!v && this.cuposInscritos()) || 'Cupos insuficientes',
      ],
      duracionCantidad:'',
      duracionRules:[
        v => !!v || 'Favor indicar duración',
        v => v > 0 || 'Favor indicar duración',
      ],
      duracionUnidad:'',
      duracionUnidadRules:[
        v => !!v || 'Favor indicar dato',
      ],
      costo:'',
      costoRules:[
        v => !!v || 'Favor indicar costo',
      ],
      codigo: '',
      codigoRules: [
        v => !!v || 'Favor indicar código de curso',
      ],
      desc:'',
      descRules:[
        v => !!v || 'Favor describir curso',
      ],
      
    }
  },
  methods: {
    cuposInscritos(){
      return this.inscritos <= this.cupos
    },  
    validar () {
      if (!this.$refs.form.validate()) {
        return
      }
      this.agregaCurso();
      this.dialog = false
      this.reset();
    },
    cancelar() {
      this.$refs.form.resetValidation();
      this.reset();
      this.dialog = false
    },
    reset() {
      this.$refs.form.reset()
    },
    soloNum: ($event) => {
      if ($event.charCode === 0 || /\d/.test(String.fromCharCode($event.charCode))) {
          console.log($event.charCode);
          return true
      } else {
          $event.prevent();
      }
    },
    // metodo para crear string de "duracion"
    concatDuracion(){
      return this.duracionCantidad == 1 && this.duracionUnidad === "meses" 
             ? [this.duracionCantidad, 'mes'].join(' ') 
             : [this.duracionCantidad, this.duracionUnidad].join(' ') 
    },
    //metodo para agregar registro de nuevoCurso a firebase. coleccion "cursos"
    async agregaCurso(){ 
      const nuevoCurso =  
      {
        nombre: this.nombre, 
        urlImg: this.imgUrl,
        cupos: this.cupos,
        inscritos: this.inscritos,
        duracion: this.concatDuracion(),
        costo: this.costo,
        codigo: this.codigo,
        descripcion: this.desc,
        fechaReg: serverTimestamp()
      }
      try {
        await addDoc(collection(db, "cursos"), nuevoCurso);
      } catch (error) {
        console.log(error);
      }
    }
  },
}
</script>

<style scoped>
  
</style>