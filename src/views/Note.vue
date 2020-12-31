<template>
  <div class="bg-black flex-1 ml-56 px-10 text-white pt-10" style="font-family: 'Poppins', sans-serif;">
    <div class="top-paid text-white px-10">
      <div class="flex justify-between">
        <h2 class="font-normal mb-8">Note</h2>
      </div>
      <div>
       <div class="fixed">
                   <button
                    @click="open = true"
                    class=" float-right  p-0 w-16 h-16 bg-red rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
                  <svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" class="w-6 h-6 inline-block">
                 <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601 C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
              C15.952,9,16,9.447,16,10z" />
          </svg>
        </button>
      </div>
        <Modal :open="open" @close="open = false" class="flex items-center justify-center z-40 mt-8" >
          <div class="max-w-lg w-full rounded-lg shadow-2xl px-6 py-6 z-40 bg-blue-darker">
              <p v-if="errors.length">
    <ul>
      <li v-for="error in errors" :key="error" class="pb-2">{{ error }}</li>
    </ul>
  </p>
            <form >
                  <textarea
                  autofocus 
                  placeholder="text here" 
                  id="text-box"
                  rows="6"
                  cols="32"
                  v-model="note.text" 
                  class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full resize-none border rounded-md" required></textarea>
                <div class="mt-6">
              <button   @click.prevent="addNote" class="ml-4 px-4 py-2 text-gray-800 font-semibold bg-white hover:bg-gray-100 border rounded focus:outline-none focus:shadow-outline">
                Add Note
              </button>
                <button @click="open = false" class="ml-4 px-4 py-2 text-gray-800 font-semibold bg-white hover:bg-gray-100 border rounded focus:outline-none focus:shadow-outline">
                Cancel
                 </button>
            </div>
              </form>
          </div>
        </Modal>
   <section class="ml-20">
         <div class="container mt-4 mx-auto">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" v-for="(note, index) in notes" :key="note.index">
      <div class="card m-2 border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200">
        <div class="m-3">
          <h4 class="text-lg mb-2">{{note.date}}
         <span class="text-sm text-teal-800 font-mono bg-blue inline rounded-full px-2 align-top float-right animate-pulse hover:bg-blue-darker">
            <button class="close" @click="removeNote(index)"> </button>
           </span></h4>
         <p class="font-light font-mono text-sm text-gray-700 hover:text-gray-900 transition-all duration-200">
            {{note.text}}
          </p>
        </div>
      </div>
    </div>
  </div>
      </section>
</div>
           <!-- <div class="search-container text-center p-4 relative">
      <input type="text" placeholder="Search" class="bg-grey-darker text-grey-light text-xs w-full p-2 pl-8 border border-grey-dark rounded">
      <div class="absolute pin-t py-5 px-2 text-grey-light">
        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 18" width="18" height="18"><path class="heroicon-ui" d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path></svg>
      </div>
    </div> -->
    
    </div> 
  </div>
</template>
<script>
import Modal from '../components/modal'
export default {
  components: {
    Modal
  },
  data: () =>(
     {
        open: false,
           note: {
                    text: '',
                    date: ''
                },
                notes: [],
                errors: [],
    } 
    ),
  methods: {
   addNote() {
     this.errors = [];
        if (!this.note.text) {
        this.errors.push("text required.");
      }
        if (!this.errors.length) {
           let {text,} = this.note
                    this.notes.push({
                        text,
                        date: new Date(Date.now()).toLocaleString(),
              })
         this.note.text = ''
      }
       },
        removeNote(index) {
            this.$delete(this.notes, index)
      },
  },
   mounted() {
                if (localStorage.getItem('notes')) this.notes = JSON.parse(localStorage.getItem('notes'));
            },
               watch: {
                notes: {
                    handler() {
                        localStorage.setItem('notes', JSON.stringify(this.notes));
                    },
                    deep: true,
                },
            }
}
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
        .close:before, .close:after {
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
        .close:hover:before, .close:hover:after {
            transform: rotate(0deg);
        }
</style>