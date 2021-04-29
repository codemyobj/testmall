<template>
  <div id="detail">
    <!-- 控制区域区域 -->
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <!-- 轮播图区域 -->
      <detail-swiper :top-img="topImg" />
      <!-- 商品详情区域 -->
      <detail-base-info :goods="goodsInfo" />
      <!-- 店铺信息区域 -->
      <detail-shop-info :shop="shopInfo" />
      <!-- 商品详情图片区域 -->
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <!-- 商品尺寸区域 -->
      <detail-param-info :param-info="paramsInfo" ref="params" />
      <!-- 评论区域 -->
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <!-- 商品推荐区域 -->
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>
    <!-- 底部选项区域 -->
    <detail-bottom-bar @addCart="addToCart" />

    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import GoodsList from "components/content/goods/GoodsList";

import Scroll from "components/common/scroll/Scroll";
import { itemListenerMixin, backTopMixin } from "common/mixin";
import { debounce } from "common/utils";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";

export default {
  name: "Detail",
  props: {},
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImg: [],
      goodsInfo: {},
      shopInfo: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeY: null,
      currentIndex: 0,
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Scroll,
  },
  destroyed() {
    this.$bus.$off("ItemImageLoad", this.itemImgListener);
  },
  mounted() {},
  created() {
    //1 保存传入的iid
    this.iid = this.$route.params.iid;

    // 2 根据iid请求详情数据
    this.getDetail();
    this.getRecommend();
    this.getThemeY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    });
  },
  methods: {
    getDetail() {
      getDetail(this.iid).then((res) => {
        const data = res.result;
        // 获取顶部的轮播图数据
        this.topImg = data.itemInfo.topImages;
        this.detailInfo = data.detailInfo;
        this.goodsInfo = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        // 店铺信息的对象
        this.shopInfo = new Shop(data.shopInfo);
        // 商品的参数信息
        this.paramsInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );
        // 取出评论
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
      });
    },
    getRecommend() {
      getRecommend().then((res) => {
        this.recommends = res.data.list;
      });
    },
    imageLoad() {
      this.refresh();
      this.getThemeY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 400);
    },
    contentScroll(position) {
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      this.listenShowBackTop(position);
    },
    addToCart() {
      //1 获取购物车需要展示的信息
      const product = {};
      product.img = this.topImg[0];
      product.title = this.goodsInfo.title;
      product.desc = this.goodsInfo.desc;
      product.price = this.goodsInfo.realPrice;
      product.iid = this.iid;

      //将商品添加到购物车
      this.$store.dispatch("addCart", product);
    },
  },
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100vh - 44px - 60px);
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>