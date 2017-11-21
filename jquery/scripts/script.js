'use strict';

var elements = {
    chatlog: "#chatlog",
    messageInput: "#mensagem",
    sendButton: "#enviar"
}

var keybindings = {
    sendMessage: 13
}

function sendMessage() {
    var date = new Date()
    $(elements.chatlog).append(
        '[' + date.toISOString() + ']&nbsp;&nbsp;&nbsp;' + $(elements.messageInput).val() + "<br>"
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
