module.exports = {
  mode: 'spa',
  head: {
    title: 'Denote'
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