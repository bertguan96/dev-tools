const homeRouter = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'home',
    meta: {
      name: '首页',
    },
    component: () => import('../../pages/home/index.vue'),
  },
  {
    path: '/jsonGo',
    name: 'jsonGo',
    meta: {
      name: '结构体转JSON',
    },
    component: () => import('../../pages/json/go-json/index.vue'),
  },
  {
    path: '/jsonFormat',
    name: 'jsonFormat',
    meta: {
      name: 'jsonFormat',
    },
    component: () => import('../../pages/json/json-format/index.vue'),
  },
  {
    path: '/json2go',
    name: 'json2go',
    meta: {
      name: 'json2go',
    },
    component: () => import('../../pages/json/json2go/index.vue'),
  },
  {
    path: '/tokens',
    name: 'tokens',
    meta: {
      name: 'tokens',
    },
    component: () => import('../../pages/ai/openai/tokens.vue'),
  },
  // {
  //   path: '/bagWords',
  //   name: 'bagWords',
  //   meta: {
  //     name: 'bagWords',
  //   },
  //   component: () => import('../../pages/ai/vec/bagwords/bag-words.vue'),
  // },
  {
    path: '/diffCode',
    name: 'diffCode',
    meta: {
      name: 'diffCode',
    },
    component: () => import('../../pages/code/diff/index.vue'),
  },
  {
    path: '/urlCode',
    name: 'urlCode',
    meta: {
      name: 'urlCode',
    },
    component: () => import('../../pages/crypto/urlcode.vue'),
  },
  {
    path: '/base64',
    name: 'base64',
    meta: {
      name: 'base64',
    },
    component: () => import('../../pages/crypto/base64.vue'),
  },
  {
    path: '/md5',
    name: 'md5',
    meta: {
      name: 'md5',
    },
    component: () => import('../../pages/crypto/md5.vue'),
  },
  {
    path: '/websocket',
    name: 'websocket',
    meta: {
      name: 'websocket',
    },
    component: () => import('../../pages/code/websocket/websocket.vue'),
  },
  {
    path: '/copyPaste',
    name: 'copyPaste',
    meta: {
      name: 'copyPaste',
    },
    component: () => import('../../pages/code/copy_paste/copy_paste.vue'),
  },
  {
    path: '/random',
    name: 'random',
    meta: {
      name: 'random',
    },
    component: () => import('../../pages/code/random/index.vue'),
  },
  {
    path: '/ExcelToSQL',
    name: 'ExcelToSQL',
    meta: {
      name: 'ExcelToSQL',
    },
    component: () => import('../../pages/code/excelToSQL/index.vue')
  }
];


export default homeRouter;