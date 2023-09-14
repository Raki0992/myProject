const frame = document.querySelector("section");
const lists = frame.querySelectorAll("article");
const audio = frame.querySelectorAll("audio");
const prev = document.querySelector(".btnPrev");
const next = document.querySelector(".btnNext");
const deg = 45; //각각의 article요소가 회전할 각도
const len = lists.length-1; //순번이 0부터 시작하므로 전체 개수에서 1을 빼줌
let i = 0; 
let num = 0; /*좌우 버튼에 담을 변수, 버튼을 클릭할 때마다 frame 요소를 회전하기 위해 카운트값으로 활용*/
let active = 0; /*활성화 패널의 순번이 저장될 변수*/

function activation(index, lists){
    for( let el of lists){
        el.classList.remove("on");
    }
    lists[index].classList.add("on");
}

//article의 개수만큼 반복 
for(let el of lists) {  
    let pic = el.querySelector(".pic");  

    //각 article 요소를 45도씩 회전하고 아래로 배치 ( 360 / 8 = 45 )
    // 45도 회전과 회전된 방향을 기준으로 세로로 -100vh만큼 위쪽에 배치
    // translateY로 해당 패널이 같은 위치에서 겹친 상태로 회전시키는 것이 아니라 위쪽으로 퍼트려서 원의 테두리 형태를 만듬.
    el.style.transform = `rotate(${deg* i}deg) translateY(-100vh)`;  
    pic.style.backgroundImage = `url(img/member${i+1}.jpg)`; /*배경 이미지 추가*/
    i++; 

    //각 article 요소 안쪽의 재생, 정지, 처음부터 재생 버튼을 변수에 저장
    let play = el.querySelector(".play");
    let pause = el.querySelector(".pause");
    let load = el.querySelector(".load");

    //play버튼 클릭 시, 
    play.addEventListener("click", e=>{
        // play 버튼부터 .pic 요소까지 탐색한 뒤 클래스 on 추가하여 활성화
        let isActive = e.currentTarget.closest("article").classList.contains("on");
        if(isActive){
            e.currentTarget.closest("article").querySelector(".pic").classList.add("on");
            // play 버튼부터 audio 요소까지 탐색한 뒤 음악 재생
            e.currentTarget.closest("article").querySelector("audio").play(); 
        }              
    });

    //pause버튼 클릭 시
    pause.addEventListener("click", e=>{
        // pause 버튼부터 .pic 요소까지 탐색한 뒤 클래스 on 제거하여 비활성화
        let isActive = e.currentTarget.closest("article").classList.contains("on");
        if(isActive){
            e.currentTarget.closest("article").querySelector(".pic").classList.remove("on");
            // pause 버튼부터 audio 요소까지 탐색한 뒤 음악 정지
            e.currentTarget.closest("article").querySelector("audio").pause();
        }
                
    });

    //load버튼 클릭 시
    load.addEventListener("click", e=>{
        // load 버튼부터 .pic 요소까지 탐색한 뒤 클래스 on 추가하여 활성화
        let isActive = e.currentTarget.closest("article").classList.contains("on");
        if(isActive){
            e.currentTarget.closest("article").querySelector(".pic").classList.add("on");
            // load 버튼부터 audio 요소까지 탐색한 뒤 음악 다시 로드하고 재생
            e.currentTarget.closest("article").querySelector("audio").load();   
            e.currentTarget.closest("article").querySelector("audio").play(); 
        }          
    });
}


//모든 오디오 요소를 반복하면서 정지시키고 
// .pic 요소의 모션을 중지해서 초기화하는 함수
function initMusic(){
    for( let el of audio ){
        el.pause();
        el.load();
        el.closest("article").querySelector(".pic").classList.remove("on");
    }
}

// prev버튼은 +1(오른쪽으로 회전)    next버튼은 -1(왼쪽으로 회전)
//prev 버튼 클릭 시
prev.addEventListener("click", ()=>{
    //음악 초기화 함수 호출
    initMusic();

    // num은 좌우 버튼
    //num값을 증가시키며 frame 45도 만큼 증가시키며 시계 방향으로 계속 회전
    num++;  
    frame.style.transform = `rotate(${deg* num}deg)`;    

    //현재 패널의 순번이 0이면 다시 마지막 패널의 순번으로 변경하고
    //그렇지 않으면 현재 패널 순번에서 1씩 감소시켜서 activation 함수 호출
    (active == 0 ) ? active = len : active--;
    activation(active, lists);    
});

//next 버튼 클릭시
next.addEventListener("click", ()=>{
    //음악 초기화 함수 실행
    initMusic();

    //num값을 감소시키며 frame을 45도 만큼 감소시키며 반시계 방향으로 회전
    num--;   
    frame.style.transform = `rotate(${deg* num}deg)`;   

    //현재 패널의 순번이 마지막 수번이면 다시 처음 패널의 순번으로 변경하고
    //그렇지 않으면 현재 패널 순번에서 1씩 증가시켜서 activation 함수 호출
    (active == len ) ? active = 0 : active++; 
    activation(active, lists);
});