export default {
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
    }],
  ],
  // 若已有配置
  outputPath: "./build",

  // 加入 theme 定义
  theme: {
    "@primary-color": "#30b767", // 绿色
  },
  routes: [{
    path: '/',
    component: '../layout',
    routes: [
      {
        path: '/',
        component: 'Helloworld',
      },
      {
        path: 'puzzlecards', component: './puzzlecards'
      },
      {
        path: '/helloworld',
        component: 'index'
      },
      {
        path: '/css-modules-with-less',
        component: './css-modules-with-less/index'
      },
      {
        path: '/css-modules-with-antd',
        component: './css-modules-with-antd/index'
      },
      {
        path: '/dashboard',
        routes: [
          { path: '/dashboard/analysis', component: 'Dashboard/Analysis' },
          { path: '/dashboard/monitor', component: 'Dashboard/Monitor' },
          { path: '/dashboard/workplace', component: 'Dashboard/Workplace' }
        ]
      },
      {
        path: 'list', component: '../pages/list'
      },
    ]
  }],
  // proxy: {
  //   '/dev': {
  //     target: 'http://mock-api.com/0ynW5Pz6.mock/get_question_answer_list',
  //     changeOrigin: true,
  //   },
  // },
};
