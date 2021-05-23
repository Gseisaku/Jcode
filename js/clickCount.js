$('.sort span').click((function() {
  let count = 0
  return function() {
    count++
    if (count === 1) {
      $('.listCell').attr('data-myorder', '1');
    } else if (count === 2) {
      $('.listCell').attr('data-myorder', '2');
    } else if (count === 3) {
      $('.listCell').attr('data-myorder', '3');
    } else {
      $('.listCell').attr('data-myorder', '');
    }
  }
})())