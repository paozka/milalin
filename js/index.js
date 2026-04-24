(function() {
    let currentReviewIndex = 0;
    const reviewCards = document.querySelectorAll('.reviewCard');
    const prevBtn = document.getElementById('prevReviewBtn');
    const nextBtn = document.getElementById('nextReviewBtn');
    const dotsContainer = document.getElementById('galleryDots');
    
    function updateGallery() {
        reviewCards.forEach((card, index) => {
            card.classList.toggle('active', index === currentReviewIndex);
        });
        
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentReviewIndex);
        });
    }
    
    function nextReview() {
        currentReviewIndex = (currentReviewIndex + 1) % reviewCards.length;
        updateGallery();
    }
    
    function prevReview() {
        currentReviewIndex = (currentReviewIndex - 1 + reviewCards.length) % reviewCards.length;
        updateGallery();
    }
    
    function goToReview(index) {
        currentReviewIndex = index;
        updateGallery();
    }

    if (dotsContainer && reviewCards.length > 0) {
        reviewCards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToReview(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    if (nextBtn) nextBtn.addEventListener('click', nextReview);
    if (prevBtn) prevBtn.addEventListener('click', prevReview);
    
    let autoSlide = setInterval(nextReview, 5000);
    
    const galleryContainer = document.querySelector('.reviewsGallery');
    if (galleryContainer) {
        galleryContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
        galleryContainer.addEventListener('mouseleave', () => {
            autoSlide = setInterval(nextReview, 5000);
        });
    }
    
    const navItems = document.querySelectorAll('.nav h3');
    const sectionsMap = {
        'немного обо мне': '.abMeInf',
        'мои работы': '.myWorksInf',
        'прайс лист': '.priceInf',
        'отзывы': '#reviewBlock',
        'связь с креатором': 'footer'
    };
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const text = item.innerText.trim().toLowerCase();
            let targetSelector = null;
            
            if (text.includes('немного')) targetSelector = sectionsMap['немного обо мне'];
            else if (text.includes('работы')) targetSelector = sectionsMap['мои работы'];
            else if (text.includes('прайс')) targetSelector = sectionsMap['прайс лист'];
            else if (text.includes('отзыв')) targetSelector = sectionsMap['отзывы'];
            else if (text.includes('связь') || text.includes('креатор')) targetSelector = 'footer';
            
            if (targetSelector) {
                const element = document.querySelector(targetSelector);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    
    const scrollBtn = document.getElementById('scrollTopBtn');
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        });
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    const worksBlock = document.querySelector('.myWorksInf');
    if (worksBlock) {
        worksBlock.style.cursor = 'pointer';
        worksBlock.addEventListener('click', () => {
            alert("Портфолио: более 50+ успешных проектов. Reels для блогеров, монтаж лонгридов, анимация. Напишите мне — покажу примеры работ!");
        });
    }

    const socialDiv = document.querySelector('.myCocial');
    if (socialDiv) {
        socialDiv.addEventListener('click', () => {
            alert("Связаться со мной:\n\nTelegram: @milalin_editor\nПочта: milalin5650@video.ru\n\nБыстрый ответ в течение часа!");
        });
    }
})();