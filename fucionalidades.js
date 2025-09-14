var visible_lay = true

function visibleAreaLay(){
    let lay_btn = document.querySelector('.lay-toggle-btn');
    let lay_box= document.querySelector('.lay-box');
    let lay_row = document.querySelector('.lay-row');

    if(visible_lay){
        lay_btn.innerHTML = '+ LAY'
        visible_lay = false
        lay_box.style.display = "none"
        lay_row.style.display = "none"
    }else{
        lay_btn.innerHTML = '- LAY'
        visible_lay = true
        lay_box.style.display = "flex"
        lay_row.style.display = "table-row"
    }
}