// 인식되는 기타줄의 넓이
let springHeight = 30,

// 기타줄사이의 거리
    springDist = 22,
    left,
    right,
    maxHeight = 1000,
    minHeight = 0,
    over = false,
    move = false;
    //현재 선택된 기타
    move_i = 0;

let overs = [false,false,false,false]
let moves = [false,false,false,false]

//4번째 기타줄 위를 인식하기 위한 변수

let ballx=[]
let bally=[]

// let ballx;
// let bally;

//기타줄을 대각선으로 만들기 위해서 각 베지어의 마지막 Y값에 더하고 빼준 값
let stringRotate = 295;

//첫번째 기타줄의 시작 높이
let firstStringY = 350;

//4개의 기타줄의 각각의 높이
let stringY=[]

// 기타줄의 물리정보
let M = 2,  // Mass
    K = 2.8,  // Spring constant
    D = 0.52, // Damping
    R = firstStringY;  // Rest position

// 스프링의 기타줄 변수들
let stringsVY = [];
let stringsVX = [];

//기타줄의 소리들
let 당길때 = createAudio('assets/beat.mp3');
let one = createAudio('assets/beat.mp3');
let two = createAudio('assets/beat.mp3');
let three = createAudio('assets/beat.mp3');
let four = createAudio('assets/beat.mp3');

function setup() {
    createCanvas(1300, 750);
    left = width / 2 - 550;
    right = width / 2 + 550;
    
    for (let i = 0; i < 4; ++i) {
        let ps = R + springDist * i;
        let psX = width/2;
        let sY = springDist * i + firstStringY

        // 변수를 Push
        stringsVY.push({ps : ps, vs : 0.0, as : 0, f : 0, R : ps})
        stringsVX.push({ps : psX, vs : 0.0, as : 0, f : 0, R : psX})
        // 기타줄의 정렬
        stringY.push(sY)

        // 기타줄위에 있는지 확인하기
        ballx.push(100)
        bally.push(100)
        // 변수를 Push한것처럼 뭐시기
        // ballsx = 1040-mouseY*(width/height);
        // ballsy = (580-mouseX*(height/width));
        // ballx.push(ballsx)
        // bally.push(ballsy)
    }
}

function draw() {
    clear()
    updateSpring();
    drawWire();
    Logics();
    // for (let i = 0; i < stringsVY.length; ++i) {
    //     ellipse(ballx[i], bally[i], 20,20);
    // }
    // ellipse(mouseX, mouseY, 20,20);
}

//베지어를 for문을 이용해 여러개 그려줌
function drawWire() {
    for (let i = 0; i < stringsVY.length; ++i) {
        let y = stringsVY[i].ps;
        let x = stringsVX[i].ps;
        let sty = stringY[i];

        //각 기타줄을 조정하기 위한 변수
        let l = 14;

        //손으로 줄을 잡는 위치에 따라서 베지어의 곡선이 짧아짐
        let hand = goal;
        let ratio = 0.54;

        let adjustmentRightX = right + l*i - hand
        let adjustmentRightY = sty-stringRotate - (l*0.5)*i + hand*ratio; 
        let adjustmentLeftX = left + l*i
        let adjustmentLeftY = sty+stringRotate - (l*0.5)*i
      noFill()
      //선 굵기
      strokeWeight(5);
      //색
        stroke(30);
        //기타줄
        bezier(adjustmentLeftX, adjustmentLeftY, x,y,x, y, adjustmentRightX, adjustmentRightY)
        //손으로 잡았을때 남는 기타줄
        line(adjustmentRightX, adjustmentRightY,right + l*i,sty-stringRotate - (l*0.5)*i);
        // rect(left, y, right, y+springHeight);
    }
}

//ballx와 bally의 위치 변경 로직
function Logics() {
    for (let i = 0; i < stringsVY.length; ++i) {
        let x = 1250-mouseY*(width/height)+i*springDist*11/5;
        let y = 720-mouseX*(height/width)+i*springDist*7/6;
        ballx[i] = x
        bally[i] = y
        // console.log(ballx[i],bally[i])
    }
}

function updateSpring() {
    // Update the spring position
    for (let i = 0; i < stringsVY.length; ++i) {
        let st = stringsVY[i];
        
        if ( i != move_i || !move ) {
            st.f = -K * ( st.ps - st.R );
            st.as = st.f / M;
            st.vs = D * (st.vs + st.as); 
            st.ps = st.ps + st.vs;        
        }

        if (abs(st.vs) < 0.1) {
            st.vs = 0.0;
        }
    }

    for (let i = 0; i < stringsVX.length; ++i) {
        let st = stringsVX[i];
        
        if ( i != move_i || !move ) {
            st.f = -K * ( st.ps - st.R );
            st.as = st.f / M;
            st.vs = D * (st.vs + st.as); 
            st.ps = st.ps + st.vs;        
        }
    }

    // Test if mouse if over the top bar
    for (let i = 0; i < stringsVY.length; ++i) {
        overs[i] = false;
    }

    for (let i = 0; i < stringsVY.length; ++i) {
        if (50 > abs(sqrt((ballx[i]-mouseX)**2+(mouseY-bally[i])**2))) {
            overs[i] = true;
            // 기타줄의 각 구별을 위한 3번째 줄이 움직이면 3이 출력
            move_i = i;
            console.log(move_i)
        }
        // if (mouseX > left && mouseX < right && mouseY > y && mouseY < y + springHeight) {
        //     over = true;
        //     move_i = i;
        // }
    }

    //이게 뭐지?
    // Set and constrain the position of top bar
    for (let i = 0; i < stringsVY.length; ++i) {
        move_i = i;
        if (moves[i]) {
            stringsVY[move_i].ps = mouseY - springHeight / 2;
            stringsVY[move_i].ps = constrain(stringsVY[move_i].ps, minHeight, maxHeight);

            stringsVX[move_i].ps = mouseX - springHeight / 2;
            stringsVX[move_i].ps = constrain(stringsVX[move_i].ps, minHeight, maxHeight);
        }
    }
}


function mouseDragged() {
    for (let i = 0; i < stringsVY.length; ++i) { 
        if (overs[i]) {
            moves[i] = true;
        }
    }
}

function mouseReleased() {
    for (let i = 0; i < stringsVY.length; ++i) { 
        moves[i] = false;
    }
    // oen.play();
}

console.log(stringsVX)