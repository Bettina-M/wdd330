export async function loadHeaderFooter(){
     const headerTemp = await fetch("/components/header.html").then((res) => res.text());
     const footerTemp = await fetch("/components/footer.html").then((res) =>res.text());

    document.querySelector(".main-header").innerHTML = headerTemp;
    document.querySelector(".main-footer").innerHTML = footerTemp;

    menuToggle();
}

function menuToggle(){
    const menuBtn = document.querySelector("#menu-btn");
    const menu = document.querySelector("#menu");
    const nav = document.querySelector("nav");

    menuBtn.addEventListener('click', ()=>{
        nav.classList.toggle("open");
        menu.classList.toggle("open");
        menuBtn.classList.toggle("open");
    })

}