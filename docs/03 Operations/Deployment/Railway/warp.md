# Railway Deployment Guide & Best Practices

本文档记录了 Next.js (App Router) 项目部署到 Railway 的最佳实践与常见问题修复指南，基于 `website2` 项目的实战经验总结。

## 1. 核心依赖规范 (Native Bindings)

Railway 使用 Linux 环境（通常是 Debian/Ubuntu），而本地开发通常是 macOS/Windows。这会导致依赖原生二进制（Native Bindings）的库在构建时缺失，导致 `Failed to load native binding` 错误。

### 必须配置 `optionalDependencies`

在 `package.json` 中显式添加以下 Linux 平台依赖，确保 `npm ci` 在 Railway 上能下载它们：

```json
"optionalDependencies": {
  // Next.js SWC 编译器
  "@next/swc-linux-x64-gnu": "x.x.x",
  "@next/swc-linux-x64-musl": "x.x.x",
  
  // Lightning CSS (Tailwind v4 / Next.js)
  "lightningcss-linux-x64-gnu": "x.x.x",
  "lightningcss-linux-x64-musl": "x.x.x",
  
  // Parcel Watcher (Next.js 依赖)
  "@parcel/watcher-linux-x64-glibc": "x.x.x",
  
  // Tailwind CSS v4 Oxide 引擎
  "@tailwindcss/oxide-linux-x64-gnu": "x.x.x",
  "@tailwindcss/oxide-linux-x64-musl": "x.x.x"
}
```

> **注意**：版本号必须与主依赖（如 `next`, `tailwindcss`）版本严格匹配。

### Nixpacks 配置 (`nixpacks.toml`)

为了确保某些难以通过 package.json 解析的依赖被正确安装，可在 `nixpacks.toml` 的 install 阶段显式补充：

```toml
[phases.install]
cmds = [
  'npm ci',
  # 强制补充安装，防止 npm ci 忽略
  'npm i --no-save @parcel/watcher-linux-x64-glibc || true',
  'npm i --no-save lightningcss-linux-x64-gnu || true'
]
```

---

## 2. 运行时稳定性 (Static to Dynamic Errors)

Next.js App Router 的 `[locale]` 动态路由容易在处理恶意扫描请求（如 `/config.php`, `/.env`）时崩溃，报错 `Page changed from static to dynamic at runtime ... reason: headers`。

### 解决方案

#### A. Middleware 拦截（第一道防线）

在 `src/middleware.ts` 中拦截常见的非页面资源请求，直接返回 404，不进入 App Router：

```typescript
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 拦截静态资源格式的 404 请求，避免触发 SSR 渲染错误
  if (/\.(php|bak|env|sql|json|html|png|js|txt|xml|map|css|ico)$/i.test(pathname)) {
    return new NextResponse(null, { status: 404 });
  }
  
  return intlMiddleware(request);
}

export const config = {
  // 确保 matcher 包含这些文件后缀，以便 middleware 能捕获到它们
  matcher: ['/((?!api|_next|_vercel).*)'],
};
```

#### B. 强制动态渲染（兜底方案）

在 `src/app/[locale]/layout.tsx` 中配置，确保即使请求穿透了 Middleware，也不会因为访问 headers 而导致静态生成失败：

```typescript
// 修复 "Page changed from static to dynamic" 错误
export const dynamic = 'force-dynamic';

// 禁用 generateStaticParams (如果不需要全量静态导出)
// export async function generateStaticParams() { ... }
```

#### C. 完善基础文件

确保存在以下文件以减少系统级 404：
- `public/robots.txt`
- `src/app/not-found.tsx`

---

## 3. 部署工作流规范

使用 `scripts/deploy-www.sh` (别名 `wwww`) 进行标准化部署。

### 部署流程
1.  **质量检查**：自动运行 `lint`, `check` (TS), `test:unit`。
2.  **自动提交**：检测本地变更并自动创建 commit（带 Co-Authored-By）。
3.  **触发构建**：执行 `railway up`。

### 常用命令

```bash
# 一键部署
wwww

# 查看构建日志 (排查 Native Binding 错误)
railway logs --build

# 查看运行时日志 (排查 500/Crash 错误)
railway logs --deployment
```

## 4. 故障排查清单

| 现象 | 可能原因 | 修复方案 |
|------|----------|----------|
| `Failed to load native binding` | 缺少 Linux 原生依赖 | 检查 `package.json` optionalDependencies，运行 `npm i` 更新 lockfile |
| `Page changed from static to dynamic` | 404 路由触发了 Header 访问 | 检查 Middleware 拦截规则；在 Layout 中添加 `force-dynamic` |
| `Deploy failed` (无详细日志) | 构建脚本非零退出 | 使用 `railway logs --build` 查看具体 npm 报错 |
| 样式丢失 / 404 | Tailwind 未正确编译 | 检查 `@tailwindcss/oxide-linux-*` 是否安装 |

---

**文档维护**：当添加新的原生依赖库或修改路由架构时，请同步更新此文档。
