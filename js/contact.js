const mediaQuery = window.matchMedia('(min-width: 751px)')
if (mediaQuery.matches) {

    $('.hamburger1, .hamburger2, .scroll-wrap1').click(function (e) {
        $('.hamburger1, .hamburger2, .logo-full').toggleClass('activated');
        $('.click-blocker').toggleClass('show');
    });
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