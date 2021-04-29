<template>
  <!-- 判断对象是否为空 -->
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
    <!-- 价格打折区域 -->
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span
        :style="{backgroundColor: goods.discountBgColor}"
        class="discount"
        v-if="goods.discount"
      >{{goods.discount}}</span>
    </div>

    <!-- 快递销量收藏信息区域 -->
    <div class="other-info">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length - 1].name}}</span>
    </div>

    <!-- 服务信息区域 -->
    <div class="service-info">
      <span v-for="index in goods.services.length-1" :key="index" class="service-info-item">
        <img :src="goods.services[index-1].icon" alt />
        <span>{{goods.services[index - 1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.base-info {
  width: 100%;
  margin-top: 15px;
  padding: 0 10px;
  color: #999999;
  border-bottom: 5px solid #f2f5f8;
}
.info-title {
  text-align: justify;
  color: #222;
}
.info-price {
  margin-top: 8px;
}
.info-price .n-price {
  font-size: 24px;
  color: #ff5777;
}
.info-price .o-price {
  font-size: 15px;
  margin-left: 5px;
  text-decoration: line-through;
}
.info-price .discount {
  font-size: 12px;
  position: relative;
  top: -4px;
  margin-left: 5px;
  padding: 3px 6px;
  color: #fff;
  border-radius: 8px;
  background-color: #ff5777;
}
.other-info {
  display: flex;
  margin-top: 15px;
  justify-content: space-between;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  font-size: 15px;
  line-height: 30px;
}
.service-info {
  line-height: 60px;
  display: flex;
  justify-content: space-between;
}

.service-info img {
  position: relative;
  top: 2px;
  width: 14px;
  height: 14px;
}

.service-info-item span {
  font-size: 13px;
  margin-left: 5px;
  color: #333;
}
</style>