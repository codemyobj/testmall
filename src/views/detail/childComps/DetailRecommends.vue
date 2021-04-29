<template>
  <div class="detail-recommend">
    <div v-for="(item,index) in recommends" :key="index">
      <div>
        <img :src="item.image" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailRecommends",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
</style>