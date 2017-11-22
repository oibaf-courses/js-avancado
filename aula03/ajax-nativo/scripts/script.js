'use strict';

var consts =  {
    ulrs: {
        base: "http://demo9792543.mockable.io",
        usuario: "http://demo9792543.mockable.io/usuario"
    },
    elements: {
        placeholder: "#placeholder"
    },
    css: {
        okClass: "alert alert-secondary",
        errorClass: "alert alert-danger",
    }
}

function Request($method, $URL, $callbackSuccess, $callbackFailure) {
    var xhttp;
    if(window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest()
    } else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP")
    }

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if(this.status > 199 && this.status < 300) {
                $callbackSuccess(this.response)
            }
            else {
                $callbackFailure(this.response, this.status)
            }
        }
    }
    xhttp.open($method, $URL)
    xhttp.send();
}

function listaUsuarios(usuariosJSONString) {
    /*
    Sample data
    [
        {
            "name": "Cross, Laith O.",
            "email": "dictum.ultricies.ligula@iaculisenimsit.net",
            "phone": "74707-4867"
        },
    ]
    */
    var usuarios = JSON.parse(usuariosJSONString)
    if(usuarios instanceof Array) {
        var ulElement = document.createElement("ul")
        usuarios.forEach(element => {
            var liElement = document.createElement("li")
            liElement.innerHTML = [element.name, element.email, element.phone].join(" :: ")
            ulElement.appendChild(liElement)
        });
        $(consts.elements.placeholder).empty()
            .removeClass(consts.css.errorClass)
            .addClass(consts.css.okClass)
            .append(ulElement)
    }
    else {
        throw {
            value : 15,
            message : "Parâmetro informado não é um array"
        }
    }
}

function informaErro(erroMsg, erroCodigo) {
    var mensagem
    switch(erroCodigo) {
        case 404:
            mensagem = "Ops, parece que não existe o recurso que eu busquei :P"
            break
        case 500:
            mensagem = "Ocorreu um erro no servidor. Por favor, tente novamente mais tarde."
            break
        default:
            mensagem = erroMsg
            break
    }
    var alert = document.createElement("div")
    $(alert).addClass(consts.css.errorClass)
        .html(mensagem)
    $(consts.elements.placeholder).empty()
        .append(alert)
}

$(document).ready(function () {
    Request("GET", consts.ulrs.usuario, listaUsuarios, informaErro);
})
