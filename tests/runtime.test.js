// Node-only smoke tests: mocks detect renderer/UI JavaScript failures, not visual correctness.
const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const engine=fs.readFileSync(path.join(__dirname,'../engine.js'),'utf8');const game=fs.readFileSync(path.join(__dirname,'../game.js'),'utf8');
for(const scene of ['home','stairs','street','roof'])test('UI and Canvas call smoke test: '+scene,()=>{
 const state={version:1,scene,x:3,y:8,day:13,minute:1200,inventory:[],flags:{},memory:{},journal:[],steps:0};let frame,drawCalls=0;
 const context=new Proxy({measureText:t=>({width:t.length*5}),createRadialGradient:()=>({addColorStop(){}})},{get:(o,k)=>k in o?o[k]:()=>{drawCalls++},set:(o,k,v)=>(o[k]=v,true)});
 const nodes=new Map();function el(id=''){if(nodes.has(id))return nodes.get(id);let hidden=['dialog','journal','settings','tasks'].includes(id);const n={style:{},dataset:{},textContent:'',classList:{contains:()=>hidden,add:()=>hidden=true,remove:()=>hidden=false,toggle(){}},replaceChildren(){},append(){},addEventListener(){},getContext:()=>context};nodes.set(id,n);return n}
 const world={console,document:{hidden:false,getElementById:el,querySelectorAll:()=>[],createElement:()=>el(Math.random()),addEventListener(){}},localStorage:{getItem:()=>JSON.stringify(state),setItem(){}},innerWidth:390,innerHeight:844,requestAnimationFrame:f=>frame=f,setTimeout:()=>1,clearTimeout(){},addEventListener(){},confirm:()=>true};world.window=world;vm.createContext(world);vm.runInContext(engine,world);vm.runInContext(game,world);el('start').onclick();assert.doesNotThrow(()=>frame(16));assert.ok(drawCalls>10);assert.ok(el('place').textContent);el('tasksBtn').onclick();assert.doesNotThrow(()=>frame(32));
});
