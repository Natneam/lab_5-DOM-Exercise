/*  
Here is the exercise on working on the remaining bom method 

Location , Navigator , screen , Window 

Follow the Instruction on the comments 

1. Declare the UI Variables for selecting on the elements 
2. Use the innerHTML property to display the result on each element 
3. The Text  of the elements will lead you what bom information is required 

Adding Extra is Possible if you want to explore more ...

Good Luck !!! 
*/




// Define UI Variables  here 
let nodes = document.getElementsByClassName('collection-item')

for (let index = 0; index < nodes.length; index++) {
    let innerText = (nodes[index].childNodes[0].textContent);
    if (innerText == 'Href'){
        nodes[index].childNodes[1].innerHTML = window.location.href
    }
    else if (innerText == 'Protocol'){
        nodes[index].childNodes[1].innerHTML = window.location.protocol
    }
    else if (innerText == 'Host'){
        nodes[index].childNodes[1].innerHTML = window.location.host
    }
    else if (innerText == 'Port'){
        nodes[index].childNodes[1].innerHTML = window.location.port
    }
    else if (innerText == 'Hostname'){
        nodes[index].childNodes[1].innerHTML = window.location.hostname
    }
    else if (innerText == 'Appname'){
        nodes[index].childNodes[1].innerHTML = window.navigator.appName
    }
    else if (innerText == 'Appversion'){
        nodes[index].childNodes[1].innerHTML = window.navigator.appVersion
    }
    else if (innerText == 'Platform'){
        nodes[index].childNodes[1].innerHTML = window.navigator.platform
    }
    else if (innerText == 'Language'){
        nodes[index].childNodes[1].innerHTML = window.navigator.language
    }
    else if (innerText == 'CookieEnabled'){
        nodes[index].childNodes[1].innerHTML = window.navigator.cookieEnabled
    }
    else if (innerText == 'Height'){
        nodes[index].childNodes[1].innerHTML = window.screen.height
    }
    else if (innerText == 'Width'){
        nodes[index].childNodes[1].innerHTML = window.screen.width
    }
    else if (innerText == 'PixelDepth'){
        nodes[index].childNodes[1].innerHTML = window.screen.pixelDepth
    }
    else if (innerText == 'Length'){
        nodes[index].childNodes[1].innerHTML = window.history.length
    }
    else if (innerText == 'State'){
        nodes[index].childNodes[1].innerHTML = window.history.state
    }
}








// Display the BOM Information on the innerHTML of the elements