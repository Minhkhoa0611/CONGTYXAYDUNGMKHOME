document.addEventListener("DOMContentLoaded", function () {
    // Add Font Awesome for social icons if not already included
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fontAwesomeLink = document.createElement('link');
        fontAwesomeLink.rel = 'stylesheet';
        fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
        document.head.appendChild(fontAwesomeLink);
    }

    // Updated footer styles to remove border and align content
    const footerStyles = `
    .site-footer {
      background-color: #f5f5dc; /* Beige background */
      color: #000000; /* Black text */
      padding: 40px 20px;
      font-family: Arial, sans-serif;
    }
    .footer-container {
      display: flex;
      justify-content: space-between; /* Align content to left and right */
      align-items: flex-start; /* Align items to the top */
      gap: 20px;
      max-width: 1200px;
      margin: 0 auto 0 10px; /* Add left margin to shift the footer slightly to the left */
      padding: 0;
      border: none; /* Remove border */
    }
    .footer-section {
      text-align: left;
      flex: 1; /* Allow sections to take equal space */
    }
    .footer-section.map-container {
      text-align: right; /* Align map to the right */
    }
    .footer-section h3 {
      font-size: 22px;
      margin-bottom: 15px;
      color: #333333; /* Darker text for better contrast */
    }
    .footer-section ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .footer-section ul li {
      margin-bottom: 10px;
      font-size: 16px;
      line-height: 1.6;
      color: #555555; /* Slightly lighter text for readability */
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .footer-section ul li i {
      font-size: 18px;
      color: #333333; /* Icon color */
    }
    .footer-section a {
      color: #0056b3; /* Blue links */
      text-decoration: none;
      transition: color 0.3s;
    }
    .footer-section a:hover {
      color: #003d80; /* Darker blue on hover */
    }
    .social-icons {
      display: flex;
      gap: 15px;
      margin-top: 10px;
    }
    .social-icons a {
      font-size: 24px;
      color: #333333; /* Icon color */
      transition: transform 0.3s, color 0.3s;
    }
    .social-icons a:hover {
      transform: scale(1.2);
      color: #0056b3; /* Blue on hover */
    }
    .footer-section iframe {
      margin-left: 30px; /* Increase left margin to shift the iframe entirely to the left */
    }
    .map-container iframe {
      width: 100%;
      max-width: 350px; /* Increased max width */
      height: 250px; /* Height remains the same */
      border: none;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
      margin-left: 30px; /* Increase left margin for the map */
    }
    .footer-bottom {
      text-align: center;
      margin-top: 20px;
      font-size: 14px;
      color: #555555; /* Lighter text for footer bottom */
    }
    .footer-bottom a {
      color: #0056b3; /* Blue links */
      text-decoration: none;
      transition: color 0.3s ease;
    }
    .footer-bottom a:hover {
      text-decoration: underline;
      color: #003d80; /* Darker blue on hover */
    }
    .back-to-top {
      display: block;
      margin-top: 10px;
      font-size: 14px;
      font-weight: bold;
    }
    @media (max-width: 768px) {
      .footer-container {
        flex-direction: column; /* Stack sections vertically */
        align-items: center; /* Center align items */
        text-align: center; /* Center text */
      }
      .footer-section {
        margin-bottom: 20px; /* Add spacing between sections */
      }
      .footer-section.map-container iframe {
        margin-left: 0; /* Remove left margin for map on smaller screens */
      }
      .social-icons {
        justify-content: center; /* Center social icons */
      }
    }
    @media (max-width: 480px) {
      .footer-section h3 {
        font-size: 18px; /* Reduce heading size */
      }
      .footer-section ul li {
        font-size: 14px; /* Reduce text size */
      }
      .social-icons a {
        font-size: 20px; /* Reduce icon size */
      }
      .map-container iframe {
        max-width: 100%; /* Ensure map fits smaller screens */
        height: 200px; /* Adjust height for smaller screens */
      }
    }
    `;

    // Append styles to the document head
    const styleElement = document.createElement('style');
    styleElement.textContent = footerStyles;
    document.head.appendChild(styleElement);

    // Updated footer HTML with aligned content
    const footerHTML = `
    <footer class="site-footer">
      <div class="footer-container">
        <div class="footer-section">
          <h3>Liên hệ chúng tôi</h3>
          <ul>
            <li><i class="fas fa-envelope"></i>Email: 
                <a href="mailto:mkcons.az@gmail.com"><strong>mkcons.az@gmail.com</strong></a> | 
                <a href="mailto:mkhome.az@gmail.com"><strong>mkhome.az@gmail.com</strong></a>
            </li>
            <li><i class="fas fa-phone"></i>Hotline: <a href="tel:0867544809"><strong>0867544809</strong></a> | <a href="tel:0825864379"><strong>0825864379</strong></a></li>
            <li><i class="fas fa-map-marker-alt"></i>Địa chỉ: <strong>Ninh Bình, Ninh Hòa, Khánh Hòa, Việt Nam</strong></li>
          </ul>
          <h3>Kết nối với chúng tôi</h3>
          <div class="social-icons">
            <a href="https://www.facebook.com/xaydungkhanhhoa7979/" target="_blank" title="Facebook"><i class="fab fa-facebook"></i></a>
            <a href="https://www.instagram.com/mk.minhkhoa06/" target="_blank" title="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="https://www.youtube.com/@thietkemkhome79" target="_blank" title="YouTube"><i class="fab fa-youtube"></i></a>
            <a href="https://www.tiktok.com/@thietkexaydung79" target="_blank" title="TikTok"><i class="fab fa-tiktok"></i></a>
            <a href="https://t.me/mkhome79" target="_blank" title="Telegram"><i class="fab fa-telegram"></i></a>
          </div>
        </div>
        <div class="footer-section">
          <iframe 
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fxaydungkhanhhoa7979%2F&tabs=timeline&width=500&height=250&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" 
            width="350" 
            height="250" 
            style="border:none;overflow:hidden" 
            scrolling="no" 
            frameborder="0" 
            allowfullscreen="true" 
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
          </iframe>
        </div>
        <div class="footer-section map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d222.85544309726438!2d109.09062774377307!3d12.491373904441469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e1!3m2!1svi!2s!4v1745058475039!5m2!1svi!2s" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 Xây Dựng Minh Khoa. All rights reserved. | Designed by <a href="Mktech.html" target="_blank">MK Tech</a></p>
        <a href="#top" class="back-to-top">Quay Lại Đầu Trang</a>
      </div>
    </footer>
    `;

    // Replace the existing footer with the updated structure
    document.body.insertAdjacentHTML('beforeend', footerHTML);
});
