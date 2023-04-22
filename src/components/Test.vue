<template>
  <el-button @click="login"> Login </el-button>
  <el-button @click="signUp"> Sign Up </el-button>
  <el-button @click="navigateToChat"> link </el-button>
</template>

<script>
import router from '@/router'
import axios from 'axios';
import { ref } from 'vue'
export default {
  setup(){

    // functions that mutate state and trigger updates
    const login = function () {
      const url = 'http://34.80.66.28:3000/user/login'
      const data = {
        username: 'test',
        password: 'test'
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
        }
      }
      axios.post(url, data, config)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }

    const signUp = function () {
      const url = 'http://34.80.66.28:3000/user/register';
      const data = {
        username: 'test',
        password: 'test',
        email: 'test@example.com'
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
        }
      }
      axios.post(url, data, config)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });

      }

    const navigateToChat = function() {
      router.push('/chat');
    }

    return {
      login,
      signUp,
      navigateToChat
    }
  }
}
</script>