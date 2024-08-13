document.addEventListener('focus', function(event) {
    if (event.target.type === 'password') {
        chrome.runtime.sendMessage({ action: 'showPopup' });
    }
}, true);
