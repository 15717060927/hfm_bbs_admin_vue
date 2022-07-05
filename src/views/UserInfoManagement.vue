<template xmlns:el-table="">

      <el-main style="">


        <div style="margin-top: 15px; padding: 10px 0">
          <el-input v-model="id" class="input-with-select" placeholder="请输入用户ID"
                    style="width: 200px;padding: 10px"></el-input>
          <el-input v-model="userName" class="input-with-select" placeholder="请输入用户登录名"
                    style="width: 200px;padding: 10px"></el-input>
          <el-input v-model="nickName" class="input-with-select" placeholder="请输入用户昵称"
                    style="width: 200px;padding: 10px"></el-input>
          <el-button slot="append" icon="el-icon-search" type="primary" @click="load">查询</el-button>
          <el-button slot="append" icon="el-icon-refresh" type="primary" @click="reset">重置</el-button>
        </div>

        <div style="margin-top:20px;margin-left:35px">
          <el-button size="" type="primary" @click="cb">
            <span v-if="show ==true">收起筛选</span>
            <span v-if="show ==false">展开筛选</span>
          </el-button>
          <el-collapse-transition>
            <div v-if="show" class="testshow" style="margin-top: 10px;">
              <span>用户状态</span>
              <el-radio-group v-model="status" style="margin-left:20px">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="0">封禁中</el-radio-button>
                <el-radio-button label="1">正常</el-radio-button>
                <el-radio-button label="2">已注销</el-radio-button>
              </el-radio-group>
            </div>
          </el-collapse-transition>

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
                       label-position="left">
                <el-form-item class="el-form-item" label="用户ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="用户登录名">
                  <span>{{ props.row.userName }}</span>
                </el-form-item>
                <el-form-item label="用户昵称">
                  <span>{{ props.row.nickName }}</span>
                </el-form-item>
                <el-form-item label="用户电话">
                  <span>{{ props.row.tel }}</span>
                </el-form-item>
                <el-form-item label="用户邮箱">
                  <span>{{ props.row.email }}</span>
                </el-form-item>
                <el-form-item label="用户性别">
                  <span>{{ !(props.row.sex) ? '男' : '女' }}</span>
                </el-form-item>
                <el-form-item label="个人简介">
                  <span>{{ props.row.description }}</span>
                </el-form-item>
                <el-form-item label="用户状态">
                  <span>{{ mapStatus[props.row.status] }}</span>
                </el-form-item>
                <el-form-item label="封禁时间">
                  <span>{{ (props.row.status == 0) ? props.row.lockTime : '无封禁时间' }}</span>
                </el-form-item>
                <el-form-item label="粉丝数">
                  <span>{{ props.row.followerCount }}</span>
                </el-form-item>
                <el-form-item label="关注数">
                  <span>{{ props.row.followeeCount }}</span>
                </el-form-item>
                <el-form-item label="上次登录时间">
                  <span>{{ props.row.lastLoginTime }}</span>
                </el-form-item>
                <el-form-item label="注册时间">
                  <span>{{ props.row.signupTime }}</span>
                </el-form-item>
                <el-form-item label="更新文章时间">
                  <span>{{ props.row.updatePostTime }}</span>
                </el-form-item>
                <el-form-item label="文章总数">
                  <span>{{ props.row.postCount }}</span>
                </el-form-item>
                <el-form-item label="所关注语言领域">
                  <span>{{ props.row.languageField }}</span>
                </el-form-item>
                <el-form-item label="总浏览量">
                  <span>{{ props.row.totalView }}</span>
                </el-form-item>
                <el-form-item label="总点赞量">
                  <span>{{ props.row.stars }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="用户ID" prop="id"></el-table-column>
          <el-table-column label="用户登录名" prop="userName"></el-table-column>
          <el-table-column label="用户头像" prop="avatar">
            <template slot-scope="scope">
              <img :src="scope.row.avatar" style="width: 100px;height: 100px "></img>
            </template>
          </el-table-column>
          <el-table-column label="用户昵称" prop="nickName"></el-table-column>
          <el-table-column :formatter="statusFormatter" label="用户状态" prop="status">
          </el-table-column>
          <el-table-column label="上次登录时间" prop="lastLoginTime" width="300px"></el-table-column>
          <el-table-column label="封禁用户" prop="set_lock_time">
            <template slot-scope="scope">
              <el-button v-if="scope.row.status==1" size="medium" type="danger"
                         @click="handleSetLockTime(scope.row.id)">封禁用户
              </el-button>
              <el-button v-if="scope.row.status==0" size="medium" type="success" @click="handleSetUnlock(scope.row.id)">
                解封用户
              </el-button>
              <el-button v-if="scope.row.status==2" disabled="userRevoked" size="medium" type="info">用户已注销</el-button>
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


export default {

  name: "UserInfoManagement",
  data() {
    const item = {};
    return {
      mapStatus: {
        0: '用户已被封禁',
        1: '用户状态正常',
        2: '用户账号已注销'
      },
      isCollapse: false,
      collapseBtnClass: 'el-icon-s-fold',
      sideWidth: 200,
      logTextShow: true,
      tableData: [],
      userName: "",
      id: '',
      status: null,
      nickName: '',
      lockTime: '',
      languageField: '',
      showheader: true,
      pageNum: 1,
      pageSize: 2,
      total: null,
      select: '',
      show: '',
      userRevoked: true

    }


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
      console.log(pageSize)
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      console.log(pageNum)
      this.pageNum = pageNum
      this.load()
    },
    handleSelectionChange(select) {
      var _this = this
      _this.select = select;
      console.log(_this.select)
      return _this.select
    },
    cb() {
      this.show = !this.show;
    },
    //状态显示
    statusFormatter(row, column) {
      const status = row.status;
      if (status == 0) {
        return "用户已被封禁"
      } else if (status == 1) {
        return "用户状态正常"
      } else if (status == 2) {
        return "用户账号已注销"
      }

    },

    //处理设置封禁时间
    handleSetLockTime(id) {
      this.request.post("/admin/userManagement/lock/" + id).then(res => {
        if (res.success) {
          this.$message.success(res.msg)
          this.load()
        } else {
          this.$message.error(res.msg)
        }
      })

    },
    //解封
    handleSetUnlock(id) {
      this.request.post("/admin/userManagement/unlock/" + id).then(res => {
        if (res.success) {
          this.$message.success(res.msg)
          this.load()
        } else {
          this.$message.error(res.msg)
        }
      })
    },

    //重置
    reset: function () {
      this.id = null
      this.userName = null
      this.nickName = null
      this.load()
    },


    load() {
      this.request.get("/admin/userManagement/loadPage", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          userName: this.userName,
          nickName: this.nickName,
          id: this.id,
          status: this.status

        }
      }).then(res => {
        console.log(this.status)
        console.log(res)
        this.tableData = res.data.records
        this.total = res.data.total
        console.log(this.total)
      })

    }

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

.demo-table-expand .el-form-item label {
  width: 110px;
  color: black;
  margin-left: 5px;


}


</style>