const port = process.env.SERVER_PORT;
const serverUrl = `http://127.0.0.1:${port}`;

module.exports = {
  plugins: [
    '@poi/bundle-report'
  ],
  entry: {
    app: 'client/index.js'
  },
  output: {
    dir: 'dist'
  },
  devServer: {
    proxy: {
      '/api': {
        target: serverUrl,
        ws: true,
        changeOrigin: true
      },
    }
  }
}