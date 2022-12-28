<template>
    <div class="container p-5">
    <h1 class="text-center border-bottom pb-3 mb-3">История</h1>
     <table class="table table-hover table-bordered mt-5">
       <thead>
         <tr>
           <th scope="col">ID</th>
           <th scope="col">Tank id</th>
           <th scope="col">User id</th>
           <th scope="col">Tank name</th>
           <th scope="col">Username</th>
           <th scope="col">Milk</th>
           <th scope="col">Created at</th>
           <!-- <th scope="col">Put milk</th> -->
         </tr>
       </thead>
       <tbody>
        <tr v-for=" (tankUser, id) in tankUsers" :key="id">
           <td>{{ id }}</td>
           <td>{{ tankUser.TankId }}</td>
           <td>{{ tankUser.UserId }}</td>
           <td>{{ tankUser.NameTank }}</td>
           <td>{{ tankUser.UserName }}</td>
           <td>{{ tankUser.PutMilk }}</td>
           <td>{{ tankUser.createdAt }}</td>
           <!-- <td>{{TankUser.putMilk}}</td> -->
         </tr>

       </tbody>
     </table>

     </div>
   </template>
<script>

import { mapGetters, mapActions } from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css'

export default {
  data () {
    return {
      name: 'TankUser',
      props: {
        id: {
          type: Number
        },
        TankId: {
          type: String
        },
        UserId: {
          type: String
        },
        NameTank: {
          type: String
        },
        UserName: {
          type: String
        },
        PutMilk: {
          type: Number
        },
        createdAt: {
          type: Date
        }
      }

    }
  },
  async mounted () {
    await this.fetchTanks()
    await this.fetchTankUser()
  },

  computed: {
    ...mapGetters({
      tanks: 'tanks',
      tankUsers: 'tankUsers'
    })
  },

  methods: {
    ...mapActions({
      fetchTanks: 'fetchTanks',
      fetchTankUser: 'fetchTankUser'
    })
  }
}
</script>
