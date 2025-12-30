const lessonSelect=document.getElementById("lessonSelect");
const content=document.getElementById("content");
const togglePinyin=document.getElementById("togglePinyin");
const toggleMeaning=document.getElementById("toggleMeaning");
const testModeBtn=document.getElementById("testMode");
const darkBtn=document.getElementById("darkMode");

let showPinyin=false;
let showMeaning=false;
let testMode=false;

// load danh sách bài
for(let i=1;i<=7;i++){
  const o=document.createElement("option");
  o.value=i;
  o.textContent="Bài "+i;
  lessonSelect.appendChild(o);
}

lessonSelect.onchange=()=>loadLesson(lessonSelect.value);

togglePinyin.onclick=()=>{
  showPinyin=!showPinyin;
  document.querySelectorAll(".pinyin").forEach(e=>e.classList.toggle("show",showPinyin));
};

toggleMeaning.onclick=()=>{
  showMeaning=!showMeaning;
  document.querySelectorAll(".meaning").forEach(e=>e.classList.toggle("show",showMeaning));
};

testModeBtn.onclick=()=>{
  testMode=!testMode;
  document.querySelectorAll(".pinyin,.meaning")
    .forEach(e=>e.classList.toggle("hidden",testMode));
  testModeBtn.textContent=testMode?"Exit Test":"Test";
};

darkBtn.onclick=()=>document.body.classList.toggle("dark");

function loadLesson(n){
  fetch(`data/lesson${n}.json`)
    .then(r=>r.json())
    .then(d=>renderLesson(d));
}

function renderLesson(data){
  content.innerHTML="";
  data.sections.forEach(sec=>{
    const box=document.createElement("div");
    box.className="section";
    box.innerHTML=`<h2>${sec.title}</h2>`;
    sec.items.forEach(it=>{
      const w=document.createElement("div");
      w.className="word";
      w.innerHTML=`
        <div class="hanzi">${it.hanzi}</div>
        <div class="pinyin ${showPinyin?'show':''}">${it.pinyin||""}</div>
        <div class="meaning ${showMeaning?'show':''}"
             onclick="this.classList.toggle('show')">
          ${it.meaning||""}
        </div>`;
      box.appendChild(w);
    });
    content.appendChild(box);
  });
}

loadLesson(1);
