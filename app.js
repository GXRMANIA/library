let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.toggleRead = function() {
    if(this.read) {
        this.read = false;
    } else {
        this.read = true;
    }
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

addBookToLibrary("Das ist Alpha", "Kollegah", 241, true);
addBookToLibrary("Das ist Beta", "Susi Stottert", 24, false);

function displayLibrary() {
    const books = document.querySelector(".books");
    books.innerHTML = "";
    myLibrary.forEach(book => {
        let newBook = document.createElement("div");
        newBook.dataset.index = myLibrary.indexOf(book)
        newBook.classList.add("book");
        newBook.innerHTML = `
            <div class="title">
                <p>Title:</p>
                <p>${book.title}</p>
            </div>
            <div class="author">
                <p>Author:</p>
                <p>${book.author}</p>
            </div>
            <div class="pages">
                <p>Number of pages:</p>
                <p>${book.pages}</p>
            </div>
            <form action="#">
                <label for="read">Read: </label>
                <input type="checkbox" name="read" id="read" ${book.read ? "checked" : ""}>
            </form>
            <span class="delete material-symbols-outlined">
                close
            </span>`

         books.appendChild(newBook)

    })

        if(myLibrary.length > 0) {
            const deleteBtns = document.querySelectorAll(".delete")
            deleteBtns.forEach((deleteBtn => {
                deleteBtn.addEventListener("click", (e) => {
                    let index = e.target.parentNode.dataset.index;
                    myLibrary.splice(index, 1)
                    displayLibrary()
                })
            }))
            
        }

        const readCheckboxBtns = document.querySelectorAll("#read");
        readCheckboxBtns.forEach(readCheckboxBtn => {
            readCheckboxBtn.addEventListener("click", (e) => {
                let index = e.target.parentNode.parentNode.dataset.index
                myLibrary[index].toggleRead();
            })
        })
}

displayLibrary()

const newBookBtn = document.querySelector(".newBookBtn");
newBookBtn.addEventListener("click", () => {
    const newBookForm = document.querySelector(".new-book-form");
    newBookForm.classList.toggle("inactive");
    // Form appears

    const addBookBtn = document.querySelector(".add");

    addBookBtn.addEventListener("click", (e) => {
        e.preventDefault()
        const titleInput = document.querySelector("#title")
        const authorInput = document.querySelector("#author");
        const pagesInput = document.querySelector("#pages");

        if(!titleInput.checkValidity()) {
            titleInput.setCustomValidity("Please fill in an Title..")
            titleInput.reportValidity();
            return;
        } 
        titleInput.setCustomValidity("")


        const readInput = document.querySelector("#read").checked;
        
        addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput)
        displayLibrary()
    })
        
})
