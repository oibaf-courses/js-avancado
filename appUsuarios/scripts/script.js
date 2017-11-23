/* jshint strict: true */
/* jshint -W097: false */
/* jshint esversion: 6 */
// classes reference:
// ==> https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Classes
"use strict";

const consts = {
    elements: {
        formulario: "formulario"
    }
};
var window;
var document;
var console;
var app = new App();

window.onload = function() {
    var formulario = document.getElementById(consts.elements.formulario);
    formulario.onsubmit = function(event) {
        if (formulario.reportValidity()) {
            var usuario = new Usuario(
                formulario.children.nome.value,
                formulario.children.email.value,
                formulario.children.tel.value
            );
            app.addUsuario(usuario);
            console.log(app.usuarios);
        }
        else {
            window.alert("Há campos inválidos!");
        }
        return false;
    };
};

/*
*/

class Usuario {
    constructor() {
        this.nome = arguments[0] || null;
        this.email = arguments[1] || null;
        this.telefone = arguments[2] || null;
    }
}

function App() {
    this.usuarios = [];
}

App.prototype.addUsuario = function($usuario) {
    if($usuario instanceof Usuario) {
        this.usuarios.push($usuario);
    }
};