---
title: 向 GitHub 提交代码时遇到 443 错误，如何定位错误与解决办法
description: 向 GitHub 提交代码时遇到 443 错误（通常指连接超时或被阻止）是一个比较常见的问题，主要是由于网络环境限制导致的。
keywords: Vercel Analytics, AdBlock, Blocked, Issue, Solving
dateFormatted: Jun 6, 2024
---

在国内向 **GitHub** 提交代码时遇到 **443 错误**（通常指连接超时或被阻止）是一个比较常见的问题，主要是由于网络环境限制导致的。

这里提供几种常用的 **解决方法**：

-----

## 1\. 使用 HTTPS 协议代替 SSH

GitHub 支持使用 **HTTPS** 和 **SSH** 两种协议进行代码传输。在中国，有时候 SSH 端口（默认 22）的连接可能会不稳定或受限，而 HTTPS（默认 443 端口）在传输上可能更稳定一些。

**操作步骤：**

1.  **检查你的远程 URL**：
      * 在你的本地 Git 仓库中，运行 `git remote -v`。
      * 如果看到的是 `git@github.com:user/repo.git` 这种格式（SSH），就需要更换。
2.  **更改为 HTTPS URL**：
      * 在 GitHub 网站上找到你的仓库，复制其 HTTPS URL，格式通常是 `https://github.com/user/repo.git`。
      * 在本地仓库运行命令更改：
        ```bash
        git remote set-url origin https://github.com/user/repo.git
        ```
      * **注意：** 首次使用 HTTPS 推送时，需要输入 GitHub **用户名** 和 **Personal Access Token (PAT)** 而不是密码。

-----

## 2\. 设置 Git 代理

通过设置 **HTTP/S 代理**，让 Git 流量通过代理服务器转发，可以有效避开网络限制。

**前提条件：** 你需要有一个可用的 HTTP/S 代理（例如 **Shadowsocks**、**V2Ray** 等工具提供的本地代理端口，通常是 `1080` 或其他自定义端口）。

**操作步骤：**

### 临时设置（仅对当前终端会话有效）：

```bash
# 假设你的 HTTP 代理是 127.0.0.1:7890 (请根据你的代理工具实际设置更改端口)
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890

# 如果是 SOCKS5 代理
export ALL_PROXY=socks5://127.0.0.1:1080
```

### 永久设置（写入 Git 全局配置）：

```bash
# 设置 HTTP 代理
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890

# 或者使用 SOCKS5 代理
# git config --global http.proxy socks5://127.0.0.1:1080
# git config --global https.proxy socks5://127.0.0.1:1080
```

**清除代理设置**：

当你不再需要代理时，运行以下命令清除全局配置：

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

-----

## 3\. 修改 Hosts 文件（不推荐作为首选，但有时有效）

网络问题可能是因为 DNS 解析将 GitHub 域名解析到了一个连接不稳定的 IP 地址。通过修改本地的 **Hosts 文件**，直接将 GitHub 的域名指向一个相对稳定的 IP 地址，可能可以解决问题。

**操作步骤：**

1.  **查找稳定 IP：** 访问一些提供 GitHub IP 地址的网站，如 `github.com.ipaddress.com` 或国内一些分享 GitHub IP 的社区，找到一个当前较快的 IP 地址。
2.  **修改 Hosts 文件：**
      * **Windows:** 文件路径通常在 `C:\Windows\System32\drivers\etc\hosts`
      * **macOS/Linux:** 文件路径在 `/etc/hosts`
      * 使用管理员权限打开该文件，并添加一行类似以下格式的记录：
        ```
        140.82.113.3 github.com 
        ```
        （请将 `140.82.113.3` 替换为你找到的 IP 地址）
3.  **刷新 DNS 缓存：**
      * **Windows:** 运行 `ipconfig /flushdns`
      * **macOS:** 运行 `sudo killall -HUP mDNSResponder` 或 `dscacheutil -flushcache`

-----

## 4\. 使用国内的 Git 代码托管平台（作为替代方案）

如果上述方法尝试后仍然不稳定，可以考虑将代码**同步**到国内的 **代码托管平台**，如 **Gitee**（码云）、**Coding** 等。这些平台在国内有更好的访问速度和稳定性，并且很多都提供了一键将代码同步到 GitHub 的功能。

**总结**来说，**设置 Git 代理**（通过科学上网工具）通常是 **最有效和最推荐** 的解决方案。如果无法使用代理，可以尝试**更换为 HTTPS 协议**或**修改 Hosts 文件**。