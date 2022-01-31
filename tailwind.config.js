module.exports = {
  content: ["./index.html","./news.html","script.js","./usageChart.html"],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar')
],
variants: {
  scrollbar: ['dark']
}
}
