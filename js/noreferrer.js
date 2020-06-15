$(function() {
  var aTags = [].slice.call(document.getElementsByTagName('a'));
  var ua = window.navigator.userAgent.toLowerCase();
  var isIE = (~ua.indexOf('msie') || ~ua.indexOf('trident'));
  if (!isIE) {
    aTags.forEach(function(el) {
      if (el.target === '_blank'){
        var rels = el.rel.split(' ');
        if (!~rels.indexOf('noopener')) {
          rels.push('noopener');
          el.setAttribute('rel', rels.join(' ').trim());
        }
        if (!~rels.indexOf('noreferrer')) {
          rels.push('noreferrer');
          el.setAttribute('rel', rels.join(' ').trim());
        }
      }
    });
  }
})();