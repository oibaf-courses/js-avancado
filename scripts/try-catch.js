'use strict';


function verificar($a, $b) {
    if ($a > $b) {
        throw {
            code: 1,
            name: 'GreaterThanError',
            message: "ERRO: $a > $b"
        }
    }
}

try {
    verificar(1, 2);
    verificar(2, 1);
    nome = 'Fábio'
} catch (erro) {
    console.error(erro)
    var errorElement = document.getElementById('error')
    error.innerHTML += erro.name + '<br>' + erro.message
}