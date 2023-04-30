export default class Forms {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll('input');
        this.message = {
            loading: 'Идет загрузка...',
            success: 'Спасибо за заявку! Скоро мы вам перезвоним',
            failure: 'Не удалось отправить заявку :('
        }
        this.path = 'assets/question.php';
    }

    async postData(url, data) {
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });
        return await res.text();
    }

    clearInputs() {
        this.inputs.forEach(input => {
            input.value = '';
        })
    }

    checkMailInputs() {
        const mailInputs = document.querySelectorAll('[type="email"]');
    
        mailInputs.forEach(input => {
            input.addEventListener('keypress', (event) => {
                if (event.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    event.preventDefault();
                }
            });
        });
    }

    phoneMask() {
        let setCursorPosition = (pos, elem) => {
            elem.focus();
    
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();
    
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        }
    
        function createMask() {
            let matrix = '+1 (___) ___-____'
            let i = 0;
            let def = matrix.replace(/\D/g, '');
            let val = this.value.replace(/\D/g, '');
    
            if (def.length >= val.length) {
                val = def;
            }
    
            this.value = matrix.replace(/./g, function(symbol) {
                return /[_\d]/.test(symbol) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : symbol;
            });
    
            if (event.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }
    
        let inputs = document.querySelectorAll('[name="phone"]');
        
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
    }


    init() {
        this.checkMailInputs();
        this.phoneMask();
        this.forms.forEach(form => {
            form.addEventListener('submit', (event) => {
                event.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                margin-top: 15px;
                color: grey;
                font-size: 18px;
                `
                form.parentNode.appendChild(statusMessage);

                statusMessage.textContent = this.message.loading;

                const formData = new FormData(form);

                this.postData(this.path, formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 4000)
                    })
            })
        })

    }
}