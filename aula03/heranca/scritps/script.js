"use strict";

function Eletrodomestico() {
    var self = this
    this.ligado = false
    this.ligar = function() {
        self.ligado = true
        return self
    }
    this.desligar = function() {
        self.ligado = false
        return self
    }
}

function Ventilador() {
    var self = this
    this.velocidade = arguments[0] || 0
}

Ventilador.prototype = new Eletrodomestico()
