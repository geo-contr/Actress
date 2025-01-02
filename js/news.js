const mediaQuery = window.matchMedia('(min-width: 751px)')
if (mediaQuery.matches) {
    
    // .show-mini-ის აღდგენა სქროლის მიხედვით
    const header = document.getElementById("header");
    const main = document.getElementById("news-content");

    window.addEventListener("scroll", () => {
      const mainPosition = main.getBoundingClientRect().top;

      // Only apply scroll behavior when `.activated` is not present
      if (!$('.hamburger1').hasClass('activated') && !$('.hamburger2').hasClass('activated')) {
        if (mainPosition <= 70) {
          header.classList.add("show-mini");
        } else {
          header.classList.remove("show-mini");
        }
      }
    });

    $('.hamburger1, .hamburger2, .scroll-wrap').click(function (e) {
        $('.hamburger1, .hamburger2').toggleClass('activated');
        $('.click-blocker').toggleClass('show');

        // Remove `show-mini` class when activated
        if ($('.hamburger1').hasClass('activated') || $('.hamburger2').hasClass('activated')) {
          $('#header').removeClass('show-mini');
        } else {
          // Delay the re-evaluation of the scroll position after deactivating
          setTimeout(() => {
            const mainPosition = main.getBoundingClientRect().top;
            if (mainPosition <= 0) {
              header.classList.add("show-mini");
            }
          }, 50); // Adjust timeout as needed
        }
    });
}
const mediaQuery1 = window.matchMedia('(max-width: 750px)')
if (mediaQuery1.matches) {
    $('.hamburger1, .hamburger2, .scroll-wrap').click(function (e) {
        $('.hamburger1, .hamburger2').toggleClass('activated');
        $('.click-blocker').toggleClass('show');
    });
}
$(".menu-item.wp-menu-item.menu-item").click(function(event){
  event.stopPropagation();
  // Do something
});
// End of .show-mini-ის აღდგენა სქროლის მიხედვით



// Parallax with scroll
// let currentOffset = 0; // Default offset
// let lastScrollY = window.scrollY; // Tracks the last scroll position
// let accumulatedScroll = 0; // Tracks the total accumulated scroll

// document.addEventListener("DOMContentLoaded", () => {
//     const parallaxImage = document.querySelector(".parallax-image");

//     // Retrieve saved offset and last scroll position
//     const savedOffset = parseFloat(localStorage.getItem("parallaxOffset"));
//     const savedScrollY = parseFloat(localStorage.getItem("lastScrollY"));

//     // If the page is opened from the top, reset everything
//     if (window.scrollY === 0) {
//         localStorage.removeItem("parallaxOffset");
//         localStorage.removeItem("lastScrollY");
//         currentOffset = 0;
//     } 
//     // Otherwise, restore saved offset if user scrolled previously
//     else if (!isNaN(savedOffset) && savedScrollY > 0) {
//         currentOffset = savedOffset;
//         if (parallaxImage) {
//             parallaxImage.style.transform = `translateY(${currentOffset}px)`;
//         }
//         accumulatedScroll = 0;
//         lastScrollY = savedScrollY;
//     }
// });

// document.addEventListener("scroll", () => {
//     const parallaxImage = document.querySelector(".parallax-image");
//     if (!parallaxImage) return; // Safety check

//     const scrollY = window.scrollY; // Current scroll position
//     const scrollDifference = scrollY - lastScrollY; // Change in scroll position
//     accumulatedScroll += scrollDifference;

//     // Check if the accumulated scroll passes the ±50px threshold
//     while (Math.abs(accumulatedScroll) >= 50) {
//         if (accumulatedScroll > 0) {
//             // Scrolling down
//             currentOffset -= 25;
//             accumulatedScroll -= 50;
//         } else if (accumulatedScroll < 0) {
//             // Scrolling up
//             currentOffset += 25;
//             accumulatedScroll += 50;
//         }
//     }

//     // Apply the new transform
//     parallaxImage.style.transform = `translateY(${currentOffset}px)`;

//     // Save the current offset and scroll position
//     localStorage.setItem("parallaxOffset", currentOffset);
//     localStorage.setItem("lastScrollY", window.scrollY);

//     // Update lastScrollY
//     lastScrollY = scrollY;
// });



// More accurate code
let currentOffset = 0; // Default offset
let lastScrollY = window.scrollY; // Tracks the last scroll position
let accumulatedScroll = 0; // Tracks the total accumulated scroll

document.addEventListener("DOMContentLoaded", () => {
    const parallaxImage = document.querySelector(".parallax-image");

    // Retrieve saved offset and last scroll position
    const savedOffset = parseFloat(localStorage.getItem("parallaxOffset"));
    const savedScrollY = parseFloat(localStorage.getItem("lastScrollY"));

    if (window.scrollY === 0) {
        // Reset everything if starting at the top
        localStorage.removeItem("parallaxOffset");
        localStorage.removeItem("lastScrollY");
        currentOffset = 0;
    } else if (!isNaN(savedOffset) && !isNaN(savedScrollY)) {
        // Restore saved offset
        currentOffset = savedOffset;
        if (parallaxImage) {
            parallaxImage.style.transform = `translateY(${currentOffset}px)`;
        }
        lastScrollY = savedScrollY;
    }
});

document.addEventListener("scroll", () => {
    const parallaxImage = document.querySelector(".parallax-image");
    if (!parallaxImage) return; // Safety check

    const scrollY = window.scrollY; // Current scroll position
    const scrollDifference = scrollY - lastScrollY; // Change in scroll position
    accumulatedScroll += scrollDifference;

    // Adjust offset if the accumulated scroll passes the ±50px threshold
    while (Math.abs(accumulatedScroll) >= 50) {
        if (accumulatedScroll > 0) {
            // Scrolling down
            currentOffset -= 25;
            accumulatedScroll -= 50;
        } else if (accumulatedScroll < 0) {
            // Scrolling up
            currentOffset += 25;
            accumulatedScroll += 50;
        }
    }

    // Ensure transform resets at the top of the page
    if (scrollY === 0) {
        currentOffset = 0;
        accumulatedScroll = 0;
    }

    // Apply the transform
    parallaxImage.style.transform = `translateY(${currentOffset}px)`;

    // Debounce saving offset and scroll position
    saveToLocalStorageDebounced(currentOffset, scrollY);

    // Update lastScrollY
    lastScrollY = scrollY;
});

// Debounced save to localStorage
let saveTimeout;
function saveToLocalStorageDebounced(offset, scrollY) {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        localStorage.setItem("parallaxOffset", offset);
        localStorage.setItem("lastScrollY", scrollY);
    }, 100); // Adjust debounce interval as needed
}
// End of More accurate code
// End of Parallax with scroll




window.addEventListener('scroll', reveal);

function reveal(){
    var reveals = document.querySelectorAll('.reveal2, .reveal3, .reveal4, .reveal5, .reveal6, .reveal7, .reveal8');

    for(var i = 0; i < reveals.length; i++){

        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 0;

        if(revealtop < windowheight - revealpoint){
            reveals[i].classList.add('active');
        }
        else{
            reveals[i].classList.remove('active');
        }
    }
}



// When I don't want hover on a touchscreen
const mainMenu = document.querySelector('.layout-default');

document.addEventListener('DOMContentLoaded', function () {
    // Check if the device is touch-enabled
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Add the 'not-touch' class if the device is NOT touch-enabled
    if (!isTouchDevice) {
        mainMenu.classList.add('not-touch');
    } else {
        mainMenu.classList.remove('not-touch');
    }
});

// console.log(mainMenu.classList.contains('not-touch'));
// End of When I don't want hover on a touchscreen