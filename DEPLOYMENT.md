# Cloudflare Pages 部署说明

## API 路由配置问题及解决方案

### 问题描述
在部署到 Cloudflare Pages 后，API 路由（如 `/api/proxy-config.json`）返回 404 错误。

### 原因分析
Astro 的 Cloudflare 适配器在构建时会生成 `_routes.json` 文件，该文件默认将 `/api/*` 路径添加到 `exclude` 列表中，导致 API 路由无法被 Cloudflare Functions 处理。

### 解决方案
项目已配置自动修复脚本，在每次构建后自动从 `_routes.json` 的 `exclude` 列表中移除 `/api/*`。

#### 自动修复配置
1. **修复脚本**: `scripts/fix-routes.js`
2. **构建命令**: 已更新 `package.json` 中的构建脚本
   ```json
   {
     "scripts": {
       "build": "astro check && astro build && node scripts/fix-routes.js",
       "build:cf": "astro check && astro build && node scripts/fix-routes.js"
     }
   }
   ```

#### 部署步骤
1. 运行构建命令：
   ```bash
   pnpm run build
   ```
   
2. 确认 `dist/_routes.json` 文件中的 `exclude` 列表不包含 `/api/*`

3. 将 `dist` 目录部署到 Cloudflare Pages

#### 验证部署
部署完成后，访问以下 API 端点验证是否正常工作：
- `/api/proxy-config.json`

### 注意事项
- 每次构建都会自动运行修复脚本
- 如果手动修改 `_routes.json`，请确保不要包含 `/api/*` 在 `exclude` 列表中
- API 路由需要设置 `prerender: false` 以确保在 Cloudflare Pages Functions 中正确运行

### 相关文件
- `astro.config.mjs` - Astro 配置文件
- `scripts/fix-routes.js` - 自动修复脚本
- `dist/_routes.json` - Cloudflare Pages 路由配置
- `src/pages/api/proxy-config.json.js` - API 路由实现