<template>
  <div class="login">
    <h1 class="login__title"> 🎅 {{ $appName }}</h1>
    <v-container class="" color="primary">
      <h2 class="login__title"><v-icon>mdi-account</v-icon>Log in</h2>
      <v-form>
        <v-row justify="center">
          <v-spacer></v-spacer>
          <v-col cols="md-4">
            <v-text-field
              label="Email"
              v-model="email"
              :rules="[rules.emailMatch]"
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>  
          <v-col cols="md-4">
            <v-text-field
              label="Password"
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="showPassword ? 'text' : 'password'"
              name="input-10-1"
              counter
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-btn  class="submit" color="success" @click="submit($event)" dark>Log in</v-btn>
          <v-spacer></v-spacer>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    showPassword: false,
    email: "",
    password: "",
    rules: {
      required: (value) => !!value || "required",
      min: (v) => v.length >= 8 || "Min 8 charaters",
      emailMatch: (value) =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        ) || "Email is invalid",
    },
  }),

  methods: {
    submit: function(evt) {
      evt.preventDefault();
      const data = {
        email: this.email, 
        passwd: this.passwd, 
      }
      this.commit("WEB_CONNEXION", data);
    }
  }
};
</script>

<style scoped>
.container {
  width: 50% !important;
  justify-content: center !important;
  background: #cecece;
  border-radius: 30px;
}

.submit {
  margin-bottom: 15px;
}

.login__title {
  padding: 15px;
}

</style>