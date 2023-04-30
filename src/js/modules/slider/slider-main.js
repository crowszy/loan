import Slider from './slider';

export default class MainSlider extends Slider {
    constructor(buttons) {
        super(buttons)
    }
    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }
        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        try {
            this.hanson.style.opacity = '0';

            if (n === 3) {
                this.hanson.classList.add('animated');
                setTimeout(() => {
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('slideInUp');
                }, 3000);
            } else {
                this.hanson.classList.remove('slideInUp');
            }
        } catch (error) {}

        [...this.slides].forEach(slide => {
            slide.style.display = 'none';
        });

        this.slides[this.slideIndex - 1].style.display = 'block';
        
    }

    changeSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    

    // showBlockTimeout() {
    //         setTimeout(function() {
    //             this.hanson.style.display = 'block';
    //         }, 3000)
    // }

    

    bindTriggers() {
        this.buttons.forEach(button => {
            button.addEventListener('click', () => {
                this.changeSlides(1);
            });

            button.parentNode.previousElementSibling.addEventListener('click', (event) => {
                event.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            })
        });    
        
    }

    changeModuleSlide(selector, n) {
        selector.forEach(item => {
            item.addEventListener('click', (event) => {
                event.stopPropagation();
                event.preventDefault();
                this.changeSlides(n);
            })
        })
    }


    render() {
        if (this.container) {
            try {
                this.hanson = document.querySelector('.hanson')
            } catch (error) {}
            
    
            this.showSlides(this.slideIndex);
            this.bindTriggers();
            this.changeModuleSlide(this.modulePrev, -1);
            this.changeModuleSlide(this.moduleNext, 1);    
        } 
        
    }
}