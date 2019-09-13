module.exports = {
  mode: 'spa',
  head: {
    title: 'Denote',
    meta: [
      {
        charset: 'UTF-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0'
      },
      {
        'http-equiv': 'X-UA-Compatible',
        content: 'ie=edge'
      }
    ],
    link: [
      {
        rel: 'icon',
        href: '/denote.png',
        type: 'image/png'
      }
    ]
  },
  css: [
    'grid.css/grid.css',
    './css/global.css',
    './css/loading.css',
    './css/note.css'
  ],
  build: {
    postcss: {
      plugins: [
        require('postcss-preset-env')({
          stage: 0
        })
      ]
    }
  },
  render: {
    static: {
      setHeaders(res) {
        res.setHeader('X-Frame-Options', 'ALLOWALL')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET')
        res.setHeader(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept'
        )
      }
    }
  }
}
