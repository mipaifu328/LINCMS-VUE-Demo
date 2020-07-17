const contentRouter = {
  route: null,
  name: null,
  title: '期刊管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/content/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '期刊列表',
      type: 'view',
      name: '',
      route: '/content/list',
      filePath: 'view/content/list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default contentRouter
