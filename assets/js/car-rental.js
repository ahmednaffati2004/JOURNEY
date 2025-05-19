// تهيئة Swiper للعرض المتحرك
const carRentalSwiper = new Swiper('.populer-activities', {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
        1200: {
            slidesPerView: 4,
        }
    }
});

// تفعيل أزرار المفضلة
document.querySelectorAll('.icon-bookmark').forEach(bookmark => {
    bookmark.addEventListener('click', function() {
        this.classList.toggle('active');
    });
}); 