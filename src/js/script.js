class AnimateCanvas {
  constructor(canvas) {
    this.canvas = {
      el: canvas,
      ctx: canvas.getContext('2d'),
      width: window.innerWidth,
      height: window.innerHeight,
      color: '#181a1fff'
    };
    this.particle = {
      amount: 100,
      diameter: 2,
      color: '#6e788fff',
      speed: 0.5
    }
    this.particles = [];
    this.lineLength = 150;
  }

  setSizeByCanvas() {
    const setSizes = () => {
      this.canvas.el.width = this.canvas.width;
      this.canvas.el.height = this.canvas.height;
    }

    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;

      setSizes();
    });

    setSizes();
  }

  setColorByCanvas() {
    this.canvas.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.ctx.fillStyle = this.canvas.color;
    this.canvas.ctx.fill();
  }

  setParticle() {
    for (let i = 0; i < this.particle.amount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        color: this.particle.color,
        diameter: this.particle.diameter,
        speedX: Math.random() * this.particle.speed,
        speedY: Math.random() * this.particle.speed
      });
    }
  }

  addParticle() {
    this.canvas.el.addEventListener('click', e => {
      const {
        layerX: x,
        layerY: y
      } = e;

      this.particles.push({
        x,
        y,
        color: this.particle.color,
        diameter: this.particle.diameter,
        speedX: Math.random() * this.particle.speed,
        speedY: Math.random() * this.particle.speed
      });
    });
  }

  updateCoordinates() {
    this.particles = this.particles.map(particle => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x >= this.canvas.width || particle.x <= 0) {
        particle.speedX *= -1;
      }

      if (particle.y >= this.canvas.height || particle.y <= 0) {
        particle.speedY *= -1;
      }

      return particle;
    });
  }

  moveParticle() {
    window.requestAnimationFrame(() => {
      this.updateCoordinates();
      this.createParticle();
      this.printLine();
      this.moveParticle();
    });
  }

  printLine() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = 0; j < this.particles.length; j++) {
        // Find hypotenuse
        const x = Math.pow(Math.abs(this.particles[i].x - this.particles[j].x), 2);
        const y = Math.pow(Math.abs(this.particles[i].y - this.particles[j].y), 2);
        const lengthCurrentLine = Math.sqrt(x + y);

        if (lengthCurrentLine <= this.lineLength) {
          this.canvas.ctx.beginPath();
          this.canvas.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.canvas.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.canvas.ctx.lineWidth = '0.3';
          this.canvas.ctx.strokeStyle = `rgba(255, 255, 255, 1)`;
          this.canvas.ctx.strokeStyle = `rgba(255, 255, 255, ${1 - lengthCurrentLine / this.lineLength})`;
          this.canvas.ctx.closePath();
          this.canvas.ctx.stroke();
        }
      };
    };
  }

  createParticle() {
    this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.setColorByCanvas();

    this.particles.map(particle => {
      const {
        x,
        y,
        diameter,
        color
      } = particle;

      this.canvas.ctx.beginPath();
      this.canvas.ctx.arc(x, y, diameter, Math.PI * 2, false);
      this.canvas.ctx.fillStyle = color;
      this.canvas.ctx.fill();
    });
  }

  start() {
    this.setParticle();
    this.setSizeByCanvas();
    this.setColorByCanvas();
    this.moveParticle();
    this.addParticle();
  }
}

window.addEventListener('load', () => {
  new AnimateCanvas(document.querySelector('#canvas')).start();
});