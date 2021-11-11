(()=>{class t{constructor(t){this.canvas={el:t,ctx:t.getContext("2d"),width:window.innerWidth,height:window.innerHeight,color:"#000"},this.particle={amount:100,diameter:2,color:"#fefefe",speed:.5},this.particles=[],this.lineLength=150}setSizeByCanvas(){const t=()=>{this.canvas.el.width=this.canvas.width,this.canvas.el.height=this.canvas.height};window.addEventListener("resize",(()=>{this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,t()})),t()}setColorByCanvas(){this.canvas.ctx.rect(0,0,this.canvas.width,this.canvas.height),this.canvas.ctx.fillStyle=this.canvas.color,this.canvas.ctx.fill()}setParticle(){for(let t=0;t<this.particle.amount;t++)this.particles.push({x:Math.random()*this.canvas.width,y:Math.random()*this.canvas.height,color:this.particle.color,diameter:this.particle.diameter,speedX:Math.random()*this.particle.speed,speedY:Math.random()*this.particle.speed})}updateCoordinates(){this.particles=this.particles.map((t=>(t.x+=t.speedX,t.y+=t.speedY,(t.x>=this.canvas.width||t.x<=0)&&(t.speedX*=-1),(t.y>=this.canvas.height||t.y<=0)&&(t.speedY*=-1),t)))}moveParticle(){window.requestAnimationFrame((()=>{this.updateCoordinates(),this.createParticle(),this.printLine(),this.moveParticle()}))}printLine(){for(let t=0;t<this.particles.length;t++)for(let s=0;s<this.particles.length;s++){const i=Math.pow(Math.abs(this.particles[t].x-this.particles[s].x),2),a=Math.pow(Math.abs(this.particles[t].y-this.particles[s].y),2),e=Math.sqrt(i+a);e<=this.lineLength&&(this.canvas.ctx.beginPath(),this.canvas.ctx.moveTo(this.particles[t].x,this.particles[t].y),this.canvas.ctx.lineTo(this.particles[s].x,this.particles[s].y),this.canvas.ctx.lineWidth="0.3",this.canvas.ctx.strokeStyle="rgba(255, 255, 255, 1)",this.canvas.ctx.strokeStyle=`rgba(255, 255, 255, ${1-e/this.lineLength})`,this.canvas.ctx.closePath(),this.canvas.ctx.stroke())}}createParticle(){this.canvas.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.setColorByCanvas(),this.particles.map((t=>{const{x:s,y:i,diameter:a,color:e}=t;this.canvas.ctx.beginPath(),this.canvas.ctx.arc(s,i,a,2*Math.PI,!1),this.canvas.ctx.fillStyle=e,this.canvas.ctx.fill()}))}start(){this.setParticle(),this.setSizeByCanvas(),this.setColorByCanvas(),this.moveParticle()}}window.addEventListener("load",(()=>{new t(document.querySelector("#canvas")).start()}))})();