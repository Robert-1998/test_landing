document.addEventListener('DOMContentLoaded', function() {
    // Логика калькулятора
    const areaInput = document.getElementById('area');
    const materialInput = document.getElementById('material');
    const lightsInput = document.getElementById('lights');
    const totalPriceElement = document.getElementById('total-price');

    function calculate() {
        if (!areaInput || !totalPriceElement) return;
        const area = parseFloat(areaInput.value) || 0;
        const materialPrice = parseFloat(materialInput.value);
        const lights = parseInt(lightsInput.value) || 0;
        const total = (area * materialPrice) + (lights * 350);
        totalPriceElement.innerText = total.toLocaleString('ru-RU');
    }

    if (areaInput) {
        [areaInput, materialInput, lightsInput].forEach(el => {
            el.addEventListener('input', calculate);
        });
        calculate();
    }

    // Логика лайтбокса с навигацией
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // Превращаем NodeList в массив, чтобы иметь доступ к индексам
    const galleryImages = Array.from(document.querySelectorAll('.gallery-img'));
    let currentIndex = 0;

    // Функция для обновления контента в модальном окне
    function updateImage(index) {
        currentIndex = index;
        if (lightboxImg && galleryImages[currentIndex]) {
            lightboxImg.src = galleryImages[currentIndex].src;
        }
    }

    // Открытие лайтбокса при клике на любое фото из галереи
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            if (lightbox) {
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                updateImage(index);
            }
        });
    });

    // Переключение на следующее изображение
    function showNext() {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= galleryImages.length) {
            nextIndex = 0; // Возврат к первому фото (зацикливание)
        }
        updateImage(nextIndex);
    }

    // Переключение на предыдущее изображение
    function showPrev() {
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = galleryImages.length - 1; // Переход к последнему фото
        }
        updateImage(prevIndex);
    }

    // Навешиваем события на кнопки навигации
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Предотвращаем закрытие окна при клике на кнопку
            showNext();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showPrev();
        });
    }

    // Закрытие модального окна
    const closeLightbox = () => {
        if (lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            // Закрываем только если клик был по фону, а не по картинке или кнопкам
            if (e.target === lightbox) closeLightbox();
        });
    }

    // Поддержка управления с клавиатуры
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.style.display === 'flex') {
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'Escape') closeLightbox();
        }
    });
});