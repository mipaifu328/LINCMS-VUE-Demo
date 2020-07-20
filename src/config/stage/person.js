const personRouter = {
  route: null,
  name: null,
  title: '时代人物',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/person/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '人物列表',
      type: 'view',
      name: '',
      route: '/person/list',
      filePath: 'view/person/person-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default personRouter
