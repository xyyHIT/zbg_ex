<template>
  <div id="order" align="left">
    <el-form ref="form" :model="form">
      <el-form-item label="活动区域">
        <el-select v-model="form.market" placeholder="交易币类型">
          <el-option value="usdt_btc" label="usdt_btc"></el-option>
          <el-option value="usdt_eth" label="usdt_eth"></el-option>
          <el-option value="usdt_bch" label="usdt_bch"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="交易方式">
        <el-radio-group v-model="form.user">
          <el-radio disabled label="0">账户A {{ myBalances[0] }}</el-radio>
          <el-radio disabled label="1">账户B {{ myBalances[1] }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="数量">
        <el-input v-model="form.amount"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit(0)">账户A先买</el-button>
        <el-button type="primary" @click="onSubmit(1)">账户B先买</el-button>
        <el-button @click="onQuery">查询余额</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      form: { market: "usdt_btc", user: "", price: "", amount: "" },
      formDeal: {
        buy_price: "",
        buy_amount: "",
        sell_amount: ""
      },
      myBalances: []
    };
  },
  created() {
    this.onQuery();
  },
  methods: {
    onSubmit(user) {
      let config = {
        method: "post",
        url: "/digifinex/placeOrder",
        data: {
          user: user, //买卖类型：0 卖出 1 购买
          market: this.form.market, //市场ID
          amount: this.form.amount
        }
      };
      this.$ajax(config).then(response => {
        let resData = response.data;
        if (resData.success) {
          this.$notify({
            title: "成功",
            message: resData.msg,
            type: "success"
          });
        } else {
          this.$notify({
            title: "失败",
            message: resData.msg,
            type: "error"
          });
        }
        this.form.amount = config.data.amount;
        this.form.market = config.data.market;
        this.onQuery();
      });
    },
    onQuery() {
      let config = {
        method: "get",
        url: "/digifinex/myBalance"
      };
      this.$ajax(config).then(response => {
        let resData = response.data;
        console.log("resData ===>" + JSON.stringify(resData));
        if (resData[0].length > 0 && resData[1].length) {
          this.myBalances = resData;
        }
      });
    }
  }
};
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

