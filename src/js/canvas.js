import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

// Event Listeners
addEventListener('mousedown', (event) => {
  mouse_down = true
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('mouseup', (event) => {
  mouse_down = false
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
  if (mouse_down == true){
    Pendulum.theta = (mouse.x + Pendulum.anchor_x)/(mouse.y + Pendulum.anchor_y)
    console.log(Pendulum.theta)
  }
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
class Pendulum {
  constructor(anchor_x, anchor_y, arm_len, start_theta, bob_radius) {
    this.anchor_x = anchor_x
    this.anchor_y = anchor_y
    this.arm_len = arm_len
    this.theta = start_theta
    this.bob_radius = bob_radius

    this.bob_x = this.anchor_x + this.arm_len * Math.cos(this.theta)
    this.bob_y = this.anchor_y + this.arm_len * Math.sin(this.theta)
    this.gravity = .01
    this.angular_acceleration = this.gravity * Math.sin(this.theta)
    this.angular_velocity = this.angular_acceleration
  }

  draw() {
    c.beginPath()
    c.moveTo(this.anchor_x, this.anchor_y)
    c.lineTo(this.bob_x, this.bob_y)
    c.stroke()
    c.closePath()
    c.beginPath()
    c.arc(this.bob_x, this.bob_y, this.bob_radius, 0, 2*Math.PI, false)
    c.fill()
    c.closePath()
  }

  update() {
    this.bob_x = this.anchor_x + this.arm_len * Math.cos(this.theta)
    this.bob_y = this.anchor_y + this.arm_len * Math.sin(this.theta)
    this.theta += this.angular_velocity
    this.angular_acceleration = this.gravity * Math.cos(this.theta)
    this.angular_velocity += this.angular_acceleration
    this.angular_velocity *= .99
    this.draw()
  }
}

// Implementation
let objects
function init() {
  objects = [new Pendulum(canvas.width / 2, 50, 400, Math.PI, 40, 1)]

  // for (let i = 0; i < 400; i++) {
  //    objects.push()
  // }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  objects.forEach(object => {
   object.update()
  })
}

init()
animate()
