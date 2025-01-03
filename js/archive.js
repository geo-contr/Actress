const mediaQuery = window.matchMedia('(min-width: 751px)')
if (mediaQuery.matches) {

    // .show-mini-ის აღდგენა სქროლის მიხედვით
    const header = document.getElementById("header");
    const main = document.getElementById("main");

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

    $('.hamburger1, .hamburger2, .scroll-wrap1').click(function (e) {
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





    // Select the .scroll-progress element
    // const scrollProgress = document.querySelector('.scroll-progress');

    // // Add event listeners for hover
    // scrollProgress.addEventListener('mouseover', () => {
    //     scrollProgress.classList.add('open'); // Add the 'open' class when hovered
    // });

    // scrollProgress.addEventListener('mouseout', () => {
    //     scrollProgress.classList.remove('open'); // Remove the 'open' class when hover ends
    // });
}


const mediaQuery1 = window.matchMedia('(max-width: 750px)')
if (mediaQuery1.matches) {
    $('.hamburger1, .hamburger2, .scroll-wrap1').click(function (e) {
        $('.hamburger1, .hamburger2').toggleClass('activated');
        $('.click-blocker').toggleClass('show');
    });
    // Get the element by its ID
    var element = document.getElementById('header');

    // Add a class to the element
    element.classList.add('show-mini');
}
$(".menu-item.wp-menu-item.menu-item").click(function(event){
  event.stopPropagation();
  // Do something
});
// End of .show-mini-ის აღდგენა სქროლის მიხედვით



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




// video-thumbnail-ის შეცვლა
// loadingSpinner-ის გარეშე

// document.querySelectorAll('.video-thumbnail').forEach(thumbnail => {
//     thumbnail.addEventListener('click', function () {
//         const iframe = this.nextElementSibling;
//         const videoSrc = this.dataset.videoSrc + '?autoplay=1';
//         iframe.style.display = 'block';
//         iframe.src = videoSrc;
//         this.style.display = 'none'; // Hide the thumbnail
//     });
// });

// loadingSpinner-ით
document.querySelectorAll('.video-thumbnail').forEach(thumbnail => {
    thumbnail.addEventListener('click', function () {
        const iframe = this.nextElementSibling.nextElementSibling; // Select the iframe element
        const spinner = this.nextElementSibling; // Select the spinner element
        const videoSrc = this.dataset.videoSrc + '?autoplay=1';

        // Get the current height of the thumbnail
        const thumbnailHeight = this.offsetHeight;

        // Create a placeholder div to preserve space
        const placeholder = document.createElement('div');
        placeholder.className = 'placeholder';
        placeholder.style.height = `${thumbnailHeight}px`;

        // Insert the placeholder into the DOM
        this.parentElement.insertBefore(placeholder, this);

        // Show the spinner
        spinner.style.display = 'block';

        // Set up the iframe
        iframe.style.display = 'none'; // Ensure the iframe is hidden initially
        iframe.src = videoSrc;

        // Add a class to smoothly reduce the height of the thumbnail
        this.classList.add('hidden');

        // Wait for the iframe to load before hiding the spinner and showing the iframe
        iframe.onload = function () {
            spinner.style.display = 'none'; // Hide the spinner
            iframe.style.display = 'block'; // Show the iframe

            // Remove the placeholder after the thumbnail is collapsed
            placeholder.style.display = 'none';
        };
    });
});
// End of video-thumbnail-ის შეცვლა



// სქროლი პაუზით
// ერთ querySelector-ზე
// document.addEventListener("DOMContentLoaded", () => {
//   const element = document.querySelector(".load-on-view.next-post.below-view");

//   if (element) {
//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           // Change to "in-view" class and stop scrolling
//           element.classList.remove("below-view");
//           element.classList.add("in-view");

//           // Stop scrolling
//           document.body.style.overflow = "hidden";

//           // After 1 second, allow scrolling and change to "loaded-this"
//           setTimeout(() => {
//             element.classList.remove("in-view");
//             element.classList.add("loaded");

//             // Re-enable scrolling
//             document.body.style.overflow = "";
//           }, 1000);

//           // Disconnect the observer
//           observer.disconnect();
//         }
//       });
//     });

//     // Observe the element
//     observer.observe(element);
//   }
// });



// ბევრ querySelector-ზე
// document.addEventListener("DOMContentLoaded", () => {
//   const elements = document.querySelectorAll(".load-on-view.next-post.below-view");

//   if (elements.length > 0) {
//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           const element = entry.target;

//           // Change to "in-view" class and stop scrolling
//           element.classList.remove("below-view");
//           // element.classList.add("in-view");
//           element.classList.add("loaded");

//           // Stop scrolling
//           document.body.style.overflow = "hidden";

//           // After 1 second, allow scrolling and change to "loaded-this"
//           setTimeout(() => {
//             // element.classList.remove("in-view");
//             element.classList.remove("below-view");
//             element.classList.add("loaded");

//             // Re-enable scrolling
//             document.body.style.overflow = "";
//           }, 1000);

//           // Stop observing this element after triggering
//           observer.unobserve(element);
//         }
//       });
//     });

//     // Observe each element
//     elements.forEach((element) => observer.observe(element));
//   }
// });


// With ScrollMagic elements = triggerElements
// document.addEventListener("DOMContentLoaded", () => {
//   // Check if ScrollMagic is available
//   if (typeof ScrollMagic === "undefined") {
//     console.error("ScrollMagic is not loaded. Please include the ScrollMagic library.");
//     return;
//   }

//   // Create a ScrollMagic controller
//   const controller = new ScrollMagic.Controller();

//   // Select all elements to animate
//   const elements = document.querySelectorAll(".load-on-view.next-post.below-view");

//   elements.forEach((element) => {
//     // Create a ScrollMagic scene for each element
//     const scene = new ScrollMagic.Scene({
//       triggerElement: element, // Element that triggers the scene
//       triggerHook: 1, // Trigger when the element is near the viewport bottom (adjust as needed)
//     })
//       .on("enter", () => {
//         // When the element enters the viewport
//         element.classList.remove("below-view");
//         // element.classList.add("in-view");
//         element.classList.add("loaded");

//         // Disable scrolling
//         document.body.style.overflow = "hidden";

//         // After 1 second, change class and re-enable scrolling
//         setTimeout(() => {
//           // element.classList.remove("in-view");
//           element.classList.remove("below-view");
//           element.classList.add("loaded");
//           document.body.style.overflow = "";

//           // Remove the scene to prevent further triggers
//           scene.remove();
//         }, 1000);
//       })
//       .addTo(controller); // Add the scene to the ScrollMagic controller
//   });
// });

// With ScrollMagic elements and triggerElements are different
document.addEventListener("DOMContentLoaded", () => {
  // Check if ScrollMagic is available
  if (typeof ScrollMagic === "undefined") {
    console.error("ScrollMagic is not loaded. Please include the ScrollMagic library.");
    return;
  }

  // Create a ScrollMagic controller
  const controller = new ScrollMagic.Controller();

  // Select all elements to animate
  const elements = document.querySelectorAll(".load-on-view.next-post.below-view");
  const triggerElements = document.querySelectorAll("#pause");

  // Ensure the same number of elements and triggers
  if (elements.length !== triggerElements.length) {
    console.error("Mismatch between the number of elements and triggers.");
    return;
  }

  // Loop through both elements and trigger elements
  elements.forEach((element, index) => {
    const triggerElement = triggerElements[index]; // Match trigger to element

    // Create a ScrollMagic scene for each pair of element and trigger
    const scene = new ScrollMagic.Scene({
      triggerElement: triggerElement, // Specific trigger element for this scene
      triggerHook: 1, // Trigger when the element is near the viewport bottom (adjust as needed)
      // duration: 1
    })
      .on("enter", () => {
        // When the element enters the viewport
        element.classList.remove("below-view");
        element.classList.add("loaded");

        // Disable scrolling
        document.body.style.overflow = "hidden";

        // After 1 second, change class and re-enable scrolling
        setTimeout(() => {
          element.classList.remove("below-view");
          element.classList.add("loaded");
          document.body.style.overflow = "";

          // Remove the scene to prevent further triggers
          scene.remove();
        }, 1400);
      })
      .addTo(controller); // Add the scene to the ScrollMagic controller
  });
});



// Initialize ScrollMagic Controller With ScrollMagic With scrollbar
// const controller = new ScrollMagic.Controller();

// const targets = document.querySelectorAll('.load-on-view.next-post.below-view');

// const innerElement = document.querySelector('.follow_marg');
// const innerElement1 = document.querySelector('.follow_marg1');
// const innerElement2 = document.querySelector('.follow_marg2');
// const innerElement3 = document.querySelector('.follow_marg3');


// targets.forEach((target) => {
//   let isLoaded = false;

//   const scene = new ScrollMagic.Scene({
//     triggerElement: target,
//     triggerHook: 1,
//     reverse: false
//   })
//     .on('enter', () => {
//       if (!isLoaded) {
//         document.body.classList.add('scroll-paused');
//         if (innerElement) {
//           innerElement.classList.add('scroll_paused');
//         }
//         if (innerElement1) {
//           innerElement1.classList.add('scroll_paused');
//         }
//         if (innerElement2) {
//           innerElement2.classList.add('scroll_paused');
//         }
//         if (innerElement3) {
//           innerElement3.classList.add('scroll_paused');
//         }

//         setTimeout(() => {
//           document.body.classList.remove('scroll-paused');
//           if (innerElement) {
//             innerElement.classList.remove('scroll_paused');
//           }
//           if (innerElement1) {
//             innerElement1.classList.remove('scroll_paused');
//           }
//           if (innerElement2) {
//             innerElement2.classList.remove('scroll_paused');
//           }
//           if (innerElement3) {
//             innerElement3.classList.remove('scroll_paused');
//           }
//         }, 1000);

//         target.classList.remove('below-view');
//         target.classList.add('loaded');

//         isLoaded = true;
//       }
//     })
//     .addTo(controller);
// });
// End of სქროლი პაუზით



var navigation = $(".scroll-up").height();
$('a[href^="#scroll-up').on("click", function(){
    var clickedElementAttrName = $(this).attr("href");
    var seciton = $(clickedElementAttrName);
    var scroToTop = seciton.offset().top - navigation;
    console.log(scroToTop, navigation);
    $("html,body").animate({
        scrollTop:scroToTop
    }, 500)
});


$(window).scroll(function(){
    $(".scroll-up").toggleClass("scrolled", $(this).scrollTop() > 500);
});



// border-ის გარშემო ანიმაცია
// document.addEventListener('DOMContentLoaded', () => {
//     const offsetBorders = document.querySelectorAll('.offset-border');

//     const handleScroll = () => {
//         offsetBorders.forEach(border => {
//             const path = border.querySelector('path');
//             const rect = border.getBoundingClientRect();
//             const windowHeight = window.innerHeight;

//             // Check if the element is in the viewport
//             if (rect.top < windowHeight && rect.bottom > 0) {
//                 const length = path.getTotalLength();
//                 const scrollProgress = Math.min(Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0), 1);
//                 const offset = length - (scrollProgress * length);
//                 path.style.strokeDashoffset = offset;
//             }
//         });
//     };

//     // Set initial styles and add the scroll listener
//     offsetBorders.forEach(border => {
//         const path = border.querySelector('path');
//         const length = path.getTotalLength();
//         path.style.strokeDasharray = `${length}px`;
//         path.style.strokeDashoffset = `${length}px`;
//     });

//     window.addEventListener('scroll', handleScroll);
// });


document.addEventListener('DOMContentLoaded', () => {
    const offsetBorders = document.querySelectorAll('.offset-border');

    const handleScroll = () => {
        offsetBorders.forEach(border => {
            const path = border.querySelector('path');
            const rect = border.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const pathLength = path.getTotalLength();

            // Calculate the proximity percentage
            const start = windowHeight / 2.5; // Start animation when element enters the viewport
            const end = windowHeight / 2.5; // Fully wrap when element is near the center
            const progress = Math.min(Math.max((rect.top - end) / (start - end), 0), 1);

            // Update stroke-dashoffset based on progress
            path.style.strokeDashoffset = pathLength * progress;
        });
    };

    // Initialize path styles
    offsetBorders.forEach(border => {
        const path = border.querySelector('path');
        const pathLength = path.getTotalLength();
        path.style.strokeDasharray = `${pathLength}px`;
        path.style.strokeDashoffset = `${pathLength}px`; // Start fully hidden
        path.style.transition = 'stroke-dashoffset 1s linear'; // Smooth updates
    });

    window.addEventListener('scroll', handleScroll);
});


// document.addEventListener('DOMContentLoaded', () => {
//     const offsetBorders = document.querySelectorAll('.offset-border');
//     const triggerHook = 0.5; // Trigger at 50% of the viewport height

//     const handleScroll = () => {
//         offsetBorders.forEach(border => {
//             const path = border.querySelector('path');
//             const rect = border.getBoundingClientRect();
//             const windowHeight = window.innerHeight;
//             const triggerPoint = windowHeight * triggerHook; // Calculate trigger point
//             const pathLength = path.getTotalLength();

//             // Calculate the proximity percentage
//             const start = triggerPoint; // Start animation at triggerHook
//             const end = windowHeight / 2; // Fully wrap when element is near the center
//             const progress = Math.min(Math.max((rect.top - end) / (start - end), 0), 1);

//             // Update stroke-dashoffset based on progress
//             path.style.strokeDashoffset = pathLength * progress;
//         });
//     };

//     // Initialize path styles
//     offsetBorders.forEach(border => {
//         const path = border.querySelector('path');
//         const pathLength = path.getTotalLength();
//         path.style.strokeDasharray = `${pathLength}px`;
//         path.style.strokeDashoffset = `${pathLength}px`; // Start fully hidden
//         path.style.transition = 'stroke-dashoffset 1s linear'; // Smooth updates
//     });

//     window.addEventListener('scroll', handleScroll);
// });

// End of border-ის გარშემო ანიმაცია



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