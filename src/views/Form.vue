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
          <div v-else-if="url === 'instagram'">
              <img src="../assets/instagram.png" alt="image" class="rounded-full w-40">
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
                <Modal :open="open" @close="open = false" class="flex items-center justify-center z-40 mt-8" >
                    <div class="max-w-lg w-full rounded-lg shadow-2xl px-6 py-6 z-40 bg-blue-darker">
                        <p v-if="errors.length">
                        <ul>
                            <li v-for="error in errors" :key="error" class="pb-2">{{ error }}</li>
                        </ul>
                        </p>
                        <form>
                  <input type="text"
                          autofocus
                          placeholder="Business Name"
                          id="text-box"
                          rows="6"
                          cols="32"
                          v-model="profileName"
                          class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full resize-none border rounded-md" required></input>
                            <div class="mt-6">
                                <button   @click.prevent="addProfile" class="ml-4 px-4 py-2 text-gray-800 font-semibold bg-white hover:bg-gray-100 border rounded focus:outline-none focus:shadow-outline">
                                    Add Note
                                </button>
                                <button @click="open = false" class="ml-4 px-4 py-2 text-gray-800 font-semibold bg-white hover:bg-gray-100 border rounded focus:outline-none focus:shadow-outline">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
                <div class="border p-3">
                    <select class="w-full px-3 py-3" v-model="selectedProfile">
                        <option disabled value="">Please select one</option>
                        <option v-for="profile in profiles" v-bind:value="profile._id" v-bind:key="profile._id">{{ profile.profileName }}</option>
                    </select>
                    <button @click="open = true" class="bg-white text-blue mx-auto p-2 rounded mt-4">New Profile</button>
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
import Modal from "../components/modal";
export default {
  components: {
    Modal
  },
  props: ["title", "url"],
  data: () => ({
    email: "",
    saved: "",
    profile: [],
    profileName: null,
    profiles: [],
    selectedProfile: "",
    usersData: [],
    open: false,
    errors: []
  }),
  async mounted() {
    this.usersData = await db.users.find();
    this.profiles = await db.profiles.find();
    console.log(JSON.stringify(this.profiles));
  },
  watch: {
    selectedProfile: function(value) {
      //alert(value);
    }
  },
  methods: {
    async addUser() {
      if (this.email && this.saved && this.selectedProfile) {
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
      if (!this.selectedProfile) {
        this.errors.push("Business Name required.");
      }

      await db.profiles.update(
        { _id: this.selectedProfile },
        {
          $push: {
            accounts: { name: this.email, saved: this.saved, site: this.url }
          }
        }
      );

      if (this.errors.length === 0) {
        (this.email = ""), (this.saved = "");
      }
    },

    async addProfile() {
      const profile = await db.profiles.insert({
        profileName: this.profileName
      });
      this.open = false;
      if (profile.profileName !== "") {
        this.profiles.splice(0, 0, profile);
      }
    }
  }
};
</script>
<style scoped>
.close {
  text-align: center;
  height: 10px;
  width: 10px;
  position: relative;
  box-sizing: border-box;
  line-height: 10px;
  display: inline-block;
}
.close:before,
.close:after {
  transform: rotate(-45deg);
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -1px;
  margin-left: -5px;
  display: block;
  height: 2px;
  width: 10px;
  background-color: black;
  transition: all 0.25s ease-out;
}
.close:after {
  transform: rotate(-135deg);
}
.close:hover:before,
.close:hover:after {
  transform: rotate(0deg);
}
</style>
