<template>
  <div class="formUserTank">
             <div class="form-group">
            <input type="text" class="form-control" ref="tankId" placeholder="номер танка" />
          </div>
          <div class="form-group">
            <input type="text" class="form-control" ref="userId" placeholder="номер пользователя" />
          </div>
            <div class="form-group">
            <input type="text" class="form-control" ref="name" placeholder="имя" />
          </div>
          <div class="form-group">
            <input type="text" class="form-control" ref="put_milk" placeholder="количество молока" />
          </div>
          <button class="btn btn-sm btn-primary"  @click="postData(), postRelations()">Залить молоко</button>
  </div>

  </template>

<script>
import http from '../http-common'
import axios from 'axios'
export default {
  data () {
    return {
      name: '',
      put_mill: 0
    }
  },
  methods: {
    fortmatResponse (res) {
      return JSON.stringify(res, null, 2)
    },

    // multiplyActions () {
    //   this.postData();
    //   this.postRelations();
    // },

    async postData () {
      const postData = {
        id: this.$refs.userId.value,
        name: this.$refs.name.value,
        put_milk: this.$refs.put_milk.value
      }
      try {
        const res = await http.post('/user', postData, {
          headers: {
            'x-access-token': 'token-value'
          }
        })

        const result = {
          status: res.status + '-' + res.statusText,
          headers: res.headers,
          data: res.data
        }

        this.postResult = this.fortmatResponse(result)
      } catch (err) {
        this.postResult = this.fortmatResponse(err.response?.data) || err
      }
    },
    async postRelations () {
      axios.post('http://localhost:3000/apiRouter/tank-user',
        { TankId: this.$refs.tankId.value, UserId: this.$refs.userId.value })
        .then(response => {
          console.log(response)
        })
    }
  }
}

</script>
