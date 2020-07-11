<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区 -->
        <el-card>
            <!-- 角色按钮区域 -->
            <el-row>
                <el-col>
                    <el-button type="primary">添加角色</el-button>
                </el-col>
            </el-row>

            <!-- 角色列表区域 -->
            <el-table :data="rolesList" border stripe>
                <!-- 展开列 -->
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-row v-for="(item1,i1) in scope.row.children" :ken="item1.id"
                            :class="['bdbottom','vcenter',i1 == 0?'bdtop':''] ">
                            <!-- 渲染一级权限 -->
                            <el-col :span="5">
                                <el-tag closable @close="removeRightById(scope.row,item1.id)">{{item1.authName}}
                                </el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <!--  渲染二级和三级权限-->
                            <el-col :span="19 ">
                                <el-row v-for="(item2,i2) in item1.children" :key="item2.id"
                                    :class="['vcenter',i2 == 0 ? '':'bdtop'],">
                                    <!-- 二级 -->
                                    <el-col :span="6">
                                        <el-tag type="success" closable @close="removeRightById(scope.row,item2.id)">
                                            {{item2.authName}}</el-tag>
                                        <i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <!-- 三级 -->
                                    <el-col :span="18">
                                        <el-tag type="warning" v-for="item3 in item2.children" :key="item3.id"
                                            closable @close="removeRightById(scope.row,item3.id)">
                                            {{item3.authName}}
                                        </el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>

                        <!-- 查看信息
                        <pre>
                            {{scope.row}}
                        </pre> -->
                    </template>
                </el-table-column>
                <!-- 索引列 -->
                <el-table-column type="index"></el-table-column>
                <el-table-column label="角色名称名称" prop="roleName"></el-table-column>
                <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope" width="300px">
                        <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                        <el-button type="warning" icon="el-icon-setting" size="mini"
                            @click="showSetRightDialog(scope.row)">分配权限
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分配权限对话框 -->
            <el-dialog title="分配权限" :visible.sync="setRightDialogVisible" width="50%">
                <!-- 树形控件 -->
                <el-tree :data="rightslist" :props="treeProps" show-checkbox node-key="id" default-expand-all
                    :default-checked-keys="defKeys" ref="treeRef"></el-tree>


                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="allotRights">确 定</el-button>
                </span>
            </el-dialog>

        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                rolesList: [],
                //控制分配权限对话框的显示和隐藏
                setRightDialogVisible: false,
                //所有权限的数据
                rightslist: [],
                //树形控件的属性绑定对象
                treeProps: {
                    label: 'authName',
                    children: 'children'
                },
                //默认选择的节点Id值数值
                defKeys: [],
                //当前即将分配权限的角色id
                roleId: ''
            }
        },
        created() {
            this.getRolesList()
        },
        methods: {
            async getRolesList() {
                const { data: res } = await this.$http.get('roles')
                // 判断是否获取数据
                if (res.meta.status !== 200) {
                    return this.$message.error('获取角色列表失败')
                }
                this.rolesList = res.data
                console.log(this.rolesList);
            },
            //根据id删除对应的权限
            async removeRightById(role, rightId) {
                //弹出是否删除框
                const comfirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err => err)

                //判断是否删除
                if (comfirmResult !== 'confirm') {
                    return this.$message.info('取消了删除')
                }

                //操作删除
                const { data: res } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
                //检测接口是否成功
                if (res.meta.status !== 200) {
                    return this.$message.error('删除权限失败!')
                }
                this.$message.success('删除权限成功!')
                // this.getRolesList()重新获取数据,由于重新刷新页面,体验不好
                role.children = res.data
            },
            //分配权限的对话框
            async showSetRightDialog(role) {
                this.roleId = role.id
                //获取所有权限的数值
                const { data: res } = await this.$http.get('rights/tree')

                if (res.meta.status !== 200) {
                    return this.$message.error('获取权限数据失败')
                }

                //获取到的权限数据保存到 data 中
                this.rightslist = res.data
                console.log(this.rightslist);

                //递归获取三级节点的Id
                this.getLeafKeys(role, this.defKeys)

                //可以点击分配权限对话框
                this.setRightDialogVisible = true
            },
            //通过递归的形式,获取角色下所有三级权限的Id,并保存到defKeys 数组中
            getLeafKeys(node, arr) {
                //如果当前node 节点不包含children 属性,则是三级节点
                if (!node.children) {
                    return arr.push(node.id)
                }

                node.children.forEach(item => this.getLeafKeys(item, arr))
            },
            //点击为角色分配权限 
            async allotRights() {
                const keys = [
                    ...this.$refs.treeRef.getCheckedKeys(),
                    ...this.$refs.treeRef.getHalfCheckedKeys()
                ]
                // console.log(keys);

                const idStr = keys.join(',')

                const { data: res } = await this.$http.post(`roles/${this.roleId}/rights`, { rids: idStr })

                if (res.meta.status !== 200) {
                    return this.$message.error('分配权限失败')
                }
                this.$message.success('分配权限成功!')

                this.getRolesList()
                //隐藏对话框
                this.setRightDialogVisible = false
            }


        }
    }
</script>

<style lang="less" scoped>
    .vcenter {
        display: flex;
        align-items: center;
    }
</style>