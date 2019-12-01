function createQTree( resolution=5 ) {
  qTree = new Quadtree( new Rect( 0, 0, drawableAreaSize, drawableAreaSize ), resolution )
}
function generatePoints( count ) {
  for (let i = 0; i < count; i++) {
    const point = new Point( random( drawableAreaSize ), random( drawableAreaSize ) )

    qTree.insert( point )
  }
}
function random( max, min=0 ) {
  return Math.floor( Math.random() * (max - min + 1) ) + min
}
function drawAt( x, y ) {
  ctx.fillStyle = '#00f'
  ctx.beginPath()
  ctx.arc( x + drawAreaX, y + drawAreaY, 2, 0, Math.PI * 2 )
  ctx.fill()
}

//
// Canvas general manipulations below
//

function clear() {
  ctx.fillStyle = '#eee'

  ctx.fillRect( drawAreaX, drawAreaY, drawableAreaSize, drawableAreaSize )
}
function clickOnDrawableArea( clientX, clientY ) {
  return clientX > drawAreaX && clientX < drawAreaX + drawableAreaSize
    && clientY > drawAreaY && clientY < drawAreaY + drawableAreaSize
}
function resize() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  drawAreaX = (canvas.width  - drawableAreaSize)  / 2
  drawAreaY = (canvas.height - drawableAreaSize) / 2

  clear()

  // qTree.show( ctx, drawAreaX, drawAreaY )
}

window.addEventListener( `resize`, resize )
document.addEventListener( 'mouseup', ({ clientX, clientY }) => {
  if (!mouseDown || !clickOnDrawableArea( clientX, clientY )) return

  mouseDown = false

  qTree.insertPointSequence(
    new Point( pointMouseDown.x - drawAreaX, pointMouseDown.y - drawAreaY, true ),
    new Point( pointMouseMove.x - drawAreaX, pointMouseMove.y - drawAreaY, true )
  )

  pointMouseDown.x = null
  pointMouseDown.y = null

  pointMouseMove.x = null
  pointMouseMove.y = null

  clear()
  qTree.show( ctx, drawAreaX, drawAreaY )
} )
document.addEventListener( 'mousedown', ({ clientX, clientY }) => {
  if (!clickOnDrawableArea( clientX, clientY )) return

  // console.log( { x:(clientX - drawAreaX), y:(clientY - drawAreaY) } )

  mouseDown = true

  pointMouseDown.x = clientX
  pointMouseDown.y = clientY

  pointMouseMove.x = clientX
  pointMouseMove.y = clientY
} )
document.addEventListener( 'mousemove', ({ clientX, clientY }) => {
  if (!mouseDown || !clickOnDrawableArea( clientX, clientY )) return

  const { x, y } = pointMouseDown

  pointMouseMove.x = clientX
  pointMouseMove.y = clientY

  clear()
  qTree.show( ctx, drawAreaX, drawAreaY )

  ctx.strokeStyle = '#00f'
  ctx.beginPath()
  ctx.moveTo( x, y )
  ctx.lineTo( clientX, clientY )
  ctx.stroke()
} )