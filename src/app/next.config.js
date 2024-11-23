// next.config.js
const nextConfig = {
    webpack(config) {
      config.module.rules.push({
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      });
      return config;
    },
  };
  
  module.exports = nextConfig;