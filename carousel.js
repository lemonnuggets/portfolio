const carouselSlide = document.querySelector('.carousel')
const carouselWrapper = document.querySelector('.carouselWrapper')
const carouselCards = document.querySelectorAll('.carousel .card')

const prevBtn = document.querySelector('#prevBtn')
const nextBtn = document.querySelector('#nextBtn')

// nextBtn.addEventListener('click', scrollToNextItem);
// prevBtn.addEventListener('click', scrollToPrevItem);

// function scrollToNextItem() {
//     carouselSlide.scrollBy({left: document.querySelector(".project").clientWidth, top: 0, behavior: 'smooth'});
//     console.log(`Carousel: ${carouselSlide.scrollLeft}, Carousel Wrapper: ${carouselWrapper.scrollLeft}`)
// }
// function scrollToPrevItem() {
//     // carouselSlide.scrollBy({left: -itemWidth, top: 0, behavior: 'smooth'});
// }
carouselSlide.style.transition = "transform 0.4s ease-in-out"

function getRealWidth(element){
    let width = element.offsetWidth
    let style = getComputedStyle(element)
    return width + parseInt(style.marginLeft) + parseInt(style.marginRight)
}
function getDistanceFromZero(next){
    let length = 0
    for(let i = 0; i < next; i++){
        length += getRealWidth(carouselCards[i])
    }
    return length
}
function getCurrentOffset(){
    return carouselWrapper.scrollLeft
}
function resetCounter() {
    let length = 0
    for(counter = 0; counter < carouselCards.length; counter++){
        length += getRealWidth(carouselCards[counter])
        console.log(`Counter: ${counter} Width: ${getRealWidth(carouselCards[counter])} Length: ${length} CurrentOffset: ${getCurrentOffset()}`)
        console.log(`carouselWrapper.scrollLeft: ${carouselWrapper.scrollLeft}, carouselSlide.scrollLeft: ${carouselSlide.scrollLeft}`)
        if(length > getCurrentOffset()){
            break
        }
    }
}
function scroll(distanceFromZero) {
    carouselSlide.style.transition = "transform 0.4s ease-in-out"
    str =`translateX(${-distanceFromZero}px)`
    carouselSlide.style.transform = str
    console.log(str)
}
function moveToCounter(pos) {
    if(pos >= carouselCards.length || pos < 0){
        console.log("MISSING INDEX")
        return
    }
    let l1 = getDistanceFromZero(pos)
    let l2 = getCurrentOffset()
    scroll(l1 - l2)
}
// moveToCounter(4)
nextBtn.addEventListener('click', () => {
    console.log("#####################################nextBtn########################################")
    resetCounter()
    if(counter >= carouselCards.length - 1) return
    let sizes = []
    carouselCards.forEach(card => {
        sizes.push(getRealWidth(card))
    })
    console.log(`Current Offset: ${getCurrentOffset()}; Sizes: ${sizes}; Counter: ${counter}`)
    // counter++
    // sum = 0
    // for(let i = 0; i < counter; i++){
    //     sum += sizes[counter]
    // }
    distanceToMove = sizes[counter]
    // while(distanceToMove > 0){
    //     carouselWrapper.scrollLeft += 10
    //     distanceToMove -= 10
    // }
    carouselWrapper.scrollLeft += distanceToMove
    // carouselWrapper.scrollTo({})
    resetCounter()
    console.log(`New Offset: ${getCurrentOffset()}; Sizes: ${sizes}; Counter: ${counter}`)
})
prevBtn.addEventListener('click', () => {
    console.log("#####################################prevBtn########################################")
    resetCounter()
    if(counter < 0) return
    let sizes = []
    carouselCards.forEach(card => {
        sizes.push(getRealWidth(card))
    })
    console.log(`Current Offset: ${getCurrentOffset()}; Sizes: ${sizes}; Counter: ${counter}`)
    // counter--
    // sum = 0
    // for(let i = 0; i < counter; i++){
    //     sum += sizes[counter]
    // }
    carouselWrapper.scrollLeft -= sizes[counter]
    counter--
    resetCounter()
    console.log(`New Offset: ${getCurrentOffset()}; Sizes: ${sizes}; Counter: ${counter}`)
})
