let charVar = 0
let pageVar = 0

function fetchBooks() {
  return fetch("https://anapioficeandfire.com/api/books")
    .then(function(response) {
      return response.json()
    })
    .then(renderBooks)
    
}

function renderBooks(json) {
  const main = document.querySelector('main')
  console.log(`The 5th book in the series is: ${json[4].name}`)
  json.forEach(book => {
    // debugger
    pageVar += book.numberOfPages
    if ((charVar <= 1031) && ((charVar + book.characters.length) <= 1031)) {
      charVar += book.characters.length
    }
    else if ((charVar <= 1031) && (charVar + book.characters.length > 1031)) {
      // debugger
      const bookChar = 1031 - charVar + 1
      console.log(`The 1,031st character is: ${book.characters[bookChar]}`)
      fetchChar(book.characters[bookChar])
      charVar += book.characters.length
    }
    
    const h2 = document.createElement('h2')
    h2.innerHTML = `<h2>${book.name}</h2>`
    main.appendChild(h2)
  })
  console.log(`The series is ${pageVar} pages long!`)
}

document.addEventListener('DOMContentLoaded', function() {
  fetchBooks()
})

function fetchChar(charURL) {
  fetch(charURL)
  .then (resp => resp.json())
  .then (json => {
    console.log(json)
  })

}
