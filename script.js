"use strict";

class Book {
    isDisplayed = false;
    pictureNumber = Helpers.getRandomNumber();
    id = crypto.randomUUID();

    constructor (title, author, pages, readStatus) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
    }
    changeReadStatus () {
        this.readStatus = !this.readStatus;
    }
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

class AppState {
    static myLibrary = [];

    rehydrateBook(appState) {
        appState.forEach((element) => {
            let book = new Book(element.title, element.author, element.pages, element.readStatus);
            book.id = element.id;
            book.pictureNumber = element.pictureNumber;
            addBookToLibrary(book);
        });
    }

    removeBookFromArray () {
        for (let index = 0; index < myLibrary.length; index++) {
            if (myLibrary[index].id === idToDelete) myLibrary.splice(index, 1);
        }
    }

    saveState() {
        localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    }

    loadState() {
        let storedState = localStorage.getItem("myLibrary");
        return storedState ? JSON.parse(storedState) : null;
    }
}

class ScreenController {
    static addBookButton = document.querySelector(".addbookbutton");
    static modal = document.querySelector(".modal");
    static form = document.querySelector("form");
    static cancelButton = document.querySelector(".cancel");
    static title = document.querySelector("#title");
    static author = document.querySelector("#author");
    static pages = document.querySelector("#pages");
    static readStatus = document.querySelector("#readstatus");
    static bookGUI = document.querySelector(".bookgui");

    static bindEvents () {
        addBookButton.addEventListener("pointerup", modal.showModal);
        form.addEventListener("submit", submitData);
        window.addEventListener("contextmenu", (event) => {
            event.preventDefault();
        });
        cancelButton.addEventListener("pointerup", () => {
            form.reset();
            modal.close();
        });
    }

    submitData (event) {
        event.preventDefault();
        createBook();
        modal.close();
        form.reset();
    }

    addBookToLibrary(book) {
        if (!myLibrary.includes(book)) { 
            myLibrary.push(book);
            saveState(appState);
        }
        runBibliometrics();
        buildBookInDOM(book);
    }

    setTextContent (book) {
        const divList = document.getElementsByTagName("div");
        [...divList].forEach((div) => {
            if (div.dataset.id === book.id) {
                [...div.children].forEach(child => {
                    if (child.matches("div")) child.remove();
                });
            }
            const textDiv = document.createElement("div");
            textDiv.textContent = `Title: ${book.title}\n\nAuthor: ${book.author}\n\nPages: ${book.pages}\n\nFinished: ${book.readStatus === true ? "Yes" : "No"}`;
            bookDiv.appendChild(textDiv);
        });
        saveState(appState); // keep here ?
    }

    addButtons (book, bookDiv) {
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

    chooseBookBackground(book, bookDiv) {
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

    buildBookInDOM(book) {
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
    }

    removeBook(event) { // move whole function to SC
        const idToDelete = event.target.parentElement.dataset.id;
        for (let index = 0; index < myLibrary.length; index++) {
            if (myLibrary[index].id === idToDelete) myLibrary.splice(index, 1);
        } // loop is in AppState
        saveState(appState);
        event.target.parentElement.remove();
        // runBibliometrics(); move to SC
    }

    runBibliometrics() {
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
}

let appState = loadState() || [];
rehydrateBook(appState);
