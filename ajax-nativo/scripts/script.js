'use strict';

var consts =  {
    base: "http://demo9792543.mockable.io"
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
