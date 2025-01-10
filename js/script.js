(() => {

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
//document.addEventListener("DOMContentLoaded", () => {
  const typed = new Typed('.multiple-text', {
    strings: ['Competence', 'Accountability', 'Responsiveness', 'Excellence', 'Service'],
    typeSpeed: 100,
    backSpeed: 100,
    loop: true,
    backDelay: 100,
  });
//});


//---------------------------------------------- nav bar --------------------------------
// Add this inside your existing IIFE in script.js
const secondMenuItems = document.querySelectorAll('.second-menu-item.menu-item-has-children');

secondMenuItems.forEach(item => {
    item.addEventListener('click', function (event) {
        if (window.innerWidth <= mediaSize) {
            event.preventDefault(); // Prevent default link behavior
            const subMenu = this.querySelector('.second-sub-menu');
            const isActive = this.classList.contains('active');

            // Collapse other dropdowns if opened
            secondMenuItems.forEach(i => {
                if (i !== this) {
                    i.classList.remove('active');
                    i.querySelector('.second-sub-menu').style.display = 'none'; // Hide other dropdowns
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
//---------------------------------------------- nav bar --------------------------------





//_____________________________________________facilities_______________________________________________________//
    // Open the popup when an image is clicked
    document.querySelectorAll('.image-container img').forEach(image => {
      image.onclick = () => {
          const popupImage = document.querySelector('.popup-image');
          const popupImg = document.querySelector('.popup-image img');
          
          // Set the source of the popup image to the clicked image's source
          popupImg.src = image.getAttribute('src');
          
          // Show the popup with a smooth transition
          popupImage.classList.add('active');
      };
  });

  // Close the popup when the close button or background is clicked
  document.querySelector('.popup-image').onclick = (event) => {
      if (event.target.classList.contains('popup-image') || event.target.classList.contains('close-btn')) {
          document.querySelector('.popup-image').classList.remove('active');
      }
  };

  function closePopup() {
      document.querySelector('.popup-image').classList.remove('active');
  }


// ------------------------------------------------------------ sidebar------------------------------
const observerCallback = (entries, observer) => {
entries.forEach(entry => {
  const id = entry.target.id; // Get the id of the section
  const link = document.querySelector(`.sidebar ul li a[href="#${id}"]`); // Get the corresponding link
  
  if (entry.isIntersecting) {
    // If the section is in view, add the 'active' class to the link
    link.classList.add('active');
  } else {
    // Otherwise, remove the 'active' class from the link
    link.classList.remove('active');
  }
});
};

// Create an intersection observer
const observer = new IntersectionObserver(observerCallback, {
threshold: 0.5, // Trigger when 50% of the section is in view
});

// Target all the sections for observation
document.querySelectorAll('.facilities').forEach(section => {
observer.observe(section);
});

// JavaScript for toggling the navigation menu with transition
document.getElementById('openNav').addEventListener('click', function() {
  document.getElementById('navMenu').classList.add('active');
  document.getElementById('menuOverlay').classList.add('active');
});

document.getElementById('closeNav').addEventListener('click', function() {
  document.getElementById('navMenu').classList.remove('active');
  document.getElementById('menuOverlay').classList.remove('active');
});

// Close the menu when clicking outside of it (on the overlay)
document.getElementById('menuOverlay').addEventListener('click', function() {
  document.getElementById('navMenu').classList.remove('active');
  document.getElementById('menuOverlay').classList.remove('active');
});


//----------------------------------------slider-----------------------
const carouselInner = document.querySelector('.carousel-inner');
const carouselItems = document.querySelectorAll('.carousel-item');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const indicators = document.querySelectorAll('.indicator');

let currentIndex = 0;

function updateCarousel() {
  const offset = -currentIndex * 100;
  carouselInner.style.transform = `translateX(${offset}%)`;
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentIndex);
  });
}

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
  updateCarousel();
});

indicators.forEach((indicator) => {
  indicator.addEventListener('click', (e) => {
    currentIndex = Number(e.target.dataset.slide);
    updateCarousel();
  });
});