import { add, sub } from './mymath.js';
import User from './usersys.js';

class Car {
    constructor(color) {
        if (color) this.color = color;
    }

    drive() {
        console.log(`Drive ${this.color} car`);
    }
}

let car1 = new Car("yellow");
let car2 = new Car();

car1.drive();
car2.drive();






/* Book class */
class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
        this.available = true;
    }

    /* Take book */
    borrowBook() {
        if (this.available) { // boolean true/false
            this.available = false;
            return `${this.title} given`;
        } else {
            return `${this.title} borrowed`;
        }
    }

    returnBook() {
        if (this.available) {
            return `${this.title} already exist`;
        } else {
            this.available = true;
            return `${this.title} returned`;
        }
    }
}

/* Library class */
class Library {
    #books;

    constructor() {
        this.#books = [];
    }

    addBook(book) {
        this.#books.push(book);
        return `${book.title} added`;
    }

    checkAvailable(title) {
        const book = this.#books.find(b => b.title === title);
        if (book) {
            return book.available
                ? `${book} available`
                : `${book} not available`;
        } else {
            return `${book} not found`;
        }
    }

    borrowBook(title) {
        const book = this.#books.find(b => b.title === title);
        return book ? book.borrowBook() : `"${title}" not found`;
    }

    returnBook(title) {
        const book = this.#books.find(b => b.title === title);
        this.#hidden()
        return book ? book.returnBook() : `"${title}" not found`;
    }

    #hidden() {
        console.log(`Credit card 1234 1234 1234 1234`)
    }

    // setter
    setBooks(books) {
        this.#books = books;
    }

    // getter
    getBooks() {
        return this.#books;
    }
}

const library = new Library();

console.log(library.addBook(new Book("Гаррі Поттер", "Дж. К. Ролінг")));
console.log(library.addBook(new Book("Володар Перснів", "Дж. Р. Р. Толкін")));

console.log(library.checkAvailable("Гаррі Поттер"));
console.log(library.borrowBook("Гаррі Поттер"));
console.log(library.checkAvailable("Гаррі Поттер"));
console.log(library.borrowBook("Гаррі Поттер"));
console.log(library.returnBook("Гаррі Поттер"));
console.log(library.checkAvailable("Гаррі Поттер"));

//library.books = [];
console.log(library);


class Quantum {
    static num = 0;

    constructor() {
        Quantum.num += 1;
        console.log('Created ' + Quantum.num + ' quantums');
    }

    static reset() {
        Quantum.num = 0;
    }
}

new Quantum()
Quantum.num = 100
new Quantum()
Quantum.reset()
new Quantum()
new Quantum()
new Quantum()


let user1 = new User();
console.log(user1.getId());
let user2 = new User();
console.log(user2.getId());

console.log(User.userCount());