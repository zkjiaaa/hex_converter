<template>
  <div>
    <el-container>
      <el-card class="box-card" style="margin:0 auto">
        <el-header>
          <div class="title">
            <h1>进制转换器</h1>
          </div>
        </el-header>
        <el-main class="container">
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-row type="flex" class="row-bg" justify="center">
                  <el-col :span="16">
                    <el-input
                      placeholder="请输入要转换的内容"
                      v-model="formItem.converte_value"
                      @input="inputWrite()"
                      @blur="levelInput()"
                      clearable
                    >进制</el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-select
                      v-model="formItem.converte_hex"
                      placeholder="进制"
                      @change="hexChange()"
                    >
                      <el-option
                        v-for="item in hex_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    <el-button @click="saveLogButton" type="success" plain>保存记录</el-button>
                  </el-col>
                </el-row>
              </div>
              <div class="swap-button" @click="swapInput">
                <i class="el-icon-sort">点击转换</i>
              </div>
              <div>
                <el-row type="flex" class="row-bg">
                  <el-col :span="16">
                    <el-input placeholder="结果" v-model="formItem.result_value" clearable></el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-select v-model="formItem.result_hex" placeholder="进制" @change="hexChange()">
                      <el-option
                        v-for="item in hex_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg history" justify="center">
            <el-col :span="12">
              <h3>历史记录</h3>
              <el-table :data="tableData" style="width: 100%" height="400">
                <el-table-column label="转换内容" width="180" prop="converte_data"></el-table-column>
                <el-table-column label="转换结果" width="180" prop="result_data"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-main>
        <el-footer>Power By Vue、Element-ui</el-footer>
      </el-card>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      formItem: {
        converte_value: null,
        result_value: null,
        converte_hex: 10,
        result_hex: 2,
      },
      tableData: [],
      // 进制选择
      hex_options: [{
        value: 2,
        label: '二进制'
      }, {
        value: 8,
        label: '八进制'
      }, {
        value: 10,
        label: '十进制'
      }, {
        value: 16,
        label: '十六进制'
      }, {
        value: 32,
        label: '三十二进制'
      }
      ],
    }
  },
  methods: {
    // 转换数值
    convertInput () {
      let that = this
      // 获取要转换的值
      let converte = that.formItem.converte_value
      // 判断结果是不是为空
      if (converte == '' || converte == null) {
        that.formItem.result_value = ''
        return false
      }
      // 将目标转换为 10 进制
      converte = Number.parseInt(converte, that.formItem.converte_hex)
      // 将结果转换为想要的进制
      that.formItem.result_value = converte.toString(that.formItem.result_hex)
    },
    // 用户输入
    inputWrite () {
      this.convertInput()
    },
    saveLogButton () {
      // 将转换结果放入到记录中
      this.saveConvertLog(this.formItem.converte_value, this.formItem.result_value, this.formItem.converte_hex, this.formItem.result_hex)
    },
    // 用户光标离开
    levelInput () {
      if (this.formItem.converte_value == null || this.formItem.converte_value == '') {
        return false
      }
      if (this.formItem.result_value == null || this.formItem.result_value == '') {
        return false
      }
    },
    // 进制转换
    hexChange () {
      // 进行计算
      this.convertInput()
    },
    // 转换表格输入
    swapInput () {
      // 进行进制的转换
      let temp = this.formItem.converte_hex
      this.formItem.converte_hex = this.formItem.result_hex
      this.formItem.result_hex = temp

      // 进行数值的转换
      temp = this.formItem.converte_value
      this.formItem.converte_value = this.formItem.result_value
      this.formItem.result_value = temp
    },
    // 转换结果放入到记录中
    saveConvertLog (converte, result, converte_hex, result_hex) {
      let converte_name = '未知'
      let result_name = '未知'
      if (converte == '' || converte == null) {
        return false
      }
      if (result == '' || result == null) {
        return false
      }
      for (let x in this.hex_options) {
        if (converte_hex == this.hex_options[x]['value']) {
          converte_name = this.hex_options[x]['label']
        }
        if (result_hex == this.hex_options[x]['value']) {
          result_name = this.hex_options[x]['label']
        }
      }

      let add_data = {
        converte_data: converte + ' ' + converte_name,
        result_data: result + ' ' + result_name
      }
      // 进行记录的增加
      this.tableData.unshift(add_data);
    },
    // 键盘输入

    // 删除某个记录
    handleDelete (index, row) {
      // 尝试的第一种方法：

      // let arr = this.tableData
      // for(var i=index,len=arr.length-1;i<len;i++) {
      //   arr[i]=arr[i+1]
      // }

      // arr.length = len
      // this.tableData = Object.assign({}, this.tableData, arr)
      //this.tableData = arr
      //this.$set(this.tableData, arr)

      // 这样才有效果
      this.tableData.splice(this.tableData.indexOf(index), 1);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  margin-top: 20px;
}

.history {
  margin-top: 10px;
}

.container {
  width: 1140px;
  margin: 0 auto;
}
.swap-button {
  margin: 10px auto;
}
.swap-button:hover {
  cursor: pointer;
}
</style>
