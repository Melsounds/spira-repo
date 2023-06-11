
const inputs = document.querySelectorAll(".otp-number input");
inputs.forEach((input, index) =>{
    input.dataset.index = index;
    input.addEventListener("paste", handleOtppaste);
    input.addEventListener("keyup", handleOtp);
});

function handleOtppaste(e){
    const data = e.clipboardData.getData("text");
    const value = data.split("");
    if(value.length === inputs.length){
        inputs.forEach((input, index) => (input.value = value[index]))
        submit();
    }
}
function handleOtp(e){
    const input = e.target;
    let value = input.value;
    input.value ="";
    input.value = value ? value[0] : "";

    let fieldIndex = input.dataset.index;
    if(value.length > 0 && fieldIndex < inputs.length - 1){
        input.nextElementSibling.focus();
    }
    if(e.key === "Backspace" && fieldIndex > 0){
        input.previousElementSibling.focus();
    }
    if(fieldIndex == inputs.length - 1){
        submit();
    }
    
}
function submit(){
    console.log("Submitting ...");
    let otp = "";
    inputs.forEach((input) =>{
        otp += input.value;
        input.disabled = true;
        input.classList.add("disable");
    });
    console.log(otp);
}

/*slideing screens*/
const slider = document.querySelector('.slider-container'),
slides = Array.from(document.querySelectorAll('.slide'))

let isDragging = false;
startPos = 0;
currentTranslate = 0;
prevTranslate = 0;
animateID = 0;
currentIndex = 0;


//Removing Image dragging effect
slides.forEach((slide, index) => {
    const slideImage = slide.querySelector('img')
    slideImage.addEventListener('dragstart', (e) => e.
    preventDefault())

    //Touch events
    slide.addEventListener('touchstart', touchStart(index))
    slide.addEventListener('touchend', touchEnd)
    slide.addEventListener('touchmove', touchMove)

    //mouse event
    slide.addEventListener('mousedown', touchStart(index))
    slide.addEventListener('mouseup', touchEnd)
    slide.addEventListener('mouseleave', touchEnd)
    slide.addEventListener('mousemove', touchMove)
})

function touchStart(index){
    return function (event){
        currentIndex = index
        startPos = getPositionX(event)
        isDragging = true

        animationID = requestAnimationFrame(animation)
        slider.classList.add('grabbing')
    }
}

function touchEnd(){
    isDragging = false
    cancelAnimationFrame(animationID)

    const movedBy = currentTranslate - prevTranslate

    if(movedBy < -100 && currentIndex < slides.length - 1)
    currentIndex += 1

    if(movedBy > 100 && currentIndex > 0)
    currentIndex -= 1

    setPositionByIndex()

    slider.classList.remove('grabbing')
}

function touchMove(event){
    if (isDragging){
    const currentPosition = getPositionX(event)
    currentTranslate = prevTranslate + currentPosition - startPos
}
}

function getPositionX(event){
    return event.type.includes('mouse') ? event.pageX :
    event.touches[0].clientX
}

function animation() {
    setSliderPosition()
    if(isDragging) requestAnimationFrame(animation)
}
function setSliderPosition(){
    slider.style.transform =`translateX(${currentTranslate}px)`
}
function  setPositionByIndex(){
    currentTranslate = currentIndex * -window.innerWidth
    prevTranslate = currentTranslate
    setSliderPosition()
}