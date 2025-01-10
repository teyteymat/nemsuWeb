(() => {
    // Variables for the navigation menu
    const openNavMenu = document.querySelector(".open-nav-menu"),
          closeNavMenu = document.querySelector(".close-nav-menu"),
          navMenu = document.querySelector(".nav-menu"),
          menuOverlay = document.querySelector(".menu-overlay"),
          mediaSize = 991;

    openNavMenu.addEventListener("click", toggleNav);
    closeNavMenu.addEventListener("click", toggleNav);
    
    // Close the navMenu by clicking outside
    menuOverlay.addEventListener("click", toggleNav);

    function toggleNav() {
        navMenu.classList.toggle("open");
        menuOverlay.classList.toggle("active");
        document.body.classList.toggle("hidden-scrolling");
    }

    navMenu.addEventListener("click", (event) => {
        if (event.target.hasAttribute("data-toggle") && window.innerWidth <= mediaSize) {
            event.preventDefault();
            const menuItemHasChildren = event.target.parentElement;

            // If menuItemHasChildren is already expanded, collapse it
            if (menuItemHasChildren.classList.contains("active")) {
                collapseSubMenu();
            } else {
                // Collapse existing expanded menuItemHasChildren
                if (navMenu.querySelector(".menu-item-has-children.active")) {
                    collapseSubMenu();
                }
                // Expand new menuItemHasChildren
                menuItemHasChildren.classList.add("active");
                const subMenu = menuItemHasChildren.querySelector(".sub-menu");
                subMenu.style.maxHeight = subMenu.scrollHeight + "px";
            }
        }
    });

    function collapseSubMenu() {
        const activeMenuItem = navMenu.querySelector(".menu-item-has-children.active");
        if (activeMenuItem) {
            activeMenuItem.querySelector(".sub-menu").removeAttribute("style");
            activeMenuItem.classList.remove("active");
        }
    }

    function resizeFix() {
        if (navMenu.classList.contains("open")) {
            toggleNav();
        }
        if (navMenu.querySelector(".menu-item-has-children.active")) {
            collapseSubMenu();
        }
    }

    window.addEventListener("resize", function () {
        if (this.innerWidth > mediaSize) {
            resizeFix();
        }
    });

})();

// Typed.js for multiple text animation
document.addEventListener("DOMContentLoaded", () => {
    const typed = new Typed('.multiple-text', {
        strings: ['Competence', 'Accountability', 'Responsiveness', 'Excellence', 'Service'],
        typeSpeed: 100,
        backSpeed: 100,
        loop: true,
        backDelay: 100,
    });
});

// Nav bar second-level dropdown (on mobile)
const secondMenuItems = document.querySelectorAll('.second-menu-item.menu-item-has-children');

secondMenuItems.forEach(item => {
    item.addEventListener('click', function (event) {
        if (window.innerWidth <= mediaSize) {
            event.preventDefault();
            const subMenu = this.querySelector('.second-sub-menu');
            const isActive = this.classList.contains('active');

            // Collapse other dropdowns if opened
            secondMenuItems.forEach(i => {
                if (i !== this) {
                    i.classList.remove('active');
                    i.querySelector('.second-sub-menu').style.display = 'none';
                }
            });

            // Toggle current dropdown
            if (isActive) {
                this.classList.remove('active');
                subMenu.style.display = 'none';
            } else {
                this.classList.add('active');
                subMenu.style.display = 'block';
            }
        }
    });
});

// Map Popup Logic
document.addEventListener('DOMContentLoaded', () => {
    // Select all the necessary elements
    const buttons = document.querySelectorAll('.popup-btn'); // Buttons in the sidebar
    const popup = document.querySelector('.popup'); // Popup container
    const popupImage = document.getElementById('popup-image'); // Image in the popup
    const popupText = document.getElementById('popup-text'); // Text in the popup
    const popupClose = document.querySelector('.popup-close'); // Close button
    
    // Add event listener to each button in the sidebar
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Get data attributes (image and text) from the button
            const imgSrc = button.getAttribute('data-img');
            const textContent = button.getAttribute('data-text');
            
            // Check if data-text exists and ensure it's not empty
            if (textContent) {
                popupText.textContent = textContent; // Set text
            } else {
                popupText.textContent = "No description available."; // Default message if no text is provided
            }

            // Check if imgSrc exists and update the image accordingly
            if (imgSrc) {
                popupImage.src = imgSrc; // Set image
            } else {
                popupImage.src = ''; // Clear the image if none provided
            }

            // Show the popup
            popup.style.display = 'flex';
        });
    });

    // Close the popup when the close button is clicked
    popupClose.addEventListener('click', () => {
        popup.style.display = 'none'; // Hide the popup
    });

    // Close the popup if the user clicks outside the popup content
    popup.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none'; // Hide the popup
        }
    });
});

