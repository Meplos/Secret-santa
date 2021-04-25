<template>
  <div class="createAccount">
    <v-row justify="center">
      <v-spacer></v-spacer>
      <div class="secondary login__container">
        <h2 class="login__title"><v-icon large>mdi-account</v-icon>Log in</h2>
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
              :rules="[rules.required, rules.min]"
              :type="showPassword ? 'text' : 'password'"
              name="input-10-1"
              counter
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
  name: "CreateAccount",
  data: () => ({
    email: "",
    firstname: "",
    birthdate: "",
    password: "",
    confirmPassword: "",

    rules: {
      required: (value) => !!value || "required",
      min: (v) => v.length >= 8 || "Min 8 charaters",
      emailMatch: (value) =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        ) || "Email is invalid",
    },
  }),
};
</script>

<style>
</style>