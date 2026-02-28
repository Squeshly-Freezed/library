const myLibrary = [];
const isMobileViewport = window.matchMedia("(max-width: 768px)").matches;

function Book(title, author, pages, readStatus) {
    if (!new.target) {
        throw Error("You must use 'new' keyword when instantializing object");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.id = crypto.randomUUID();
    this.isDisplayed = false;
}

Book.prototype.changeReadStatus = function() {
    this.readStatus = !this.readStatus;
    const divList = document.getElementsByTagName("div");
    [...divList].forEach((div) => {
        if (div.dataset.id === this.id) {
            setTextContent(this, div);
        }
    });
    runBibliometrics();
}



const addBookButton = document.querySelector(".addbookbutton");
const modal = document.querySelector(".modal");
function showModal() {
    !isMobileViewport ? modal.showModal() : setTimeout( () => {
        modal.showModal();
    }, 750);
}
addBookButton.addEventListener("pointerup", showModal);

const form = document.querySelector("form");
function submitData (event) {
    event.preventDefault();
    addBookToLibrary();
    modal.close();
    form.reset();
}
form.addEventListener("submit", submitData);

const cancelButton = document.querySelector(".cancel");
cancelButton.addEventListener("pointerup", () => {
    form.reset();
    modal.close();
});



const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const readStatus = document.querySelector("#readstatus");
function addBookToLibrary() {
    let book = new Book(title.value, author.value, pages.value, readStatus.checked);
    myLibrary.push(book);
    runBibliometrics();
    displayBook();
}



const bookGUI = document.querySelector(".bookgui");
const book = document.querySelector(".book");
function displayBook() {
    myLibrary.forEach((book) => {
        if (!book.isDisplayed) {
            book.isDisplayed = true;
            const bookDiv = document.createElement("div");
            bookDiv.classList.add("book");
            bookDiv.dataset.id = book.id;
            setTextContent(book, bookDiv);
            addButtons(book, bookDiv);
            chooseRandomBookBackground(bookDiv);
            bookGUI.appendChild(bookDiv);
        }
    });
};

function setTextContent (book, bookDiv) {
    [...bookDiv.children].forEach(child => {
        if (child.matches("div")) child.remove();
    });
    const textDiv = document.createElement("div");
    textDiv.textContent = `Title: ${book.title}\n\nAuthor: ${book.author}\n\nPages: ${book.pages}\n\nFinished: ${readableBookReadStatus(book.readStatus)}`;
    bookDiv.appendChild(textDiv);
}

function addButtons (book, bookDiv) {
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.classList.add("remove");
            removeButton.addEventListener("pointerup", removeBook);
            const changeReadStatusButton = document.createElement("button");
            changeReadStatusButton.textContent = "Change";
            changeReadStatusButton.classList.add("change");
            changeReadStatusButton.addEventListener("pointerup", () => book.changeReadStatus());
            bookDiv.appendChild(removeButton);
            bookDiv.appendChild(changeReadStatusButton);
}

function readableBookReadStatus(bookReadStatus) {
    return bookReadStatus ? "Yes" : "No";
}

function removeBook(event) {
    const idToDelete = event.target.parentElement.dataset.id;
    for (let index = 0; index < myLibrary.length; index++) {
        if (myLibrary[index].id === idToDelete) myLibrary.splice(index, 1);
    }
    event.target.parentElement.remove();
    runBibliometrics();
}

function chooseRandomBookBackground(bookDiv) {
    let randomNumber = Math.floor(Math.random() * 5) + 1;
    bookDiv.style.backgroundSize = "cover";
    bookDiv.style.backgroundColor = "rgba(30, 30, 30, 0.8)";
    switch (randomNumber) {
        case 1:
            bookDiv.style.backgroundImage = ("url('./img/redbooktransparent.png')");
            break;
        case 2:
            bookDiv.style.backgroundImage = ("url('./img/purplebooktransparent.png')");
            break;
        case 3:
            bookDiv.style.backgroundImage = ("url('./img/keybooktransparent.png')");
            break;
        case 4:
            bookDiv.style.backgroundImage = ("url('./img/greenbooktransparent.png')");
            break;
        case 5:
            bookDiv.style.backgroundImage = ("url('./img/blackbooktransparent.png')");
            break;
    }
}

function runBibliometrics() {
    let totalBooks = myLibrary.length;
    let completedBooks = 0;
    let totalPages = 0;
    let pagesRead = 0;
    myLibrary.forEach(book => {
        totalPages += parseInt(book.pages);
        if (book.readStatus) {
            completedBooks++;
            pagesRead += parseInt(book.pages);
        }
    });
    console.log(totalBooks, completedBooks, totalPages, pagesRead);
}