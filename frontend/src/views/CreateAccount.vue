<template>
  <div class="signup">
    <v-row justify="center">
      <v-spacer></v-spacer>
      <div class="secondary signup__container">
        <h2 class="signup__title">
          <v-icon large>mdi-account</v-icon>{{ $t("signup") }}
        </h2>
        <v-form ref="signupForm" class="signup__form">
          <v-row>
            <v-col md6 xl6>
              <v-text-field
                label="Firstname"
                v-model="firstname"
                :rules="[rules.required]"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md4>
              <v-text-field
                label="Email"
                v-model="email"
                :rules="[rules.emailMatch]"
              ></v-text-field>
              <v-text-field
                md4
                label="Password"
                v-model="password"
                :rules="[rules.required, rules.min]"
                :type="showPassword ? 'text' : 'password'"
                name="input-10-1"
                counter
              ></v-text-field>
            </v-col>
          </v-row>

          <v-btn class="submit" color="primary" @click="submit($event)">
            Log in
          </v-btn>
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
    showPassword: false,
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
.signup {
  margin-top: 40px;
}
.signup__container {
  width: 50% !important;
  justify-content: center !important;
  border-radius: 30px;
  align-content: center !important;
}

.submit {
  margin-bottom: 15px;
}

.signup__title {
  padding: 15px;
  font-size: 26pt;
}

.signup__form {
  margin: 0px 50px 0px 50px;
}
</style>
