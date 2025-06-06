document.addEventListener("DOMContentLoaded", function () {
    console.log("menu2.js loaded"); // Debug log to confirm script execution

    // Tạo CSS cho menu
    const menuStyles = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        }

        .menu {
            display: flex;
            justify-content: space-between;
            align-items: center;
            list-style: none;
            padding: 10px 20px;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background: #f5f5dc;
            z-index: 1000;
            height: 60px;
            transition: all 0.3s ease;
            box-shadow: none;
        }

        body {
            padding-top: 80px; /* Adjust padding to account for the menu and 2cm margin */
        }

        .menu .logo {
            display: flex;
            align-items: center;
            gap: 25px;
        }

        .menu .page-name {
            font-size: 22px;
            font-weight: bold;
            color: #333;
            font-family: 'Cursive', sans-serif;
        }

        .menu .logo img {
            height: 50px;
        }

        .menu .menu-toggle {
            display: none;
            font-size: 24px;
            cursor: pointer;
        }

        .menu-items {
            display: flex;
            gap: 15px;
            list-style: none;
        }

        .menu-items a {
            text-decoration: none;
            color: #333;
            font-size: 16px;
            font-weight: bold;
            padding: 8px 15px;
            transition: all 0.3s ease;
        }

        .menu-items a:hover {
            color: #ff7e5f;
        }

        @media (max-width: 768px) {
            .menu {
                justify-content: space-between;
            }

            .menu .menu-toggle {
                display: block;
            }

            .menu-items {
                display: none;
                flex-direction: column;
                position: absolute;
                top: 60px;
                right: 0;
                background: #f5f5dc;
                width: 200px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }

            .menu-items.active {
                display: flex;
            }
        }
    `;

    // Tạo HTML cho menu
    const menuHTML = `
        <div class="menu">
            <div class="logo">
                <a href="index.html">
                    <img src="Logo.png" alt="MK HOME">
                </a>
                <span class="page-name">𝓜𝓚 𝓗𝓞𝓜𝓔</span>
            </div>
            <div class="menu-toggle">&#9776;</div>
            <ul class="menu-items">
                <li><a href="index.html"><i class="fas fa-home"></i> Trang Chủ</a></li>
                <li><a href="dichvu.html" target="_blank"><i class="fas fa-tools"></i> Dịch Vụ</a></li>
                <li><a href="#baogia"><i class="fas fa-file-invoice-dollar"></i> Báo Giá</a></li>
                <li><a href="#contact-form"><i class="fas fa-envelope"></i> Liên Hệ</a></li>
                <li><a href="phanmem.html" target="_blank"><i class="fas fa-laptop-code"></i> Phần Mềm</a></li>
                <li><a href="#" id="dutoan-link"><i class="fas fa-calculator"></i> Dự Toán Nhanh</a></li>
                <li><a href="Profile/Profile.html" target="_blank" id="profile-link"><i class="fas fa-user"></i> Profile</a></li>
                <li><a href="#fb-comments"><i class="fas fa-comment-dots"></i> Góp Ý</a></li>
                <li><a href="#" id="thanhtoan-link"><i class="fas fa-credit-card"></i> Thanh Toán</a></li>
            </ul>
        </div>
    `;

    // Thêm CSS vào trang
    const styleTag = document.createElement('style');
    styleTag.innerHTML = menuStyles;
    document.head.appendChild(styleTag);

    // Thêm menu trực tiếp vào body
    const nav = document.createElement('nav');
    nav.innerHTML = menuHTML;
    document.body.insertBefore(nav, document.body.firstChild);

    // Toggle menu visibility on mobile
    const menuToggle = document.querySelector(".menu-toggle");
    const menuItems = document.querySelector(".menu-items");
    menuToggle.addEventListener("click", () => {
        menuItems.classList.toggle("active");
    });

    // Add event listeners for specific links
    document.getElementById("dutoan-link").addEventListener("click", function (event) {
        event.preventDefault();
        const width = 1000;
        const height = 700;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;
        const popup = window.open(
            "PhanMem/Dutoanxaydung/Dự toán xây Dựng.html",
            "popupWindow",
            `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`
        );
        if (!popup) {
            alert("Popup bị chặn! Vui lòng cho phép popup trong trình duyệt.");
        }
    });

    document.getElementById("profile-link").addEventListener("click", function (event) {
        event.preventDefault();
        const width = 1000;
        const height = 700;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;
        const popup = window.open(
            "Profile/Profile.html",
            "profilePopup",
            `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`
        );
        if (!popup) {
            alert("Popup bị chặn! Vui lòng cho phép popup trong trình duyệt.");
        }
    });

    document.getElementById("thanhtoan-link").addEventListener("click", function (event) {
        event.preventDefault();
        const width = 500;
        const height = 650;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;
        const popup = window.open(
            "PhanMem/thanhtoan/thanhtoan.html",
            "thanhtoanPopup",
            `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`
        );
        if (!popup) {
            alert("Popup bị chặn! Vui lòng cho phép popup trong trình duyệt.");
        }
    });

    // Add event listener for "Báo Giá" menu item to open in a popup
    document.querySelector('a[href="#baogia"]').addEventListener("click", function (event) {
        event.preventDefault();
        const width = 1000;
        const height = 700;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;
        const popup = window.open(
            "pricing.html",
            "pricingPopup",
            `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`
        );
        if (!popup) {
            alert("Popup bị chặn! Vui lòng cho phép popup trong trình duyệt.");
        }
    });

    // Add event listener for "Góp Ý" menu item to open in a popup
    document.querySelector('a[href="#fb-comments"]').addEventListener("click", function (event) {
        event.preventDefault();
        const width = 800;
        const height = 600;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;
        const popup = window.open(
            "fb-comments.html",
            "fbCommentsPopup",
            `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`
        );
        if (!popup) {
            alert("Popup bị chặn! Vui lòng cho phép popup trong trình duyệt.");
        }
    });
});
