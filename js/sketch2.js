//손위치
let goal = 130;
let isDragging = false;
let handLeft = 200;
let handTop = 130;

let x = 0;
let y = 0;

let a
$(function () {
    $('.hand').css("left", handLeft).css("top", handTop)
    $('.hand').mousedown(function(e){
        isDragging = true;
        x = e.offsetX;
        y = e.offsetY;
        handChange()
    })
    $('.hand').mousemove(function(e){
        let left = $('.hand-position').offset().left
        let width = $('.hand-position').width()
        if(isDragging){
            let a = e.clientX - $('.hand-position').offset().left
            let handX = a - x;
            let handY = handTop + (handLeft - handX)*5/9;

            if(a > width){
                handX = width - x;
                handY = handTop + (handLeft - handX)*5/9;
            }else if(a < 0){
                handX = 0 - x;
                handY = handTop + (handLeft - handX)*5/9;
            }

            $('.hand').css("left", handX).css("top", handY)
        }
        handChange()
        
    })
    $(document).mouseup(function(e){
        isDragging = false;
        if(!isDragging){
            let left = $('.hand').offset().left - $('.hand-position').offset().left
            console.log(left)
            for (let i = 0; i < 4; ++i) {
                if(left>-50+2*50*i && left<50+2*50*i){
                    let u = 100*i;
                    let t = handTop + (handLeft - u)*5/9;
                    console.log(left,-100+100*i)
                    $('.hand').css("left", u).css("top", t)

                    goal = 330-(i*100)
                }
            }
        }
        handChange()
    })
    // $(document).mousemove(function(e){
    //     mouseX = e.pageX;
    //     mouseY = e.pageY;
    //     console.log(mouseX,mouseY)
        // $('.hand').css("left", mouseX).css("top", mouseY)
    // })
    // $(document).click(function(e){
    //     goal = 500;
    //     console.log(goal)
    // })
})

function handChange(){
    //손 모양 바꾸기
    if(isDragging){
        $('.hand img').attr('src','img/hand.svg')
    }else{
        $('.hand img').attr('src','img/hand2.svg')
    }
}