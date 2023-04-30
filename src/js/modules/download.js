export default class Download {
    constructor(triggers) {
        this.buttons = document.querySelectorAll(triggers);
        this.path = 'assets/img/mainbg.jpg';
    }

    downloadItem(path) {
        const link = document.createElement('a');

        link.setAttribute('href', path);
        link.setAttribute('download', 'bg_picture');
        link.style.display = 'none';

        document.body.append(link);
        link.click();
        document.body.removeChild(link);
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.stopPropagation();
            this.downloadItem(this.path)
            })
        })
    }
}