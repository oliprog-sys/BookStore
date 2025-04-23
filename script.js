

function Book(title, author, pages, read){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleStatus = function(){
    this.read = !this.read;
}

const myLibrary = [
    // new Book('Something', 'someone', 234, true),
    // new Book('someother', 'someone', 123, false),
    // new Book('program', 'Lary', 34, false),
    // new Book('program and program edition', 'Lary', 34, false),
    // new Book('program', 'Lary', 34, false),
    // new Book('program', 'Lary', 34, false),
    // new Book('program', 'Lary', 34, false),
    // new Book('Something', 'someone', 234, true),
    // new Book('someother', 'someone', 123, false),
    // new Book('program', 'Lary', 34, false),
    // new Book('program', 'Lary', 34, false),
    // new Book('program', 'Lary', 34, false),
    // new Book('program', 'Lary', 34, false),
    // new Book('program', 'Lary', 34, false),
    // new Book('program', 'Lary', 34, false),
    // new Book('Something', 'someone', 234, true),
    // new Book('someother', 'someone', 123, false),
    // new Book('program', 'Lary', 34, false),
    // new Book('program', 'Lary', 34, false),
    // new Book('program', 'Lary', 34, false),
    // new Book('program', 'Lary', 34, false),
    // new Book('program', 'Lary', 34, false)
];

function display(){
    const bookStore = document.getElementById('book-store');
    bookStore.innerHTML = '';
    if(myLibrary.length === 0){
        bookStore.innerHTML = `
            <h1 style="color: red; text-align: center; margin-top: 100px; font-size: 3rem;"> NO BOOKS IN THE LIBRARY</h1>
        `
    } else {        
        myLibrary.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            bookCard.id = book.id;
            const statusText = book.read ? "Already read" : "Not read yet";
            bookCard.innerHTML = `
                <h3>Title: ${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Pages: ${book.pages}</p>
                <p>Status: <span id="status${book.id}" class="status">${statusText}</span></p>
                <button class="removeBtn" id="${book.id}">Remove</button>  
                <button class="toggleStatus" id="${book.id}">${book.read ? "Mark as unread" : "Mark as read"}</button>          
            `;
            bookStore.appendChild(bookCard);
        });
    
        toggleResult();
        removeResult();        
    }
}

function toggleResult(){
    const toggleBtns = document.querySelectorAll('.toggleStatus');

    toggleBtns.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const toggleId = event.target.getAttribute('id');
            myLibrary.forEach(book => {
                if(toggleId === book.id){
                    book.toggleStatus();
                    button.textContent = book.read ? "Mark as Unread" : "Mark as Read";
                    
                    // const statusSpan = button.parentElement.querySelector('.status'); or
                    const statusSpan = document.getElementById(`status${book.id}`);
                    statusSpan.textContent = book.read ? "Already read" : "Not read yet";
                }
            })

        })
    })
}

function removeResult(){
    const removeBtns = document.querySelectorAll('.removeBtn');

    removeBtns.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const buttonId = event.target.getAttribute('id');
            removeCard(buttonId);
        });
    });
}

function removeCard(buttonId){
    const bookStore = document.getElementById('book-store');
    myLibrary.forEach((book, index) => {
        if(buttonId === book.id){
            myLibrary.splice(index, 1);
            const card = bookStore.querySelector(`div[id="${buttonId}"]`);
            if(card){
                card.remove();
            }            
        }
    }) 
    display();
}

function addBookToLibrary(event){
    event.preventDefault();
    const title = document.getElementById('title-id').value;
    const author = document.getElementById('author-id').value;
    const page = document.getElementById('page-id').value;
    const selectedValue = document.querySelector('input[name="read"]:checked');
    let readValue = null;

    if(selectedValue){
        readValue = selectedValue.value === 'yes';
    }

    const book = new Book(title, author, page, readValue);
    myLibrary.push(book);    
    display();
}


const addBtn = document.getElementById('submit');
addBtn.addEventListener('click', addBookToLibrary);

display();