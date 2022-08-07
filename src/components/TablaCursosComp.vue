<template>
<div>
  <v-data-table
    :headers="headers"
    :items="cursos"
    class="elevation-1"
  >
    <template v-slot:top>
      
      <v-toolbar flat>
        <v-dialog v-model="dialogEdit" width="700" persistent>
          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              Editar curso
            </v-card-title>
            <v-card-text>
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                >
                  <v-text-field
                    v-model="editedItem.nombre"
                    label="Nombre de curso" lazy-validation
                    :rules="nombreRules"
                    required
                  ></v-text-field>
                  
                  <v-text-field
                    v-model="editedItem.urlImg"
                    label="URL de imagen"
                    :rules="imgUrlRules"
                    required
                  ></v-text-field>

                    <v-row>
                      <v-col cols="3">
                        <v-text-field
                          v-model="editedItem.cupos"
                          label="Cupos"
                          :rules="cuposRules"
                          @change="soloNum"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="3">
                        <v-text-field
                          v-model="editedItem.inscritos"
                          label="Inscritos"
                          :rules="inscritosRules"
                          @change="soloNum"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="3">
                        <v-text-field
                          v-model="editedItem.duracionCantidad"
                          label="Duración"
                          :rules="inscritosRules"
                          @change="soloNum"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="3">
                        <v-select
                          v-model="editedItem.duracionUnidad"
                          :items="items"
                          required
                        ></v-select>
                      </v-col>
                    </v-row>

                  <v-text-field
                    v-model="editedItem.costo"
                    label="Costo"
                    :rules="costoRules"
                    @change="soloNum"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="editedItem.codigo"
                    label="Código"
                    :rules="codigoRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="editedItem.terminado"
                    label="Terminado"
                  ></v-text-field>
                  <v-textarea
                    v-model="editedItem.desc"
                    label="Descripción"
                    :rules="descRules"
                    required
                  ></v-textarea>
                </v-form>
            <v-card-actions>
            <v-spacer></v-spacer>
              <v-btn
                :disabled="!valid"
                color="error"
                dark
                @click.prevent="close"
              >
                Cancel
              </v-btn>
              <!-- cambiar metodo a "@actualizar" -->
              <v-btn
                color="success"
                dark
                @click="save"  
              >
                Save
              </v-btn>
            </v-card-actions>
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">¿Seguro que deseas eliminar este curso?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'component-name',
  data: function(){
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
      dialogEdit: false,
      editedItem: {
        nombre: '',
        cupos: 0,
        inscritos: 0,
        duracion: 0,
        costo: 0,
        fechaReg: "",
      },
      headers:[
        { text: 'Curso',value: 'nombre', sortable: false, },
        { text: 'Cupos', value: 'cupos' },
        { text: 'Inscritos', value: 'inscritos' },
        { text: 'Duración', value: "duracion"},
        { text: 'Costo', value: 'costo' },
        { text: 'Terminado', value: '' },
        { text: 'Fecha', value: 'fechaReg' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      dialogDelete: false,
    }
  },
  computed: {
    ...mapState(["cursos"]),
  },
  methods: {
    cuposInscritos(){
      return this.inscritos <= this.cupos
    },  
    editItem (item) {
      let editDoc = item.codigo;
      console.log(editDoc);
      this.editedItem = Object.assign({}, item)
      console.log(this.editedItem);
      this.dialogEdit = true
    },

    deleteItem (item) {
      console.log("delete");
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialogEdit = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
    soloNum: ($event) => {
      if ($event.charCode === 0 || /\d/.test(String.fromCharCode($event.charCode))) {
          console.log($event.charCode);
          return true
      } else {
          $event.preventDefault();
      }
    },
  },
  watch: {
    dialogEdit (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
}
</script>

<style scoped>
  
</style>