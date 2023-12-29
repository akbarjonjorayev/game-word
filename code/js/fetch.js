function get(url) {
  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

export { get }
