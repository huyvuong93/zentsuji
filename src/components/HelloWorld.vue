<template>
  <div class="main">
    <div>
      <h2>ニックネームは</h2>
      <input type="text" placeholder=" " v-model="username">
    </div>
    <div>
      <h2>善通寺市に住んで</h2>
      <div>
        <input type="number" min="1" max="80" v-model="history">
        <p>年です。</p>
      </div>
    </div>
    <div>
      <h2>善通寺市のいいところは</h2>
      <textarea type="text" rows="7" placeholder=" " v-model="message"/>
    </div>
    <div>
      <button id="sendBtn" v-on:click="addMessage()">桜を咲かせる</button>
    </div>
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
      isLoading:false,
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
                }).catch(err => console.log(err));

                this.username = '';
                this.history = '';
                this.message = '';
            },
      }
}
</script>
<style scoped>
  *{
    box-sizing: border-box;
  }
  .main{
    max-width: 428px;
    padding: 0 37px;
    padding-top: 8%;
    text-align: left;
    height: 100vh;
    min-height: 600px;
    font-size: 18px;
    background-image: url(../assets/bg.png);
    background-size: 100%;
    background-repeat: no-repeat;
    background-position-x: center;
  }
  h2{
    margin:33px 0 5px 0;
    font-size: 16px;
  }
  input{
    border: 3px solid #FD9DA3;
    border-radius: 10px;
    padding: 18px 10px;
    font-size: 18px;
    outline: none;
    height: 65px;
  }
  .main div:nth-child(1) input{
    width: 100%;
  }
  .main div:nth-child(2) input{
    width: 40%;
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
    border: 3px solid #FD9DA3;
    border-radius: 10px;
    font-size: 18px;
    outline: none;
    padding: 10px;
  }
  #sendBtn{
    font-family: 'nicola',sans-serif;
    font-size: 20px;
    width: 100%;
    background-color:#FD9DA3 ;
    border: none;
    border-radius: 10px;
    padding: 20px;
    margin-top: 10%;
    color: white;
    box-shadow: 0 5px #C17D7D;
  }
</style>