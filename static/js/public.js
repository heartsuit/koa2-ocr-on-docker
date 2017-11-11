function footerPosition() {
  $("footer").removeClass("fixed-bottom");
  var contentHeight = document.body.scrollHeight, // total height
    winHeight = window.innerHeight; // visible height
  if (contentHeight < winHeight) {
    $("footer").addClass("fixed-bottom");
  } else {
    $("footer").removeClass("fixed-bottom");
  }
}

$(window).resize(footerPosition);
