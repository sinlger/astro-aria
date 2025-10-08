#!/usr/bin/env node

/**
 * 修复 Cloudflare Pages 的 _routes.json 文件
 * 移除 /api/* 从 exclude 列表中，以确保 API 路由被正确处理
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const routesPath = join(process.cwd(), 'dist', '_routes.json');

try {
  // 读取 _routes.json 文件
  const routesContent = readFileSync(routesPath, 'utf8');
  const routes = JSON.parse(routesContent);
  
  // 从 exclude 列表中移除 /api/*
  if (routes.exclude && Array.isArray(routes.exclude)) {
    routes.exclude = routes.exclude.filter(path => path !== '/api/*');
    console.log('✅ 已从 _routes.json 的 exclude 列表中移除 /api/*');
  }
  
  // 写回文件
  writeFileSync(routesPath, JSON.stringify(routes, null, 2));
  console.log('✅ _routes.json 文件已更新');
  
} catch (error) {
  console.error('❌ 修复 _routes.json 时出错:', error.message);
  process.exit(1);
}