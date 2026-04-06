"use strict";

const myLibrary = [];
const isMobileViewport = window.matchMedia("(max-width: 768px)").matches;



class Book {
    constructor (title, author, pages, readStatus) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
        this.pictureNumber = 0; // change to computed method
        this.id = crypto.randomUUID();
        this.isDisplayed = false;
    }
}

Book.prototype.changeReadStatus = function() {
    this.readStatus = !this.readStatus;
    const divList = document.getElementsByTagName("div");
    [...divList].forEach((div) => {
        if (div.dataset.id === this.id) {
            setTextContent(this, div);
        }
    });
    saveState(appState);
    runBibliometrics();
}

Book.prototype.assignPictureNumber = function() {
    this.pictureNumber = getRandomNumber();
}

class Helpers {
    static #randomNumber = 0;
    static #previousRandomNumber = 0;

    static getRandomNumber() {
        while (this.#previousRandomNumber === this.#randomNumber) {
            this.#randomNumber = Math.floor(Math.random() * 5) + 1;
        }
        this.#previousRandomNumber = this.#randomNumber;
        return this.#randomNumber;
    }
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
    createBook();
    modal.close();
    form.reset();
}
form.addEventListener("submit", submitData);

const cancelButton = document.querySelector(".cancel");
cancelButton.addEventListener("pointerup", () => {
    form.reset();
    modal.close();
});

function createBook() {
    let book = new Book(title.value, author.value, pages.value, readStatus.checked);
    book.assignPictureNumber();
    addBookToLibrary(book);
}

function rehydrateBook(appState) {
    appState.forEach((element) => {
        let book = new Book(element.title, element.author, element.pages, element.readStatus);
        book.id = element.id;
        book.pictureNumber = element.pictureNumber;
        addBookToLibrary(book);
    });
}

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const readStatus = document.querySelector("#readstatus");
function addBookToLibrary(book) {
    if (!myLibrary.includes(book)) { 
        myLibrary.push(book);
        saveState(appState);
    }
    runBibliometrics();
    buildBookInDOM(book);
}

const bookGUI = document.querySelector(".bookgui");
function buildBookInDOM(book) {
        if (!book.isDisplayed) {
            book.isDisplayed = true;
            const bookDiv = document.createElement("div");
            bookDiv.classList.add("book");
            bookDiv.dataset.id = book.id;
            setTextContent(book, bookDiv);
            addButtons(book, bookDiv);
            chooseBookBackground(book, bookDiv);
            bookGUI.appendChild(bookDiv);
        }
};

function setTextContent (book, bookDiv) {
    [...bookDiv.children].forEach(child => {
        if (child.matches("div")) child.remove();
    });
    const textDiv = document.createElement("div");
    textDiv.textContent = `Title: ${book.title}\n\nAuthor: ${book.author}\n\nPages: ${book.pages}\n\nFinished: ${book.readStatus === true ? "Yes" : "No"}`;
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

function removeBook(event) {
    const idToDelete = event.target.parentElement.dataset.id;
    for (let index = 0; index < myLibrary.length; index++) {
        if (myLibrary[index].id === idToDelete) myLibrary.splice(index, 1);
    }
    saveState(appState);
    event.target.parentElement.remove();
    runBibliometrics();
}



function chooseBookBackground(book, bookDiv) {
    bookDiv.style.backgroundSize = "cover";
    bookDiv.style.backgroundColor = "rgba(30, 30, 30, 0.8)";
    switch (book.pictureNumber) {
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
    document.querySelector(".totalbooks").textContent = `Total Books = ${totalBooks}`;
    document.querySelector(".completedbooks").textContent = `Completed Books = ${completedBooks}`;
    document.querySelector(".totalpages").textContent = `Total Pages = ${totalPages}`;
    document.querySelector(".pagesread").textContent = `Pages Read = ${pagesRead}`;
}

window.addEventListener("contextmenu", (event) => {
    event.preventDefault();
})

function saveState() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}
function loadState() {
    let storedState = localStorage.getItem("myLibrary");
    return storedState ? JSON.parse(storedState) : null;
}



let appState = loadState() || [];
rehydrateBook(appState);
