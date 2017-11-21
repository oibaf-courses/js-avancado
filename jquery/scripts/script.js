'use strict';

function sendMessage() {
    var date = new Date()
    $("#chatlog").append('[' + date.toISOString() + ']&nbsp;&nbsp;&nbsp;' + $("#mensagem").val()+ "<br>")
    $("#mensagem").val('')
    $("#mensagem").focus()
}

$( document ).ready(function(){
    $("#enviar").click(sendMessage)
    $("#mensagem").keypress(function(e) {
        if (e.keyCode == 13) {
            sendMessage()
        }
    })
})
