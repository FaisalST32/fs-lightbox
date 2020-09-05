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
  /** @enum {string} */
  const DomEvents = {
    CLICK: 'click',
    KEYDOWN: 'keydown',
  };

  /** @enum {string} */
  const Selectors = {
    DATA_INDEX: 'data-lightbox-index',
    DIV: 'div',
    IMAGE: 'img',
    LIGHTBOX_CLOSE: '.lb-close',
    LIGHTBOX_CONTROL_DISABLED: 'lb-disabled',
    LIGHTBOX_CONTROLS: 'lightbox-controls',
    LIGHTBOX_IMAGE: 'lightbox-image',
    LIGHTBOX_NEXT: '.lb-next',
    LIGHTBOX_OVERLAY_VISIBLE: 'lightbox-overlay--visible',
    LIGHTBOX_OVERLAY: 'lightbox-overlay',
    LIGHTBOX_PREV: '.lb-prev',
    LIGHTBOX_VISIBLE: 'lightbox--visible',
    LIGHTBOX_ROOT: 'lightbox',
    LIGHTBOX: 'img.fs-lightbox',
    SPAN: 'span',
  };

  /** @private {!Array<!Element>} */
  const imagesArray_ = [];

  /** @private {?Element} */
  let currentImage_ = null;

  /** @private {number} */
  let currentIndex_ = -1;

  /** @private {!Element} */
  const body_ = document.querySelector('body');

  /** @private {string} */
  const controlsHtml = `
    <span class="lb-prev">&#10094;</span>
    <span class="lb-next">&#10095;</span>
    <span class="lb-close">&times;</span>
  `;

  /** @private {?Element} */
  let element_ = null;

  /** @private {?Element} */
  let overlay_ = null;

  /** @private {?Element} */
  let imageContainer_ = null;

  /** @private {?Element} */
  let image_ = null;

  /** @private {?Element} */
  let controls_ = null;

  /** @private {?Element} */
  let counter_ = null;

  /** @private {?Element} */
  let prevControl_ = null;

  /** @private {?Element} */
  let nextControl_ = null;

  /** @private {?Element} */
  let closeControl_ = null;

  /**
   * Initializes the library.
   */
  this.render = () => {
    initImages_();
    initElements_();
  }

  /**
   * Initializes images array.
   * @private
   */
  function initImages_() {
    const imagesElement = document.querySelectorAll(Selectors.LIGHTBOX);

    imagesElement.forEach((imageElement, index) => {
      imagesArray_.push(imageElement);
      imageElement.setAttribute(Selectors.DATA_INDEX, index);
      imageElement.addEventListener(DomEvents.CLICK, () => {
        handleImageClicked_(imageElement);
      });
    });
  }

  /**
   * Initializes library elements.
   * @private
   */
  function initElements_() {
    initRoot_();
    initOverlay_();
    initImage_();
    initControls_();
    initCounter_();
  }

  /**
   * Initializes root element.
   * @private
   */
  function initRoot_() {
    element_ = document.createElement(Selectors.DIV);
    element_.classList.add(Selectors.LIGHTBOX_ROOT);
    body_.appendChild(element_)
  }

  /**
   * Initializes overlay element.
   * @private
   */
  function initOverlay_() {
    overlay_ = document.createElement(Selectors.DIV);
    overlay_.classList.add(Selectors.LIGHTBOX_OVERLAY);
    element_.appendChild(overlay_);
  }

  /**
   * Initializes imageContainer and image element.
   * @private
   */
  function initImage_() {
    imageContainer_ = document.createElement(Selectors.DIV);
    imageContainer_.classList.add(Selectors.LIGHTBOX_IMAGE);
    image_ = document.createElement(Selectors.IMAGE)
    imageContainer_.appendChild(image_);
    element_.appendChild(imageContainer_);
  }

  /**
   * Initializes controls.
   * @private
   */
  function initControls_() {
    controls_ = document.createElement(Selectors.DIV);
    controls_.classList.add(Selectors.LIGHTBOX_CONTROLS);
    controls_.innerHTML = controlsHtml;
    element_.appendChild(controls_);

    prevControl_ = element_.querySelector(Selectors.LIGHTBOX_PREV)
    nextControl_ = element_.querySelector(Selectors.LIGHTBOX_NEXT);
    closeControl_ = element_.querySelector(Selectors.LIGHTBOX_CLOSE);

    prevControl_.addEventListener(DomEvents.CLICK, prev_);
    nextControl_.addEventListener(DomEvents.CLICK, next_);
    closeControl_.addEventListener(DomEvents.CLICK, hideLightbox_);
  }

  /**
   * Initializes counter element.
   * @private
   */
  function initCounter_() {
    counter_ = document.createElement(Selectors.SPAN);
    imageContainer_.appendChild(counter_);
  }

  /**
   * Initializes key listeners.
   * @private
   */
  function initKeyListeners_() {
    document.addEventListener(DomEvents.KEYDOWN, handleKeyDownEvent_);
  }

  /**
   * Removes key listeners.
   * @private
   */
  function removeKeyListeners_() {
    document.removeEventListener(DomEvents.KEYDOWN, handleKeyDownEvent_);
  }

  /**
   * Handles keydow events.
   * @param {!Event} event
   */
  function handleKeyDownEvent_(event) {
    const isRightArrowKey = event.keyCode === 39;
    const isLeftArrowKey = event.keyCode === 37;
    const isEscKey = event.keyCode === 27;

    if (isLeftArrowKey) {
      prev_();
    } else if (isRightArrowKey) {
      next_();
    } else if (isEscKey) {
      hideLightbox_();
    }
  }

  /**
   * Handles image click.
   * @param {!Element} imageElement
   * @private
   */
  function handleImageClicked_(imageElement) {
    initKeyListeners_();
    updateCurrentImage_(imageElement);
    updateCounter_();
    checkControlsDisability_();
    element_.classList.add(Selectors.LIGHTBOX_VISIBLE);
  }

  /**
   * Updates current image.
   * @param {!Element} imageElement
   * @private
   */
  function updateCurrentImage_(imageElement) {
    currentImage_ = imageElement;
    currentIndex_ = +imageElement.getAttribute(Selectors.DATA_INDEX);
    image_.src = imageElement.src;
  }

  /**
   * Handles next image.
   * @private
   */
  function next_ () {
    const isNotLast = currentIndex_ !== imagesArray_.length - 1;

    isNotLast && handleImageClicked_(imagesArray_[currentIndex_ + 1]);
  }

  /**
   * Handles previous image.
   * @private
   */
  function prev_() {
    const isNotFirst = currentIndex_ !== 0;

    isNotFirst && handleImageClicked_(imagesArray_[currentIndex_ - 1]);
  }

  /**
   * Hides lightbox.
   * @private
   */
  function hideLightbox_() {
    element_.classList.remove(Selectors.LIGHTBOX_VISIBLE);
    removeKeyListeners_();
  };

  /**
   * Checks controls disability.
   * @private
   */
  function checkControlsDisability_() {
    const isFirst = currentIndex_ === 0;
    const isLast = currentIndex_ === imagesArray_.length -1;

    if (isFirst) {
      prevControl_.classList.add(Selectors.LIGHTBOX_CONTROL_DISABLED)
    } else if (isLast) {
      nextControl_.classList.add(Selectors.LIGHTBOX_CONTROL_DISABLED);
    } else {
      prevControl_.classList.remove(Selectors.LIGHTBOX_CONTROL_DISABLED)
      nextControl_.classList.remove(Selectors.LIGHTBOX_CONTROL_DISABLED);
    }
  }

  /**
   * Updates counter.
   * @private
   */
  function updateCounter_() {
    let counter_Html = `<br/>${currentIndex_ + 1} of ${imagesArray_.length}`;

    currentImage_.alt && (counter_Html += ` - ${currentImage_.alt}`);
    counter_.innerHTML = counter_Html;
  }
}

var fsLightbox = new FsLightbox;

fsLightbox.render();
