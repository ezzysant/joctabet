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
    let lucro_final = document.querySelectorAll('.lucro-final');
    let total_apostado = document.getElementById('total-apostado');
    let lucro = document.getElementById('lucro');
    let porcent_lucro = document.getElementById('porcent-lucro');
    let stake_value = document.getElementById('stake-value');
    let resp_value = document.getElementById('resp-value');

    //Sei lá, acho que fiz bruxaria pra funcionar
    for (let i = 0; i < 7; i++) {
        let comission_num = Number(comission[i].value) / 100;
        let odd_num = Number(odd[i].value);

        if (odd_num === 0) {
            apostar[i].innerHTML = '-';
            lucro_bruto[i].innerHTML = '-'
            continue
        }

        let form_calc = ((100 * odd_num - 100) + (100 * odd_num - 100) * comission_num + 100) / 100;

        if (i === 0) {
            apostar[0].innerHTML = String(Number(entrada_value).toFixed(2)).replace('.',',');
            lucro_bruto[0].innerHTML = String((Number(entrada_value) * form_calc).toFixed(2)).replace('.',',');
            continue;

            
        }

        apostar[i].innerHTML = String(Number(Number(lucro_bruto[0].innerHTML.replace(',','.')) / form_calc).toFixed(2)).replace('.',',');
        lucro_bruto[i].innerHTML = String(Math.round((apostar[i].innerHTML.replace(',','.')) * form_calc).toFixed(2)).replace('.',',');
    
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
        if (odd[index_row].value == '0' || odd[index_row].value == '' || lucro_bruto[0].innerHTML == '-') {
            //Zerando areas caso o odd da linha seja 0 (Para nao dar erro)
            apostar[index_row].innerHTML = '-';
            lucro_bruto[index_row].innerHTML = '-';

            //Resetando STAKE LAY e RESPONSABILIDADE
            stake_value.innerHTML = '-';
            resp_value.innerHTML = '-';
        }else {
            //Formula
            let form_calc = ((100 * (odd_num / (odd_num - 1)) - 100) + (100 * (odd_num / (odd_num - 1)) - 100) * comission_num + 100) / 100;

            //Equação para definir aposta da linha
            apostar[index_row].innerHTML = String((Number(lucro_bruto[0].innerHTML.replace(',','.')) / form_calc).toFixed(2)).replace('.',',');
            //Equação para definir lucro bruto da linha
            lucro_bruto[index_row].innerHTML = String(Math.round( Number(apostar[index_row].innerHTML.replace(',','.')) * form_calc).toFixed(2) ).replace('.',',');

            //Definindo Stake Lay
            stake_value.innerHTML = `R$ ${String(Number(((odd_num / (odd_num - 1)) - 1) * Number(apostar[index_row].innerHTML.replace(',','.'))).toFixed(2)).replace('.',',')}`;
            //Definindo Respondabilidade
            resp_value.innerHTML = `R$ ${String(Number(apostar[index_row].innerHTML.replace(',','.')).toFixed(2)).replace('.',',')}`;

        }

    }


    //Total Apostado
    for (let i = 0, total = 0; i <= 8; i++) {
        if (i >= 8) {
            total_apostado.innerHTML = String(total.toFixed(2).replace('.',','));
            break;
        }

        let apostar_num = Number(apostar[i].innerHTML.replace(',','.'));

        if(!Number.isNaN(apostar_num)){
            let new_num = apostar_num;
            total += new_num;
        }
    }
    

    //Lucro Final
    for (let i = 0; i <= 7; i++) {
        let lucro_bruto_num = Number(lucro_bruto[i].innerHTML.replace(',', '.'));
        let total_apostado_num = Number(total_apostado.innerHTML.replace(',', '.'));

        if(!Number.isNaN(lucro_bruto_num) &&  !Number.isNaN(total_apostado_num)){
            lucro_final[i].innerHTML = String((lucro_bruto_num - total_apostado_num).toFixed(2)).replace('.',',');
        }

    }
    
     

    //Lucro
    for (let i = 0, menor = 0; i <= 8; i++) {
        if (i >= 8) {
            lucro.innerHTML = String(menor.toFixed(2)).replace('.',',');
            break;
        }

        let lucro_final_num = Number(lucro_final[i].innerHTML.replace(',', '.'));
        if (menor > lucro_final_num && !Number.isNaN(lucro_final_num)) {
            menor = lucro_final_num;
        }
    }

    //Porcentagem de lucro
    porcent_lucro.innerHTML = (Number(lucro_final[0].innerHTML.replace(',', '.')) / Number(total_apostado.innerHTML.replace(',', '.')) * 100).toFixed(2);
    

}

function startSiteWeb() {
    amountRow();
    visibleAreaLay();
}
