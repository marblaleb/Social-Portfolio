gsap.registerPlugin(ScrollTrigger);
let lenis;



const navAnchors= document.querySelectorAll('.nav_item_anchor');
const galleryRows= document.querySelectorAll('.gallery_row');
const goToTop= document.querySelector('.--top')








const initLenis = () => {
    lenis = new Lenis({
      
        smoothWheel: true,
        smoothTouch: true
    })

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    lenis.scrollTo(0, {immediate: true});
    initScrollTrigger();
}

const initScrollTrigger = () => {

    const hero= document.querySelector('.hero');
    console.log(hero);
    const images=document.querySelectorAll('.gallery_row_media_image');

    gsap.utils.toArray(images).forEach((image)=>{
        gsap.set(image, {scale:1.2});
        const imageRect=image.getBoundingClientRect();
        const heightDifference=imageRect.height - image.parentElement.offsetHeight;

        gsap.fromTo(
            image, {
            y: -heightDifference,

        },
        {
            scrollTrigger: {
                trigger: image,
                start: 'top center+=30%',
                end: 'bottom+=10% top',
                scrub:true
            },

            y: heightDifference,
            ease: 'none',
        }
    );

    const tlHero= gsap.timeline({
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'center top',
                scrub: true,
               
            },
        });
        tlHero.to(hero, {
            autoAlpha: 0,
            
        });
    });

   






};

const addEventListener = () =>{
    navAnchors.forEach((anchor, index)=>{
        anchor.addEventListener('click', (e)=>{
            e.preventDefault();

            lenis.scrollTo(galleryRows[index], {
                offset: -20,
                lerp: 0.1,
            });
        });
    });

    goToTop.addEventListener('click', (e)=>{
        e.preventDefault();

        lenis.scrollTo(0, {lerp: 0.05})
    })
}





window.onload= () => {


    initLenis();
    addEventListener();
    




}