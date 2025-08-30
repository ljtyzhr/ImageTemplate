
// 获取 URL 参数
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
// 示例：获取名为 "title" 的参数并设置到页面
// 页面初始化
function initPage() {
    setTitleFromQuery();
    includeHTML('header.html', 'site-header', true);
    includeHTML('footer.html', 'site-footer', false);
    insertGA();
}

// 根据 URL 参数设置标题
function setTitleFromQuery() {
    const title = getQueryParam('title');
    if (title) {
    const titleElem = document.querySelector('.image-title');
    if (titleElem) titleElem.textContent = title;
    }
}

// 动态 include HTML 文件
function includeHTML(file, className, insertAtTop) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            const elem = document.createElement(insertAtTop ? 'header' : 'footer');
            elem.className = className;
            elem.innerHTML = data;
            elem.style.position = 'fixed';
            elem.style.left = '0';
            elem.style.width = '100%';
            elem.style.zIndex = '1000';
            if (insertAtTop) {
                elem.style.top = '0';
                document.body.insertBefore(elem, document.body.firstChild);
            } else {
                elem.style.bottom = '0';
                document.body.appendChild(elem);
            }
        });
}

// 插入 GA 统计代码
function insertGA() {
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    document.head.appendChild(gaScript);

    const inlineScript = document.createElement('script');
    inlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID');
    `;
    document.head.appendChild(inlineScript);
}

window.onload = initPage;