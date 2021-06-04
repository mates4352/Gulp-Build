

const btn = document.querySelector('.btn')
const samp = document.querySelector('.samp')
console.log(samp);

btn.addEventListener('click', () => {
   samp.classList.toggle('acitve')
})
