<template>
    <div class="card">
   <div class="tankHeader">
    <h4 class="cardName"> {{ name }}</h4>
   <h4 class="cardTotal"> {{ total }} / 300</h4>
   </div>
    <div class="tankImg">
        <!-- <img src="../assets/milkTank.png" alt="tank"> -->
    </div>
    </div>
</template>

<script>
export default {
  name: 'TankCard',
  props: {
    name: {
      type: String,
      default: ''
    },
    total: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
    .card {
        width: 340px;
        height: 320px;
        padding: 20px;
        margin: 10px;
        border: 1px solid black;
        border-radius: 12px;

        .tankImg {
            width: 100%;
            height: 80%;
            background-image: url("../assets/milkTank.png");
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }
    }
</style>
