document.addEventListener('DOMContentLoaded', function () {
    const testAdUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    let isModalVisible = false; // Track if the modal is currently visible

    function showAdBlockWarning() {
        if (isModalVisible) return; // Prevent multiple modals from appearing

        isModalVisible = true;

        const modalOverlay = document.createElement('div');
        modalOverlay.id = 'ad-block-overlay';
        modalOverlay.style.position = 'fixed';
        modalOverlay.style.top = '0';
        modalOverlay.style.left = '0';
        modalOverlay.style.width = '100%';
        modalOverlay.style.height = '100%';
        modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modalOverlay.style.zIndex = '10000';
        modalOverlay.style.display = 'flex';
        modalOverlay.style.alignItems = 'center';
        modalOverlay.style.justifyContent = 'center';
        modalOverlay.style.animation = 'fadeIn 0.5s ease';

        const modal = document.createElement('div');
        modal.id = 'ad-block-modal';
        modal.style.backgroundColor = '#fff';
        modal.style.borderRadius = '10px';
        modal.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
        modal.style.padding = '20px';
        modal.style.textAlign = 'center';
        modal.style.maxWidth = '400px';
        modal.style.width = '90%';
        modal.style.animation = 'scaleIn 0.5s ease';

        modal.innerHTML = `
            <img src="Logo.png" alt="Logo" style="width: 80px; height: auto; margin-bottom: 15px;">
            <h2 style="color: #0055ff; margin-bottom: 15px;">Thông Báo</h2>
            <p style="color: #333; font-size: 16px; margin-bottom: 20px;">
                Chúng tôi phát hiện bạn đang sử dụng tiện ích chặn quảng cáo. 
                Vui lòng tắt tiện ích này để tiếp tục sử dụng trang web.
            </p>
            <button id="close-ad-block-modal" style="padding: 10px 20px; background-color: #0055ff; color: #fff; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; transition: background-color 0.3s;">
                Đóng
            </button>
        `;

        modalOverlay.appendChild(modal);
        document.body.appendChild(modalOverlay);

        document.getElementById('close-ad-block-modal').addEventListener('click', function () {
            modalOverlay.remove();
            isModalVisible = false; // Allow the modal to reappear after 2 seconds if needed
        });

        // Add hover effect for the button
        const closeButton = document.getElementById('close-ad-block-modal');
        closeButton.addEventListener('mouseover', function () {
            closeButton.style.backgroundColor = '#0033cc';
        });
        closeButton.addEventListener('mouseout', function () {
            closeButton.style.backgroundColor = '#0055ff';
        });
    }

    function checkAdBlock() {
        if (isModalVisible) return; // Skip check if the modal is already visible

        const script = document.createElement('script');
        script.src = testAdUrl;
        script.onerror = function () {
            showAdBlockWarning();
        };
        document.body.appendChild(script);
        setTimeout(() => {
            script.remove();
        }, 100);
    }

    // Check for ad blocker every 2 seconds
    setInterval(checkAdBlock, 2000);
});
