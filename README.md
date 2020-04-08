# lightbox-fs  
  
A simple lightbox for your image gallery. This lightbox doesn't have any dependencies and can be used with any webpage.

Here's a preview

![fs-lightbox in action](https://apifr.azurewebsites.net/uploads/637050067281687241_fs-ligthbox.gif)

### CDN Links:

[https://cdn.jsdelivr.net/gh/FaisalST32/fs-lightbox@latest/src/js/fs-lightbox.min.js](https://cdn.jsdelivr.net/gh/FaisalST32/fs-lightbox@latest/src/js/fs-lightbox.min.js)  
[https://cdn.jsdelivr.net/gh/FaisalST32/fs-lightbox@latest/src/css/fs-lightbox.min.css](https://cdn.jsdelivr.net/gh/FaisalST32/fs-lightbox@latest/src/css/fs-lightbox.min.css)  
  
### NPM

npm i lightbox-fs

[https://www.npmjs.com/package/lightbox-fs](https://www.npmjs.com/package/lightbox-fs)

### Usage:

* To use the lightbox you can simply add a reference to the .js file at the end of the body of your html and the .css file in the head of your html page.  

* In the img tag of the image that you want to be a part of the lightbox, add a class **fs-lightbox**.  
For example, "&lt;img src="image.png" class="fs-lightbox" /&gt;"

* That's it. When you click on the image, a lightbox preview of the image will appear.
  
### Methods:

The plugin exposes some methods that you can use:

* **fsLightbox.next()** - This will display the next picture in the lightbox

* **fsLightbox.prev()** - This will display the previous picture in the lightbox

* **fsLightbox.hideLightbox()** - This will hide the Lightbox
