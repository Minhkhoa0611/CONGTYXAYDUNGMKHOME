(function () {
    function taoPopup() {
      const popup = document.createElement('div');
      Object.assign(popup.style, {
        position: 'fixed',
        width: '300px',
        background: '#fff',
        border: '2px solid #333',
        borderRadius: '10px',
        boxShadow: '0 0 15px rgba(0,0,0,0.5)',
        padding: '20px',
        zIndex: 9999,
        fontFamily: 'Arial, sans-serif',
        left: '20px',
        top: '100px' // lệch xuống một chút
      });
  
      // Nút đóng
      const closeBtn = document.createElement('span');
      closeBtn.innerHTML = '&times;';
      Object.assign(closeBtn.style, {
        position: 'absolute',
        top: '5px',
        right: '10px',
        cursor: 'pointer',
        fontWeight: 'bold'
      });
      closeBtn.onclick = () => popup.remove();
  
      // Nội dung
      const title = document.createElement('h3');
      title.innerText = '🎉 Chúc Mừng!';
  
      const para1 = document.createElement('p');
      para1.innerHTML = 'Bạn đã nhận được <strong>Voucher Thiết Kế - Thi Công</strong> của đơn vị chúng tôi.';
  
      const para2 = document.createElement('p');
      para2.innerText = 'Vui lòng inbox để được tư vấn và nhận thưởng.';
  
      const para3 = document.createElement('p');
      para3.innerHTML = `<strong>Liên hệ Page:</strong> <a href="https://www.facebook.com/xaydungkhanhhoa7979" target="_blank">Thiết Kế Xây Dựng</a>`;
  
      // Thêm phần tử vào popup
      popup.appendChild(closeBtn);
      popup.appendChild(title);
      popup.appendChild(para1);
      popup.appendChild(para2);
      popup.appendChild(para3);
  
      // Thêm popup vào body
      document.body.appendChild(popup);
    }
  
    // Gọi ngay khi trang load
    window.onload = taoPopup;
  })();
  