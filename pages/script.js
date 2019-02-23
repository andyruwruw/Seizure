var colors = ["FF0000", "0000FF", "33FF33", "9933FF", "FFFF00", "FF00FF", "00FFFF", "FF8000"];
var texts = ["Teehee", "Bumfuzzle", "Cattywampus", "Gardyloo", "Taradiddle", "Snickersnee", "Widdershins", "Collywobbles", 
              "Gubbins", "Abiblio", "Bumbershoot", "Lollygag", "Flibber", "Tigibbet", "Malarkey", "Sialoquent", "Wabbit", 
              "Snollygoster", "Bibble", "Quire", "Ratoon"];
var ahhTexts = ["AH", "AHH", "AHHH", "AHHHH", "AHHHHH", "AHHHHHH", "AHHHHHHH", "AH", "AHH", "AHHH", "AHHHH", "AHHHHH", "AHHHHHH", "AH", "AHH", "AHHH", "AHHHH", 
"AHHHHH", "AH", "AHH", ]
var bwcolors = ["FFFFFF", "000000"];
var newText;
var newColor = "FF0000";
var textColor = "0000FF";
var i = 0;
var j = 0;

var mode = 0;

var speed = 0;
var automatic = 0;

var mousePos;
var oldMouse;
var mouseDifference = {x: 0, y: 0};

var on = 0;

document.onmousemove = handleMouseMove;

function handleMouseMove(event) {
    on = 1;
    if (!automatic)
    {
        var dot, eventDoc, doc, body, pageX, pageY;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
                (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
                (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
                (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }
        oldMouse = mousePos;
        mousePos = {
            x: event.pageX,
            y: event.pageY
        };
        mouseDifference = {x: Math.abs(mousePos.x - oldMouse.x), y: Math.abs(mousePos.y - oldMouse.y)}
        i += 1;
        console.log((mouseDifference.x + mouseDifference.y * (1.0 / 100.0)) * 1);
        j += 1;
    }
}

function automaticButton ()
{
    if (automatic == 1)
    {
        automatic = 0;
    }
    else
    {
        automatic = 1;
    }
    speed = 5;
}

function modeButton ()
{
    mode += 1;
    if (mode > 4)
    {
        mode = 0;
    }

    if (mode == 0)
    {
        var element = document.getElementById("text");
        element.style.paddingTop = "10%";
        element.classList.remove("hidden");
    }
    else if (mode == 1)
    {
        var element = document.getElementById("text");
        element.style.paddingTop = "0%";
        var element = document.getElementById("text2");
        element.classList.remove("hidden");
        var element = document.getElementById("text3");
        element.classList.remove("hidden");
    }
    else if (mode == 2)
    {
        var element = document.getElementById("text");
        element.classList.add("hidden");
        var element = document.getElementById("text2");
        element.classList.add("hidden");
        var element = document.getElementById("text3");
        element.classList.add("hidden");
    }
    else if (mode == 3)
    {
        speed = 1;
    }
    else if (mode == 4)
    {
        speed = 5;
        var element = document.getElementById("text");
        element.style.paddingTop = "10%";
        element.classList.remove("hidden");
    }
}

function changeColor ()
{
    if (mode != 3)
    {
        newColor = colors[i % 8];
        textColor = colors[(i + 1) % 8];
    }
    else 
    {
        newColor = bwcolors[i % 2];
    }
}

function changeText ()
{
    if (mode == 4)
    {
        newText = ahhTexts[(Math.floor(j) % 19)];
    }
    else
    {
        newText = texts[(Math.floor(j) % 21)];
    }

}

function iterateI ()
{
    if (automatic)
    {
            i += 1;
            if (mode == 5)
            {
                j += .05;
            }
            else
            {
                j += .5;
            }
    }
    console.log(j + " " + i);
}

function refreshPage ()
{
    if (on)
    {
        if (automatic)
        {
            iterateI();
        }
    
        changeColor();
        document.getElementById("background").style.backgroundColor = ("#" + newColor);
        document.getElementById("text").style.color = ("#" + textColor);
        document.getElementById("text2").style.color = ("#" + textColor);
        document.getElementById("text3").style.color = ("#" + textColor);
    
        document.getElementById("button").style.backgroundColor = ("#" + textColor);
        document.getElementById("button").style.color = ("#" + newColor);
    
        document.getElementById("secondbutton").style.backgroundColor = ("#" + textColor);
        document.getElementById("secondbutton").style.color = ("#" + newColor);
    
        changeText();
        document.getElementById("text").innerHTML = newText;
        document.getElementById("text2").innerHTML = texts[(Math.floor(j) + 1) % 21];
        document.getElementById("text3").innerHTML = texts[(Math.floor(j) + 2) % 21];
    }
}


setInterval(refreshPage, speed);