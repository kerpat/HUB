// Инициализация анимаций AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 50,
});

// --- ЛОГИКА ГАМБУРГЕР-МЕНЮ ---
const burgerBtn = document.getElementById('burger-menu');
const mobileMenu = document.getElementById('mobile-menu');
const closeMobileMenuBtn = document.getElementById('close-mobile-menu');
const mobileMenuLinks = mobileMenu.querySelectorAll('a');

function openMenu() {
    mobileMenu.classList.add('is-open');
    document.body.classList.add('menu-open'); // Блокируем скролл
}

function closeMenu() {
    mobileMenu.classList.remove('is-open');
    document.body.classList.remove('menu-open'); // Разблокируем скролл
}

burgerBtn.addEventListener('click', openMenu);
closeMobileMenuBtn.addEventListener('click', closeMenu);

// Закрываем меню при клике на любую ссылку в нем
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// --- Яндекс.Карты и все остальное ---
ymaps.ready(init);

function init() {
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');

    const mapContainer = document.getElementById('map');
    if (mapContainer && mapContainer.innerHTML === '') {
        const myMap = new ymaps.Map("map", {
            center: [55.914612, 37.747191],
            zoom: 14,
            controls: ['zoomControl', 'fullscreenControl']
        });
        const myPlacemark = new ymaps.Placemark([55.914612, 37.747191], {
            hintContent: 'Наш склад', balloonContent: 'Московская область, г. Мытищи, ул. Промышленная, 1'
        }, { preset: 'islands#redDotIcon' });
        myMap.geoObjects.add(myPlacemark);
        myMap.behaviors.disable('scrollZoom');
    }

    const calculateBtn = document.getElementById('calculate-btn');
    const addressInput = document.getElementById('address');
    if(addressInput) new ymaps.SuggestView('address');

    if(calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            if (!addressInput.value) {
                addressInput.style.borderColor = 'red';
                setTimeout(() => { addressInput.style.borderColor = '' }, 2000);
                return;
            }

            const originalButtonText = calculateBtn.innerHTML;
            calculateBtn.disabled = true;
            calculateBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Рассчитываем...';

            setTimeout(() => {
                calculateBtn.disabled = false;
                calculateBtn.innerHTML = originalButtonText;
                modal.classList.remove('hidden');
            }, 1500);
        });
    }
    
    const closeModal = () => modal.classList.add('hidden');
    if(closeBtn) closeBtn.addEventListener('click', closeModal);
    if(modal) modal.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
    });
}