//아이디가 circle인 요소를 찾아서 저장
const circle = document.querySelector("#circle");
//태그명이 article인 요소를 찾아서 저장
const article = circle.querySelectorAll("article");

//article의 전체 갯수만큼 반복을 돌면서 mouseenter, mouseleav이벤트 연결
//for of 반복문으로 article 변수에 담긴 article 요소의 개수만큼 바복하면서 이벤트를 연결
for(let el of article){
	//article 에 마우스를 올리면 부모인 #circle 의 animation-play-state값을 "paused로 변경"
	el.addEventListener("mouseenter",e=>{
		circle.style.animationPlayState = "paused";
	});

	//article 에서 마우스가 떠나면 부모인 #circle 의 animation-play-state값을 다시 "running"으로  변경"
	el.addEventListener("mouseleave", e=>{
		circle.style.animationPlayState = "running";
	});
}	

// animationPlayState : 애니메이션 동작이나 멈춤
// div {
// 	animation-play-state: paused;
//   }

// div {
// 	animation-play-state: running;
//   }