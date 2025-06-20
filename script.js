// Инициализация анимаций AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 50,
});

// Запускаем скрипты только после полной загрузки API Яндекс.Карт
ymaps.ready(init);

function init() {
    // --- Элементы для всплывающего окна ---
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');

    // --- Карта на странице контактов ---
    const mapContainer = document.getElementById('map');
    if (mapContainer.innerHTML === '') { // Создаем карту, только если контейнер пуст
        const myMap = new ymaps.Map("map", {
            center: [55.914612, 37.747191],
            zoom: 14,
            controls: ['zoomControl', 'fullscreenControl']
        });
        const myPlacemark = new ymaps.Placemark([55.914612, 37.747191], {
            hintContent: 'Наш склад', balloonContent: 'Московская область, г. Мытищи, ул. Промышленная, 1'
        }, { preset: 'islands#redDotIcon' }); // Метка в цвет сайта
        myMap.geoObjects.add(myPlacemark);
        myMap.behaviors.disable('scrollZoom');
    }

    // --- Калькулятор доставки ---
    const calculateBtn = document.getElementById('calculate-btn');
    const addressInput = document.getElementById('address');
    new ymaps.SuggestView('address');

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
    
    // --- Логика закрытия всплывающего окна ---
    const closeModal = () => modal.classList.add('hidden');
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
    });
}