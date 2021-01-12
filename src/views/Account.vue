<template>
  <div class="bg-black flex-1 ml-56 px-10 text-white pt-10" style="font-family: 'Poppins', sans-serif;">
    <div class="top-paid text-white px-10">
      <div class="flex justify-between">
        <h2 class="font-normal mb-8">Accounts</h2>
      </div>
           <!-- <div class="search-container text-center p-4 relative">
      <input type="text" placeholder="Search" class="bg-grey-darker text-grey-light text-xs w-full p-2 pl-8 border border-grey-dark rounded">
      <div class="absolute pin-t py-5 px-2 text-grey-light">
        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 18" width="18" height="18"><path class="heroicon-ui" d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path></svg>
      </div>
    </div> -->
    <div>
        <div class="search-form w-full">
            <div class="relative mr-6 my-2">
                <input type="search" v-model="search" class="bg-purple-white shadow rounded border-0 p-3 w-full" placeholder="Search by name...">
                <div class="absolute pin-r pin-t mt-3 mr-4 text-purple-lighter">
                    <svg version="1.1" class="h-4 text-dark" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 52.966 52.966" style="enable-background:new 0 0 52.966 52.966;" xml:space="preserve">
    	<path d="M51.704,51.273L36.845,35.82c3.79-3.801,6.138-9.041,6.138-14.82c0-11.58-9.42-21-21-21s-21,9.42-21,21s9.42,21,21,21
        c5.083,0,9.748-1.817,13.384-4.832l14.895,15.491c0.196,0.205,0.458,0.307,0.721,0.307c0.25,0,0.499-0.093,0.693-0.279
        C52.074,52.304,52.086,51.671,51.704,51.273z M21.983,40c-10.477,0-19-8.523-19-19s8.523-19,19-19s19,8.523,19,19
        S32.459,40,21.983,40z"/>

	</svg>

                </div>
            </div>
        </div>
		<div class="max-w-sm mx-auto px-4 mt-8 relative" v-for="profile in filteredItems" :key="profile._id">
			<p>{{ profile.profileName }}</p>
            <button @click="confirmDelete(profile)" class='-m-4 w-12 h-12 bg-blue-dark flex items-center justify-center text-center no-underline rounded-full text-white hover:bg-blue-darker absolute pin-t pin-r' href='#'>
                <i class='text-xl text-grey  fa fa-plus close'> </i>
            </button>
            <div v-for="user in profile.accounts" :key="user._id">
                <div class='relative m-0 shadow-lg flex p-4 cursor-pointer' @click="openViewer(user.site, user._id)">
                    <div class='flex-no-shrink cursor-pointer'>
                        <div v-if="user.site === 'fb'">
                            <img src="../assets/facebook.png" alt="image" class="rounded-full  w-12 h-12 block mx-auto">
                        </div>
                        <div v-else-if="user.site === 'twitter'">
                            <img src="../assets/twitter.png" alt="image" class="rounded-full w-12 h-12 block mx-auto">
                        </div>
                        <div v-else-if="user.site === 'instagram'">
                            <img src="../assets/instagram.png" alt="image" class="rounded-full w-12 h-12 block mx-auto">
                        </div>
                        <div v-else-if="user.site === 'lnk'">
                            <img src="../assets/linkedin.png" alt="image" class="rounded-full w-12 h-12 block mx-auto">
                        </div>
                    </div>
                    <div class='flex-1 card-block relative'>
                        <div class="ml-3">
                            <h4 class='font-medium text-grey  text-xl mb-1'>{{ user.saved }}</h4>
                            <p class="text-sm text-grey block"> {{ user.name }}  </p>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	</div>


        <!-- <div class="flex cursor-pointer " v-for="user in usersData" :key="user ._id">
          <div v-if="user.site === 'fb'">
            <img src="../assets/facebook.png" alt="image" class="rounded-full w-10">
          </div>
          <div v-else-if="user.site === 'twitter'">
            <img src="../assets/twitter.png" alt="image" class="rounded-full w-10">
          </div>
          <div v-else-if="user.site === 'lnk'">
            <img src="../assets/linkedin.png" alt="image" class="rounded-full w-10">
          </div>
          <div v-else>

          </div>
          <div class="w-1/2 pr-6" >
            <div class="flex mb-5">
              <div class="ml-3 flex flex-1 justify-between border-b border-grey-darker">
                <div  @click="openViewer(user.site, user._id)">
                  <div class="mb-1">{{user.saved}} </div>
                  <div class="text-grey text-xs mb-6">{{user.name}}</div>
                </div>
                  <button class="text-white" @click.prevent="confirmDelete(user._id)">&cross;</button>
              </div>
            </div>
          </div>
        </div> -->
    </div> 
  </div>
</template>

<script>
import db from "../db";
export default {
  data: () => ({
    search: "",
    usersData: [],
    profiles: [],
    listdata: [
      {
        name: "Happy"
      },
      {
        name: "Sad"
      },
      {
        name: "Confused"
      }
    ]
  }),
  async mounted() {
    this.usersData = await db.users.find({}).sort({});
    this.profiles = await db.profiles.find({}).sort({});
  },
  computed: {
    filteredItems() {
      return this.profiles.filter(item => {
        return item.profileName
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    }
  },
  methods: {
    form(title, url) {
      this.$router.push({
        name: "viewer",
        params: { title, url }
      });
    },
    openViewer(url, userKey) {
      this.$router.push({
        name: "viewer",
        params: { userKey, url }
      });
    },
    async confirmDelete(user) {
      let action = confirm("Are you sure you want to remove this account?");
      if (action === true) {
        const deleted = await db.profiles.remove({ _id: user._id });
        if (deleted === 1) {
          const idx = this.profiles.indexOf(user);
          this.profiles.splice(idx, 1);
        }
        setTimeout(() => {
          this.$alert("Account has been deleted");
        }, 100);
      }
    }
  }
};
</script>
<style scoped>
/* #text-box {
	width: 200px;
	height: 120px;
  padding: 5px;
} */
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
