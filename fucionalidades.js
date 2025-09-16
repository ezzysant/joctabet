var visible_lay = false;

//Função para visualisar opções Lay
function visibleAreaLay(){
    let lay_btn = document.querySelector('.lay-toggle-btn');
    let lay_box= document.querySelector('.stake-area');
    let lay_row = document.querySelector('.lay-row');

    if(visible_lay){
        visible_lay = false
        lay_btn.innerHTML = '+ LAY'
        lay_box.style.display = "none"
        lay_row.style.display = "none"
    }else{
        visible_lay = true
        lay_btn.innerHTML = '- LAY'
        lay_box.style.display = "flex"
        lay_row.style.display = "table-row"
    }
}

//Função para visualizar/ocultar row 'backs' da tabela
function amountRow(){
    let line_back = document.querySelectorAll('.line-back');
    let _option = document.getElementById('surebet-backs')

    //Visualizando todas as row
    for(let i = 0; i < 7; i++){
        line_back[i].style.display = 'table-row'
    }

    //Ocultando linhas que não quero ver
    for(let i = 6; i >= _option.value ; i--){
        line_back[i].style.display = 'none'
    }
}

//Função para calculo 01
function Calculate(){
    let entrada_value = Number(document.getElementById('surebet-entrada').value);
    let comission = document.querySelectorAll('.comission');
    let odd = document.querySelectorAll('.odd');
    let apostar = document.querySelectorAll('.apostar');
    let lucro_bruto = document.querySelectorAll('.lucro-bruto')

    //Sei lá, acho que fiz bruxaria pra funcionar
    for(let i = 0; i < 7; i++){
        let comission_num = Number(comission[i].value) / 100;
        let odd_num = Number(odd[i].value);

        let form_calc = ((100 * odd_num - 100) + (100 * odd_num - 100) * comission_num + 100) / 100;

        if(odd_num === 0){return}

        i === 0 ? apostar[0].innerHTML = (entrada_value).toFixed(2) :  apostar[i].innerHTML=(Number(lucro_bruto[0].innerHTML) / form_calc).toFixed(2)

        let apostar_num = Number(apostar[i].innerHTML);

        lucro_bruto[i].innerHTML = Math.round(apostar_num * form_calc).toFixed(2)

    }
}