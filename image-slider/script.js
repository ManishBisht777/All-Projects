var slides= document.querySelector('.slider-items').children;
var right=document.querySelector('.right');
var left= document.querySelector('.left');

var total=slides.length;
var index=0;

right.onclick=function()
{
    console.log("next")
    next("next");
}

left.onclick=function()
{
    console.log("prev")
    next("prev");
}

function next(direction)
{
    if(direction=="next")
    {
        console.log("ok");
        index++;
        if(index==total)
        {
            index=0;
        }
    }
    else
    {
        if(index==0)
        {
            index=total-1;
        }
        else
        {
            index--;
        }
    }

    for(var i=0; i<slides.length; i++)
    {
        console.log(i);
        slides[i].classList.remove("active");
    }

    slides[index].classList.add("active");
}
