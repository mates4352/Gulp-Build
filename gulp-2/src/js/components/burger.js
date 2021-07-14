const burger = document.querySelector('.burger')
const body = document.querySelector('.body')
const menu = document.querySelector('.menu')

menu.setAttribute('aria-hidden', 'false')

burger.addEventListener('click', () => {

   burger.classList.toggle('active')
   menu.classList.toggle('active')

   if (burger.classList.contains('active')) {

      body.style.overflowY = "hidden"
      menu.setAttribute('aria-hidden', 'false')

   } else {

      body.style.overflowY = "auto"
      menu.setAttribute('aria-hidden', 'true')

   }

})
