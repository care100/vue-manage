// 配置的全量导航菜单数据（实际的导航菜单根据此数据和用户的权限生成）
// label字符串即菜单项对应的路由的name：
// 比如dashboard项的路径是/admin/dashboard，name就是dashboard
const menu = [
  {
    label: 'dashboard'
  },
  {
    label: 'system',
    children: [
      {
        label: 'department'
      },
      {
        label: 'role'
      }
    ]
  },
  {
    label: 'user'
  }
]
export default menu

// 路由名称和页面title的对应关系
// key是对应路由的name
export const titles = {
  login: '登录',
  index: '首页',
  dashboard: '控制台',
  system: '系统管理',
  department: '部门管理',
  role: '角色管理',
  user: '用户管理',
  userCenter: '个人中心'
}
