'use strict';

var consts =  {
    ulrs: {
        base: "http://demo9792543.mockable.io",
        usuario: "http://demo9792543.mockable.io/usuario"
    },
    elements: {
        placeholder: "#placeholder"
    }
}

function Request($method, $URL, $callbackSuccess) {
    var xhttp;
    if(window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest()
    } else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP")
    }

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status ==200) {
            $callbackSuccess(this.response)
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
        $(consts.elements.placeholder).append(ulElement)
    }
    else {
        throw {
            value : 15,
            message : "Parâmetro informado não é um array"
        }
    }
}

$(document).ready(function () {
    Request("GET", consts.ulrs.usuario, listaUsuarios);
})
