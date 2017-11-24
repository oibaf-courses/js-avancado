/* jshint strict: true */
/* jshint -W097: false */
/* jshint esversion: 6 */
// classes reference:
// ==> https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Classes
"use strict";

const consts = {
    elements: {
        formulario: "formulario",
        tabelaUsuarios: "listaDeUsuarios",
    },
    ulrs: {
        base: "http://demo9792543.mockable.io/api/v1/",
        usuario: "http://demo9792543.mockable.io/api/v1/usuario"
    },
};
var window;
var document;
var console;
var XMLHttpRequest;
var ActiveXObject;
var app = new App();

window.onload = function () {
    var formulario = document.getElementById(consts.elements.formulario);
    formulario.onsubmit = function (event) {
        if (formulario.reportValidity()) {
            var usuario = new Usuario(
                formulario.children.nome.value,
                formulario.children.email.value,
                formulario.children.tel.value
            );
            app.addUsuario(usuario);
            console.log(app.usuarios);
        } else {
            window.alert("Há campos inválidos!");
        }
        return false;
    };
    Request("GET", consts.ulrs.usuario, loadUsuariosFromAPI);
    app.showUsuariosTable();
};

function Request($method, $URL, $callbackSuccess, $callbackFailure, $callbackProgress) {
    var xhttp;
    if(window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest()
    } else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP")
    }

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if(this.status > 199 && this.status < 300) {
                $callbackSuccess(this.response);
            }
            else {
                $callbackFailure(this.response, this.status);
            }
        }
    }
    xhttp.onprogress = $callbackProgress;
    xhttp.open($method, $URL);
    xhttp.send();
};

function loadUsuariosFromAPI(usuariosJSONString) {
    app.loadUsuarios(usuariosJSONString);
    app.saveUsuarios();
}

/*
 */

class Usuario {
    constructor() {
        if (arguments[0] && arguments[0] instanceof Object) {
            Object.assign(this, arguments[0]);
        } else {
            this.name = arguments[0] || null;
            this.email = arguments[1] || null;
            this.phone = arguments[2] || null;
        }
    }
}

function App() {
    this.usuarios = [];
}

App.prototype.addUsuario = function ($usuario) {
    var saveToLocalStorage;
    if (arguments[1] == undefined) {
        saveToLocalStorage = true;
    }
    else {
        saveToLocalStorage = arguments[1];
    }
    if ($usuario instanceof Usuario) {
        this.usuarios.push($usuario);
    }
    if (saveToLocalStorage) {
        this.saveUsuarios();
    }
    this.showUsuariosTable();
};

App.prototype.saveUsuarios = function () {
    window.localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
};

App.prototype.loadUsuarios = function () {
    var usuarios = JSON.parse(arguments[0]) || JSON.parse(window.localStorage.getItem('usuarios'));
    usuarios.forEach(usuario => {
        this.addUsuario(new Usuario(usuario), false);
    });
};

App.prototype.showUsuariosTable = function () {
    var filtro = arguments[0] || "";
    filtro = filtro.toLowerCase();
    var tabela = document.getElementById(consts.elements.tabelaUsuarios);
    tabela = tabela.getElementsByTagName('tbody')[0];
    while (tabela.firstChild) {
        tabela.removeChild(tabela.firstChild);
    }
    this.usuarios.forEach(function(usuario) {
        console.log(JSON.stringify(Object.values(usuario)));
        if (JSON.stringify(Object.values(usuario)).toLowerCase().includes(filtro)) {
            var tr = document.createElement('tr');
            var nome = document.createElement('td');
            nome.innerText = usuario.name;
            var email = document.createElement('td');
            email.innerText = usuario.email;
            var telefone = document.createElement('td');
            telefone.innerText = usuario.phone;
            tr.appendChild(nome);
            tr.appendChild(email);
            tr.appendChild(telefone);
            tabela.appendChild(tr);
        }
    });
};