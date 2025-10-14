---
title: git 设置代理三种设置方式详解
description: GitHub 无法访问？别担心！这篇文章提供了最全面、最有效的解决方案，教你如何通过修改 hosts 文件、切换协议、检查网络设置等方法，快速恢复对 GitHub 的正常访问。
keywords: GitHub 无法访问, GitHub 打不开, hosts 文件修改, DNS 解析, GitHub 故障排除, Git 连接失败, SSH/HTTPS 切换
dateFormatted: Jan 15, 2025
---

Git 设置代理主要通过配置 `git config` 中的 `http.proxy` 和 `https.proxy` 参数来实现。这对于解决网络访问限制（例如访问 GitHub 缓慢或失败）非常有用。

以下是几种常见的设置代理的方法：

-----

### 1\. 全局（Global）设置代理

全局设置的代理会写入你的用户主目录下的 .gitconfig 文件中，对所有 Git 仓库生效。。

### Git 全局（Global）设置代理的详细代码

全局设置的代理会写入你的用户主目录下的 `.gitconfig` 文件中，对所有 Git 仓库生效。


这是最标准的代理设置方式，代理服务器通常提供 HTTP 协议服务。

#### HTTP/HTTPS全局设置命令：

```bash
# 假设你的 HTTP/HTTPS 代理地址是 http://127.0.0.1:7890

# 1. 设置 HTTP 协议的 Git 操作使用代理
git config --global http.proxy http://127.0.0.1:7890

# 2. 设置 HTTPS 协议的 Git 操作使用代理
git config --global https.proxy http://127.0.0.1:7890
```


SOCKS5 代理在某些场景下（尤其是在国内访问 GitHub）更常见，因为它允许传输任何数据，不限于 HTTP。

#### SOCKS5 全局设置命令（推荐使用 `socks5h`）：

```bash
# 假设你的 SOCKS5 代理地址是 127.0.0.1:1080

# 1. 设置 HTTP 协议的 Git 操作使用 SOCKS5 代理
# 'socks5h' (带 h) 表示 DNS 解析也通过代理进行，推荐使用。
git config --global http.proxy socks5h://127.0.0.1:1080

# 2. 设置 HTTPS 协议的 Git 操作使用 SOCKS5 代理
git config --global https.proxy socks5h://127.0.0.1:1080
```


如果你的代理需要认证，可以将用户名和密码写在 URL 中（请注意 URL 编码和安全性）。

#### HTTP/HTTPS 全局设置命令（带认证）：

```bash
# 格式：<协议>://<用户名>:<密码>@<主机>:<端口>
# 示例：用户名 user，密码 pass

git config --global https.proxy https://user:pass@127.0.0.1:7890
```


你可以使用以下命令来验证你的配置是否成功写入：

```bash
# 列出所有的全局配置
git config --global -l

# 只查看代理相关的配置
git config --global --get http.proxy
git config --global --get https.proxy
```

### 2\. 单个仓库（Local）设置代理

如果你只想让某个特定的仓库使用代理，可以在该仓库目录下执行命令，去掉 `--global`：

```bash
# 进入你的仓库目录
cd /path/to/your/repo

# 设置 SOCKS5 代理（只对当前仓库生效）
git config http.proxy socks5://127.0.0.1:1080
git config https.proxy socks5://127.0.0.1:1080
```

### 3\. 为特定域名设置代理（最常用且推荐）

如果你只需要为 GitHub 等特定域名设置代理，而其他 Git 仓库（如公司内部 GitLab）保持直连，可以使用这个方法。

```bash
# 示例：仅为 GitHub 设置 SOCKS5 代理
git config --global http.https://github.com.proxy socks5://127.0.0.1:1080

# 示例：仅为特定的公司 GitLab 设置 HTTP 代理
git config --global http.https://gitlab.example.com.proxy http://127.0.0.1:7890
```

###  如何查看和取消代理

#### 查看设置：
```bash
# 列出所有的全局配置
git config --global -l

# 只查看代理相关的配置
git config --global --get http.proxy
git config --global --get https.proxy
```
#### 取消设置：

```bash

# 取消 HTTP 代理设置
git config --global --unset http.proxy

# 取消 HTTPS 代理设置
git config --global --unset https.proxy

# 取消特定域名代理
git config --global --unset http.https://<domain>.proxy
```

-----

### 💡 额外提示：SSH 方式的代理

上面的方法只对 **HTTPS** 协议的 Git URL（例如 `https://github.com/user/repo.git`）有效。

如果你使用 **SSH** 协议（例如 `git@github.com:user/repo.git`），你需要通过配置 SSH 客户端来实现代理，这通常是在你的 `~/.ssh/config` 文件中添加配置，使用 `ProxyCommand`：

```config
# ~/.ssh/config 文件中添加以下内容
Host github.com
    User git
    Hostname ssh.github.com  # 或者 github.com
    Port 443                 # GitHub 也支持 443 端口
    # 使用 nc (netcat) 或 socat 等工具通过 SOCKS5 代理
    ProxyCommand nc -X 5 -x 127.0.0.1:1080 %h %p
    # 如果没有安装 nc，也可以使用：
    # ProxyCommand connect -S 127.0.0.1:1080 %h %p
```

**注意：** SSH 代理的配置方法和所需的工具（如 `nc`、`connect`）在不同系统上可能有所不同。