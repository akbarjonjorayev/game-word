import * as GET from './get.js'
import * as ClassName from './className.js'
import * as HTML from './html.js'
import { appData } from './data/appData.js'

document.addEventListener('DOMContentLoaded', () => {
  const plArea = document.querySelector('.pl_btn_area')
  const lArea = document.querySelector('.l_area')
  const words = GET.wordsGrid(appData.words.amount)

  words.then((wordsData) => {
    appData.words = { ...appData.words, ...wordsData }
    const wordsArr = wordsData.grid.flat(2)

    for (let i = 0; i < wordsArr.length; i++) {
      const html = HTML.plBtn(i, wordsArr[i])
      plArea.innerHTML += html
    }
    lArea.classList.add('hide')
    allApp()
  })
})

function allApp() {
  const plBtns = document.getElementsByClassName('pl_btn')

  for (let i = 0; i < plBtns.length; i++) {
    plBtns[i].onclick = () => {
      if (plBtns[i].classList.contains('c_active')) {
        ClassName.removeAllClass(['active', 'c_active'])
        return
      }

      if (plBtns[i].classList.contains('active')) {
        const btnI = +document
          .querySelector('.c_active')
          .getAttribute('data-index')
        const wordData = GET.wordData([btnI, i])
        const { word } = wordData

        const isDetected = appData.words.words.includes(word)

        if (isDetected) {
          ClassName.removeAllClass(['active', 'c_active'])
          ClassName.addAllClass(plBtns, wordData.indexes, ['found'])
        }

        if (!isDetected) {
          ClassName.removeAllClass(['active', 'c_active'])
          ClassName.addAllClass(plBtns, wordData.indexes, ['error'])

          setTimeout(() => ClassName.removeAllClass(['error']), 1000)
        }

        return
      }

      ClassName.removeAllClass(['active', 'c_active'])

      const lineBtns = GET.lineBtns(i)

      plBtns[i].classList.add('c_active')
      ClassName.addAllClass(plBtns, lineBtns, ['active'])
    }
  }
}
