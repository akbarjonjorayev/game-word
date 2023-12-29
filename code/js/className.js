function removeAllClass(classNameArr, despiteIndexes) {
  if (despiteIndexes) {
    despiteIndexes.sort((a, b) => a - b)
  }

  for (let i = 0; i < classNameArr.length; i++) {
    const className = classNameArr[i]
    const nodeElements = document.querySelectorAll(`.${className}`)
    for (let j = 0; j < nodeElements.length; j++) {
      if (despiteIndexes) {
        const index = +nodeElements[j].getAttribute('data-index')

        if (despiteIndexes.includes(index)) {
          continue
        }
      }
      if (nodeElements[j].classList.contains(className))
        nodeElements[j].classList.remove(className)
    }
  }
}

function addAllClass(nodeElements, indexes, classNameArr) {
  const loop = indexes === 'all' ? nodeElements.length : indexes.length
  const className = classNameArr.join(' ')

  for (let i = 0; i < loop; i++) {
    const index = indexes === 'all' ? i : indexes[i]

    if (!nodeElements[index].classList.contains(className))
      nodeElements[index].classList.add(className)
  }
}

export { removeAllClass, addAllClass }
