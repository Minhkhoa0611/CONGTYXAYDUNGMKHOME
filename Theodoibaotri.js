
fetch('https://raw.githubusercontent.com/Minhkhoa0611/Website-MK-HOME/refs/heads/main/Baotri.txt')
  .then(response => {
    if (!response.ok) {
      throw new Error('Khong the lay du lieu');
    }
    return response.text();
  })
  .then(status => {
    const statusTrimmed = status.trim().toUpperCase();
    console.log('Trang thai:', statusTrimmed); // Debug
    if (statusTrimmed === 'OFF') {
      window.location.href = '404.html';
    }
  })
  .catch(error => {
    console.error('Loi khi kiem tra trang thai:', error);
    window.location.href = '404.html'; // Chuyen huong neu co loi
  });

