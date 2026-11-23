const $ = (id) => document.getElementById(id);
const screens = {intro:$('introScreen'), game:$('gameScreen'), complete:$('completeScreen')};
let current = 0, completed = [false,false,false,false], score = 0;
let foundCells = [], sequenceAnswer = null, memoryPattern = [], memoryInput = [], memoryLocked = false;
let playerPos = 0, routeVisited = [];

const missions = [
 {name:'POWER CORE', title:'Restore the power', icon:'⚡', description:'Find and collect all three energy cells hidden in the room.', hint:'Tap the glowing energy cells. You need all three to power the station.', feedback:'SYSTEM MESSAGE: Locate 3 energy cells to activate the core.'},
 {name:'LOGIC TERMINAL', title:'Crack the sequence', icon:'⌁', description:'Study the number pattern and choose the missing number.', hint:'Look at how much each number increases by each time.', feedback:'SYSTEM MESSAGE: A logic sequence is waiting for your answer.'},
 {name:'MEMORY GRID', title:'Repeat the pattern', icon:'▦', description:'Watch the highlighted tiles, then repeat the same pattern in order.', hint:'Focus on the order of the lights. You can retry if you miss one.', feedback:'SYSTEM MESSAGE: Memorize the light sequence.'},
 {name:'FINAL ROUTE', title:'Find the safe path', icon:'⌖', description:'Navigate the grid from START to EXIT. Avoid blocked cells.', hint:'Move one tile at a time. The dark tiles are blocked.', feedback:'SYSTEM MESSAGE: Find a clear route to the exit.'}
];

function showScreen(which){Object.values(screens).forEach(s=>s.classList.add('hidden'));screens[which].classList.remove('hidden')}
function updateProgress(){
 const n=completed.filter(Boolean).length;
 $('progressText').textContent=`${n} / 4`; $('progressBar').style.width=(n/4*100)+'%';
 $('scoreText').textContent=score; $('levelLabel').textContent=`MISSION ${String(current+1).padStart(2,'0')} / 04`;
 document.querySelectorAll('.mission-link').forEach((el,i)=>{
   el.classList.toggle('active',i===current);el.classList.toggle('locked',i>n);
   el.querySelector('.mission-state').textContent=completed[i]?'✓':(i<=n?'●':'⌑');
 });
}
function feedback(msg,type=''){const el=$('feedback');el.textContent='SYSTEM MESSAGE: '+msg;el.className='feedback '+type}
function loadMission(index){
 current=index; const m=missions[index];
 $('missionKicker').textContent=`MISSION 0${index+1} · ${m.name}`;$('missionTitle').textContent=m.title;
 $('objectiveIcon').textContent=m.icon;$('missionDescription').textContent=m.description;$('hintText').textContent=m.hint;
 feedback(m.feedback.replace('SYSTEM MESSAGE: ',''));updateProgress();
 [renderPower,renderLogic,renderMemory,renderRoute][index]();
}
function completeMission(message){
 if(!completed[current]){completed[current]=true;score+=100;updateProgress()}
 feedback(message,'good');
 const next=completed.findIndex(v=>!v);
 if(next===-1){setTimeout(()=>finishGame(),900)}
 else{
   setTimeout(()=>{loadMission(next)},1000);
 }
}
function renderPower(){
 foundCells=[];
 const area=$('challengeArea');area.innerHTML='<p class="challenge-note">SEARCH THE ROOM · 3 CELLS REQUIRED</p><div class="cell-grid" id="cellGrid"></div>';
 const cells=['◇','✦','⬡','◈','✧','⬢','✦','◇','⬡','✧','◈','✦','⬢','◇','⬡'];
 const grid=$('cellGrid');
 cells.forEach((symbol,i)=>{const b=document.createElement('button');b.className='energy-cell';b.textContent='·';b.setAttribute('aria-label','Search location '+(i+1));b.onclick=()=>{
   if(b.classList.contains('found'))return;
   if([2,7,13].includes(i)){b.textContent='✦';b.classList.add('found');foundCells.push(i);feedback(`Energy cell found! ${foundCells.length} of 3 collected.`,'good');if(foundCells.length===3)completeMission('Power core restored. Mission 01 complete!')}
   else{b.textContent='×';b.disabled=true;feedback('No energy cell here. Try another location.','bad')}
 };grid.appendChild(b)});
}
function renderLogic(){
 const area=$('challengeArea');area.innerHTML='<p class="challenge-note">WHAT NUMBER COMES NEXT?</p><div class="sequence-row"><div class="sequence-tile">3</div><div class="sequence-tile">6</div><div class="sequence-tile">9</div><div class="sequence-tile">12</div><div class="sequence-tile">?</div></div><div class="answer-options" id="answers"></div>';
 [14,15,16,18].forEach(n=>{const b=document.createElement('button');b.className='answer-btn';b.textContent=n;b.onclick=()=>{if(n===15){completeMission('Correct! The pattern increases by 3 each time.')}else feedback('Not quite. Check the difference between consecutive numbers.','bad')};$('answers').appendChild(b)});
}
function renderMemory(){
 memoryPattern=[1,5,6,2];memoryInput=[];memoryLocked=true;
 const area=$('challengeArea');area.innerHTML='<p class="challenge-note" id="memoryPrompt">WATCH THE LIGHTS — THE PATTERN STARTS IN A MOMENT</p><div class="memory-board" id="memoryBoard"></div><div class="challenge-note">REPEAT THE LIGHTS IN THE SAME ORDER</div>';
 const board=$('memoryBoard');
 for(let i=0;i<9;i++){const b=document.createElement('button');b.className='memory-btn';b.textContent='';b.disabled=true;b.onclick=()=>memoryTap(i,b);board.appendChild(b)}
 const buttons=[...board.children];
 let k=0;const interval=setInterval(()=>{buttons.forEach(x=>x.classList.remove('active'));if(k>0)buttons[memoryPattern[k-1]].textContent='';if(k<memoryPattern.length){buttons[memoryPattern[k]].classList.add('active');buttons[memoryPattern[k]].textContent='✦';k++}else{clearInterval(interval);buttons.forEach(x=>{x.classList.remove('active');x.textContent='';x.disabled=false});memoryLocked=false;$('memoryPrompt').textContent='YOUR TURN — REPEAT THE FOUR LIGHTS';feedback('Pattern shown. Your turn!')}},650);
}
function memoryTap(i,b){
 if(memoryLocked)return;memoryInput.push(i);b.textContent='✦';b.classList.add('active');
 const idx=memoryInput.length-1;
 if(memoryInput[idx]!==memoryPattern[idx]){memoryLocked=true;feedback('Pattern mismatch. Reset the mission and try again.','bad');return}
 if(memoryInput.length===memoryPattern.length){memoryLocked=true;completeMission('Perfect memory! Pattern repeated correctly.')}
}
const walls=[7,8,11,13,16,18];const goal=24;
function renderRoute(){
 playerPos=0;routeVisited=[0];
 const area=$('challengeArea');area.innerHTML='<p class="challenge-note">START AT 0 · REACH THE EXIT · USE THE ARROW KEYS OR TAP NEIGHBORING TILES</p><div class="route-grid" id="routeGrid"></div><p class="challenge-note" style="margin-top:12px">START: ◉ &nbsp;&nbsp; BLOCKED: ■ &nbsp;&nbsp; EXIT: ⚑</p>';
 drawRoute();
}
function drawRoute(){
 const grid=$('routeGrid');grid.innerHTML='';
 for(let i=0;i<25;i++){
  const b=document.createElement('button');b.className='route-cell';b.textContent=walls.includes(i)?'■':(i===goal?'⚑':(i===0?'◉':'·'));
  if(walls.includes(i))b.classList.add('wall');if(routeVisited.includes(i))b.classList.add('path');if(i===playerPos)b.classList.add('player');
  b.disabled=walls.includes(i)||Math.abs(Math.floor(i/5)-Math.floor(playerPos/5))+Math.abs(i%5-playerPos%5)!==1;
  b.onclick=()=>movePlayer(i);grid.appendChild(b);
 }
}
function movePlayer(next){
 if(walls.includes(next))return;
 if(Math.abs(Math.floor(next/5)-Math.floor(playerPos/5))+Math.abs(next%5-playerPos%5)!==1)return;
 playerPos=next;routeVisited.push(next);drawRoute();
 if(playerPos===goal)completeMission('You found the exit. All station systems are restored!');
}
function finishGame(){showScreen('complete');$('finalScore').textContent=score;$('finalMessage').textContent='You completed all four missions, restored the station systems, and unlocked the exit. Excellent work!'}
function startGame(){completed=[false,false,false,false];score=0;showScreen('game');loadMission(0)}
$('startBtn').addEventListener('click',startGame);
$('resetBtn').addEventListener('click',()=>loadMission(current));
$('playAgainBtn').addEventListener('click',startGame);
document.querySelectorAll('.mission-link').forEach(el=>el.addEventListener('click',()=>{const i=Number(el.dataset.index);if(i<=completed.filter(Boolean).length)loadMission(i)}));
document.addEventListener('keydown',e=>{
 if(screens.game.classList.contains('hidden')||current!==3)return;
 const row=Math.floor(playerPos/5),col=playerPos%5;let next=null;
 if(e.key==='ArrowUp'&&row>0)next=playerPos-5;
 if(e.key==='ArrowDown'&&row<4)next=playerPos+5;
 if(e.key==='ArrowLeft'&&col>0)next=playerPos-1;
 if(e.key==='ArrowRight'&&col<4)next=playerPos+1;
 if(next!==null)movePlayer(next);
});
