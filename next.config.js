/** @type {import('next').NextConfig} */
const webpack = require("webpack");
const {parsed:envKeys} = require("dotenv").config({path:"./.env"});
const nextConfig = {
  images:{
    domains:["source.unsplash.com"]
  },
  reactStrictMode: true,
  webpack(nextConfig){
    nextConfig.plugins.push(new webpack.EnvironmentPlugin(envKeys))
    return nextConfig
  }
}

module.exports = nextConfig
