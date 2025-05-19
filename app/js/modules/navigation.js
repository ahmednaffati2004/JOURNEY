export const initNavigation = () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.main-nav');
    let isMenuOpen = false;

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
    }

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        mobileMenuBtn.classList.toggle('active', isMenuOpen);
        nav.classList.toggle('active', isMenuOpen);
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }

    // Handle dropdown menus
    const dropdowns = document.querySelectorAll('.has-dropdown');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });
    });
}; 