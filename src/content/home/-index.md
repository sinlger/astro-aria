---
# GitHub Proxy
github_proxy:
  title: Github Proxy
  sub_title: "支持GitHub（Git Clone、Releases、Archive、Gist、Raw）文件加速访问，提升下载体验。"
  proxy_selector:
    label: "选择代理服务"
    # 启用远程配置
    remote_config:
      enabled: true
      api_url: "/api/proxy-config.json"
      cache_duration: 5  # 缓存5分钟
      fallback_to_static: true
    # 静态配置作为fallback
    options:
      - value: "gh-proxy.com"
        name: "gh-proxy.com"
        default: true
        status: "active"
        speed: 5
        description: "稳定快速的GitHub代理服务"
      - value: "ghproxy.net"
        name: "ghproxy.net"
        default: false
        status: "active"
        speed: 4
        description: "可靠的GitHub镜像服务"
  input_placeholder: "贴入 Github 文件链接"
  button_text: "生成链接"
  warning_notice:
    main_text: "🎯 公益服务，请勿滥用"
    sub_text: "✨ 感谢网友分享，合理使用"
# Warning Notice
# CloneCard
service_tabs:
  tabs:
    - id: "git-clone"
      name: "Git Clone"
      icon_path: "M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
      input_label: "🔗 GitHub 仓库加速链接"
      input_placeholder: "https://github.com/username/repository"
      button_text: "复制链接"
      content:
        title: "Git Clone 方式"
        description: "使用 Git 命令克隆整个仓库，包含完整的版本历史和所有分支"
        info_title: "操作步骤："
        info_items:
          - "在上方输入 GitHub 仓库链接"
          - "点击开始下载生成 Git Clone 命令"
          - "复制命令到终端执行"
          - "等待克隆完成"
        icon_bg_color: "bg-primary/10 dark:bg-darkmode-primary/10"
        icon_color: "text-primary dark:text-darkmode-primary"
    - id: "wget"
      name: "Wget"
      icon_path: "M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
      input_label: "🔗 Wget下载"
      input_placeholder: "https://github.com/username/repository"
      button_text: "复制链接"
      content:
        title: "Wget 方式"
        description: "使用 wget 或 curl 命令下载压缩包，适合只需要源代码的场景"
        info_title: "特点："
        info_items:
          - "下载速度快，文件体积小"
          - "支持 wget 命令"
          - "自动解压到指定目录"
          - "适合服务器环境使用"
        icon_bg_color: "bg-green-100 dark:bg-green-900/30"
        icon_color: "text-green-600 dark:text-green-400"
    - id: "curl"
      name: "curl"
      icon_path: "M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
      input_label: "🔗 Curl下载"
      input_placeholder: "https://github.com/username/repository"
      button_text: "复制链接"
      content:
        title: "直接下载方式"
        description: "生成直接下载链接，可以在浏览器中直接下载 ZIP 压缩包"
        info_title: "优势："
        info_items:
          - "下载速度快，文件体积小"
          - "支持 Curl 命令"
          - "自动解压到指定目录"
          - "适合服务器环境使用"
        icon_bg_color: "bg-blue-100 dark:bg-blue-900/30"
        icon_color: "text-blue-600 dark:text-blue-400"
---