class Bacteria {
    year = 90;

    constructor() {}
}

class ZigFish extends Bacteria {

    constructor() {
        super();
        this.year += 500; // 590
    }
}

class Monkey extends ZigFish {

    constructor() {
        super();
        this.year += 1000; // 1590
    }
}

class Human extends Monkey {

    constructor() {
        super();
        this.year += 2580; // ???
    }
}

console.log(new Bacteria().year);
console.log(new ZigFish().year);
console.log(new Monkey().year);
console.log(new Human().year);

