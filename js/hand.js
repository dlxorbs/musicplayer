$(function () {
    $(document).on("mousemove mousedown mouseup",function(e){
        mouseX = e.pageX;
        mouseY = e.pageY;
        leftpoint = $('.base').offset().left;
        toppoint = $('.base').offset().top;
        isclicked = true;

        let rad = Math.atan2(mouseX -leftpoint, mouseY -  toppoint);
        deg = (rad * (180 / Math.PI)*-1 )+50 ; 

        console.log(deg)
        if(mouseX < $(document).innerWidth()*4/9 
        && mouseY > $(document).innerHeight()/2){
            
        $('.rotate-base').css({
            'transform' : 'rotate('+ deg +'deg)',
     
        })

        }
    })

    $(document).mouseup(function(){
        if(mouseX < $(document).innerWidth()*4/9 
        && mouseY > $(document).innerHeight()/2){
            isclicked = false;
            RighthandChange()
        }
    })
    $(document).mousedown(function(){
        if(mouseX < $(document).innerWidth()*4/9 
        && mouseY > $(document).innerHeight()/2){
            isclicked = true;
            RighthandChange()
        }

    })
    // $(document).mousemove(function(){
    //     isclicked = true;
    //     RighthandChange()
    // })

    


})

function RighthandChange(){
    //손 모양 바꾸기
    if(isclicked){
        $('.rotate-base img').attr('src', './img/armchange.svg')
  
    }else{
        $('.rotate-base img').attr('src', './img/arm1.svg')
    }
}  