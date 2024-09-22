// Event listener for menu toggle button
document.getElementById('menu-toggle')?.addEventListener('click', function () {
    let menuToggle = document.getElementById('menu-toggle');
    let menuToggleElement = document.getElementById('menu-toggle-element');

    // Toggle menu visibility
    menuToggleElement?.classList.toggle('duration-200', false);
    menuToggle?.classList.toggle('hamburger-toggle');
});