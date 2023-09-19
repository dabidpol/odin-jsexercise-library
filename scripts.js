let books;
const book_data = [
    { 
        title: "Harry Potter and the Philosopher's Stone", 
        author: "JK Rowling", 
        pages: "300", 
        state: "read" 
    },
    {
      title: "A Game of Thrones",
      author: "George RR Martin",
      pages: "500",
      state: "read",
    },
    { 
        title: "Percy Jackson and the Lightning Thief", 
        author: "Rick Riordan", 
        pages: "350",
        state: "not read" 
    },
  ];

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const state = document.querySelector("#state"); 
const bookList = document.querySelector("#booklist");

const form = document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();  
    addBook();
    populateTable();
    clear(); 
});

const table = document
  .querySelector("table")
  .addEventListener("click", (e) => {
    const currentTarget = e.target.parentNode.parentNode.childNodes[1];
    if (e.target.innerHTML == "delete") {
      if (confirm(`are you sure you want to delete ${currentTarget.innerText}`))
        deleteBook(findBook(books, currentTarget.innerText));
    }
    if (e.target.classList.contains("status-button")) {
        changeState(findBook(books, currentTarget.innerText));
        
    }
    changeLocalStorage();
    populateTable();
  });

function addBook() {
    if(title.value === "" || author.value === "" || pages.value === "" ) {
        alert("Please fill out all fields");
        return;
    }
    const newBook = new Book(title.value, author.value, pages.value, state.value);
    books.push(newBook);
    changeLocalStorage();
}

function clear() {
    title.value = "";
    author.value = "";
    pages.value = "";
}

function deleteBook(o) {
    books.splice(o, 1);
}

function changeLocalStorage() {
    localStorage.setItem("books", JSON.stringify(books));
}   

function localStorageData() {
    if(localStorage.getItem("books")){
        books = JSON.parse(localStorage.getItem("books"));
    }else{
        books = book_data;
    }
    
}

function findBook(arr, title) {
    // for (book of arr){
    //     if (book.title === title) {
    //         return arr.indexOf(book);
    //     }
    // }
    return arr.findIndex((book) => book.title === title);
}

function changeState(o){
    if (books[o].state === "read") {
        console.log(books[o].state);
        books[o].state = "not read";
    } else books[o].state = "read";
    console.log(books[o].state);
}

function populateTable() {
    localStorageData();
    bookList.innerHTML = "";
    books.forEach((book) => {
        const htmlBook = `
        <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td><button class="status-button">${book.state}</button></td>
            <td><button class="delete">delete</button></td>
        </tr>
        `;
        bookList.insertAdjacentHTML("beforeend", htmlBook);
    });
}

function Book(title, author, pages, state) {
    this.title = title
    this.author = author
    this.pages = pages
    this.state = state
    // this.info = function() {
    //     const x = title + " by " + author + ", " + pages + "," + state + "."
    //     return x
    // }
  }
  
//   const theHobbit = new Book("The Hobbit", "JRR Tolkien", "295 pages", " has not read yet");
//   console.log(theHobbit.info());

populateTable();