var visible_lay = false;

//Função para visualisar opções Lay
function visibleAreaLay() {
    let lay_btn = document.querySelector('.lay-toggle-btn');
    let lay_box = document.querySelector('.stake-area');
    let lay_row = document.querySelector('.lay-row');

    if (visible_lay) {
        visible_lay = false
        lay_btn.innerHTML = '+ LAY'
        lay_box.style.display = "none"
        lay_row.style.display = "none"
    } else {
        visible_lay = true
        lay_btn.innerHTML = '- LAY'
        lay_box.style.display = "flex"
        lay_row.style.display = "table-row"
    }
}

//Função para visualizar/ocultar row 'backs' da tabela
function amountRow() {
    let line_back = document.querySelectorAll('.line-back');
    let _option = document.getElementById('surebet-backs')

    //Visualizando todas as row
    for (let i = 0; i <= 6; i++) {
        line_back[i].style.display = 'table-row'
    }

    //Ocultando linhas que não quero ver
    for (let i = 6; i >= _option.value; i--) {
        line_back[i].style.display = 'none'
    }
}

//Função para calculo 01
function Calculate() {
    let entrada_value = Number(document.getElementById('surebet-entrada').value);
    let comission = document.querySelectorAll('.comission');
    let odd = document.querySelectorAll('.odd');
    let apostar = document.querySelectorAll('.apostar');
    let lucro_bruto = document.querySelectorAll('.lucro-bruto');
    let total_apostado = document.getElementById('total-apostado');
    let stake_value = document.getElementById('stake-value');
    let resp_value = document.getElementById('resp-value');

    //Sei lá, acho que fiz bruxaria pra funcionar
    for (let i = 0; i < 7; i++) {
        let comission_num = Number(comission[i].value) / 100;
        let odd_num = Number(odd[i].value);

        if (odd_num === 0) {
            apostar[i].innerHTML = '0,00';
            lucro_bruto[i].innerHTML = '0,00'
            continue
        }

        let form_calc = ((100 * odd_num - 100) + (100 * odd_num - 100) * comission_num + 100) / 100;

        i === 0 ? apostar[0].innerHTML = (entrada_value).toFixed(2) : apostar[i].innerHTML = (Number(lucro_bruto[0].innerHTML) / form_calc).toFixed(2)

        lucro_bruto[i].innerHTML = Math.round(Number(apostar[i].innerHTML) * form_calc).toFixed(2);

    }

    //Area LAY
    if (visible_lay) {
        //Numero do indice da linha LAY
        let index_row = 7;
        //COMISSION da linha
        let comission_num = Number(comission[index_row].value) / 100;
        //ODD da linha
        let odd_num = Number(odd[index_row].value);

        //Se a odd é igual a 0 nao calcule nada
        if (odd_num === 0) {
            //Zerando areas caso o odd da linha seja 0 (Para nao dar erro)
            apostar[index_row].innerHTML = '0,00';
            lucro_bruto[index_row].innerHTML = '0,00';

            //Resetando STAKE LAY e RESPONSABILIDADE
            stake_value.innerHTML = '-';
            resp_value.innerHTML = '-';
        }else{

            //Formula
            let form_calc = ( ( 100*(odd_num/(odd_num-1) ) - 100) + ( 100 * (odd_num/(odd_num-1)) - 100) * comission_num + 100) / 100;
            
            //Equação para definir aposta da linha
            apostar[index_row].innerHTML = (Number(lucro_bruto[0].innerHTML) / form_calc ).toFixed(2);
            //Equação para definir lucro bruto da linha
            lucro_bruto[index_row].innerHTML = Math.round(Number(apostar[index_row].innerHTML) * form_calc ).toFixed(2);

            //Definindo Stake Lay
            stake_value.innerHTML = `R$ ${Number(((odd_num/(odd_num-1)) - 1)*Number(apostar[index_row].innerHTML)).toFixed(2)}`;
            //Definindo Respondabilidade
            resp_value.innerHTML = `R$ ${Number(apostar[index_row].innerHTML).toFixed(2)}`;

        }
    
    }

    //Total Apostado
    for(let i = 0, total = 0; i <= 7;i++){
        window.alert(total)
        if(i>=7){
            total_apostado.innerHTML = total.toFixed(2);
            break;
        }

        let new_num = Number(apostar[i].innerHTML.replaceAll(',','.'));
        total += new_num;
    }

}

function startSiteWeb(){
    amountRow();
    visibleAreaLay();
}
