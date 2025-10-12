// 直接导入 JSON 数据，兼容 Cloudflare 环境
import sourceData from '../../assets/json/source.json';

// 配置为服务端渲染，适配 Cloudflare Pages Functions
export const prerender = false;

// 测试单个URL的延迟（优化版本）
async function testProxyLatency(url, timeout = 2000) {
  try {
    // 使用根路径进行轻量级测试，而不是测试具体文件
    const testUrl = `${url}/`;
    const startTime = Date.now();
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    const response = await fetch(testUrl, {
      method: 'HEAD',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    clearTimeout(timeoutId);
    const latency = Date.now() - startTime;
    
    if (response.ok || response.status === 404) {
      // 404也算作有效响应，说明服务器可达
      return {
        latency,
        status: 'active'
      };
    } else {
      return {
        latency: 9999,
        status: 'inactive'
      };
    }
  } catch (error) {
    return {
      latency: 9999,
      status: 'error'
    };
  }
}

// 并发测试多个URL的延迟（优化版本）
async function testMultipleProxies(urls, maxConcurrent = 20) {
  const results = new Map();
  
  // 分批处理，增加并发数以提高速度
  for (let i = 0; i < urls.length; i += maxConcurrent) {
    const batch = urls.slice(i, i + maxConcurrent);
    const batchPromises = batch.map(async (item) => {
      const testResult = await testProxyLatency(item.url);
      return {
        ...item,
        ...testResult
      };
    });
    
    const batchResults = await Promise.all(batchPromises);
    batchResults.forEach(result => {
      results.set(result.url, result);
    });
  }
  
  return Array.from(results.values());
}

export async function GET() {
  try {
    // 使用导入的数据，无需文件系统操作
    console.log('开始快速测试代理延迟...');
    
    // 对所有URL进行快速延迟测试
    const testedData = await testMultipleProxies(sourceData);
    
    // 转换数据格式为代理选择器需要的格式
    const proxyOptions = testedData
      .filter(item => item.status === 'active') // 只选择测试通过的代理
      .sort((a, b) => a.latency - b.latency) // 按延迟排序（延迟越低越好）
      .slice(0, 20) // 只取前20个延迟最低的
      .map((item, index) => {
        // 提取一级域名
        const domain = item.url.replace(/^https?:\/\//, '').split('/')[0];
        const location = item.location || '未知位置';
        const displayName = `${location} (${domain})`;
        
        return {
          value: item.url,
          name: displayName,
          url: item.url,
          default: index === 0, // 第一个设为默认
          status: item.status,
          latency: item.latency,
          description: `快速测试延迟: ${item.latency}ms | 服务器: ${item.server} | 位置: ${item.location || '未知'}`
        };
      });

    // 计算测试统计信息
    const totalTested = testedData.length;
    const activePoxies = testedData.filter(item => item.status === 'active').length;
    const averageLatency = testedData
      .filter(item => item.status === 'active')
      .reduce((sum, item) => sum + item.latency, 0) / activePoxies || 0;

    return new Response(JSON.stringify({
      success: true,
      data: {
        options: proxyOptions,
        last_updated: new Date().toISOString(),
        cache_duration: 5 * 60 * 1000, // 5分钟缓存（快速测试可以更频繁更新）
        test_stats: {
          total_tested: totalTested,
          active_proxies: activePoxies,
          average_latency: Math.round(averageLatency),
          test_completed_at: new Date().toISOString()
        }
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // 5分钟缓存
      }
    });
  } catch (error) {
    console.error('Error loading proxy config:', error);
    
    // 返回fallback配置
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to load remote config',
      data: {
        options: [
          {
            value: "https://gh-proxy.com",
            name: "gh-proxy.com",
            default: true,
            status: "active",
            latency: 0,
            description: "国内优选和V6支持请使用：https://v6.gh-proxy.com/"
          }
        ],
        last_updated: new Date().toISOString(),
        cache_duration: 5 * 60 * 1000
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}