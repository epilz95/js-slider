// @flow

// $FlowFixMe
import 'normalize.css'
// $FlowFixMe
import '../sass/main.scss'

const double = (n: number): number => {
  return n * 2
}

export function testMe (name: string) {
  console.log(double(12))
  return `Hi ${name}`
}

const lastId = 5

const showNextSlide = () => {
  const activeSlideNode = document.querySelector('.slider__slide--active')

  if (!activeSlideNode) return

  const currId = parseInt(activeSlideNode.dataset.id)
  const nextId = currId === lastId
    ? 1
    : currId + 1

  const slideNodesArray = Array.from(document.querySelectorAll('.slider__slide'))

  const nextSlideNode = slideNodesArray.find(slide => parseInt(slide.dataset.id) === nextId)

  activeSlideNode.classList.remove('slider__slide--active')
  if (nextSlideNode) nextSlideNode.classList.add('slider__slide--active')
}

const showPrevSlide = () => {
  const activeSlideNode = document.querySelector('.slider__slide--active')

  if (!activeSlideNode) return

  const currId = parseInt(activeSlideNode.dataset.id)
  const prevId = currId === 1
    ? lastId
    : currId - 1

  const slideNodesArray = Array.from(document.querySelectorAll('.slider__slide'))

  const prevSlideNode = slideNodesArray.find(slide => parseInt(slide.dataset.id) === prevId)

  activeSlideNode.classList.remove('slider__slide--active')
  if (prevSlideNode) prevSlideNode.classList.add('slider__slide--active')
}

const markCurrNavItem = () => {
  const activeSlideNode = document.querySelector('.slider__slide--active')

  if (!activeSlideNode) return

  const currSlideId = parseInt(activeSlideNode.dataset.id)

  const navItemsArray = Array.from(document.querySelectorAll('.slider-nav__button'))
  const currNavItems = document.querySelectorAll('.slider-nav__button--active')

  const activeNavItem = navItemsArray.find(item => parseInt(item.dataset.id) === currSlideId)

  currNavItems.forEach(item => item.classList.remove('slider-nav__button--active'))
  if (activeNavItem) activeNavItem.classList.add('slider-nav__button--active')
}

const addListeners = (): void => {
  const buttonPrev = document.querySelector('.arrow--prev')

  if (buttonPrev) {
    buttonPrev.addEventListener('click', () => {
      showPrevSlide()
      markCurrNavItem()
    })
  }

  const buttonNext = document.querySelector('.arrow--next')

  if (buttonNext) {
    buttonNext.addEventListener('click', () => {
      showNextSlide()
      markCurrNavItem()
    })
  }

  const navBtnNodes = document.querySelectorAll('.slider-nav__button')

  navBtnNodes.forEach(node => node.addEventListener('click', () => {
    const clickedId = parseInt(node.dataset.id)

    const slideNodesArray = Array.from(document.querySelectorAll('.slider__slide'))

    const slideToShow = slideNodesArray.find(slide => parseInt(slide.dataset.id) === clickedId)

    slideNodesArray.forEach(slide => slide.classList.remove('slider__slide--active'))

    if (slideToShow) slideToShow.classList.add('slider__slide--active')

    markCurrNavItem()
  }))

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.keyCode === 37) {
      showPrevSlide()
      markCurrNavItem()
    }

    if (e.keyCode === 39) {
      showNextSlide()
      markCurrNavItem()
    }
  })
}

const main = () => {
  addListeners()
}

main()
