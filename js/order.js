// Простая валидация и показ статуса для FormSubmit
document.getElementById('orderForm').addEventListener('submit', function(e) {
    const statusDiv = document.getElementById('formStatus');
    const submitBtn = this.querySelector('.submit-btn');
    const contact = document.getElementById('contact').value;
    const fileLink = document.getElementById('fileLink').value;
    const serviceType = document.getElementById('serviceType').value;
    
    // Простая проверка
    if (!serviceType || !fileLink || !contact) {
        e.preventDefault();
        statusDiv.innerHTML = 'Пожалуйста, заполните все обязательные поля';
        statusDiv.className = 'form-status error';
        return;
    }
    
    // Проверка ссылки
    if (!fileLink.includes('drive') && !fileLink.includes('disk') && !fileLink.includes('yandex') && !fileLink.includes('google')) {
        e.preventDefault();
        statusDiv.innerHTML = 'Вставьте ссылку на Google Drive или Яндекс.Диск';
        statusDiv.className = 'form-status error';
        return;
    }
    
    // Проверка Telegram
    if (!contact.includes('@') && !contact.match(/^[\d\s+()-]+$/)) {
        e.preventDefault();
        statusDiv.innerHTML = 'Введите корректный Telegram (@username или номер)';
        statusDiv.className = 'form-status error';
        return;
    }
    
    // Если всё ок, показываем загрузку
    statusDiv.innerHTML = 'Отправляем заявку...';
    statusDiv.className = 'form-status';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправляем...';
    
    // Форма отправится сама, мы просто показываем статус
    setTimeout(() => {
        // Этот код сработает, если форма не перенаправила страницу за 2 секунды
        if (submitBtn.disabled) {
            statusDiv.innerHTML = 'Заявка отправлена! Полина свяжется с вами в Telegram.';
            statusDiv.className = 'form-status success';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить заявку';
            document.getElementById('orderForm').reset();
        }
    }, 2000);
});

// Перенаправление после успешной отправки (опционально)
// FormSubmit сам может перенаправить на страницу "спасибо"