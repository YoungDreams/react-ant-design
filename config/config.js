export default {
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
    }],
  ],
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
        component: 'Helloworld'
      },
      {
        path: '/dashboard',
        routes: [
          { path: '/dashboard/analysis', component: 'Dashboard/Analysis' },
          { path: '/dashboard/monitor', component: 'Dashboard/Monitor' },
          { path: '/dashboard/workplace', component: 'Dashboard/Workplace' }
        ]
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
