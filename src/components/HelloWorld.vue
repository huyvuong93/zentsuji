<template>
  <div class="main">
    <div>
      <h2>ニックネームは</h2>
      <input type="text" placeholder="例：むぎゅ～ちゃん" v-model="username">
    </div>
    <div>
      <h2>善通寺市に住んで</h2>
      <div>
        <select required v-model="history">
          <option value="" selected><span>例 : 10</span></option>
          <option v-for="n in 100" :key="n.id" :value="n" class="select-value">{{n}}</option>
        </select>
        <p>年です。</p>
      </div>
    </div>
    <div>
      <h2>善通寺市のいいところは</h2>
      <textarea type="text" rows="7" placeholder="100字以内で入力して下さい" v-model="message"/>
    </div>
    <div>
      <button id="sendBtn" v-on:click="addMessage()">桜を咲かせる</button>
    </div>
    <transition name="modal">
      <div v-if="isOpen">
        <div class="overlay" v-on:click.self="isOpen = false">
          <div class="modal">
            <p style="text-align:center">桜が咲きました！<br>
              ありがとうございます！</p>
            <img src="../assets/thanks.svg" alt="">
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import gql from 'graphql-tag'

const ADD_MESSAGE = gql `
  mutation ($name: String,
            $history: numeric,
            $message: String,
            ) {
            insert_mytable(objects: {name: $name,
                                      history: $history,
                                      message: $message,}) {
                affected_rows
                returning {
                        id
                        name
                        history
                        message
                        created_at
                    }
                }
            }
            `;

export default {
  data(){
    return{
      isOpen:false,
      username:'',
      history:'',
      message:''
    }
  },
  methods:{
    async addMessage() {
                const name = this.username;
                const history = this.history;
                const message = this.message;
                await this.$apollo.mutate({
                    mutation: ADD_MESSAGE,
                    variables: {    
                        name,
                        history,
                        message,
                    },
                    update: (cache, { data: { insert_mytable}}) => {
                        // Read data from cache for this query

                        try {
                            const insertedmytable = insert_mytable.returning;
                            console.log(insertedmytable)
                        }
                        catch (err) {
                            console.error(err)
                        }

                    }
                }).then(() => {
                    document.getElementById("sendBtn").disabled = true;
                    this.isOpen = true
                }).catch(err => console.log(err));

                this.username = '';
                this.history = '';
                this.message = '';
            },
      }
}
</script>
<style scoped>
@media screen and (min-width:767px) {
  .main .modal{
    width: 35vw;
    min-height:40vh ;
  }
}
  *{
    box-sizing: border-box;
  }
  .main{
    max-width: 428px;
    padding: 0 37px;
    padding-top: 8%;
    /* text-align: left; */
    height: 100vh;
    min-height: 600px;
    font-size: 18px;
    background-image: url(../assets/bg.png);
    background-size: 100%;
    background-repeat: no-repeat;
    background-position-x: center;
  }
  h2{
    margin:26px 0 5px 0;
    font-size: 20px;
    text-align: left;
    font-weight: normal;
  }
  input{
    border: 4px solid #FD9DA3;
    border-radius: 10px;
    padding: 18px 10px;
    font-size: 18px;
    outline: none;
    height: 65px;
  }
  .main div:nth-child(1) input{
    width: 100%;
  }
  .main div:nth-child(2) select{
    width: 40%;
    border: 4px solid #FD9DA3;
    border-radius: 10px;
    padding: 18px 8px 18px 10px;
    font-size: 18px;
    outline: none;
    height: 65px;
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';
    z-index: 1;
    background-color: white;
  }
  .main div:nth-child(2) select:invalid{
    color: #757575;
  }
  .main div:nth-child(2) div {
    display: flex;
    justify-self: start;
  }
  .main div:nth-child(2) div p{
    height: 20px;
    margin-top: 45px;
    margin-bottom: 0;
    margin-left: 5px;
    font-weight: bold;
  }
  textarea{
    width: 100%;
    border: 4px solid #FD9DA3;
    border-radius: 10px;
    font-size: 18px;
    outline: none;
    padding: 10px;
  }
  #sendBtn{
    font-size: 20px;
    width: 100%;
    background-color:#FD9DA3 ;
    border: none;
    border-radius: 10px;
    padding: 22px;
    margin-top: 11%;
    color: white;
    box-shadow: 0 5px #C17D7D;
    outline: none;
  }
  .modal {
    width: 80vw;
    min-height:50vh ;
    margin: 0px auto;
    padding:70px 10px;
    background-color: #fff;
    border-radius: 8px;
    transition: all 0.2s ease-in;
    box-shadow: 0 3px 6px 0 rgba(0,0,0,0.16);
    
  }
  .modal p{
    margin:10px 0;
    font-size: 24px;
  }
  .modal img{
    width: 100%;
    max-width: 300px;
    margin: auto;
  }
  .modal a{
    display: block;
    margin: 30px 0;
    padding: 20px 0;
    background-color: #03BAD1;
    border-radius:8px;
    box-shadow: 0 5px #2D929F;
    text-decoration: none;
    color: white;
  }
  .fadeIn-enter {
    opacity: 0;
  }

  .fadeIn-leave-active {
    opacity: 0;
    transition: all 0.2s step-end;
  }

  .fadeIn-enter .modal,
  .fadeIn-leave-active.modal {
    transform: scale(1.1);
  }
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    z-index: 999;
    transition: opacity 0.2s ease;
  }
</style>