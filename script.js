"use strict";

class Book {
    isDisplayed = false;
    pictureNumber = Helpers.getRandomNumber();
    id = crypto.randomUUID();

    constructor(title, author, pages, readStatus) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
    }
    changeReadStatus() {
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

    static addBookToLibrary(book) {
        if (!this.myLibrary.includes(book)) { 
            this.myLibrary.push(book);
            this.saveState(appState);
        }
    }

    static rehydrateBook(appState) {
        appState.forEach((element) => {
            let book = new Book(element.title, element.author, element.pages, element.readStatus);
            book.id = element.id;
            book.pictureNumber = element.pictureNumber;
            this.addBookToLibrary(book);
        });
    }

    static removeBookFromLibrary(idToDelete) {
        for (let index = 0; index < this.myLibrary.length; index++) {
            if (this.myLibrary[index].id === idToDelete) this.myLibrary.splice(index, 1);
        }
    }

    static saveState() {
        localStorage.setItem("myLibrary", JSON.stringify(this.myLibrary));
    }

    static loadState() {
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

    static bindEvents() {
        window.addEventListener("contextmenu", (event) => { event.preventDefault() });
        this.addBookButton.addEventListener("pointerup", () => { this.modal.showModal() });
        this.form.addEventListener("submit", (event) => this.submitData(event));
        this.cancelButton.addEventListener("pointerup", () => {
            this.form.reset();
            this.modal.close();
        });
    }

    static createBook() {
        return new Book(this.title.value, this.author.value, this.pages.value, this.readStatus.checked)
    }

    static submitData(event) {
        event.preventDefault();
        let book = this.createBook()
        AppState.addBookToLibrary(book);
        this.buildBookInDOM(book);
        this.modal.close();
        this.form.reset();
    }

    static buildBookInDOM(book) {
        if (!book.isDisplayed) {
            book.isDisplayed = true;
            const bookDiv = document.createElement("div");
            bookDiv.classList.add("book");
            bookDiv.dataset.id = book.id;
            this.setTextContent(book, bookDiv);
            this.addButtons(book, bookDiv);
            this.chooseBookBackground(book, bookDiv);
            this.bookGUI.appendChild(bookDiv);
        }
    }

    // static setTextContent(book, bookDiv) {
    //     const divList = document.getElementsByTagName("div");
    //     [...divList].forEach((div) => {
    //         if (div.dataset.id === book.id) {
    //             [...div.children].forEach(child => {
    //                 if (child.matches("div")) child.remove();
    //             });
    //         }
    //         const textDiv = document.createElement("div");
    //         textDiv.textContent = `Title: ${book.title}\n\nAuthor: ${book.author}\n\nPages: ${book.pages}\n\nFinished: ${book.readStatus === true ? "Yes" : "No"}`;
    //         bookDiv.appendChild(textDiv);
    //     });
    //     saveState(appState); // keep here ?
    // }

    static setTextContent(book, bookDiv) { //rename to renderTextOnBooks ?
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
        AppState.saveState(appState); // keep here ?
    }

    static addButtons(book, bookDiv) {
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove");
        removeButton.addEventListener("pointerup", this.removeBook);
        const changeReadStatusButton = document.createElement("button");
        changeReadStatusButton.textContent = "Change";
        changeReadStatusButton.classList.add("change");
        changeReadStatusButton.addEventListener("pointerup", () => book.changeReadStatus());
        bookDiv.appendChild(removeButton);
        bookDiv.appendChild(changeReadStatusButton);
    }

    static chooseBookBackground(book, bookDiv) {
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

    static removeBook(event) {
        AppState.removeBookFromLibrary(event.target.parentElement.dataset.id);
        AppState.saveState(appState);
        event.target.parentElement.remove();
    }

    static runBibliometrics() {
        let totalBooks = myLibrary.length;
        let completedBooks = 0;
        let totalPages = 0;
        let pagesRead = 0;
        AppState.myLibrary.forEach(book => {
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

ScreenController.bindEvents();

let appState = AppState.loadState() || [];
AppState.rehydrateBook(appState);
