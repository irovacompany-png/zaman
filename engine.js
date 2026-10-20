/* ZAMAN • © 2026 IROVA / Islam Ramadan. Buildless game simulation. */
(function(root){
'use strict';
const fresh=()=>({version:1,scene:'home',x:5,y:6,day:1,minute:480,inventory:[],flags:{},memory:{},journal:['وصلت إلى بيتك في الحي. ابدأ بالكلام مع ماما.'],steps:0});
const bounds={home:[11,10],stairs:[7,19],street:[20,17],roof:[11,10]};
const objects={
roof:[{id:'downDoor',name:'النزول للعمارة',x:3,y:7,type:'door'},{id:'kite',name:'طيارة يوسف',x:8,y:6,type:'kite'},{id:'pigeon',name:'برج الحمام',x:6,y:3,type:'pigeon'},{id:'tank',name:'خزان الميّه',x:2,y:2,type:'tank'},{id:'roofPlant',name:'زرع السطح',x:9,y:2,type:'plant'}],
home:[{id:'mom',name:'ماما',x:3,y:5,type:'npc',style:'mom'}, {id:'bed',name:'سريرك • راحة ومرور الوقت',x:8,y:2,type:'bed'}, {id:'desk',name:'مكتبك القديم',x:8,y:5,type:'desk'}, {id:'door',name:'باب الشقة',x:1,y:8,type:'door'}, {id:'radio',name:'الراديو',x:2,y:2,type:'radio'},{id:'sofa',name:'الكنبة',x:5,y:2,type:'sofa'},{id:'table',name:'ترابيزة السفرة',x:5,y:4,type:'table'},{id:'plant',name:'نبات ماما',x:9,y:8,type:'plant'}],
stairs:[{id:'roofDoor',name:'سلم السطح',x:5,y:1,type:'door'},{id:'homeDoor',name:'شقتنا',x:1,y:1,type:'door'}, {id:'nawal',name:'طنط نوال',x:5,y:3,type:'npc',style:'nawal'}, {id:'pot',name:'أصيص على البسطة',x:1,y:9,type:'plant'}, {id:'hassan',name:'عم حسن',x:5,y:12,type:'npc',style:'hassan'}, {id:'streetDoor',name:'باب العمارة',x:3,y:17,type:'door'}],
street:[{id:'building',name:'العودة إلى العمارة',x:3,y:2,type:'building'}, {id:'baker',name:'عم سيد • الفرن',x:8,y:3,type:'npc',style:'baker'}, {id:'friend',name:'يوسف',x:12,y:8,type:'npc',style:'friend'}, {id:'cat',name:'القطة مشمش',x:15,y:12,type:'cat'}, {id:'chest',name:'صندوق الحكايات',x:17,y:4,type:'chest'}, {id:'tree',name:'شجرة الحي',x:16,y:6,type:'tree'}, {id:'lamp',name:'عمود النور',x:10,y:11,type:'lamp'}, {id:'bench',name:'دكة الحي',x:5,y:13,type:'bench'},{id:'flowers',name:'حديقة صغيرة',x:17,y:14,type:'flowers'}]
};
function age(s){return 8+Math.floor((s.day-1)/12)}
function year(s){return 1998+Math.floor((s.day-1)/12)}
function add(s,t){if(s.journal[0]!==t)s.journal.unshift(t);s.journal=s.journal.slice(0,60)}
function tick(s,minutes){let old=year(s); s.minute+=minutes;while(s.minute>=1440){s.minute-=1440;s.day++}if(year(s)>old)add(s,`عيد ميلادك! بقيت ${age(s)} سنة. الحي بيكبر معاك.`)}
function walkable(scene,x,y){const [w,h]=bounds[scene]||[];if(!(x>=.6&&y>=.6&&x<w-.6&&y<h-.6))return false;if(scene==='stairs'&&y>4&&y<15&&x<2)return false;return !objects[scene].some(o=>!['door','building','lamp','flowers'].includes(o.type)&&Math.hypot(x-o.x,y-o.y)<(o.type==='sofa'||o.type==='bed'?.9:.55))}
function move(s,dx,dy){let moved=false;if(walkable(s.scene,s.x+dx,s.y)){s.x+=dx;moved=true}if(walkable(s.scene,s.x,s.y+dy)){s.y+=dy;moved=true}if(moved)s.steps+=Math.hypot(dx,dy);return moved}
function nearest(s){return objects[s.scene].map(o=>({...o,d:Math.hypot(s.x-o.x,s.y-o.y)})).filter(o=>o.d<1.9).sort((a,b)=>a.d-b.d)[0]}
function go(s,scene,x,y){s.scene=scene;s.x=x;s.y=y;return {text:scene==='roof'?'فوق السطح الهوا مختلف… والحي كله قدامك.':scene==='stairs'?'السلم قدامك… انزل درجة درجة، والجيران ليهم حكايات.':scene==='street'?'ريحة العيش، صوت البياعين… أهلاً بيك في الحي.':'رجعت البيت. ماما مستنياك.'}}
function interact(s,id){const o=objects[s.scene].find(x=>x.id===id);if(!o||Math.hypot(s.x-o.x,s.y-o.y)>2.05)return {text:'قرّب شوية الأول.'};const count=s.memory[id]?.visits||0;s.memory[id]={visits:count+1,lastDay:s.day,lastAge:age(s)};let text='',choices=[];
if(id==='roofDoor')return go(s,'roof',3,8);
if(id==='downDoor')return go(s,'stairs',4,1.5);
if(id==='door')return go(s,'stairs',2.5,1.5);
if(id==='homeDoor')return go(s,'home',2,8);
if(id==='streetDoor')return go(s,'street',3,3.5);
if(id==='building')return go(s,'stairs',3,16);
if(id==='mom'){
 if(s.flags.breadDelivered)text=`ربنا يخليك يا حبيبي. ${age(s)>8?'كبرت وبقيت '+age(s)+' سنين، بس لسه فاكرة أول مرة جبت لنا عيش.':'فاكرة لما جبت العيش؟ فرحتني.'}`;
 else if(s.inventory.includes('عيش بلدي')){s.inventory=s.inventory.filter(x=>x!=='عيش بلدي');s.flags.breadDelivered=true;s.flags.coin=true;text='تسلم إيدك! خد العملة القديمة دي من درج جدك. يمكن تعرف حكايتها من عم حسن.';s.inventory.push('عملة جدك');add(s,'وصلت العيش لماما وأخذت عملة جدك القديمة.');}
 else{ s.flags.breadQuest=true;text=count?'لسه فاكرة إني طلبت منك عيش يا بطل. عم سيد في الفرن تحت.':'صباح الخير يا حبيبي. تنزل تجيب لنا عيش من عم سيد؟ وخد بالك وإنت نازل السلم.';add(s,'ماما طلبت عيش من فرن عم سيد في الشارع.');}}
else if(id==='baker'){if(!s.flags.breadQuest)text='يا صباح الفل! سلّم لي على ماما.';else if(s.flags.breadDelivered)text='أهلاً بصاحبنا! ماما انبسطت بالعيش؟ فاكر أول مرة جيت لوحدك.';else if(s.inventory.includes('عيش بلدي'))text='العيش معاك يا بطل، وصّله وهو سخن.';else{s.inventory.push('عيش بلدي');text='اتفضل العيش سخن! الحساب مع ماما، وسلّم لي عليها.';add(s,'أخذت العيش. ارجع به لماما.');}}
else if(id==='nawal'){if(!s.flags.catQuest){s.flags.catQuest=true;text='يا حبيبي، مشمش نزلت ومش رجعت. لو شفتها جنب الشجرة نادي لي عليها.';add(s,'طنط نوال بتدور على قطتها مشمش.');}else if(s.flags.catFound&&!s.flags.catReward){s.flags.catReward=true;s.inventory.push('مفتاح نحاسي');text='لقيتها! ربنا يفرحك. المفتاح ده لقيته على السلم، يمكن عم حسن يعرف بتاع إيه.';add(s,'طنط نوال ادّتك مفتاح نحاسي بعد ما لقيت مشمش.');}else text=s.flags.catReward?'مشمش كويسة بفضلك. أنا مش بنسى اللي يقف جنبي.':'مشمش غالبًا جنب الشجرة. بتحب الهدوء.';}
else if(id==='cat'){if(s.flags.catQuest){s.flags.catFound=true;text='مياو! لقيت مشمش. ارجع طمّن طنط نوال.';add(s,'لقيت مشمش في الشارع. طمّن طنط نوال.');}else text='مياو… قطة صغيرة بتتشمّس. شكلها قطة حد من الجيران.';}
else if(id==='hassan'){if(s.flags.coin){s.flags.secretKnown=true;text='العملة دي بتاعة جدك! كان بيحط حكايات الحي في صندوق تحت الشجرة. افتحه بالمفتاح النحاسي بعد المغرب… وافتكر اللي قبلك.';add(s,'سر عم حسن: الصندوق يتفتح بالمفتاح بعد المغرب.');}else text=count?'لسه فاكر سلامك عليّا. اسأل ماما عن حاجات جدك القديمة.':'أهلاً يا بطل. السلم ده حافظ خطوات أهل العمارة، من أيام جدك.';}
else if(id==='chest'){if(s.flags.chestOpen)text='هنا حكايات اللي سبقونا. صورتك مع أصحابك بقت جزء من الصندوق.';else if(!s.flags.secretKnown)text='صندوق خشب عليه حروف قديمة. مين يا ترى يعرف حكايته؟';else if(!s.inventory.includes('مفتاح نحاسي'))text='الصندوق مقفول. محتاج مفتاح نحاسي.';else if(s.minute<1080&&s.minute>300)text='تحت الغطاء مكتوب: «لما نور البيوت ينور، حكايتنا تظهر». ارجع بعد المغرب.';else{s.flags.chestOpen=true;s.inventory.push('صورة الحي سنة ١٩٦٨');text='فتحت الصندوق! صورة لجدك وعم حسن وهما أطفال في نفس الشارع. وورقة: «المكان بيعيش بالناس اللي فاكرينه». أنت بقيت جزء من الحكاية.';add(s,'كشفت سر صندوق الحكايات ولقيت صورة جدك سنة ١٩٦٨.');}}
else if(id==='kite'){if(!s.flags.kiteQuest)text='طيارة ورق ماسكة في الحبل. يا ترى بتاعة مين؟';else if(s.flags.kiteFound)text='خدت الطيارة بالفعل. يوسف مستنيك في الشارع.';else{s.flags.kiteFound=true;s.inventory.push('طيارة يوسف');text='فكّيت الطيارة من الحبل بهدوء. رجّعها ليوسف في الشارع.';add(s,'لقيت طيارة يوسف على السطح.');}}
else if(id==='pigeon'){text=s.flags.roofMemory?'الحمام رجع لبرجه. لحظة هادية فوق دوشة الشارع.':'رفّة جناح… الحي كله باين من هنا. هتفتكر أول مرة طلعت السطح.';if(!s.flags.roofMemory){s.flags.roofMemory=true;add(s,'أول طلعة للسطح: حمام، غسيل، وهواء بعيد عن دوشة الشارع.');}}
else if(id==='tank')text='الخزان القديم بيلمّ ضوء الشمس. جنبه أثر طباشير: «يوسف كان هنا». مش كل سر محتاج مفتاح.';
else if(id==='friend'){if(s.flags.chestOpen&&!s.flags.kiteQuest){s.flags.kiteQuest=true;text='لقيت صورة جدك؟ لازم نعمل إحنا كمان ذكريات! طيارتي علقت على السطح. تجيبها ونطيّرها سوا؟';add(s,'مغامرة جديدة: طيارة يوسف علقت على سطح العمارة.');}else if(s.flags.kiteFound&&!s.flags.kiteReturned){s.flags.kiteReturned=true;s.inventory=s.inventory.filter(x=>x!=='طيارة يوسف');s.flags.friendship=(s.flags.friendship||0)+2;s.inventory.push('شريطة الطيارة');text='طيارتي! كنت فاكرها راحت. الشريطة دي ليك… افتكر اليوم ده لما نكبر.';add(s,'رجّعت الطيارة ليوسف. بقى عندكم ذكرى جديدة وشريطة تحتفظ بيها.');}else if(s.flags.playDay===s.day)text='النهارده لعبنا سوا! نتقابل بكرة؟';else{choices=[{action:'play',label:'نلعب سوا • ساعة'}];text=count?`يا صاحبي! فاكر آخر مرة لعبنا يوم ${s.flags.playDay||s.memory.friend.lastDay}؟ ${age(s)>8?'كلنا بنكبر، بس اللمة لسه موجودة.':'تعالى نعمل ذكرى جديدة.'}`:'أنا يوسف، ساكن هنا. تيجي نلعب ونكتشف الحي سوا؟';}}
else if(id==='bed'){text='كل سنة هنا ١٢ يوم. النوم يحفظ العالم ويقدّم الوقت؛ ذكريات الناس وقراراتك بتفضل موجودة.';choices=[{action:'sleep',label:'نام لبكرة الصبح'},{action:'season',label:'إجازة قصيرة • ٣ أيام'}];}
else if(id==='desk')text=s.flags.chestOpen?'حطّيت صورة جدك جنب كراستك. دلوقتي عندك حكاية تكتبها.':'كراسة قديمة مكتوب فيها: «كل باب وراه حكاية». افتح دفتر الحكايات من فوق لمتابعة مغامراتك.';
else if(id==='radio'){text='الراديو بيحكي عن يوم جديد… خليك شوية واسمع صوت البيت.';tick(s,15);}
else if(id==='pot'){if(!s.flags.note){s.flags.note=true;s.inventory.push('ورقة قديمة');add(s,'وجدت ورقة خلف الأصيص: «اسأل عن العملة، واستنى الليل».');}text='ورا الأصيص ورقة: «اسأل عن العملة، واستنى الليل». سر صغير كان مستني اللي ياخد باله.';}
else if(id==='bench'){text='اقعد شوية وشوف الحي وهو بيتغيّر.';choices=[{action:'wait',label:'استنى ساعة'},{action:'evening',label:'استنى للمغرب'}];}
else if(id==='tree')text=year(s)>1998?'الشجرة كبرت، وعليها شرائط جديدة من أطفال الحي.':'شجرة الحي الكبيرة. حواليها أسرار وذكريات.';
else text='تفصيلة صغيرة من بيت وحياة ليهم حكاية.';
return {title:o.name,text,choices};}
function action(s,a){if(a==='sleep'){tick(s,1440-s.minute+480);add(s,'صحيت على يوم جديد في الحي.');}else if(a==='season'){tick(s,3*1440-s.minute+480);add(s,'عدّت إجازة قصيرة. الذكريات فضلت مع أصحابها.');}else if(a==='wait')tick(s,60);else if(a==='evening')tick(s,s.minute<1080?1080-s.minute:1440-s.minute+1080);else if(a==='play'){tick(s,60);s.flags.playDay=s.day;s.flags.friendship=(s.flags.friendship||0)+1;add(s,'لعبت مع يوسف. صداقتكم بقت أقوى.');}return s;}
function validate(v){if(!v||v.version!==1||!bounds[v.scene]||!Number.isFinite(v.x)||!Number.isFinite(v.y)||!Number.isInteger(v.day)||v.day<1||v.day>100000||!Number.isFinite(v.minute)||v.minute<0||v.minute>=1440||!Array.isArray(v.inventory)||v.inventory.some(x=>typeof x!=='string')||!v.flags||typeof v.flags!=='object'||Array.isArray(v.flags)||!v.memory||typeof v.memory!=='object'||Array.isArray(v.memory)||!Array.isArray(v.journal)||v.journal.some(x=>typeof x!=='string'))throw Error('ملف الحفظ غير صالح');const [w,h]=bounds[v.scene];if(v.x<.6||v.y<.6||v.x>w-.6||v.y>h-.6)throw Error('مكان اللاعب غير صالح');for(const m of Object.values(v.memory))if(!m||!Number.isInteger(m.visits)||m.visits<0)throw Error('ذاكرة غير صالحة');return JSON.parse(JSON.stringify(v));}

function pathTo(s,tx,ty,radius=.4){
 if(!Number.isFinite(tx)||!Number.isFinite(ty))return [];
 const step=.25,sx=Math.round(s.x/step)*step,sy=Math.round(s.y/step)*step;
 if(!walkable(s.scene,sx,sy))return [];
 const queue=[{x:sx,y:sy,parent:-1}],seen=new Set([sx+','+sy]);let found=-1;
 for(let i=0;i<queue.length;i++){const n=queue[i];if(Math.hypot(n.x-tx,n.y-ty)<=radius){found=i;break}
 for(const [dx,dy]of [[step,0],[-step,0],[0,step],[0,-step]]){const x=n.x+dx,y=n.y+dy,key=x+','+y;if(!seen.has(key)&&walkable(s.scene,x,y)){seen.add(key);queue.push({x,y,parent:i})}}}
 if(found<0)return [];const result=[];for(let i=found;i>=0;i=queue[i].parent)result.push({x:queue[i].x,y:queue[i].y});return result.reverse();
}
function tasks(s){return [
 {id:'bread',title:'عيش سخن للبيت',done:!!s.flags.breadDelivered,scene:s.inventory.includes('عيش بلدي')||!s.flags.breadQuest?'home':'street',target:s.inventory.includes('عيش بلدي')||!s.flags.breadQuest?'mom':'baker'},
 {id:'cat',title:'مشمش ترجع لطنط نوال',done:!!s.flags.catReward,scene:!s.flags.catQuest||s.flags.catFound?'stairs':'street',target:!s.flags.catQuest||s.flags.catFound?'nawal':'cat'},
 {id:'secret',title:'سر صورة جدك',done:!!s.flags.chestOpen,scene:s.flags.secretKnown?'street':'stairs',target:s.flags.secretKnown?'chest':'hassan'},
 {id:'kite',title:'طيارة فوق السطح',done:!!s.flags.kiteReturned,locked:!s.flags.chestOpen,scene:!s.flags.kiteQuest||s.flags.kiteFound?'street':'roof',target:!s.flags.kiteQuest||s.flags.kiteFound?'friend':'kite'},
 {id:'roof',title:'ذكرى فوق الحي',done:!!s.flags.roofMemory,scene:'roof',target:'pigeon'}];
}
function routeTarget(s,task){if(task.scene===s.scene)return objects[s.scene].find(o=>o.id===task.target);let id=s.scene==='home'?'door':s.scene==='roof'?'downDoor':s.scene==='street'?'building':task.scene==='home'?'homeDoor':task.scene==='roof'?'roofDoor':'streetDoor';return objects[s.scene].find(o=>o.id===id)}
const api={pathTo,tasks,routeTarget,fresh,bounds,objects,age,year,tick,walkable,move,nearest,interact,action,validate};if(typeof module!=='undefined')module.exports=api;root.ZamanEngine=api;
})(typeof globalThis!=='undefined'?globalThis:this);
