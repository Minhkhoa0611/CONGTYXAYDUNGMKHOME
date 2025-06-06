document.addEventListener("DOMContentLoaded", function () {
    console.log("menu.js loaded"); // Debug log to confirm script execution

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
            justify-content: center;
            align-items: center;
            gap: 10px; /* Giảm khoảng cách giữa các mục */
            list-style: none;
            padding: 10px 20px; /* Giảm padding */
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background: #f5f5dc; /* Màu nền be */
            z-index: 1000;
            height: 100px; /* Giảm chiều cao */
            transition: all 0.3s ease;
            box-shadow: none; /* Loại bỏ bóng xanh */
        }

        body {
            padding-top: 100px; /* Điều chỉnh padding-top để phù hợp với chiều cao menu */
        }

        .menu li {
            display: flex;
            align-items: center;
        }

        .menu .logo {
            display: block;
        }

        .menu .logo img {
            height: 80px;
            margin-top: 0;
        }

        .menu a {
            text-decoration: none;
            color: #333; /* Màu chữ tối */
            font-size: 16px; /* Giảm kích thước font chữ */
            font-weight: bold;
            padding: 8px 15px; /* Giảm padding */
            display: flex;
            align-items: center;
            gap: 8px; /* Khoảng cách giữa biểu tượng và chữ */
            transition: all 0.3s ease;
        }

        .menu a i {
            font-size: 20px; /* Kích thước biểu tượng */
            color: #555; /* Màu biểu tượng nhạt hơn chữ */
            transition: color 0.3s ease;
        }

        .menu a:hover {
            color: #ff7e5f; /* Màu chữ khi hover */
        }

        .menu a:hover i {
            color: #ff7e5f; /* Màu biểu tượng khi hover */
        }

        @media (max-width: 768px) {
            .menu {
                display: flex;
                flex-direction: row;
                overflow-x: auto;
                white-space: nowrap;
                gap: 0;
                padding: 10px;
                height: auto;
                scrollbar-width: thin; /* Cho Firefox */
            }

            .menu::-webkit-scrollbar {
                height: 8px; /* Cho Chrome, Safari, và Edge */
            }

            .menu::-webkit-scrollbar-thumb {
                background: #ccc;
                border-radius: 4px;
            }

            .menu li {
                flex: 0 0 auto; /* Ngăn các mục co lại */
            }
        }
    `;

    // Tạo HTML cho menu
    const menuHTML = `
        <ul class="menu">
            <li><a href="#" id="home-link"><i class="fas fa-home"></i> Trang Chủ</a></li>
            <li><a href="dichvu.html" target="_blank"><i class="fas fa-tools"></i> Dịch Vụ</a></li>
            <li><a href="phanmem.html" target="_blank"><i class="fas fa-laptop-code"></i> Phần Mềm</a></li>
            <li><a href="#" id="dutoan-link"><i class="fas fa-calculator"></i> Dự Toán Nhanh</a></li>
            <li class="logo">
                <a href="index.html">
                    <img src="Logo.png" alt="MK DESIGN">
                </a>
            </li>
            <li><a href="#baogia"><i class="fas fa-file-invoice-dollar"></i> Báo Giá</a></li>
            <li><a href="Profile/Profile.html" target="_blank" id="profile-link"><i class="fas fa-user"></i> Profile</a></li>
            <li><a href="#contact-form"><i class="fas fa-envelope"></i> Liên Hệ</a></li>
            <li><a href="#fb-comments"><i class="fas fa-comment-dots"></i> Góp Ý</a></li>
            <li><a href="#" id="thanhtoan-link"><i class="fas fa-credit-card"></i> Thanh Toán</a></li>
        </ul>
    `;

    // Thêm CSS vào trang
    const styleTag = document.createElement('style');
    styleTag.innerHTML = menuStyles;
    document.head.appendChild(styleTag);

    // Thêm menu trực tiếp vào body
    const nav = document.createElement('nav');
    nav.innerHTML = menuHTML;
    document.body.insertBefore(nav, document.body.firstChild);

    // Update event listener for "Trang Chủ" to navigate to the homepage
    document.getElementById("home-link").addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "index.html";
    });

    // Update event listener for the logo to navigate to the homepage
    document.querySelector(".logo a").addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "index.html";
    });

    // Update links with # to navigate to the correct page
    const menuLinks = document.querySelectorAll('a[href^="#"]');
    menuLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href").substring(1);
            if (targetId) {
                event.preventDefault();
                if (targetId === "fb-comments") {
                    const fbCommentsContainer = document.querySelector(".fb-comments-container");
                    if (fbCommentsContainer) {
                        fbCommentsContainer.scrollIntoView({ behavior: "smooth" });
                    }
                } else {
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: "smooth" });
                    }
                }
            }
        });
    });

    // Add ID to Facebook comments container if it exists
    const fbCommentsContainer = document.querySelector(".fb-comments-container");
    if (fbCommentsContainer) {
        fbCommentsContainer.id = "fb-comments";
    }

    // Add event listener for "Dư Toán Nhanh" to open a styled popup window
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

    // Add event listener for "Profile" to open a styled popup window
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

    // Add event listener for "Thanh Toán" to open a styled popup window
    document.getElementById("thanhtoan-link").addEventListener("click", function (event) {
        event.preventDefault();
        const width = 500; // Chiều rộng
        const height = 650; // Chiều cao
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
});
