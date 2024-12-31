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




    // Horizontal scroll
    // Horizontal scroll without color change
    // $(window).on("load", function () {
    //     var controller = new ScrollMagic.Controller();
    //     var wipeScene;

    //     function initializeScroll() {
    //         var $scrollWrap = $(".scroll-wrap2");

    //         if ($scrollWrap.length === 0) {
    //             console.error("Error: Element `.scroll-wrap2` not found in the DOM.");
    //             return;
    //         }

    //         // Force layout reflow before calculations
    //         var containerWidth = $scrollWrap.parent().outerWidth();
    //         var totalWidth = $scrollWrap[0].scrollWidth;

    //         console.log("Container width:", containerWidth);
    //         console.log("Total width of `.scroll-wrap2`:", totalWidth);

    //         // Ensure content is properly measured
    //         if (containerWidth === 0 || totalWidth === 0) {
    //             console.warn("One of the dimensions is 0, retrying in 100ms...");
    //             setTimeout(initializeScroll, 100);  // Retry after a short delay
    //             return;
    //         }

    //         // Calculate the scroll distance (totalWidth - containerWidth)
    //         var scrollDistance = totalWidth - containerWidth;

    //         if (scrollDistance <= 0) {
    //             console.warn("No scrolling necessary: Content fits within the container.");
    //             return;
    //         }

    //         console.log("Calculated scroll distance:", scrollDistance);

    //         // Create the GSAP animation
    //         var wipeAnimation = new TimelineMax()
    //             .fromTo($scrollWrap, 1, { x: "0px" }, { x: `-${scrollDistance}px`, ease: Linear.easeNone });

    //         // Destroy previous scene if it exists and create new one
    //         if (wipeScene) {
    //             wipeScene.destroy(true);  // Clean up previous scene
    //         }

    //         wipeScene = new ScrollMagic.Scene({
    //             triggerElement: "#timeline-spacer",
    //             triggerHook: '100%' /*"onLeave"*/,
    //             duration: '400%' /*scrollDistance * 3*/ // Adjust the duration as needed
    //         })
    //             .setPin("#timeline-spacer")
    //             .setTween(wipeAnimation)
    //             // .addIndicators() // Uncomment for debugging
    //             .addTo(controller);
    //     }

    //     // Initialize scroll effect
    //     initializeScroll();

    //     // Recalculate scroll on window resize
    //     $(window).on("resize", function () {
    //         // Ensure there's a delay to give the layout a chance to reflow
    //         setTimeout(initializeScroll, 100);
    //     });

    //     // Show/hide `.biography .timeline`
    //     new ScrollMagic.Scene({
    //         triggerElement: "#inner-trigger",
    //         triggerHook: 0.5
    //     })
    //         .on("enter", function () {
    //             $(".biography .timeline").css("display", "block");
    //         })
    //         .on("leave", function () {
    //             $(".biography .timeline").css("display", "none");
    //         })
    //         // .addIndicators() // Uncomment for debugging
    //         .addTo(controller);
    // });



    // Horizontal scroll with color change with animation targets, but not color change and with wdth progress and  without scrollbar move
    // $(window).on("load", function () {
    //     var controller = new ScrollMagic.Controller();
    //     var wipeScene;

    //     function initializeScroll() {
    //         var $scrollWrap = $(".scroll-wrap2");

    //         if ($scrollWrap.length === 0) {
    //             console.error("Error: Element `.scroll-wrap2` not found in the DOM.");
    //             return;
    //         }

    //         var containerWidth = $scrollWrap.parent().outerWidth();
    //         var totalWidth = $scrollWrap[0].scrollWidth;

    //         if (containerWidth === 0 || totalWidth === 0) {
    //             console.warn("One of the dimensions is 0, retrying in 100ms...");
    //             setTimeout(initializeScroll, 100);
    //             return;
    //         }

    //         var scrollDistance = totalWidth - containerWidth;

    //         if (scrollDistance <= 0) {
    //             console.warn("No scrolling necessary: Content fits within the container.");
    //             return;
    //         }

    //         var wipeAnimation = new TimelineMax()
    //             .fromTo($scrollWrap, 1, { x: "0px" }, { x: `-${scrollDistance}px`, ease: Linear.easeNone });

    //         if (wipeScene) {
    //             wipeScene.destroy(true);
    //         }

    //         wipeScene = new ScrollMagic.Scene({
    //             triggerElement: "#timeline-spacer",
    //             triggerHook: '100%',
    //             duration: '400%'
    //         })
    //             .setPin("#timeline-spacer")
    //             .setTween(wipeAnimation)
    //             .addTo(controller);

    //         // Update progress bar and vertical scrollbar
    //         new ScrollMagic.Scene({
    //             triggerElement: "#timeline-spacer",
    //             duration: '400%' // Match duration with scroll
    //         })
    //             .on("progress", function (event) {
    //                 // Update progress bar width
    //                 $(".progress").css("width", (event.progress * 100) + "%");

    //                 // Update vertical scrollbar height
    //                 // $("#vertical-scrollbar").css("height", (event.progress * 100) + "%");
    //             })
    //             .addTo(controller);

    //         // Background color animation
    //         var colorTimeline = gsap.timeline();
    //         colorTimeline
    //             .to(".colorbar", { backgroundColor: "rgb(184, 103, 127)", duration: 0.2, ease: Linear.easeNone })
    //             .to(".colorbar", { backgroundColor: "rgb(238, 108, 110)", duration: 0.2, ease: Linear.easeNone })
    //             .to(".colorbar", { backgroundColor: "rgb(177, 195, 215)", duration: 0.2, ease: Linear.easeNone })
    //             .to(".colorbar", { backgroundColor: "rgb(245, 228, 160)", duration: 0.2, ease: Linear.easeNone })
    //             .to(".colorbar", { backgroundColor: "rgb(162, 208, 230)", duration: 0.2, ease: Linear.easeNone });

    //         new ScrollMagic.Scene({
    //             triggerElement: "#timeline-spacer",
    //             duration: '400%'
    //         })
    //             .setTween(colorTimeline)
    //             .addTo(controller);
    //     }

    //     initializeScroll();

    //     $(window).on("resize", function () {
    //         setTimeout(initializeScroll, 100);
    //     });

    //     new ScrollMagic.Scene({
    //         triggerElement: "#inner-trigger",
    //         triggerHook: 0.5
    //     })
    //         .on("enter", function () {
    //             $(".biography .timeline").css("display", "block");
    //         })
    //         .on("leave", function () {
    //             $(".biography .timeline").css("display", "none");
    //         })
    //         .addTo(controller);

    //     // Scroll to sections on button click
    //     $(".decade-block a").on("click", function (e) {
    //         e.preventDefault();

    //         var targetId = $(this).attr("href").substring(1); // Get the ID (e.g., 's1930')
    //         var targetElement = $("#" + targetId);

    //         if (targetElement.length) {
    //             var $scrollWrap = $(".scroll-wrap2");
    //             var containerWidth = $scrollWrap.parent().outerWidth();
    //             var totalWidth = $scrollWrap[0].scrollWidth;

    //             // Calculate the target scroll offset
    //             var targetOffsetLeft = targetElement.position().left; // Use position instead of offset for relative calculations
    //             var scrollDistance = totalWidth - containerWidth;

    //             // Calculate progress (relative to the scroll distance)
    //             var horizontalProgress = targetOffsetLeft / scrollDistance;

    //             // Use GSAP to animate the scroll
    //             gsap.to($scrollWrap, {
    //                 duration: 0.5,
    //                 x: -targetOffsetLeft, // Scroll to the target
    //                 onUpdate: function () {
    //                     // Update ScrollMagic scene progress
    //                     if (wipeScene) {
    //                         wipeScene.progress(horizontalProgress);
    //                     }
    //                     // Update the progress bar
    //                     $(".progress").css("width", (horizontalProgress * 100) + "%");
    //                 }
    //             });
    //         }
    //     });
    // });


    // Horizontal scroll with color change with animation targets, but with color change and with wdth progress and  without scrollbar move
    $(document).ready(function () {
        var controller = new ScrollMagic.Controller();
        var wipeScene, colorTimeline;

        function initializeScroll() {
            var $scrollWrap = $(".scroll-wrap2");

            if ($scrollWrap.length === 0) {
                console.error("Error: Element .scroll-wrap2 not found in the DOM.");
                return;
            }

            var containerWidth = $scrollWrap.parent().outerWidth();
            var totalWidth = $scrollWrap[0].scrollWidth;

            if (containerWidth === 0 || totalWidth === 0) {
                console.warn("One of the dimensions is 0, retrying in 100ms...");
                setTimeout(initializeScroll, 100);
                return;
            }

            var scrollDistance = totalWidth - containerWidth;

            if (scrollDistance <= 0) {
                console.warn("No scrolling necessary: Content fits within the container.");
                return;
            }

            var wipeAnimation = new TimelineMax()
                .fromTo($scrollWrap, 1, { x: "0px" }, { x: -scrollDistance + "px", ease: Linear.easeNone });

            if (wipeScene) {
                wipeScene.destroy(true);
            }

            wipeScene = new ScrollMagic.Scene({
                triggerElement: "#timeline-spacer",
                triggerHook: 0.8,
                duration: '500%'
            })
                .setPin("#timeline-spacer")
                .setTween(wipeAnimation)
                .addTo(controller);

            // Update progress bar and vertical scrollbar
            new ScrollMagic.Scene({
                triggerElement: "#timeline-spacer",
                triggerHook: 0.8,
                duration: '500%' // Match duration with scroll
            })
                .on("progress", function (event) {
                    // Update progress bar width
                    $(".progress").css("width", (event.progress * 100) + "%");
                })
                .addTo(controller);

            // Background color animation
            colorTimeline = gsap.timeline();
            colorTimeline
                .to(".colorbar", { backgroundColor: "rgb(184, 103, 127)", duration: 0.2, ease: Linear.easeNone })
                .to(".colorbar", { backgroundColor: "rgb(238, 108, 110)", duration: 0.2, ease: Linear.easeNone })
                .to(".colorbar", { backgroundColor: "rgb(177, 195, 215)", duration: 0.2, ease: Linear.easeNone })
                .to(".colorbar", { backgroundColor: "rgb(245, 228, 160)", duration: 0.2, ease: Linear.easeNone })
                .to(".colorbar", { backgroundColor: "rgb(162, 208, 230)", duration: 0.2, ease: Linear.easeNone });

            new ScrollMagic.Scene({
                triggerElement: "#timeline-spacer",
                duration: '500%'
            })
                .setTween(colorTimeline)
                .addTo(controller);
        }

        initializeScroll();

        $(window).on("resize", function () {
            setTimeout(initializeScroll, 100);
        });

        new ScrollMagic.Scene({
            triggerElement: "#inner-trigger",
            triggerHook: 0.5
        })
            .on("enter", function () {
                $(".biography .timeline").css("display", "block");
            })
            .on("leave", function () {
                $(".biography .timeline").css("display", "none");
            })
            .addTo(controller);

        // Scroll to sections on button click
        // $(".decade-block a").on("click", function (e) {
        //     e.preventDefault();

        //     var targetId = $(this).attr("href").substring(1); // Get the ID (e.g., 's1930')
        //     var targetElement = $("#" + targetId);

        //     if (targetElement.length) {
        //         var $scrollWrap = $(".scroll-wrap2");
        //         var containerWidth = $scrollWrap.parent().outerWidth();
        //         var totalWidth = $scrollWrap[0].scrollWidth;

        //         // Calculate the target scroll offset
        //         var targetOffsetLeft = targetElement.position().left;
        //         var scrollDistance = totalWidth - containerWidth;

        //         // Calculate progress (relative to the scroll distance)
        //         var horizontalProgress = targetOffsetLeft / scrollDistance;

        //         gsap.to($scrollWrap, {
        //             duration: 0.5,
        //             x: -targetOffsetLeft, // Scroll to the target
        //             onUpdate: function () {
        //                 // Update ScrollMagic scene progress
        //                 if (wipeScene) {
        //                     wipeScene.progress(horizontalProgress);
        //                 }
        //                 // Update the progress bar
        //                 $(".progress").css("width", (horizontalProgress * 100) + "%");
        //             }
        //         });

        //         // Manually update ScrollMagic scene progress
        //         // if (wipeScene) {
        //         //     wipeScene.progress(horizontalProgress);
        //         // }

        //         // // Update the progress bar
        //         // $(".progress").css("width", (horizontalProgress * 100) + "%");

        //         // Update color timeline progress
        //         if (colorTimeline) {
        //             colorTimeline.progress(horizontalProgress);
        //         }

        //         // Now, manually scroll the container to the target position
        //         $scrollWrap.scrollLeft(targetOffsetLeft);
        //     }
        // });


        $(".decade-block a").on("click", function (e) {
            e.preventDefault();

            var targetId = $(this).attr("href").substring(1); // Get the ID (e.g., 's1930')
            var targetElement = $("#" + targetId);

            if (targetElement.length) {
                var $scrollWrap = $(".scroll-wrap2");
                var containerWidth = $scrollWrap.parent().outerWidth();
                var totalWidth = $scrollWrap[0].scrollWidth;

                // Calculate the target scroll offset
                var targetOffsetLeft = targetElement.position().left;
                var scrollDistance = totalWidth - containerWidth;

                // Calculate progress (relative to the scroll distance)
                var horizontalProgress = targetOffsetLeft / scrollDistance;

                // Manually set the scroll position of the wrapper
                gsap.to($scrollWrap, {
                    duration: 0.5,
                    x: -targetOffsetLeft, // Scroll to the target
                    onUpdate: function () {
                        // Update ScrollMagic scene progress
                        if (wipeScene) {
                            wipeScene.progress(horizontalProgress);
                        }
                        // Update the progress bar
                        $(".progress").css("width", (horizontalProgress * 100) + "%");
                    },
                    onComplete: function () {
                        // After the animation completes, update the native scrollbar
                        $scrollWrap.scrollLeft(targetOffsetLeft);
                    }
                });

                // Update color timeline progress
                if (colorTimeline) {
                    colorTimeline.progress(horizontalProgress);
                }
            }
        });









        // $(".decade-block a").on("click", function (e) {
        //     e.preventDefault();

        //     var targetId = $(this).attr("href").substring(1); // Extract the target ID
        //     var targetElement = $("#" + targetId);

        //     if (targetElement.length) {
        //         var $scrollWrap = $(".scroll-wrap2");
        //         var containerWidth = $scrollWrap.parent().outerWidth();
        //         var totalWidth = $scrollWrap[0].scrollWidth;

        //         // Calculate total horizontal scrollable distance
        //         var scrollDistance = totalWidth - containerWidth;

        //         if (scrollDistance <= 0) {
        //             console.warn("No scrollable distance in .scroll-wrap2");
        //             return;
        //         }

        //         // Get the target's offset relative to the scrollable container
        //         var targetOffsetLeft = targetElement.position().left;

        //         // Clamp the target offset within valid bounds
        //         targetOffsetLeft = Math.max(0, Math.min(targetOffsetLeft, scrollDistance));

        //         // Calculate horizontal progress (0 to 1)
        //         var horizontalProgress = targetOffsetLeft / scrollDistance;

        //         // Map horizontal progress to the browser's vertical scroll range
        //         var maxScrollTop = document.documentElement.scrollHeight - window.innerHeight; // Max vertical scroll position
        //         var docScrollPosition = Math.round(horizontalProgress * maxScrollTop); // Round to avoid fractional errors

        //         console.log({
        //             targetId,
        //             targetOffsetLeft,
        //             horizontalProgress,
        //             docScrollPosition,
        //             scrollDistance,
        //             maxScrollTop,
        //         }); // Debugging output for tracking

        //         // Use GSAP to animate the horizontal scroll and synchronize the vertical scrollbar
        //         gsap.to($scrollWrap, {
        //             duration: 0.5,
        //             x: -targetOffsetLeft, // Scroll horizontally to the target
        //             onUpdate: function () {
        //                 // Synchronize vertical scrollbar during animation
        //                 var currentScrollPosition = Math.round(horizontalProgress * maxScrollTop);
        //                 window.scrollTo(0, currentScrollPosition);
        //             },
        //             onComplete: function () {
        //                 // Ensure vertical scrollbar aligns correctly after animation
        //                 window.scrollTo(0, docScrollPosition);
        //             },
        //         });

        //         // Synchronize the color timeline with horizontal progress
        //         if (colorTimeline) {
        //             colorTimeline.progress(horizontalProgress);
        //         }
        //     }
        // });
    });
// End of Horizontal scroll




    // Select the .scroll-progress element
    const scrollProgress = document.querySelector('.scroll-progress');

    // Check if the device supports hover (i.e., it's not a touchscreen-only device)
    if (window.matchMedia('(hover: hover)').matches) {
        scrollProgress.addEventListener('mouseover', () => {
            scrollProgress.classList.add('open'); // Add the 'open' class when hovered
        });

        scrollProgress.addEventListener('mouseout', () => {
            scrollProgress.classList.remove('open'); // Remove the 'open' class when hover ends
        });
    }


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
    var reveals = document.querySelectorAll('.reveal1');

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





Fancybox.bind("[data-fancybox='gallery']", {
    Carousel: {
        // infinite: false,
        transition: "fade",
        // Remove the navigation arrows
        // Navigation: false,
    },
    compact: false, /*Background click close. თუ ამოვაკომენტარებ მაშინ min-width: 579px-ზე იმუშავებს და max-width: 578px-ზე - არა*/
    idle: false,
    animated: true,
    Toolbar: {
        display: {
          left: [],
          middle: ["infobar"],
          right: [/*"fullscreen",*/ "close"],
        },
    },
    Thumbs: {
        type: '',
        // Carousel: {
        //   center: function () {
        //     return this.contentDim > this.viewportDim;
        //   },
        // },
    },
});



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