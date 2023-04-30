import MainSlider from "./modules/slider/slider-main";
import MiniSlider from "./modules/slider/slider-mini";
import Player from './modules/player';
import Difference from './modules/difference';
import Forms from './modules/forms';
import ShowInfo from './modules/showInfo';
import Download from "./modules/download";

window.addEventListener('DOMContentLoaded', () => {
    const slider = new MainSlider({buttons: '.next', container: '.page'});
    slider.render();

    const modulePageSlider = new MainSlider({container: '.moduleapp', buttons: '.next', modulePrev: '.prevmodule', moduleNext: '.nextmodule'});
    modulePageSlider.render();

    const showUpSlider = new MiniSlider({
        container: '.showup__content-slider',
        next: '.showup__next',
        prev: '.showup__prev',
        animate: true,
        activeClass: 'card-active'
    })
    showUpSlider.init();

    const modulesSlider = new MiniSlider({
        container: '.modules__content-slider',
        next: '.modules__info-btns .slick-next',
        prev: '.modules__info-btns .slick-prev',
        animate: true,
        activeClass: 'card-active',
        autoplay: true
    })
    modulesSlider.init();

    const feedSlider = new MiniSlider({
        container: '.feed__slider__cards',
        next: '.feed__slider .slick-next',
        prev: '.feed__slider .slick-prev',
        activeClass: 'feed__item-active'
    })
    feedSlider.init();

    new Player('.showup .play', '.overlay').init();
    new Player('.module__video-item .play', '.overlay').init();

    

    new Difference('.officerold', '.officernew', '.officer__card-item').init();

    new Forms('.form').init();

    new ShowInfo('.plus__content').init();

    new Download('.download').init();
    
});

