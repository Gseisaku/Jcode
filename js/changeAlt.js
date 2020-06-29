function changeAlt(alt) {

    var altId = document.getElementById('big');
    var altVal = "店舗名 {$castRow->castName} " + alt + "枚目";
    
    altId.setAttribute('alt', altVal);

}
function changeTitle(title) {

    var titleId = document.getElementById('big');
    var titleVal = "{$castRow->castName}☆{$castRow->getExtendProperty(5145)} " + title + "枚目";
    
    titleId.setAttribute('title', titleVal);

}