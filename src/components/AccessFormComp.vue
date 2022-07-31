<template>
<v-container>
  <v-row>
    <v-col>
      <h1>{{$route.name == 'acceso' ? 'Login usuario' : 'Registrar usuario'}}</h1>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
       <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
  
      <v-text-field
        v-model="psw"
        :counter="20"
        :rules="pswRules"
        label="Passwor"
        required
      ></v-text-field>
  
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
      >
        Iniciar
      </v-btn>
    </v-form>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {
    data: () => ({
      valid: true,
      
      email: '',
      emailRules: [
        v => !!v || 'Se requiere una cuenta de correo',
        v => /.+@.+\..+/.test(v) || 'Cuenta de correo no es válida',
      ],
      psw: '',
      pswRules: [
        v => !!v || 'Se requiere una contraseña',
        v => (v && v.length <= 10) || 'La contraseña no cumple con los requisitos',
      ],
    }),
  
    methods: {
      validate () {
        if (this.$refs.form.validate() && this.$route.name == 'acceso') {
          this.$router.push('/')
        }
        else if (this.$refs.form.validate() && this.$route.name == 'registro') {
          this.$router.push('/')
        }
        
      },
    },
    
}
</script>

<style scoped>
  
</style>