// import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnimation(){
    var tl = gsap.timeline();

    tl.from("#nav",{
        y:'-10',
        opacity:0,
        duration:1.5,
        ease: Expo.easeInOut
    })

    .to(".boundingelem",{
       y:0,
       delay:-2,
       ease: Expo.easeInOut,
       duration:1.5,
       stagger: .2
    })
    .from("#herofooter",{
        y:-10,
        delay:-1,
        opacity:0,
        duration:1.5,
        ease: Expo.easeInOut,
     })
}

//jab mouse move ho tab hum log skew kar paaye aur maximum skew aur minimum skew define kar paaye, jab mouse move ho tab skew ki size badhe, aur ab muse chalne band ho jaaye to skew hata lo

var timeout;

function skew(){
    //define default scale value
    var xscale= 1;
    var yscale= 1;

    var xprev= 0;
    var yprev= 0;

    window.addEventListener("mousemove", function(dets){
       clearTimeout(timeout);//jab mouse chalna band hoga
// jab mouse chalta rahega it will clear the old timeouts

    //    var xdiff= dets.clientX - xprev;
    //    var ydiff= dets.clientY - yprev;
    
    xscale=  gsap.utils.clamp(.6,1.2, dets.clientX - xprev);//xdiff
    yscale= gsap.utils.clamp(.8,1.2, dets.clientY - yprev);//ydiff

        yprev = dets.clientY;
        xprev = dets.clientX;

        circleMouseFollower(xscale, yscale);

        timeout = setTimeout(() => {
            document.querySelector('#minicircle').style.transform =`translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
        }, 100);

    });
}
skew();

function circleMouseFollower(xscale, yscale){
    window.addEventListener('mousemove', function(dets){
       document.querySelector('#minicircle').style.transform =`translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale}`;
    });
    
}
circleMouseFollower();
firstPageAnimation();

//teeno element ko selecgt karo, uske baad teeno par ek mousemove lagao, jab mosemove ho to ye pata karo ki mouse kaha par hain, juska matlab hai mouse ki x and y position pata karo, ab mouse ki x y position ke badle image ko show karo and us image ko move karo, move karte waqt rotate karo, and jaise jaise mouse tez chale waise waise rotation bhi tez ho jaye

document.querySelectorAll('.elem').forEach(function (elem){
    var rotate=0;
    var different=0;

    elem.addEventListener('mouseleave', function(dets){
            gsap.to(elem.querySelector("img"),{
            
                opacity: 0,
                ease: Power3,
            });
       });

   elem.addEventListener('mousemove', function(dets){
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    different = dets.clientX - rotate;
    rotate = dets.clientX;
    
        gsap.to(elem.querySelector("img"),{
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20,20, different * 0.5),
        });
   });
});