<template>
  <div id="order" align="left">
    <el-form ref="form" :model="form">
      <el-form-item label="活动区域">
        <el-select v-model="form.market" placeholder="交易币类型">
          <el-option value="336" label="zt_usdt"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="交易方式">
        <el-radio-group v-model="form.user">
          <el-radio label="0">账户A先买 {{ myBalances[0] }}</el-radio>
          <el-radio label="1">账户B先买 {{ myBalances[1] }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="价格">
        <el-input v-model="form.price"></el-input>
      </el-form-item>

      <el-form-item label="数量">
        <el-input v-model="form.amount"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">开始操作</el-button>
        <el-button @click="onQuery">查询余额</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: { market: "336", user: "0", price: "", amount: "" },
      myBalances: []
    };
  },
  methods: {
    onSubmit() {
      console.log("form data ===>" + this.form);
      let config = {
        method: "post",
        url: "/zbg/placeOrder",
        data: {
          amount: this.form.amount, //下单数量
          user: this.form.user, //买卖类型：0 卖出 1 购买
          market: this.form.market, //市场ID
          price: this.form.price
        }
      };
      this.$ajax(config).then(response => {
        let resData = response.data;
        console.log("resData ===>" + JSON.stringify(resData));
        if (resData.success) {
          this.$notify({
            title: "成功",
            message: resData.msg,
            type: "success",
            duration: 0
          });
        } else {
          this.$notify({
            title: "失败",
            message: resData.msg,
            type: "error",
            duration: 0
          });
        }
      });
    },
    onQuery() {
      let config = {
        method: "post",
        url: "/zbg/findbypage",
        data: {
          user: this.form.user
        }
      };
      this.$ajax(config).then(response => {
        let resData = response.data;
        console.log("resData ===>" + JSON.stringify(resData));
        this.myBalances[this.form.user] = resData;
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

