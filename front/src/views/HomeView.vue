<template>
  <div class="home">
        <div class="tank-list">
            <TankCard v-for="(tank, key) in tanks" :key="key"
            :name="tank.name"
            :total="tank.total"/>
        </div>
       <PostForm/>
       <TableTankUser/>
  </div>

</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex'
import TankCard from '@/components/TankCard.vue'
import TableTankUser from '@/components/TableTankUser.vue'
import PostForm from '@/components/PostForm.vue'

export default {
  name: 'HomeView',
  components: {
    TankCard,
    TableTankUser,
    PostForm
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

<style lang="scss" scoped>
  .tank-list {
    display: flex;
  }
</style>
