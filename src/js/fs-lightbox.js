﻿
function PqbLightbox() {

    var _this = this;

    this.imagesArray = [];

    this.currentImage;

    this.isLightbox = false;

    let controlsHtml = `
                            <div class="lightbox-controls">
                                <span class="lb-prev">&lt;&nbsp;Prev</span>&nbsp;&nbsp;|&nbsp;
                                <span class="lb-next">Next&nbsp;&gt;</span>
                            </div>
                        `;

    this.render = () => {
        document.querySelectorAll('img.pqb-lightbox').forEach((img_el, index) => {
            _this.imagesArray.push(img_el);
            img_el.setAttribute("data-lightbox-index", index);
            img_el.addEventListener('click', () => {
                _this.lightbox(img_el);
            });
        });

        addKeyListeners();

    }

    this.lightbox = _el => {
        this.hideLightbox();
        this.currentImage = _el;
        this.isLightbox = true;

        var overlay = document.createElement('div');
        overlay.classList.add('lightbox-overlay');
        overlay.addEventListener('click', this.hideLightbox);
        var imageContainer = document.createElement('div');
        imageContainer.classList.add('lightbox-image');

        var image = document.createElement('img');
        image.src = _el.src;

        imageContainer.appendChild(image);

        document.querySelector('body').appendChild(overlay);
        document.querySelector('body').appendChild(imageContainer);

        prepareControls(_el);
    }

    this.next = () => {
        let imgIndex = getCurrentImageIndex();
        if (imgIndex === _this.imagesArray.length - 1)
            return;
        _this.lightbox(_this.imagesArray[getCurrentImageIndex() + 1]);
    }

    this.prev = () => {
        let imgIndex = getCurrentImageIndex();
        if (imgIndex === 0)
            return;
        _this.lightbox(_this.imagesArray[getCurrentImageIndex() - 1]);
    }

    this.hideLightbox = () => {
        let overlay = document.querySelector('.lightbox-overlay');
        let image = document.querySelector('.lightbox-image');
        let controls = document.querySelector('.lightbox-controls');
        if (overlay)
            document.querySelector('body').removeChild(overlay);
        if (image)
            document.querySelector('body').removeChild(image);
        if (controls)
            document.querySelector('body').removeChild(controls);
        this.isLightbox = false;
    };

    function createEscapeListener() {
        document.addEventListener('keydown', e => {

        });
    }

    function prepareControls(imgElement) {
        let controls = document.createElement('div');
        controls.innerHTML += controlsHtml;

        document.querySelector('body').appendChild(controls.querySelector('.lightbox-controls'));


        let imgIndex = getCurrentImageIndex();
        if (imgIndex > 0) {
            document.querySelector(".lb-prev").addEventListener('click', () => {
                _this.prev();
            })
        }
        else {
            document.querySelector(".lb-prev").classList.add(['lb-disabled'])
        }

        if (imgIndex < _this.imagesArray.length - 1) {
            document.querySelector(".lb-next").addEventListener('click', () => {
                _this.next();
            })
        }
        else {
            document.querySelector(".lb-next").classList.add(['lb-disabled'])
        }

        showCounter();

    }

    function showCounter() {
        let imgIndex = getCurrentImageIndex();
        let counter = document.createElement("span");
        let counter_Html = `<br/>${imgIndex + 1} of ${_this.imagesArray.length}`;
        counter.innerHTML = counter_Html;
        document.querySelector('.lightbox-controls').appendChild(counter);
    }

    function getCurrentImageIndex() {
       return +_this.currentImage.getAttribute("data-lightbox-index");
    }

    function addKeyListeners() {
        document.addEventListener('keydown', e => {
            if (e.keyCode === 37 && _this.isLightbox) {
                _this.prev();
                return;
            }

            else if (e.keyCode === 39 && _this.isLightbox) {
                _this.next();
                return;
            }
            else if (e.keyCode === 27 && _this.isLightbox) {
                _this.hideLightbox();
                return;
            }
        });
    }
}

var pqbLightbox = new PqbLightbox;
pqbLightbox.render();