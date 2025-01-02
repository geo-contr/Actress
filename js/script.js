const mediaQuery = window.matchMedia('(min-width: 751px)')
if (mediaQuery.matches) {
    // const header = document.getElementById("header");
    // const main = document.getElementById("main");

    // window.addEventListener("scroll", () => {
    //   const mainPosition = main.getBoundingClientRect().top;
      
    //   // Only apply scroll behavior when `.activated` is not present
    //   if (!$('.hamburger1').hasClass('activated') && !$('.hamburger2').hasClass('activated')) {
    //     if (mainPosition <= 0) {
    //       header.classList.add("show-mini");
    //     } else {
    //       header.classList.remove("show-mini");
    //     }
    //   }
    // });

    // $('.hamburger1, .hamburger2').click(function (e) {
    //     $('.hamburger1, .hamburger2').toggleClass('activated');
    //     $('.click-blocker').toggleClass('show');
        
    //     // Remove `show-mini` class when activated
    //     if ($('.hamburger1').hasClass('activated') || $('.hamburger2').hasClass('activated')) {
    //       $('#header').removeClass('show-mini');
    //     }
    // });

    // .show-mini-ის აღდგენა სქროლის მიხედვით
    const header = document.getElementById("header");
    const main = document.getElementById("main");

    window.addEventListener("scroll", () => {
      const mainPosition = main.getBoundingClientRect().top;

      // Only apply scroll behavior when `.activated` is not present
      if (!$('.hamburger1').hasClass('activated') && !$('.hamburger2').hasClass('activated')) {
        if (mainPosition <= 0) {
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



var swiper = new Swiper('.swiper', {
    speed: 1200,
    autoplay: {
        delay: 3000,
    },
    transitionTimingFunction: 'cubic-bezier(x1, y1, x2, y2)',
    pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
        renderFraction: function (currentClass, totalClass){
            return ' <span class="' + currentClass + '"></span>' + 
            '' +
            '<span class="' + totalClass + '"></span>';

        },
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    loop: true,
    parallax: true,


    // effect: 'creative',
    //   creativeEffect: {
    //     prev: {
    //         translate: ['-100%', 0, 0],
    //         opacity: [1],
    //     },
    //     next: {
    //         translate: ['100%', 0, 0],
    //         opacity: [1],
    //     },
    //  },
});








// არარბილი სქროლი
// Select all elements with the parallax effect
// const parallaxImages = document.querySelectorAll('.parallax-image');

// // Function to update the parallax effect
// function updateParallax() {
//     parallaxImages.forEach(img => {
//         const rect = img.getBoundingClientRect();
//         const scrollOffset = window.scrollY || window.pageYOffset;
        
//         // Adjust these factors to control the parallax and push effect
//         const parallaxSpeed = 0.15;
//         const pushFactor = 0.02; // Initial "push" effect in pixels

//         // Calculate the position of the image, adding an initial offset
//         const offsetY = (scrollOffset - rect.top) * parallaxSpeed + pushFactor;
        
//         // Apply the transform with the push effect
//         img.style.transform = `translateY(${offsetY}px)`;
//     });
// }

// // Add scroll event listener to update the parallax effect on scroll
// window.addEventListener('scroll', updateParallax);

// რბილი სქროლი
const parallaxImages = document.querySelectorAll('.parallax-image');
let targetScrollPos = window.scrollY || window.pageYOffset;
let currentScrollPos = targetScrollPos;
let ticking = false;
const easeFactor = 0.1; // Controls how soft/smooth the easing is

// Function to update the parallax effect
function updateParallax() {
    // Gradually interpolate between the current and target scroll positions
    currentScrollPos += (targetScrollPos - currentScrollPos) * easeFactor;

    parallaxImages.forEach(img => {
        const rect = img.getBoundingClientRect();
        
        // Adjust these factors to control the parallax and push effect
        const parallaxSpeed = 0.15;
        const pushFactor = 0.02; // Initial "push" effect in pixels

        // Calculate the position of the image with easing applied
        const offsetY = (currentScrollPos - rect.top) * parallaxSpeed + pushFactor;

        // Apply the transform with the push effect
        img.style.transform = `translateY(${offsetY}px)`;
    });

    // Keep updating until current scroll position reaches target scroll position
    if (Math.abs(targetScrollPos - currentScrollPos) > 0.5) {
        requestAnimationFrame(updateParallax);
    } else {
        ticking = false; // Reset ticking when animation is complete
    }
}

// Scroll event handler
function onScroll() {
    targetScrollPos = window.scrollY || window.pageYOffset;

    // Only request animation frame if a request is not already in progress
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true; // Mark that a frame is already requested
    }
}

// Add scroll event listener to update the parallax effect on scroll
window.addEventListener('scroll', onScroll);





// Select the element მხოლოდ ერთი კლასისთვის
// const description = document.querySelector('.news-slider-item-description');

// // Define when the element should stop moving
// const stopScrollPosition = 300;

// window.addEventListener('scroll', () => {
//     // Get the current scroll position
//     let scrollTop = window.scrollY || document.documentElement.scrollTop;
    
//     // Check if the scroll position is less than the stopping position
//     if (scrollTop < stopScrollPosition) {
//         // Move the element by setting its top position dynamically (e.g., moving it up as you scroll)
//         description.style.top = `calc(38% + ${scrollTop}px)`;
//         description.style.opacity = "1"; // Ensure visibility while scrolling
//     } else {
//         // Fix the element at the stopping position and hide it
//         description.style.top = `calc(38% + ${stopScrollPosition}px)`;
//         description.style.opacity = "0"; // Hide it when stopping point is reached
//     }
// });



// Select the element ყველა კლასისთვის
// const descriptions = document.querySelectorAll('.news-slider-item-description');
// const stopScrollPosition = 500;

// window.addEventListener('scroll', () => {
//   // Get the current scroll position
//   let scrollTop = window.scrollY || document.documentElement.scrollTop;

//   descriptions.forEach((description) => {
//     if (scrollTop < stopScrollPosition) {
//       // Move the element by setting its position dynamically within the allowed scroll range
//       description.style.position = 'absolute'; // Make sure the description is in an absolute position
//       description.style.top = `calc(38% + ${scrollTop}px)`; // Adjust the position dynamically while scrolling
//       description.style.opacity = "1"; // Keep it visible during scroll
//     } else {
//       // Once scroll reaches the stop position, fix the element in place and hide it if needed
//       description.style.position = 'absolute'; // Ensure it's still absolute so it's not affected by normal document flow
//       description.style.top = `calc(38% + ${stopScrollPosition}px)`; // Stop moving when reaching the scroll limit
//       description.style.opacity = "0"; // Fade it out after the stop point is reached
//     }
//   });
// });



// სქროლის დროს გამჭვირვალობა
// const descriptions = document.querySelectorAll('.news-slider-item-description');
// const stopScrollPosition = 300;

// window.addEventListener('scroll', () => {
//   // Get the current scroll position
//   let scrollTop = window.scrollY || document.documentElement.scrollTop;

//   descriptions.forEach((description) => {
//     if (scrollTop < stopScrollPosition) {
//       // Move the element by setting its position dynamically within the allowed scroll range
//       description.style.position = 'absolute'; // Make sure the description is in an absolute position
//       // description.style.top = `calc(38% + ${scrollTop}px)`; // Adjust the position dynamically while scrolling
      
//       // Calculate opacity based on scroll position
//       let opacity = 1 - (scrollTop / stopScrollPosition); // Opacity decreases as you scroll down
//       opacity = Math.max(0, opacity); // Prevent opacity from going below 0
      
//       description.style.opacity = opacity; // Set the calculated opacity
//     } else {
//       // Once scroll reaches the stop position, fix the element in place and hide it if needed
//       description.style.position = 'absolute'; // Ensure it's still absolute so it's not affected by normal document flow
//       // description.style.top = `calc(38% + ${stopScrollPosition}px)`; // Stop moving when reaching the scroll limit
//       description.style.opacity = "0"; // Fade it out after the stop point is reached
//     }
//   });
// });

// სქროლის დროს გამჭვირვალობა + pointerEvents = 'none'
const descriptions = document.querySelectorAll('.news-slider-item-description');
const stopScrollPosition = 300;

window.addEventListener('scroll', () => {
  // Get the current scroll position
  let scrollTop = window.scrollY || document.documentElement.scrollTop;

  descriptions.forEach((description) => {
    if (scrollTop < stopScrollPosition) {
      // Move the element by setting its position dynamically within the allowed scroll range
      description.style.position = 'absolute'; // Make sure the description is in an absolute position
      // description.style.top = `calc(38% + ${scrollTop}px)`; // Adjust the position dynamically while scrolling
      
      // Calculate opacity based on scroll position
      let opacity = 1 - (scrollTop / stopScrollPosition); // Opacity decreases as you scroll
      opacity = Math.max(0, opacity); // Prevent opacity from going below 0
      
      description.style.opacity = opacity; // Set the calculated opacity

      // Adjust pointer-events based on opacity
      if (opacity === 0) {
        description.style.pointerEvents = 'none'; // Disable pointer events when fully transparent
      } else {
        description.style.pointerEvents = 'auto'; // Enable pointer events when opacity is not 0
      }
    } else {
      // Once scroll reaches the stop position, fix the element in place and hide it if needed
      description.style.position = 'absolute'; // Ensure it's still absolute so it's not affected by normal document flow
      // description.style.top = `calc(38% + ${stopScrollPosition}px)`; // Stop moving when reaching the scroll limit
      description.style.opacity = "0"; // Fade it out after the stop point is reached
      description.style.pointerEvents = 'none'; // Disable pointer events when fully transparent
    }
  });
});
// End of სქროლის დროს გამჭვირვალობა + pointerEvents = 'none'
// End of სქროლის დროს გამჭვირვალობა


// Detect scroll event
// window.addEventListener('scroll', function() {
//   const swiperContainer = document.querySelector('.swiper');
//   const description = swiperContainer.querySelector('.news-slider-item-description');
  
//   // Add 'fixed' class when scroll position reaches a certain point (e.g., 200px)
//   if (window.scrollY > 200) {
//     swiperContainer.classList.add('fixed');
//   } else {
//     swiperContainer.classList.remove('fixed');
//   }
// });




// const descriptionCounter = document.querySelector('.swiper-counter');

// // Define when the element should stop moving (adjust as needed)
// const stopScrollPosition1 = 300; // Change this value based on when you'd like it to stop 

// window.addEventListener('scroll', () => {
//     // Get the current scroll position
//     let scrollTop = window.scrollY || document.documentElement.scrollTop;
    
//     // Check if the scroll position is less than the stopping position
//     if (scrollTop < stopScrollPosition1) {
//         // Move the element by setting its top position dynamically
//         descriptionCounter.style.top = scrollTop + '94%'; 
//     } else {
//         // Fix the element at the stopping position
//         descriptionCounter.style.top = stopScrollPosition1 + '%';
//     }
// });


const descriptionCounter = document.querySelector('.swiper-counter');

// Define when the element should stop moving (adjust as needed)
const stopScrollPosition1 = 300; // Change this value based on when you'd like it to stop

let lastScrollTop = 300; // Track the last scroll position

window.addEventListener('scroll', () => {
    // Get the current scroll position
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    // Check if scrolling up or down
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        descriptionCounter.style.opacity = '0';
    } else {
        // Scrolling up
        descriptionCounter.style.opacity = '1';
    }

    // Update last scroll position
    // lastScrollTop = scrollTop;

    // Check if the scroll position is less than the stopping position
    // if (scrollTop < stopScrollPosition1) {
    //     // Move the element by setting its top position dynamically
    //     descriptionCounter.style.top = scrollTop + '94%';
    // } else {
    //     // Fix the element at the stopping position
    //     descriptionCounter.style.top = stopScrollPosition1 + '%';
    // }
});







window.addEventListener('scroll', reveal);

function reveal(){
    var reveals = document.querySelectorAll('.reveal');

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