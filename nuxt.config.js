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
  css: ['grid.css/grid.css', './css/global.css'],
  build: {
    postcss: {
      plugins: [
        require('postcss-preset-env')({
          stage: 0
        })
      ]
    }
  }
}
