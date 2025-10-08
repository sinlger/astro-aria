// Add your javascript here

window.darkMode = false;

const stickyClasses = ["fixed", "h-14"];
const unstickyClasses = ["absolute", "h-20"];
const stickyClassesContainer = [
	"border-neutral-300/50",
	"bg-white/80",
	"dark:border-neutral-600/40",
	"dark:bg-neutral-900/60",
	"backdrop-blur-2xl",
];
const unstickyClassesContainer = ["border-transparent"];
let headerElement = null;

document.addEventListener("DOMContentLoaded", () => {
	headerElement = document.getElementById("header");

	if (
		localStorage.getItem("dark_mode") &&
		localStorage.getItem("dark_mode") === "true"
	) {
		window.darkMode = true;
		showNight();
	} else {
		showDay();
	}
	stickyHeaderFuncionality();
	applyMenuItemClasses();
	evaluateHeaderPosition();
	mobileMenuFunctionality();
	initTabSwitching();
	initCopyButtons();
	initGithubProxyButton();
	// 初始化远程代理配置
	initRemoteProxyConfig();
});

// window.toggleDarkMode = function(){
//     document.documentElement.classList.toggle('dark');
//     if(document.documentElement.classList.contains('dark')){
//         localStorage.setItem('dark_mode', true);
//         window.darkMode = true;
//     } else {
//         window.darkMode = false;
//         localStorage.setItem('dark_mode', false);
//     }
// }

window.stickyHeaderFuncionality = () => {
	window.addEventListener("scroll", () => {
		evaluateHeaderPosition();
	});
};

window.evaluateHeaderPosition = () => {
	if (window.scrollY > 16) {
		headerElement.firstElementChild.classList.add(...stickyClassesContainer);
		headerElement.firstElementChild.classList.remove(
			...unstickyClassesContainer,
		);
		headerElement.classList.add(...stickyClasses);
		headerElement.classList.remove(...unstickyClasses);
		document.getElementById("menu").classList.add("top-[56px]");
		document.getElementById("menu").classList.remove("top-[75px]");
	} else {
		headerElement.firstElementChild.classList.remove(...stickyClassesContainer);
		headerElement.firstElementChild.classList.add(...unstickyClassesContainer);
		headerElement.classList.add(...unstickyClasses);
		headerElement.classList.remove(...stickyClasses);
		document.getElementById("menu").classList.remove("top-[56px]");
		document.getElementById("menu").classList.add("top-[75px]");
	}
};

document.getElementById("darkToggle").addEventListener("click", () => {
	if (document.documentElement.classList.contains("dark")) {
		localStorage.removeItem("dark_mode");
		showDay();
	} else {
		localStorage.setItem("dark_mode", true);
		showNight();
	}
});

function showDay () {
	document.getElementById("dayText").classList.remove("hidden");
	document.getElementById("nightText").classList.add("hidden");

	document.getElementById("moon").classList.add("hidden");
	document.getElementById("sun").classList.remove("hidden");

	document.documentElement.classList.remove("dark");
}

function showNight () {
	document.getElementById("nightText").classList.remove("hidden");
	document.getElementById("dayText").classList.add("hidden");

	document.getElementById("sun").classList.add("hidden");
	document.getElementById("moon").classList.remove("hidden");

	document.documentElement.classList.add("dark");
}

window.applyMenuItemClasses = () => {
	const menuItems = document.querySelectorAll("#menu a");
	for (let i = 0; i < menuItems.length; i++) {
		if (menuItems[i].pathname === window.location.pathname) {
			menuItems[i].classList.add("text-neutral-900", "dark:text-white");
		}
	}
	//:class="{ 'text-neutral-900 dark:text-white': window.location.pathname == '{menu.url}', 'text-neutral-700 dark:text-neutral-400': window.location.pathname != '{menu.url}' }"
};

function mobileMenuFunctionality () {
	document.getElementById("openMenu").addEventListener("click", () => {
		openMobileMenu();
	});

	document.getElementById("closeMenu").addEventListener("click", () => {
		closeMobileMenu();
	});
}

window.openMobileMenu = () => {
	document.getElementById("openMenu").classList.add("hidden");
	document.getElementById("closeMenu").classList.remove("hidden");
	document.getElementById("menu").classList.remove("hidden");
	document.getElementById("mobileMenuBackground").classList.add("opacity-0");
	document.getElementById("mobileMenuBackground").classList.remove("hidden");

	setTimeout(() => {
		document
			.getElementById("mobileMenuBackground")
			.classList.remove("opacity-0");
	}, 1);
};

window.closeMobileMenu = () => {
	document.getElementById("closeMenu").classList.add("hidden");
	document.getElementById("openMenu").classList.remove("hidden");
	document.getElementById("menu").classList.add("hidden");
	document.getElementById("mobileMenuBackground").classList.add("hidden");
};

// Tab switching functionality
function initTabSwitching () {
	const tabButtons = document.querySelectorAll('[data-tab]');

	if (tabButtons.length === 0) return; // 如果没有tab按钮，直接返回

	tabButtons.forEach(button => {
		button.addEventListener('click', () => {
			const targetTabId = button.getAttribute('data-tab');
			switchTab(targetTabId, button);
		});
	});
}

function switchTab (activeTabId, activeButton) {
	// 获取所有tab按钮和内容
	const allTabButtons = document.querySelectorAll('[data-tab]');
	const allTabContents = document.querySelectorAll('[id$="-content"]');

	// 重置所有tab按钮的样式
	allTabButtons.forEach(button => {
		// 移除激活状态的类
		button.classList.remove('border-blue-600', 'dark:border-blue-400', 'text-blue-600', 'dark:text-blue-400', 'active');
		// 添加非激活状态的类
		button.classList.add('border-transparent', 'text-neutral-500', 'dark:text-neutral-400');
	});

	// 隐藏所有tab内容
	allTabContents.forEach(content => {
		content.classList.add('hidden');
	});

	// 激活当前选中的tab按钮
	activeButton.classList.remove('border-transparent', 'text-neutral-500', 'dark:text-neutral-400');
	activeButton.classList.add('border-blue-600', 'dark:border-blue-400', 'text-blue-600', 'dark:text-blue-400', 'active');

	// 显示对应的tab内容
	const targetContent = document.getElementById(`${activeTabId}-content`);
	if (targetContent) {
		targetContent.classList.remove('hidden');
	}
}

// Copy functionality
function initCopyButtons () {
	const copyButtons = document.querySelectorAll('[data-copy-button]');

	if (copyButtons.length === 0) return; // 如果没有复制按钮，直接返回

	copyButtons.forEach(button => {
		button.addEventListener('click', async () => {
			const targetInputId = button.getAttribute('data-copy-target');
			await copyToClipboard(targetInputId, button);
		});
	});
}

async function copyToClipboard (inputId, button) {
	try {
		const inputElement = document.getElementById(inputId);
		if (!inputElement) {
			console.error(`Input element with id "${inputId}" not found`);
			return;
		}

		const textToCopy = inputElement.value || inputElement.placeholder || '';

		if (!textToCopy) {
			showCopyFeedback(button, '没有内容可复制', false);
			return;
		}

		// 使用现代的 Clipboard API
		if (navigator.clipboard && window.isSecureContext) {
			await navigator.clipboard.writeText(textToCopy);
		} else {
			// 降级方案：使用传统的 document.execCommand
			const textArea = document.createElement('textarea');
			textArea.value = textToCopy;
			textArea.style.position = 'fixed';
			textArea.style.left = '-999999px';
			textArea.style.top = '-999999px';
			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();

			try {
				// document.execCommand('copy');
			} catch (err) {
				console.error('复制失败:', err);
				showCopyFeedback(button, '复制失败', false);
				return;
			} finally {
				document.body.removeChild(textArea);
			}
		}

		showCopyFeedback(button, '复制成功!', true);

	} catch (err) {
		console.error('复制失败:', err);
		showCopyFeedback(button, '复制失败', false);
	}
}

function showCopyFeedback (button, message, isSuccess) {
	const originalText = button.querySelector('.copy-text').textContent;
	const textElement = button.querySelector('.copy-text');

	// 更新按钮文本和样式
	textElement.textContent = message;

	if (isSuccess) {
		button.classList.remove('bg-blue-600', 'hover:bg-blue-700');
		button.classList.add('bg-green-600', 'hover:bg-green-700');
	} else {
		button.classList.remove('bg-blue-600', 'hover:bg-blue-700');
		button.classList.add('bg-red-600', 'hover:bg-red-700');
	}

	// 2秒后恢复原始状态
	setTimeout(() => {
		textElement.textContent = originalText;
		button.classList.remove('bg-green-600', 'hover:bg-green-700', 'bg-red-600', 'hover:bg-red-700');
		button.classList.add('bg-blue-600', 'hover:bg-blue-700');
	}, 2000);
}

/**
 * 初始化GitHub代理按钮功能
 */
function initGithubProxyButton () {
	const button = document.getElementById('github-proxy-button');
	if (!button) return;

	button.addEventListener('click', handleGithubProxyClick);
}

/**
 * 处理GitHub代理按钮点击事件
 */
function handleGithubProxyClick (event) {
	const button = event.target;
	const targetInputId = button.getAttribute('data-target-input');

	// 隐藏之前的错误提示
	hideGithubInputError();

	if (!targetInputId) {
		console.error('未找到目标input的ID');
		return;
	}

	const inputElement = document.getElementById(targetInputId);
	if (!inputElement) {
		console.error(`未找到ID为 "${targetInputId}" 的input元素`);
		return;
	}

	// 获取input中的内容
	const inputValue = inputElement.value.trim();

	if (!inputValue) {
		showGithubInputError('请先输入GitHub URL');
		inputElement.focus();
		return;
	}

	// 处理GitHub URL
	processGithubUrl(inputValue, button);
}

/**
 * 处理GitHub URL
 * @param {string} url - GitHub URL
 * @param {HTMLElement} button - 按钮元素
 */
function processGithubUrl (url, button) {
	console.log('获取到的GitHub URL:', url);

	// 这里可以添加具体的处理逻辑
	// 例如：验证URL格式、转换为代理URL等

	// 临时显示获取到的内容（可以根据需要修改）
	const originalText = button.textContent;
	button.textContent = '处理中...';
	button.disabled = true;

	// 校验github url格式
	if (!/^https?:\/\/github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+(\.git)?$/.test(url)) {
		showGithubInputError('请输入正确的GitHub URL格式');
		button.textContent = originalText;
		button.disabled = false;
		return;
	}

	// 校验通过，一秒后恢复按钮原状
	button.textContent = originalText;
	button.disabled = false;
	populateTabInputs(url);

}

/**
 * 显示GitHub输入错误提示
 * @param {string} message - 错误消息
 */
function showGithubInputError (message) {
	const errorContainer = document.getElementById('github-input-error');
	const errorText = document.getElementById('github-input-error-text');

	if (errorContainer && errorText) {
		errorText.textContent = message;
		errorContainer.classList.remove('hidden');
	}
}

/**
 * 隐藏GitHub输入错误提示
 */
function hideGithubInputError () {
	const errorContainer = document.getElementById('github-input-error');

	if (errorContainer) {
		errorContainer.classList.add('hidden');
	}
}

function populateTabInputs (url) {
	// 获取proxy-selector的选中值
	const proxySelector = document.getElementById('proxy-selector');
	const selectedProxyUrl = proxySelector ? proxySelector.value : '';
	console.log('Selected proxy URL:', selectedProxyUrl);
	
	// 只获取Service Tabs区域中的input元素
	const serviceTabsContainer = document.getElementById('service-tabs');
	const tabInputs = serviceTabsContainer ? serviceTabsContainer.querySelectorAll('input[id$="-input"]') : [];

	// 定义每个input的固定值
	const inputValues = ['git clone ', 'wget ', 'curl -L -O '];
	console.log('Found tab inputs:', tabInputs.length);

	tabInputs.forEach((input, index) => {
		if (index < inputValues.length) {
			// 将input的值设置为对应的固定值
			input.value = `${inputValues[index]} ${selectedProxyUrl}/${url}`;

			// 启用input元素（移除disabled属性）
			input.disabled = true;
		}
	});
}

// 远程代理配置管理
let proxyConfigCache = null;
let proxyConfigCacheTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

/**
 * 初始化远程代理配置
 */
async function initRemoteProxyConfig() {
	try {
		const config = await loadRemoteProxyConfig();
		if (config && config.options && config.options.length > 0) {
			updateProxySelector(config.options);
		}
	} catch (error) {
		console.warn('Failed to load remote proxy config, using static config:', error);
	}
}

/**
 * 加载远程代理配置
 */
async function loadRemoteProxyConfig() {
	// 检查缓存
	if (proxyConfigCache && proxyConfigCacheTime) {
		const now = Date.now();
		if (now - proxyConfigCacheTime < CACHE_DURATION) {
			console.log('Using cached proxy config');
			return proxyConfigCache;
		}
	}

	try {
		console.log('Loading remote proxy config...');
		const response = await fetch('/api/proxy-config.json');
		
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		
		const result = await response.json();
		
		if (result.success && result.data) {
			// 更新缓存
			proxyConfigCache = result.data;
			proxyConfigCacheTime = Date.now();
			console.log(`Loaded ${result.data.options.length} proxy options from remote config`);
			return result.data;
		} else {
			throw new Error(result.error || 'Invalid response format');
		}
	} catch (error) {
		console.error('Error loading remote proxy config:', error);
		throw error;
	}
}

/**
 * 更新代理选择器的选项
 */
function updateProxySelector(options) {
	const proxySelector = document.getElementById('proxy-selector');
	if (!proxySelector) {
		console.warn('Proxy selector element not found');
		return;
	}

	// 清空现有选项
	proxySelector.innerHTML = '';

	// 添加新选项
	options.forEach(option => {
		const optionElement = document.createElement('option');
		optionElement.value = option.value;
		optionElement.textContent = option.name;
		optionElement.title = option.description || '';
		
		if (option.default) {
			optionElement.selected = true;
		}
		
		proxySelector.appendChild(optionElement);
	});

	console.log(`Updated proxy selector with ${options.length} options`);
}

/**
 * 手动刷新代理配置
 */
async function refreshProxyConfig() {
	// 清除缓存
	proxyConfigCache = null;
	proxyConfigCacheTime = null;
	
	try {
		const config = await loadRemoteProxyConfig();
		if (config && config.options && config.options.length > 0) {
			updateProxySelector(config.options);
			return true;
		}
	} catch (error) {
		console.error('Failed to refresh proxy config:', error);
		return false;
	}
}

// 将刷新函数暴露到全局，以便在控制台或其他地方调用
window.refreshProxyConfig = refreshProxyConfig;