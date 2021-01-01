<template>
    <div class="bg-black ml-56 flex-1 text-white pt-10 px-10" style="font-family: 'Poppins', sans-serif;">
      <h1 class="mb-12">Add Account</h1>
      <button class="text-white bg-blue px-4 py-2 rounded-lg mb-5" @click="$router.go(-1)">Back</button>

      <section  class="flex flex-wrap">
          <div v-if="url === 'fb'">
              <img src="../assets/facebook.png" alt="image" class="rounded-full w-40">
          </div>
          <div v-else-if="url === 'twitter'">
              <img src="../assets/twitter.png" alt="image" class="rounded-full w-40">
          </div>
          <div v-else-if="url === 'lnk'">
              <img src="../assets/linkedin.png" alt="image" class="rounded-full w-40">
          </div>
          <div v-else>

          </div>
        <div class="w-1/2 mx-auto">
        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
              <li v-for="error in errors" :key="error"> {{ error }}</li>
            </ul>
         </p>
            <form
             novalidate="true"
            >
                    <div class="relative w-full mb-3">
                      <label 
                      class="block uppercase text-gray-700 text-xs font-bold mb-2 pt-2" 
                      for="name">Email/Username</label>
                        <input type="email"
                         class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                         placeholder="Email" style="transition: all 0.15s ease 0s;"
                        v-model="email"
                         required
                        />
                    </div>
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="name"
                        >Save as (Display name)</label
                      ><input
                        type="text"
                        class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                        placeholder="enter name to be saved"
                        style="transition: all 0.15s ease 0s;"
                        v-model="saved"
                        required
                        name="name"
                        id="name"
                      />
                    </div>
                    <div class="text-center mt-6">
                           <button 
                             @click.prevent="addUser" 
                             style="transition: all 0.15s ease 0s;"
                             class="ml-4 px-4 py-2 text-gray-800 font-semibold bg-white hover:bg-gray-100 border rounded focus:outline-none focus:shadow-outline active:bg-gray-700">
                           Add Account
                         </button>
                    </div>
             </form>
        </div> 
      </section>
    </div>
</template>

<script>
import db from "../db";
export default {
  props: ["title", "url"],
  data: () => ({
    email: "",
    saved: "",
    usersData: [],
    errors: []
  }),
  async mounted() {
    this.usersData = await db.users.find();
  },
  methods: {
    async addUser() {
      if (this.email && this.saved) {
        await db.users.insert({
          name: this.email,
          saved: this.saved,
          site: this.url
        });
        setTimeout(() => {
          this.$alert("Account has been added");
        }, 500);
      }
      this.errors = [];
      if (!this.email) {
        this.errors.push("Email/Username required");
      }
      if (!this.saved) {
        this.errors.push("Display Name required.");
      }
      (this.email = ""), (this.saved = "");
    }
  }
};
</script>
