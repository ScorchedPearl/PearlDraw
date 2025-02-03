export function drawRect(context: CanvasRenderingContext2D,canvas: HTMLCanvasElement){
 let clicked = false;
  let startX=0;
  let startY=0;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle="black";
  context.fillRect(0,0,canvas.width,canvas.height);
 const handleMouseDown = (e: MouseEvent) => {
  clicked = true;
  startX = e.clientX;
  startY = e.clientY;
 };

  const handleMouseUp = (e: MouseEvent) => {
   clicked = false;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  console.log("Mouse up at:", x, y);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if(clicked){
      const width= e.clientX - startX;
      const height= e.clientY - startY;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle="black";
      context.fillRect(0,0,canvas.width,canvas.height);
      context.strokeStyle="white";
      context.beginPath();
      context.rect(startX, startY, width, height);
      context.stroke();

    }
  };

  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mousemove", handleMouseMove);
}