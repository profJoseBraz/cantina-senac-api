"use strict";
class Category {
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
    }
    getId() {
        return this.id;
    }
    setId(value) {
        this.id = value;
    }
    getNome() {
        return this.nome;
    }
    setNome(value) {
        this.nome = value;
    }
}
