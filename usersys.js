export default class User {
    static id = 0;
    #id = 0;

    constructor() {
        this.#id = User.id;
        User.id += 1;
    }

    getId() {
        return this.#id;
    }

    static userCount() {
        return User.id;
    }
}

let user1 = new User();
console.log(user1.getId());
let user2 = new User();
console.log(user2.getId());

console.log(User.userCount());
