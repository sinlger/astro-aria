---
title: 解决 GitHub 代码提交失败：代理已开，Push 却不行？
description: 详细解析为什么开启代理后能访问GitHub网页却无法推送代码，提供HTTPS和SSH协议的完整解决方案，让Git正确通过代理与GitHub通信。
keywords: GitHub, Git, 代理, Proxy, Push失败, HTTPS, SSH, 网络配置, 代码提交
dateFormatted: Jan 15, 2025
---

## 解决 GitHub 代码提交失败：代理已开，Push 却不行？

在使用 **GitHub** 进行项目开发时，遇到一个非常令人困惑的问题：我已经开启了**代理（Proxy）**，可以**正常访问** GitHub 网页，甚至能拉取（pull）代码，但是**代码却无论如何都提交（push）不上去**。这是怎么回事？

-----

### 🔍 为什么代理能访问 GitHub 网页，却推不上去代码？

这里的关键在于理解**访问**和**代码提交**所使用的**网络协议和工具不同**。

#### 1\. 网页访问（浏览器）

当你通过浏览器访问 GitHub 网页时，浏览器会使用你的**HTTP/HTTPS 代理设置**。如果代理设置正确，浏览器就能顺利访问 GitHub 的网页内容。

#### 2\. 代码提交（Git Push）

当你使用 **Git 命令行工具**执行 `git push` 操作时，Git 默认是**不会自动使用你的浏览器或系统全局代理设置**的。

  * **如果使用 HTTPS 协议：** Git 需要独立配置 HTTPS 代理。
  * **如果使用 SSH 协议：** Git 的 SSH 传输**完全不走** HTTP/HTTPS 代理。它需要 SSH 客户端（如 OpenSSH）配置代理，通常是通过 SOCKS 代理或者使用 `ProxyCommand` 来实现。

**总结来说，就是你的 Git 工具没有正确地通过代理服务器与 GitHub 的 Git 服务端口建立连接。**

-----

### 🛠️ 解决方案：让 Git 走上代理之路

根据你的 Git 远程仓库的连接协议（可以通过 `git remote -v` 查看是 **HTTPS** 还是 **SSH**），你需要采用不同的配置方法。

#### 方案一：针对 HTTPS 协议（推荐）

如果你的远程仓库地址长这样：`https://github.com/user/repo.git`，你需要为 **Git 配置 HTTPS 代理**。

**配置方法：** 在终端运行以下命令，将 `proxy-server-address` 和 `port` 替换为你实际的代理地址和端口。

```bash
# 配置全局代理（对所有 Git 仓库生效）
git config --global http.proxy http://proxy-server-address:port
git config --global https.proxy http://proxy-server-address:port

# 如果你的代理是 SOCKS5 类型
# git config --global http.proxy socks5://proxy-server-address:port
# git config --global https.proxy socks5://proxy-server-address:port
```

**📌 提示：** 配置完成后，你可以通过 `git config --global --edit` 检查配置是否成功。如果网络恢复正常，也可以使用下面的命令取消代理设置：

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

#### 方案二：针对 SSH 协议

如果你的远程仓库地址长这样：`git@github.com:user/repo.git`，代码提交是通过 SSH 协议进行的。

**配置方法：** 你需要修改 **SSH 客户端的配置文件**（通常是 `~/.ssh/config`）。

1.  **安装工具：** 确保你安装了能够处理 SOCKS 代理的工具，如 **`nc` (netcat)** 或 **`connect-proxy`** 等。这里以使用 `nc` 为例（需配合 `ProxyCommand`）。
2.  **修改 SSH 配置：** 打开或创建 `~/.ssh/config` 文件，添加以下配置（假设你的代理是 **SOCKS5** 协议，地址是 `127.0.0.1:1080`）：

<!-- end list -->

```ssh
Host github.com
  Hostname github.com
  User git
  # 使用 nc 通过 SOCKS5 代理连接 
  # 注意：不同操作系统或 nc 版本参数可能略有不同
  ProxyCommand nc -X 5 -x 127.0.0.1:1080 %h %p
```

-----

### 💡 额外检查项

如果上述配置后依然失败，请检查以下几点：

1.  **代理类型是否匹配：** 你为 Git 配置的代理类型（HTTP/HTTPS/SOCKS）是否与你的代理工具提供的服务类型一致？
2.  **代理地址和端口是否正确：** 确保你填写的地址和端口是你的本地代理客户端（如 Clash、V2Ray 等）**对外监听的端口**。
3.  **SSH Key 是否正确：** 如果是 SSH 协议，确保你的 **SSH key** 已正确添加到 GitHub 账户，并且本地 **ssh-agent** 正在运行。

通过正确配置 Git 的网络连接，让它也能够通过代理服务器与 GitHub 进行通信，你的代码提交问题就迎刃而解了！

-----

你更倾向于使用 HTTPS 还是 SSH 协议来连接 GitHub 呢？在评论区分享你的经验吧！
