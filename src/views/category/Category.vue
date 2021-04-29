<template>
  <div class="wrapper">
    <div class="content">
      <button @click="btnClick">按钮</button>
      <div>11</div>
      <div>12</div>
      <div>13</div>
      <div>14</div>
      <div>15</div>
      <div>16</div>
      <div>17</div>
      <div>18</div>
      <div>19</div>
      <div>110</div>
      <div>111</div>
      <div>112</div>
      <div>113</div>
      <div>114</div>
      <div>115</div>
      <div>116</div>
      <div>117</div>
      <div>118</div>
      <div>119</div>
      <div>120</div>
      <div>121</div>
      <div>122</div>
      <div>123</div>
      <div>124</div>
      <div>125</div>
      <div>126</div>
      <div>127</div>
      <div>128</div>
      <div>129</div>
      <div>130</div>
      <div>131</div>
      <div>132</div>
      <div>133</div>
      <div>134</div>
      <div>135</div>
      <div>136</div>
      <div>137</div>
      <div>138</div>
      <div>139</div>
      <div>140</div>
      <div>141</div>
      <div>142</div>
      <div>143</div>
      <div>144</div>
      <div>145</div>
      <div>146</div>
      <div>147</div>
      <div>148</div>
      <div>149</div>
      <div>150</div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Category",
  props: {},
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    this.scroll = new BScroll(".wrapper", {
      probeType: 3,
      pullUpLoad: true,
    });

    this.scroll.on("scroll", (position) => {
      // console.log(position);
    });

    this.scroll.on("pullingUp", () => {
      console.log("上拉加载更多");

      setTimeout(() => {
        this.scroll.finishPullUp();
      }, 2000);
    });
  },
  methods: {
    btnClick() {
      console.log("btnclkc");
    },
  },
};
</script>
<style scoped>
.wrapper {
  height: 150px;
  background-color: #ccc;

  overflow: hidden;
  /* overflow-y: scroll; */
}
</style>