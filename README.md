# lightbox-fs  
  
A simple lightbox for your image gallery. This lightbox doesn't have any dependencies and can be used with any webpage.

### CDN Links:

[https://cdn.jsdelivr.net/gh/FaisalST32/fs-lightbox@latest/src/js/fs-lightbox.min.js](https://cdn.jsdelivr.net/gh/FaisalST32/fs-lightbox@latest/src/js/fs-lightbox.min.js)  
[https://cdn.jsdelivr.net/gh/FaisalST32/fs-lightbox@latest/src/css/fs-lightbox.min.css](https://cdn.jsdelivr.net/gh/FaisalST32/fs-lightbox@latest/src/css/fs-lightbox.min.css)  
  
### NPM

npm i lightbox-fs

[https://www.npmjs.com/package/lightbox-fs](https://www.npmjs.com/package/lightbox-fs)

### Usage:

* To use the lightbox you can simply add a reference to the .js file and the .css files in your webpage.  

* In the img tag of the image that you wan to be a part of the lightbox, add a class **fs-lightbox**.  
For example, "<img src="image.png" class="fs-lightbox" />"

* That's it. When you click on the image, a lightbox preview of the image will appear.
  
### Methods:

The plugin exposes some methods that you can use:

* **fsLightbox.next()** - This will display the next picture in the lightbox

* **fsLightbox.prev()** - This will display the previous picture in the lightbox

* **fsLightbox.hideLightbox()** - This will hide the Lightbox
