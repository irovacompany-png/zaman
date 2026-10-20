/* Pure collision helpers shared by browser and Node tests. */
(function(g){const inArea=(x,z)=>(x>-5.85&&x<5.72&&z>-4.72&&z<4.72)||(x>-8.4&&x<-5.55&&z>1.85&&z<3.9)||(x>-8.4&&x<-6.2&&z>=3.6&&z<8.5)||(x>-10.5&&x<-4.1&&z>=8.1&&z<12.7);
function height(x,z){return x<-5.9?z>8.1?-2.4:z>3.7?-Math.min(2.4,(z-3.7)/4.4*2.4):0:0}
function segmentDistance(x,z,ax,az,bx,bz){let dx=bx-ax,dz=bz-az,t=Math.max(0,Math.min(1,((x-ax)*dx+(z-az)*dz)/(dx*dx+dz*dz||1)));return Math.hypot(x-ax-t*dx,z-az-t*dz)}
function walkable(x,z,solids,doors){if(!inArea(x,z))return false;if(solids.some(o=>Math.abs(x-o.x)<o.w/2+.18&&Math.abs(z-o.z)<o.d/2+.18))return false;return !doors.some(o=>{const a=o.rotation+o.angle;return segmentDistance(x,z,o.hingeX,o.hingeZ,o.hingeX+Math.cos(a)*o.width,o.hingeZ-Math.sin(a)*o.width)<.23})}
const api={inArea,height,segmentDistance,walkable};if(typeof module!=='undefined')module.exports=api;g.ZamanPhysics=api;})(typeof globalThis!=='undefined'?globalThis:this);
