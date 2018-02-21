<template>
    <div id="tasksManager">
        <aside id="notification">
            <div v-for="task in tasks" :key="task.id">
                <span class="deleteIcon" v-on:click="removeElement(task)">×</span>
                <span class="putIcon" v-on:click="changeElement(task)">✎</span>
                <span>{{task.name}}</span>
            </div>
        </aside>

        <section id="container">
            <div>
                <p>TO DO LIST!</p>
                <div>
                    <textarea placeholder="Your task" id="task" v-model="message"></textarea>
                    <button type="button" v-on:click="pushElement" class="btn-info">ADD IT</button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
	import axios from 'axios';

	export default {
    data() {
      return {
        tasks: [],
	      message: '',
        key: ''
      }
    },

    methods: {
      pushElement: function(){
	      if(this.message === ''){
		      alert("Your task need a content to be pushed.");
	      }else{
		      axios.post('https://glo3102lab4.herokuapp.com/'+ this.key +'/tasks',{
		      	name: this.message
          })
            .then(taskId => {
            	this.tasks.push({id: taskId.data.id, name: this.message});
	            this.message = '';
            })
            .catch(e => {
	            console.log(e);
            })
	      }
      },
      removeElement: function (task){
        axios.delete('https://glo3102lab4.herokuapp.com/'+ this.key +'/tasks/'+ task.id)
	        .then(() =>{
	        	this.tasks.splice(this.tasks.indexOf(task), 1);
	        })
	        .catch(e => {
		        console.log(e);
	        })
      },
      changeElement: function (task){
	      var name = window.prompt("Update the task", task.name);

	      if(name != null && name !== "") {
		      task.name = name;
	      }

	      axios.put('https://glo3102lab4.herokuapp.com/'+ this.key +'/tasks/'+ task.id, task)
		      .catch(e => {
			      console.log(e);
		      })
      }
    },

	  created() {
		  this.key = prompt("Enter your user key or click on 'Cancel' to create a new user", "6438b2c5-8b88-4068-9a09-268d9990a905");

		  const getElement = () => {
			  axios.get('https://glo3102lab4.herokuapp.com/'+ this.key +'/tasks')
				  .then(response => {
					  this.tasks = response.data.tasks;
				  })
				  .catch(e => {
				  	alert("Could't retrieve your task, your must must be changed");
					  console.log(e);
				  })
		  }

      if(this.key == null || this.key === "") {
	      axios.post('https://glo3102lab4.herokuapp.com/users')
		      .then(responseKey => {
			      this.key = responseKey.data.id;
			      getElement();
		      })
		      .catch(e => {
			      console.log(e);
		      })
      }else{
        getElement();
      }
    }
  }
</script>

<style lang='scss' scoped>
  $document-font: 'Raleway', sans-serif;
  $container-width: 350px;

  html, body{
    padding: 0;
    margin: 0;
    font-family: $document-font;
  }

  /* ASIDE */
  aside{
    height: fit-content;
    position: absolute;
    top: 0;
    right: 0;
    width: 180px;
    z-index: 999;

    >div{
      margin: 10px;
      padding: 5px;
      font-size: 12px;
      border: 1px solid #2e6da4;
      border-radius: 4px;
      position: relative;
      color: #FFF;
      background-color: #337ab7;
      min-height: 30px;

      >span:nth-child(3){
        display: block;
        word-break: break-all;
        width: 130px;
      }

      .deleteIcon{
        font-size: 21px;
        position: absolute;
        top: 10px;
        right: 5px;
        line-height: 0;
        cursor: pointer;
      }

      .putIcon{
        font-size: 17px;
        position: absolute;
        top: 30px;
        right: 4px;
        line-height: 0;
        cursor: pointer;
      }
    }
  }

  /* SECTION */
  #container{
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-image: radial-gradient(#FFFFFF 0%, #FEFEFF 85%);

    >div{
      margin-top: 30vh;
      background: rgba(10, 10, 30, 0.15);
      border-radius: 10px;
      padding: 15px;
      height: fit-content;

      >p{
        color: #FFF;
        font-size: 30px;
        text-align: center;
        margin: 10px 0;
      }

      >div{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 294px;

        >input{
          width: $container-width;
          height: 30px;
          padding: 3px 5px;
          border: none;
          font-size: 14px;
          margin-bottom: 15px;
          font-family: $document-font;
          border-radius: 4px;
        }

        >input:focus{
          outline: none;
        }

        >textarea{
          width: $container-width;
          padding: 3px 5px;
          border: none;
          font-size: 14px;
          resize: vertical;
          height: 100px;
          margin-bottom: 15px;
          font-family: $document-font;
          line-height: 30px;
          border-radius: 4px;
        }

        >button{
          font-size: 14px;
          width: 300px;
          padding: 5px;
          cursor: pointer;
          border: 1px solid transparent;
          border-radius: 4px;
        }

        >.btn-info{
          color: #fff;
          background-color: #337ab7;
          border-color: #2e6da4;
        }

        >.btn-info:hover{
          background-color: #2e6da4;
        }
      }
    }
  }
</style>