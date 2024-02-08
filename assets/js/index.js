// Criar calculadora - vou fazer com factory function!
function createCalc() {
    return {
        display: document.querySelector(".display"),
        
        inicia() { // metodo que vai desencadear tudo, capturar clics e captirar valore dentro do botao!
            this.cliqueBotoes();
            this.keyEnter();
            this.keyBackSpace();
        },

        keyBackSpace() {
            this.display.addEventListener('keydown', e => {
              if (e.keyCode === 8) {
                e.preventDefault();
                this.clearDisplay();
              }
            });
          },

        keyEnter() {
            this.display.addEventListener('keypress',(e) => {
                if (e.keyCode === 13) {
                    this.btnToResult();
            }});
        },

        cliqueBotoes() {
            // this -> calc
            document.addEventListener('click',
            (e) => { // com arrow funtion mantem o this de calc
                // this aqui -> document pq o chamamos
                const el = e.target;
                if (el.classList.contains('btn-num')){
                    this.btnParaDisplay(el.innerText);
                    //console.log(typeof this.display.value)
                }
                if (el.classList.contains('btn-clear')){
                    this.clearDisplay();
                }
                if (el.classList.contains('btn-del')){
                    this.deleteOne();
                }
                if (el.classList.contains('btn-eq')){
                    this.btnToResult();
                }
            });//.bind(this)); // .bind para mudar o this para o nosso this, ou entao usar arrow function para corrigir isso!!
        
        
        },

        btnParaDisplay(botao) {
            this.display.value += botao;
            this.display.focus(); // para ir para o display!!
        },

        clearDisplay() {
            this.display.value = '';
        },

        deleteOne() {
            //const tam_temp = this.display.value.length;
            this.display.value = this.display.value.slice(0,-1);
        },

        btnToResult() {
            // dangerous, not use in production! eval
            let conta = this.display.value;
            try {
                conta = eval(conta);
                
                if(!conta) {
                    alert('Invalid sequence of digits!!');
                    return;
                }
                this.display.value = String(conta);
            }
            catch(e) {
                alert('Invalid sequence of digits!!');
                return;
            }

        }

    };
}

const calc= createCalc();
calc.inicia();