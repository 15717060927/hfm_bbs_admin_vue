<template xmlns:el-table="">

      <el-main style="">


        <div style="margin-top: 15px; padding: 10px 0">
          <el-input v-model="input3" class="input-with-select" placeholder="请输入内容" style="width: 600px">
            <el-select slot="prepend" v-model="select" placeholder="请选择">
              <el-option label="用户ID" value="1"></el-option>
              <el-option label="用户姓名" value="2"></el-option>
              <el-option label="用户昵称" value="3"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" type="primary"></el-button>
          </el-input>
        </div>

        <!--用户信息展示 -->
        <el-table
            :data="tableData"
            border
            @selection-change="handleSelectionChange">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form class="demo-table-expand"
                       inline
                       label-position="left"
              >
                <el-form-item class="el-form-item" label="用户ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="用户登录名">
                  <span>{{ props.row.user_name }}</span>
                </el-form-item>
                <el-form-item label="用户昵称">
                  <span>{{ props.row.nick_name }}</span>
                </el-form-item>
                <el-form-item label="用户电话">
                  <span>{{ props.row.tel }}</span>
                </el-form-item>
                <el-form-item label="用户邮箱">
                  <span>{{ props.row.email }}</span>
                </el-form-item>
                <el-form-item label="用户性别">
                  <span>{{ props.row.sex }}</span>
                </el-form-item>
                <el-form-item label="个人简介">
                  <span>{{ props.row.description }}</span>
                </el-form-item>
                <el-form-item label="个人简介">
                  <span>{{ props.row.status }}</span>
                </el-form-item>
                <el-form-item label="粉丝数">
                  <span>{{ props.row.follower_count }}</span>
                </el-form-item>
                <el-form-item label="关注数">
                  <span>{{ props.row.followee_count }}</span>
                </el-form-item>
                <el-form-item label="上次登录时间">
                  <span>{{ props.row.last_login_time }}</span>
                </el-form-item>
                <el-form-item label="注册时间">
                  <span>{{ props.row.signup_time }}</span>
                </el-form-item>
                <el-form-item label="更新文章时间">
                  <span>{{ props.row.update_time }}</span>
                </el-form-item>
                <el-form-item label="未知变量">
                  <span>{{ props.row.lock_time }}</span>
                </el-form-item>
                <el-form-item label="文章总数">
                  <span>{{ props.row.post_count }}</span>
                </el-form-item>
                <el-form-item label="所关注语言领域">
                  <span>{{ props.row.language_field }}</span>
                </el-form-item>
                <el-form-item label="所关注科技领域">
                  <span>{{ props.row.tech_field }}</span>
                </el-form-item>
                <el-form-item label="总浏览量">
                  <span>{{ props.row.total_view }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
              label="用户ID"
              prop="id">
          </el-table-column>
          <el-table-column
              label="用户姓名"
              prop="user_name">
          </el-table-column>
          <el-table-column
              label="用户昵称"
              prop="nick_name">
          </el-table-column>
          <el-table-column
              label="用户状态"
              prop="status">
          </el-table-column>
          <el-table-column
              label="上次登录时间"
              prop="last_login_time">
          </el-table-column>
          <el-table-column
              label="封禁用户"
              prop="set_lock_time">
            <template slot-scope="scope">

              <el-button size="medium" type="danger" @click="handleSetLockTime">
                封禁用户
              </el-button>

            </template>

          </el-table-column>
        </el-table>

        <div class="page" style="padding:10px 0">
          <el-pagination
              :current-page="pageNum"
              :page-size="pageSize"
              :page-sizes="[2, 10, 15, 20]"
              :total="total"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange">
          </el-pagination>
        </div>

      </el-main>
</template>

<script>
import Aside from "@/components/Aside";
import Header from "@/components/Header";


export default {

  name: "UserInfoManagement",
  data() {
    const item = {};
    return {
      isCollapse: false,
      collapseBtnClass: 'el-icon-s-fold',
      sideWidth: 200,
      logTextShow: true,
      tableData: [{
        id: '1',
        nick_name: 'wd'
      }, {
        id: '2'
      }],


      showheader: true,
      pageNum: 1,
      pageSize: 2,
      total: 0,
      banTimeOptionList: ['24小时', '48小时', '1周', '15天', '1个月', '3个月', '6个月'],
      value: '选择封禁时间',
      input3: '',
      select: ''

    }


  },

  components: {
    Aside,
    Header
  },
  created() {
    this.load();
  },
  methods: {
    collapse() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.sideWidth = 64
        this.collapseBtnClass = "el-icon-s-unfold"
        this.logTextShow = false
      } else {
        this.sideWidth = 200
        this.collapseBtnClass = "el-icon-s-fold"
        this.logTextShow = true
      }

    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.load()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //处理设置封禁时间
    handleSetLockTime() {
      const h = this.$createElement;
      const that = this
      this.$msgbox(
          {
            title: '选择该用户被封禁的时间',
            message: h('el-select',
                {
                  props: {
                    value: that.value,
                    filterable: true,
                  },
                  ref: 'selectView',
                  on: {
                    change: e => {
                      that.value = e
                      that.$refs.selectView.value = e  // select下拉框值改变，回显到页面上
                    },
                  },
                },
                [
                  this.banTimeOptionList.map(it => {
                    return h('el-option', {
                      props: {
                        label: it,
                        key: it,
                        value: it,
                      },
                    });
                  })
                ]
            ),
            center: true,
            showCancelButton: true,
            closeOnClickModal: false,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            // beforeClose()
          }).then(_ => {
        //成功操作
      }).catch(msg => {
        //失败操作
      });
    },

    load() {
      this.request.get("http://localhost:8080/user/search_page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          uname: this.uname,

        }
      }).then(res => {
        console.log(res)
        this.tableData = res.records
        this.total = res.total
      })
    },


  }
}
</script>


<style>
.el-container {
  min-height: 100vh
}

.menu-logo {
  height: 60px;
  line-height: 60px;
  text-align: center
}

.menu-logo img {
  width: 20px;
  position: relative;
  top: 5px;
}

.menu-logo b {
  color: white;
  margin-left: 3px
}

.el-dropdown i {
  margin-right: 5px;
  font-size: 16px;
}

.el-breadcrumb {
  margin-top: 15px;
}

.el-main .search-wrapper {
  margin-top: 15px;
  width: 600px;
  display: flex;
  height: 40px;
  line-height: 40px;
}

.el-main .btn-group {
  margin-top: 20px;
  margin-left: 20px;
}

.el-main .btn-group .el-button {
  margin-left: 15px;
}

.el-select .el-input {
  width: 130px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
  color: #99a9bf;
  font-size: medium;
}

/*.demo-table-expand .el-form-item label {*/
/*  width: 200px;*/
/*  color: black;*/
/*}*/


</style>