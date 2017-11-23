/* jshint strict: true */
/* jshint -W097: false */
/* jshint esversion: 6 */
// classes reference:
// ==> https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Classes
"use strict";

const GAME_OPTIONS = {
    axisY: "Y",
    axisX: "X",
    defaultBoardSize: 10,
};

class GameObject {
    constructor() {
        this.posX = arguments[0] || null;
        this.posY = arguments[1] || null;
    }
}

const MovingThing = Base => class extends Base {
    moveLeft() {
        this.posX--;
    }
    moveRight() {
        this.posX++;
    }
    moveUp() {
        this.posY--;
    }
    moveDown() {
        this.posY++;
    }
};

const GameObjectMixin = Base => class extends Base {};

class GameBoard {
    constructor() {
        // X, Y
        this.board = [arguments[0] || GAME_OPTIONS.defaultBoardSize]
            [arguments[1] || GAME_OPTIONS.defaultBoardSize];
        this.objects = [];
    }

    addObject(gameObject) {
        if(!this.detectColision(gameObject)) {
            
        }
    }
    detectColision(gameObject) {
        return this.board[gameObject.posX][gameObject.posY]!=null;
    }
    insertObject(gameObject) {
        this.board[gameObject.posX][gameObject.posY] = gameObject;
        return this;
    }
}

//const HumanoFinal = HumanoFalanteMixado(HumanoFalante(Humano))