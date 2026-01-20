#!/usr/bin/env bash
set -euo pipefail

# 位置：scripts/deploy-www.sh
# 用途：一键部署官网到 Railway www.gxgen.ai 服务（生产环境）
# 使用：./scripts/deploy-www.sh 或配置 alias wwww='./scripts/deploy-www.sh'

require() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "[错误] 缺少命令: $1" >&2
    exit 127
  }
}

require railway
require node
require npm
require git

# 切换到项目根目录（脚本位于 scripts/）
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "${PROJECT_ROOT}"

# Railway 项目配置
# Gxgen 项目 - 生产环境 - www.gxgen.ai 服务
RAILWAY_PROJECT="d479cf21-f5d7-4555-9bbe-bbd17e106619"
RAILWAY_ENVIRONMENT="219807da-1d91-45c0-b3a0-926fde1f5c86"
RAILWAY_SERVICE="7103e74a-fee8-4814-a391-4bc05ffe3773"

# 代理配置（中国大陆网络环境需要）
# Railway CLI 使用 SOCKS5 代理可绕过 HTTPS MITM 证书问题 (UnknownIssuer)
# Surge 默认 SOCKS5 端口为 6153
SOCKS_PORT="6153"
HTTP_PORT="8234"
if nc -z 127.0.0.1 "${SOCKS_PORT}" 2>/dev/null; then
  # 优先使用 SOCKS5 代理（绕过 TLS 证书校验问题）
  unset HTTP_PROXY HTTPS_PROXY
  export ALL_PROXY="socks5h://127.0.0.1:${SOCKS_PORT}"
  PROXY_STATUS="使用 ALL_PROXY=socks5h://127.0.0.1:${SOCKS_PORT}"
elif nc -z 127.0.0.1 "${HTTP_PORT}" 2>/dev/null; then
  # 回退到 HTTP 代理
  export HTTPS_PROXY="http://127.0.0.1:${HTTP_PORT}"
  export HTTP_PROXY="http://127.0.0.1:${HTTP_PORT}"
  unset ALL_PROXY
  PROXY_STATUS="使用 HTTP_PROXY=http://127.0.0.1:${HTTP_PORT}（可能遇到证书问题）"
else
  unset HTTP_PROXY HTTPS_PROXY ALL_PROXY
  PROXY_STATUS="未检测到代理，直连模式"
fi

echo "============================================"
echo "Railway 官网部署（www.gxgen.ai）"
echo "============================================"
echo "[代理] ${PROXY_STATUS}"
echo ""

# 步骤 1：检查 Railway 登录状态
echo "[步骤 1/4] 检查 Railway 登录状态..."
if ! railway whoami >/dev/null 2>&1; then
  echo "[错误] Railway 未登录，请先执行: railway login"
  exit 1
fi
echo "✓ 已登录"
echo ""

# 步骤 2：切换到目标项目/环境/服务
echo "[步骤 2/4] 切换到 Gxgen 项目 - 生产环境 - www.gxgen.ai..."
railway link --project "${RAILWAY_PROJECT}" --environment "${RAILWAY_ENVIRONMENT}" --service "${RAILWAY_SERVICE}" >/dev/null 2>&1 || {
  # 如果 link 失败，尝试交互式方式
  echo "  尝试通过名称链接..."
  railway environment "生产环境" >/dev/null 2>&1 || true
  railway service "www.gxgen.ai" >/dev/null 2>&1 || {
    echo "[错误] 无法切换到 www.gxgen.ai 服务"
    echo "请手动执行: railway link 并选择 gxgen > 生产环境 > www.gxgen.ai"
    exit 1
  }
}
echo "✓ 已切换"
railway status || true
echo ""

# 步骤 3：质量检查（提交前必跑）
echo "[步骤 3/6] 质量检查（lint/check/test）..."
npm run lint
npm run check
npm run test:unit
echo "✓ 质量检查通过"
echo ""

# 步骤 4：检查并提交本地变更
echo "[步骤 4/6] 检查本地变更并提交..."
has_changes=false
if ! git diff --quiet; then
  has_changes=true
fi
if ! git diff --cached --quiet; then
  has_changes=true
fi
if [ -n "$(git ls-files --others --exclude-standard)" ]; then
  has_changes=true
fi

if [ "$has_changes" = true ]; then
  git status -sb
  default_msg="chore: deploy www"
  if [ -t 0 ]; then
    read -r -p "请输入提交信息（默认：${default_msg}）: " commit_msg
  else
    commit_msg="${default_msg}"
  fi
  commit_msg="${commit_msg:-$default_msg}"
  git add -A
  git commit -m "${commit_msg}" -m "Co-Authored-By: Warp <agent@warp.dev>"
  echo "✓ 已提交"
else
  echo "无本地变更，跳过提交"
fi
echo ""

# 步骤 5：展示将要部署的提交信息（只读）
echo "[步骤 5/6] 提交快照（只读）："
branch="$(git branch --show-current 2>/dev/null || echo 'unknown')"
commit="$(git log -1 --oneline 2>/dev/null || echo 'unknown')"
echo "- 分支: ${branch}"
echo "- 提交: ${commit}"
echo "- 项目: website2 (Next.js 官网)"
echo ""

# 步骤 6：执行部署
echo "[步骤 6/6] 正在部署到 Railway..."
echo "执行命令: railway up"
echo ""
railway up

echo ""
echo "============================================"
echo "✓ 部署已触发"
echo "============================================"
echo ""
echo "后续观测命令："
echo "  - 查看状态: railway status"
echo "  - 跟踪日志: railway logs"
echo "  - 访问网站: https://www.gxgen.ai"
echo ""
echo "✅ 完成：官网部署命令已执行"
echo ""
