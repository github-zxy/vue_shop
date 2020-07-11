<template>
    <el-container class="home-container">
        <!-- 头部 -->
        <el-header>
            <!-- 头部左侧 -->
            <div>
                <!-- <img src="../assets/heima.png" alt=""> -->
                <span>电商后台管理系统</span>
            </div>
            <!-- 头部右侧 -->
            <el-button type="info" @click="logout">
                退出
            </el-button>
        </el-header>
        <!-- 页面主题 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ?'64px' : '200px'">
                <!-- 侧边栏折叠和显示 -->
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <!-- 侧边栏菜单 -->
                <el-menu background-color="#545c64" text-color="#fff" active-text-color="#409BFF" :unique-opened="true"
                    :collapse="isCollapse" :collapse-transition="false" :router="true" :default-active="activePath">
                    <!-- 一级导航 -->
                    <el-submenu :index="item.id +'' " v-for="item in menulist" :key="item.id">
                        <!-- 一级菜单 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i :class="iconObj[item.id]"></i>
                            <!-- 文本 -->
                            <span>{{item.authName}}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item :index=" '/'+subItem.path + '' " v-for="subItem in item.children"
                            :key="subItem.id" @click="saveNavState('/'+subItem.path)">
                            <!-- 二级菜单 -->
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-menu"></i>
                                <!-- 文本 -->
                                <span>{{subItem.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 右侧内容区 -->
            <el-main>
                <!-- Welcome路由占位符 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>

    export default {
        data() {
            return {
                //左侧菜单数据
                menulist: [],
                iconObj: {
                    '125': 'iconfont icon-users',
                    '103': 'iconfont icon-tijikongjian',
                    '101': 'iconfont icon-shangpin',
                    '102': 'iconfont icon-danju',
                    '145': 'iconfont icon-baobiao'
                },
                // 折叠默认否
                isCollapse: false,
                //被激活的链接地址
                activePath:''
            }
        },
        created() {
            this.getMenuList(),
            this.activePath = window.sessionStorage.getItem('activePath')
        },
        methods: {
            logout() {
                //退出页面,并且清楚内存
                window.sessionStorage.clear()
                this.$router.push('/login')
            },
            //获取全部菜单
            async getMenuList() {
                const { data: res } = await this.$http.get('menus')
                if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
                this.menulist = res.data
                console.log(res);
            },
            //菜单折叠和展开
            toggleCollapse() {
                this.isCollapse = !this.isCollapse
            },
            //保存链接的激活状态
            saveNavState(activePath){
                window.sessionStorage.setItem('activePath',activePath)
                this.activePath = activePath
            }
        }
    }
</script>

<style lang="less" scoped>
    .home-container {
        height: 100%;
    }

    .el-header {
        background-color: #373d41;
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        align-items: center;
        color: #fff;
        font-size: 20px;
    }

    .el-header div {
        display: flex;
        align-items: center;
    }

    .el-header div span {
        margin-left: 15px;
    }

    .el-aside {
        background-color: #333744;
    }

    .el-aside .el-menu {
        border-right: none;
    }

    .el-main {
        background-color: #eaedf1;
    }

    .iconfont {
        margin-right: 10px;
    }

    .toggle-button {
        background-color: #4A5064;
        font-size: 10px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        letter-spacing: 0.2em;
    }
</style>