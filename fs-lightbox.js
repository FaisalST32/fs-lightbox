// A bare-minimum Lightbox plugin developed at PQube Business Solutions
// Usage: Add an onclick listenter to the img tag that you want to display in a lightbox
// eg: <img src="/images/image.jpb" onclick="lightbox(this)" />
// Do not forget to include the css file also


function lightbox(_el) {
    var overlay = document.createElement('div');
    overlay.classList.add('lightbox-overlay');
    overlay.addEventListener('click', hideLightbox);
    var image = document.createElement('img');
    image.src = _el.src;
    image.classList.add('lightbox-image');
    document.querySelector('body').appendChild(overlay);
    document.querySelector('body').appendChild(image);
}

function hideLightbox() {
    var overlay = document.querySelector('.lightbox-overlay');
    var image = document.querySelector('.lightbox-image');
    document.querySelector('body').removeChild(overlay);
    document.querySelector('body').removeChild(image);
}