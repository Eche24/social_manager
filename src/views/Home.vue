<template>
  <div class="bg-black text-white flex-1 ml-56" style="font-family: 'Poppins', sans-serif;">
    <!-- <transition name="animation" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster"> -->
      <div v-if="titleBarVisible" class="text-white bg-grey-darkest border-b border-grey p-3 text-center fixed z-10 w-full pr-56">
        Social Manager
      </div>
    <!-- </transition> -->
       <h1 class="text-center pt-4 pb-4 font-normal" style="font-family: 'Poppins', sans-serif;"> Add Social Account </h1>
       <div class="border-b border-grey-darker mb-10 mx-10"></div>
    <div class="flex mb-10 px-10">
      <div class="w-1/2 mr-4 bg-grey-darkest rounded-lg flex px-8 py-6" >
        <div class="flex-1">
           <div class="text-center">
          <img src="../assets/facebook.png" alt="image" class="rounded-full w-40">
        </div>
          <!-- <h1 class="font-normal text-2xl mb-4">Facebook</h1> -->
          <p class="text-grey-light text-xl leading-normal mb-4">Add your facebook account</p>
           <div class="text-center">
              <button @click="form('form', 'fb')" class="bg-white text-blue active:bg-pink-600 font-bold  text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease" v-on:click="toggleModal()">
                  Add Account
              </button>
            </div>
        </div>
       
      </div>

      <div class="w-1/2  bg-grey-darkest rounded-lg px-8 py-6" >
      <div class="flex-1">
       <div class="text-center">
          <img src="../assets/twitter.png" alt="image" class="rounded-full w-40">
        </div>
        <!-- <h1 class="font-normal text-2xl mb-4" >Twitter</h1> -->
      <p class="text-grey-light text-xl leading-normal mb-4">Add your twitter account</p>
      <div class="text-center">
       <button 
       @click="form('form', 'twitter')" class="bg-white text-blue active:bg-pink-600 font-bold  text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease" v-on:click="toggleModal()">
      Add Account
    </button>
       </div>
      </div>
      </div>

      <div class="w-1/2 ml-4 bg-grey-darkest rounded-lg px-8 py-6">
      <div class="flex-1">
       <div class="text-center">
          <img src="../assets/linkedin.png" alt="image" class="rounded-full w-40">
        </div>
        <!-- <h1 class="font-normal text-2xl mb-4" >Linkedin</h1> -->
        <p class="text-grey-light text-xl leading-normal mb-4">Add your linkedin account</p>
        <div class="text-center">
      <button 
      @click="form('Linkedin', 'lnk')" class="bg-white text-blue active:bg-pink-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease" v-on:click="toggleModal()">
      Add Account
    </button>
      </div>
      </div>
      </div>
    </div>
    <div class="border-b border-grey-darker mb-10 mx-10"></div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {};
  },
  methods: {
    toggleTitleBar() {
      // console.log(window.scrollY);

      // if (window.scrollY > 0) {
      //   this.titleBarVisible = true;
      // } else {
      //   this.titleBarVisible = false;
      // }

      // throttle or debounce for better performance (with lodash)
      this.titleBarVisible = window.scrollY > 0 ? true : false;
    },
    form(title, url) {
      this.$router.push({
        name: "form",
        params: { title, url }
      });
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
</style>>
