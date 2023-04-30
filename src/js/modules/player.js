export default class Player {
    constructor(triggers, overlay) {
        this.buttons = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    }

    bindTriggers() {
        this.buttons.forEach((button, i) => {
            try {
                const blockedElem = button.closest('.module__video-item').nextElementSibling;

            if (i % 2 === 0) {
                blockedElem.setAttribute('data-disabled', 'true');
            }
            } catch(e){}

            button.addEventListener('click', () => {
                if (!button.closest('.module__video-item') || button.closest('.module__video-item').getAttribute('data-disabled') !== 'true') {
                    this.activeButton = button;

                    if (document.querySelector('iframe#frame')) {
                        this.overlay.style.display = 'flex';
                        if (this.path !== button.getAttribute('data-url')) {
                            this.path = button.getAttribute('data-url');
                            this.player.loadVideoById({videoId: this.path});
                        }
                    } else {
                        this.path = button.getAttribute('data-url');
                        this.createPlayer(this.path);
                    }
                }
            })
        })
    }

    
    bindCloseButton() {
        this.close.addEventListener('click', () => {
            this.overlay.style.display = 'none';
            this.player.stopVideo();
        })
    }

    createPlayer(url) {
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`,
            events: {
                'onStateChange': this.onPlayerStateChange
              }
          });
        this.overlay.style.display = 'flex';
    }

    onPlayerStateChange(state) {
       try {
        const blockedElem = this.activeButton.closest('.module__video-item').nextElementSibling;
        const playButton = this.activeButton.querySelector('svg').cloneNode(true);

        if (state.data === 0 && blockedElem.querySelector('.play__circle').classList.contains('closed')) {
            blockedElem.querySelector('.play__circle').classList.remove('closed');
            blockedElem.querySelector('svg').remove();
            blockedElem.querySelector('.play__circle').appendChild(playButton);
            blockedElem.querySelector('.play__text').textContent = 'play video';
            blockedElem.querySelector('.play__text').classList.remove('attention');
            blockedElem.style.opacity = '1';
            blockedElem.style.filter = 'none';

            blockedElem.setAttribute('data-disabled', 'false');
        }
       } catch(e){}
    }


    init() {
        if (this.buttons.length > 0) {
            const tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
            this.bindTriggers();
            this.bindCloseButton();
        }
        
    }
}

