/*
 * Lightbox-FS
 * Copyright 2019
 * Author: Faisal Rashid
 * All Rights Reserved.
 * Use, reproduction, distribution, and modification of this code is subject to the terms and
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 * Project: https://github.com/FaisalST32/fs-lightbox
 */

function FsLightbox() {

  var _this = this;

  /**
   * @private {!Array<!Element>}
   */
  const imagesArray_ = [];

  /**
   * @private {?Element}
   */
  let  = null;

  /**
   * @private {boolean}
   */
  let isLightbox_ = false;

  /**
   * @private {!Element}
   */
  const body_ = document.querySelector('body');

  const controlsHtml = `
    <div class="lightbox-controls">
      <span class="lb-prev">&#10094;</span>
      <span class="lb-next">&#10095;</span>
      <span class="lb-close">&times;</span>
    </div>
  `;

  this.render = () => {
    document.querySelectorAll('img.fs-lightbox').forEach((imageElement, index) => {
      imagesArray_.push(imageElement);
      imageElement.setAttribute("data-lightbox-index", index);
      imageElement.addEventListener('click', () => {
        lightbox_(imageElement);
      });
    });

    addKeyListeners_();
  }

  /**
   *
   * @param {!Element} imageElement
   * @private
   */
  function lightbox_(imageElement) {
    hideLightbox_();
    currentImage_ = _el;
    isLightbox_ = true;

    var overlay = document.createElement('div');
    overlay.classList.add('lightbox-overlay');
    var imageContainer = document.createElement('div');
    imageContainer.classList.add('lightbox-image');

    var image = document.createElement('img');
    image.src = imageElement.src;

    imageContainer.appendChild(image);

    body_.appendChild(overlay);
    body_.appendChild(imageContainer);

    prepareControls_(_el);
  }

  /**
   * Handles next image.
   * @private
   */
  function next_ () {
    let imgIndex = getCurrentImageIndex_();
    if (imgIndex === imagesArray_.length - 1)
      return;
    lightbox_(imagesArray_[getCurrentImageIndex_() + 1]);
  }

  /**
   * Handles previous image.
   * @private
   */
  function prev_() {
    const imgIndex = getCurrentImageIndex_();

    if (imgIndex === 0)
      return;
    lightbox_(imagesArray_[getCurrentImageIndex_() - 1]);
  }

  function hideLightbox_() {
    const overlay = document.querySelector('.lightbox-overlay');
    const image = document.querySelector('.lightbox-image');
    const controls = document.querySelector('.lightbox-controls');

    if (overlay)
      body_.removeChild(overlay);
    if (image)
      body_.removeChild(image);
    if (controls)
      body_.removeChild(controls);

    isLightbox_ = false;
  };

  /**
   * Prepares controls.
   * @private
   */
  function prepareControls_() {
    const controls = document.createElement('div');
    const imgIndex = getCurrentImageIndex_();

    controls.innerHTML = controlsHtml;
    body_.appendChild(controls.querySelector('.lightbox-controls'));

    if (imgIndex > 0) {
      document.querySelector(".lb-prev").addEventListener('click', () => {
        prev_();
      })
    } else {
      document.querySelector(".lb-prev").classList.add(['lb-disabled'])
    }

    if (imgIndex < imagesArray_.length - 1) {
      document.querySelector(".lb-next").addEventListener('click', () => {
        next_();
      });
    } else {
      document.querySelector(".lb-next").classList.add(['lb-disabled']);
    }

    document.querySelector('.lb-close').addEventListener('click', () => {
      hideLightbox_();
    })

    showCounter_();
  }

  /**
   * Shows counter.
   * @private
   */
  function showCounter_() {
    const imgIndex = getCurrentImageIndex_();
    const counter = document.createElement("span");
    let counter_Html = `<br/>${imgIndex + 1} of ${imagesArray_.length}`;

    if (currentImage_.alt) {
      counter_Html += ` - ${currentImage_.alt}`;
    }

    counter.innerHTML = counter_Html;
    document.querySelector('.lightbox-image').appendChild(counter);
  }

  /**
   * Gets index of current image.
   * @private
   */
  function getCurrentImageIndex_() {
    return +currentImage_.getAttribute("data-lightbox-index");
  }

  /**
   * Adds key listeners.
   * @private
   */
  function addKeyListeners_() {
    document.removeEventListener('keydown', handlesKeyDownEvent_);
    document.addEventListener('keydown', handlesKeyDownEvent_);
  }

  /**
   * Handles keydow event.
   * @param {!Event} e
   */
  function handlesKeyDownEvent_(e) {
    if (e.keyCode === 37 && isLightbox_) {
      prev_();
    } else if (e.keyCode === 39 && isLightbox_) {
      next_();
    } else if (e.keyCode === 27 && isLightbox_) {
      hideLightbox_();
    }
  }
}

var fsLightbox = new FsLightbox;

fsLightbox.render();
