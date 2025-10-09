---
title: 都2025年了，GitHub还是打不开怎么办：DNS、Hosts 与网络故障排除
description: GitHub 无法访问？别担心！这篇文章提供了最全面、最有效的解决方案，教你如何通过修改 hosts 文件、切换协议、检查网络设置等方法，快速恢复对 GitHub 的正常访问。
keywords: GitHub 无法访问, GitHub 打不开, hosts 文件修改, DNS 解析, GitHub 故障排除, Git 连接失败, SSH/HTTPS 切换
dateFormatted: Jun 6, 2025
---


当你急着要提交代码或拉取最新项目时，突然发现 **GitHub 无法访问或打开**，这无疑是开发者最头疼的瞬间之一。这个问题非常常见，通常并非 GitHub 服务器故障，而是**网络连接、DNS 解析或本地配置**出现了问题。

本文将提供一套完整的排查和解决方案，助你快速恢复对 GitHub 的正常访问。

-----

## **第一步：初步排查与状态确认**

在进行复杂的修改之前，请先确认两个基本问题：

1.  **检查网络连接：** 确保你的电脑能够正常访问其他网站（如 Google、百度等）。如果所有网站都无法访问，请先解决你的本地网络问题。
2.  **检查 GitHub 服务状态：** 有时问题出在 GitHub 官方。你可以通过搜索 “GitHub Status” 或直接访问官方状态页面（如果能打开）来确认 GitHub 目前是否正在经历服务中断。

-----

## **第二步：切换 Git 协议（针对命令行操作）**

如果你的问题主要出现在 **Git 命令行操作**（如 `git clone` 或 `git pull`），可以尝试切换克隆协议，这往往能绕过特定的网络限制：

  * **从 HTTPS 切换到 SSH：**
      * **HTTPS 格式：** `https://github.com/user/repo.git`
      * **SSH 格式：** `git@github.com:user/repo.git`

-----

## **第三步：终极解决方案：手动修改 Hosts 文件**

大多数情况下，GitHub 访问问题是由于 **DNS 解析**不稳定或错误造成的。手动修改本地的 **Hosts 文件**，直接将 GitHub 的域名映射到正确的 IP 地址，是最高效的解决方案。

### 1\. 获取最新的 IP 地址

你需要查询 GitHub 核心域名对应的稳定 IP 地址。请通过搜索引擎搜索 "**GitHub IP 地址**" 或使用 IP 查询工具，获取以下域名的最新 IP：

  * `github.com` (主站)
  * `github.global.ssl.fastly.net` (资源加速)

### 2\. 定位并编辑 Hosts 文件

编辑 Hosts 文件需要**管理员权限**，请务必小心操作。

| 操作系统 | Hosts 文件路径 |
| :--- | :--- |
| **Windows** | `C:\Windows\System32\drivers\etc\hosts` |
| **macOS / Linux** | `/etc/hosts` |

**操作步骤：**

1.  **Windows：** 以**管理员身份**打开记事本或其他文本编辑器，然后通过编辑器打开 Hosts 文件。
2.  **macOS / Linux：** 打开终端，使用命令编辑，例如 `sudo nano /etc/hosts`。

### 3\. 添加 IP 映射

在 Hosts 文件末尾添加以下格式的条目（**请使用你查询到的最新 IP 地址**）：

```
# GitHub hosts
140.82.113.3       github.com
185.199.108.153    github.global.ssl.fastly.net
```

### 4\. 刷新 DNS 缓存

保存 Hosts 文件后，需要刷新本地 DNS 缓存才能让修改生效：

  * **Windows：** 打开命令提示符，输入 `ipconfig /flushdns`。
  * **macOS：** 打开终端，输入 `sudo dscacheutil -flushcache`。

-----

## **第四步：检查网络环境与浏览器设置**

如果 Hosts 文件修改后仍然无效，问题可能出在网络环境或本地应用上：

  * **防火墙与公司/学校网络：**
      * 如果你在受限网络环境下，请联系**网络管理员**。他们可能需要配置防火墙，允许流量通过 GitHub 相关的 IP 地址和域名。
  * **浏览器排查（针对网页访问失败）：**
      * **清除浏览器缓存和 Cookie。**
      * **禁用浏览器插件/扩展：** 某些广告拦截或安全插件可能会干扰 GitHub 的验证码或页面加载。
      * **尝试切换浏览器。**
  * **尝试使用代理工具：**
      * 作为最后的备选方案，如果你所在的地区对 GitHub 的连接不稳定，可以尝试使用一个稳定可靠的 **VPN 或代理服务**来访问。
