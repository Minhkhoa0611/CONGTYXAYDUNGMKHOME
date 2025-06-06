document.addEventListener("DOMContentLoaded", function () {
    const contactInfoSection = document.querySelector(".contact-info");
    const footerSection = document.querySelector(".site-footer");

    if (contactInfoSection && footerSection) {
        const fbCommentsHTML = `
            <div id="fb-root"></div>
            <div class="fb-comments-container" style="margin: 30px auto; width: 800px; height: auto; padding: 20px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); background-color: #ffffff; border: 1px solid #e0e0e0; overflow: hidden;">
                <div style="text-align: center; margin-bottom: 15px;">
                    <img src="Logo.png" alt="MK Logo" style="height: 60px; width: auto; border-radius: 8px; box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);">
                </div>
                <h3 style="font-size: 20px; font-weight: bold; color: #0055ff; margin-bottom: 15px; text-align: center; text-shadow: 1px 1px 2px rgba(0, 85, 255, 0.3);">
                    Ý Kiến Khách Hàng
                </h3>
                <div class="fb-comments" 
                     data-href="https://www.xaydungminhkhoa.online" 
                     data-width="100%" 
                     data-numposts="5" 
                     style="border-top: 1px solid #e0e0e0; padding-top: 15px; overflow-x: hidden;">
                </div>
            </div>
        `;

        contactInfoSection.insertAdjacentHTML("afterend", fbCommentsHTML);

        // Load Facebook SDK
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v19.0";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
});
