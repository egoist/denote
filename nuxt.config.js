module.exports = {
  mode: 'spa',
  head: {
    title: 'Denote',
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