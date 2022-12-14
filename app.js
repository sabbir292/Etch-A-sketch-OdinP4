const gridContainer = document.querySelector(".grid-container")
const colorPicker = document.querySelector(".color-picker")
const colorBtn = document.querySelector(".color-mode")
const rainbowBtn = document.querySelector(".rainbow-mode")
const eraserBtn = document.querySelector(".eraser")
const slider = document.querySelector(".slider")
const clear = document.querySelector(".clear")
const cellSize = document.querySelector(".size-value")
const footer = document.querySelector(".footer")

const DEFAULT_COLOR = '#333333'
const DEFAULT_MODE = 'color'
const DEFAULT_SIZE = 16

let currentSize = DEFAULT_SIZE
let currentColor = DEFAULT_COLOR
let currentMode= DEFAULT_MODE

function setColor(newColor){
    currentColor = newColor
    console.log(currentColor)
}

function setCurrentMOde(newMode){
    currentMode = newMode
    console.log(currentMode)
    activeBtn(newMode)
}

function setCurrentSize(newSize){
    currentSize = newSize
    console.log(currentSize)
}

function updateDivSize(value){
    console.log(value)
    cellSize.innerHTML = `${value} x ${value}`
}

function setDivSize(value){
    setCurrentSize(value)
    updateDivSize(value)
    reloadGrid()
}


function reloadGrid(){
    clearGrid()
    makeDiv(currentSize)
}

function clearGrid(){
    gridContainer.innerHTML = ""
}


colorPicker.oninput =(e) => setColor(e.target.value)
colorBtn.onclick = () => setCurrentMOde("color")
rainbowBtn.onclick = () => setCurrentMOde("rainbow")
eraserBtn.onclick = () => setCurrentMOde("eraser")
slider.onmousemove = (e) => updateDivSize(e.target.value)
slider.onchange = (e) => setDivSize(e.target.value)
clear.onclick = () => reloadGrid()






function makeDiv(size){
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`
    
    for(let i = 0; i<(size*size); i ++){
        let cell = document.createElement("div")
        cell.classList.add("grid-item")
        cell.addEventListener("mousedown", colorTheCell)
        cell.addEventListener("mouseover", colorTheCell)
        cell.addEventListener("transitionend", colorTheCell)
        
        
        gridContainer.appendChild(cell)
    }
}


let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function colorTheCell(e){
    if(e.type ==="mouseover" && !mouseDown) return
    if(currentMode === "color"){
        e.target.style.backgroundColor = currentColor  
    }
    else if(currentMode === "rainbow"){
        let randomR = Math.floor(Math.random()*256)
        let randomG = Math.floor(Math.random()*256)
        let randomB = Math.floor(Math.random()*256)

        e.target.style.backgroundColor = `rgb(${randomR},${randomG},${randomB})`
    }
    else if(currentMode === "eraser"){
        e.target.style.backgroundColor = "#fefefe"
    }
}



function activeBtn(newMode){
    
    if(newMode === "color"){
        colorBtn.classList.add("active")
        rainbowBtn.classList.remove("active")
        eraserBtn.classList.remove("active")
    }
    else if(newMode === "rainbow"){
        rainbowBtn.classList.add("active")
        colorBtn.classList.remove("active")
        eraserBtn.classList.remove("active")
    }
    else if(newMode === "eraser"){
        eraserBtn.classList.add("active")
        colorBtn.classList.remove("active")        
        rainbowBtn.classList.remove("active")        

    }

}

    let date = new Date().getFullYear()
    footer.innerHTML = `Copyright ©️SabbirHossain ${date}`


window.onload = () => {
    makeDiv(DEFAULT_SIZE)
    activeBtn(DEFAULT_MODE)
  }