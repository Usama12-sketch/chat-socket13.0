/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  images:{
domains:["avatars.githubusercontent.com", "lh3.googleusercontent.com"]
  },
  reactStrictMode: true,
  swcMinify: true,
  
}

module.exports = nextConfig
