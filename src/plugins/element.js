//导入element-ui
import Vue from 'vue'
//表单组件
import { Button, Form, FormItem, Input } from 'element-ui'
//弹窗消息
import { Message } from 'element-ui'
//页面布局
import { container, header, aside, main } from 'element-ui'
//菜单栏布局
import { Menu, Submenu, MenuItemGroup, MenuItem } from 'element-ui'
//面包屑导航区
import { Breadcrumb, BreadcrumbItem } from 'element-ui'
//卡片视图
import { Card } from 'element-ui'
//分栏间隔
import { Row, Col } from 'element-ui'
//表格
import { Table, TableColumn } from 'element-ui'
//开关按钮
import { Switch } from 'element-ui'
//文字提示按钮
import { Tooltip } from 'element-ui'
//分页
import { Pagination } from 'element-ui'
//对话框
import { Dialog } from 'element-ui'
//弹框
import { MessageBox } from 'element-ui'
//标签
import { Tag } from 'element-ui'
//树形控件组件
import { Tree } from 'element-ui'
//选择器
import { Select, Option } from 'element-ui'
//级联选择器
import { Cascader } from 'element-ui'
// 警告
import { Alert } from 'element-ui'
//
import { Steps } from 'element-ui'
//
import { Step } from 'element-ui'

//
import { TabPane } from 'element-ui'
//
import { Tabs } from 'element-ui'
//
import { CheckboxGroup } from 'element-ui'
//
import { Checkbox } from 'element-ui'
//
import { Upload } from 'element-ui'



import Timeline from "./timeline/index.js"
import TimelineItem from "./timeline-item/index"



//使用element-ui
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(container)
Vue.use(header)
Vue.use(aside)
Vue.use(main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(Alert)
Vue.use(Steps)
Vue.use(Step)
Vue.use(TabPane)
Vue.use(Tabs)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Upload)
Vue.use(Timeline)
Vue.use(TimelineItem)







//挂载到Vue
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
