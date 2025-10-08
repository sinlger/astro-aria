# Cloudflare Pages 部署指南

本指南将帮助你将 Astro Aria 项目部署到 Cloudflare Pages。

## 📋 前置要求

1. **Cloudflare 账户**：确保你有一个 Cloudflare 账户
2. **Git 仓库**：项目需要托管在 GitHub、GitLab 或 Bitbucket 上
3. **Node.js**：确保本地环境已安装 Node.js

## 🚀 部署步骤

### 1. 推送代码到 Git 仓库

确保你的项目代码已经推送到 GitHub、GitLab 或 Bitbucket：

```bash
git add .
git commit -m "Configure for Cloudflare Pages deployment"
git push origin main
```

### 2. 在 Cloudflare Pages 中创建项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 点击左侧菜单中的 **"Pages"**
3. 点击 **"Create a project"**
4. 选择 **"Connect to Git"**
5. 选择你的 Git 提供商并授权访问
6. 选择包含此项目的仓库

### 3. 配置构建设置

在项目设置页面中，配置以下构建参数：

- **Framework preset**: `Astro`
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (如果项目在仓库根目录)

### 4. 环境变量配置（可选）

如果你的项目需要环境变量，在 **"Environment variables"** 部分添加：

```
NODE_VERSION=18
```

### 5. 部署项目

1. 点击 **"Save and Deploy"**
2. Cloudflare Pages 将自动开始构建和部署过程
3. 构建完成后，你将获得一个 `.pages.dev` 域名

## 📁 项目配置文件说明

### `astro.config.mjs`
```javascript
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
	output: "server",
	adapter: cloudflare({
		platformProxy: {
			enabled: true
		}
	}),
	integrations: [tailwind()],
});
```

### `wrangler.toml`
```toml
name = "astro-aria"
compatibility_date = "2024-10-08"

[build]
command = "npm run build"

[env.production]
name = "astro-aria"

[env.preview]
name = "astro-aria-preview"
```

### `public/_headers`
配置 CORS 和安全头部：
```
/api/*
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
  Access-Control-Allow-Headers: Content-Type, Authorization
  Cache-Control: public, max-age=300

/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

### `public/_redirects`
处理路由重定向：
```
# API routes handled by Cloudflare Functions
/api/* /api/:splat 200

# SPA fallback for client-side routing
/* /index.html 200
```

## 🔧 API 路由配置

API 路由已配置为 Cloudflare Functions：

```javascript
// 配置为服务端渲染，适配 Cloudflare Pages Functions
export const prerender = false;
```

这确保 API 路由在 Cloudflare 环境中正确运行。

## 🌐 自定义域名（可选）

1. 在 Cloudflare Pages 项目设置中，点击 **"Custom domains"**
2. 点击 **"Set up a custom domain"**
3. 输入你的域名
4. 按照提示配置 DNS 记录

## 🔍 故障排除

### 构建失败
- 检查 Node.js 版本是否兼容
- 确保所有依赖都已正确安装
- 查看构建日志中的错误信息

### 锁文件不匹配错误
如果遇到 `ERR_PNPM_OUTDATED_LOCKFILE` 错误：
1. 确保 `package.json` 和 `pnpm-lock.yaml` 同步
2. 本地安装 pnpm：`npm install -g pnpm`
3. 运行 `pnpm install` 更新 `pnpm-lock.yaml`
4. 提交更新后的锁文件到 Git 仓库
5. 确保 `package.json` 中包含 `"packageManager": "pnpm@9.12.2"`

### API 路由不工作
- 确保 API 文件包含 `export const prerender = false;`
- 检查 `_redirects` 文件配置是否正确
- 查看 Functions 日志

### 静态资源问题
- 确保静态文件放在 `public/` 目录中
- 检查文件路径是否正确

## 📊 性能优化

1. **缓存配置**：已在 `_headers` 中配置适当的缓存策略
2. **图片优化**：考虑使用 Cloudflare Images 服务
3. **CDN**：Cloudflare 自动提供全球 CDN 加速

## 🔄 自动部署

每次推送到主分支时，Cloudflare Pages 将自动重新构建和部署你的项目。

## 📝 注意事项

1. **API 限制**：Cloudflare Functions 有执行时间限制（CPU 时间 10ms，总时间 30s）
2. **存储**：如需持久化存储，考虑使用 Cloudflare KV 或 D1 数据库
3. **环境变量**：敏感信息应通过 Cloudflare Pages 环境变量配置

## 🆘 获取帮助

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Astro Cloudflare 适配器文档](https://docs.astro.build/en/guides/integrations-guide/cloudflare/)
- [Cloudflare 社区论坛](https://community.cloudflare.com/)