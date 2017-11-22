'use strict';

var termSeparator = '&nbsp;&nbsp;&nbsp;'

var elements = {
    chatlog: "#chatlog",
    messageInput: "#mensagem",
    sendButton: "#enviar"
}

var keybindings = {
    sendMessage: 13
}

function isoDateForLog() {
    var date = new Date()
    return '[' + date.toISOString() + ']'
}

function sendMessage() {
    
    $(elements.chatlog).append(
        isoDateForLog() + termSeparator + $(elements.messageInput).val() + "<br>"
    )
    $(elements.messageInput).val('').focus()
}

$(document).ready(function () {
    $(elements.sendButton).click(sendMessage)
    $(elements.messageInput).keypress(function (e) {
        if (e.keyCode == keybindings.sendMessage) {
            sendMessage()
        }
    })
})
