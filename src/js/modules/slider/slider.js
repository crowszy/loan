export default class Slider {
    constructor({container = null, buttons = null, prev = null, next = null, modulePrev = null, moduleNext = null,autoplay, animate, activeClass = ''} = {}) {
        this.container = document.querySelector(container);
        try {this.slides = this.container.children;} catch(e) {};
        this.buttons = document.querySelectorAll(buttons);
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        try {this.modulePrev = document.querySelectorAll(modulePrev);} catch(e) {};
        try {this.moduleNext = document.querySelectorAll(moduleNext);} catch(e) {};
        this.autoplay = autoplay;
        this.animate = animate;
        this.activeClass = activeClass;
        this.slideIndex = 1;
    }

   
}