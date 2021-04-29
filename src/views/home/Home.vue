<template>
  <div id="home">
    <!-- 导航栏区域 -->
    <nav-bar class="home-nav-bar">
      <template v-slot:center>购物街</template>
    </nav-bar>

    <!-- 复制的tabControl -->
    <tab-control
      :titles="titles"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    ></tab-control>

    <!-- better-scroll滚动区域 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图区域 -->
      <home-swiper :banners="banners" @swiperimgLoad="swiperimgLoad" />

      <!-- 推荐区域 -->
      <home-recommend-view :recommends="recommends" />

      <!-- 本周流行区域 -->
      <feature-view />

      <!-- 控制栏区域 -->
      <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl2"></tab-control>

      <!-- 商品展示区域 -->
      <goods-list :goods="showList" />
    </scroll>

    <!-- 回到顶部-->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { itemListenerMixin, backTopMixin } from "common/mixin";

export default {
  name: "Home",
  props: {},
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
  },
  mixins: [itemListenerMixin, backTopMixin],
  created() {
    //1 请求多个数据
    this.getHomeMultidata();
    //2 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {},
  methods: {
    //事件监听相关的方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 根据position的y值 判断backtop组件是否显示
    contentScroll(position) {
      //2 决定tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;

      this.listenShowBackTop(position);
    },
    loadMore() {
      this.getHomeGoods(this.currentType);

      this.$refs.scroll.scroll.refresh();
    },
    swiperimgLoad() {
      // 获取tabControl的offsetTop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    //网络请求相关的方法
    // 获取轮播图和推荐区域的数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        // console.log(res.data);
      });
    },
    // 获取商品列表数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        //完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
  computed: {
    showList() {
      return this.goods[this.currentType].list;
    },
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    //1 保存Y值
    this.saveY = this.$refs.scroll.getScrollY();
    //2 取消全局事件的监听
    this.$bus.$off("ItemImageLoad", this.ItemImgListener);
  },
};
</script>
<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;

  /* 在使用原生滚动时候设置的 现在用bscroll 所以取消 */
  /* position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 1; */
}

.content {
  /* height: calc(100% - 93px);
  margin-top: 44px; */

  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}
</style>