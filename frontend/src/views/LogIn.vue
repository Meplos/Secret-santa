<template>
  <div class="login">
    <v-row justify="center">
      <v-spacer></v-spacer>
      <div class="secondary login__container">
        <h2 class="login__title"><v-icon large class="mr-2" color="#000000">fas fa-user</v-icon>Log in</h2>
        <v-form ref="loginForm" class="login__form">  
          <v-col cols="sm-12  ">
            
            <v-text-field
              label="Email"
              v-model="email"
              :rules="[rules.emailMatch]"
            ></v-text-field>

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
            
            <v-btn class="submit" color="primary" @click="submit($event)">
              Log in
            </v-btn>
          </v-col>
        </v-form>
      </div>
      <v-spacer></v-spacer>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Login',
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
    submit: function (evt) {
      evt.preventDefault();
      if(!this.$refs.loginForm.validate()) return;
      const data = {
        email: this.email,
        passwd: this.passwd,
      };
      this.$store.commit("WEB_CONNEXION", data);
    },
  },
};
</script>

<style scoped>

.login {
  margin-top: 40px ;
}
.login__container {
  width: 50% !important;
  justify-content: center !important;
  border-radius: 30px;
  align-content: center !important;
}

.submit {
  margin-bottom: 15px;
}

.login__title {
  padding: 15px;
  font-size: 26pt;
}

.login__form {
  margin: 0px 50px 0px  50px;
}
</style>