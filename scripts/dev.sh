#!/bin/bash
# 位置: scripts/dev.sh
# 用途: 一键启动开发服务器

set -e

cd "$(dirname "$0")/.."

echo "🚀 启动 GxgenAI 官网开发服务器..."
echo ""

# 检查依赖
if [ ! -d "node_modules" ]; then
  echo "📦 安装依赖..."
  npm install
fi

# 启动开发服务器
echo "🌐 访问地址: http://localhost:4000"
echo ""
npm run dev
