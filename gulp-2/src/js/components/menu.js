const headerBlock = document.querySelector('.header__block')
const headerNav = document.querySelector('.header__nav')
const menu = document.querySelector('.menu')


function adaptivMenu(innerWidth, breakpoint) {

   if (innerWidth < breakpoint) {

      menu.append(headerNav)

   } else {

      headerBlock.append(headerNav)

   }

}

adaptivMenu(window.innerWidth, 992)

window.addEventListener('resize', () => {

   adaptivMenu(window.innerWidth, 992)

})
