const accordion = (nameElement, nameElementId) => {
   const button = document.querySelectorAll(`.${nameElement}`);

   //* Массив элементов, пробигаем циклом и вешаем событие *//
   button.forEach((element) => {
      element.addEventListener("click", (event) => {
         //* Переменные примают значение параметров полученные через аргументы *//
         const id = nameElementId;
         const nextElement = event.target.nextElementSibling;

         //* Убераем у каждого элемента массива кроме нажатого атрибуты id,style *//
         button.forEach((e) => {
            if (!(nextElement === e.nextElementSibling)) {

               e.nextElementSibling.removeAttribute(`id`);
               e.nextElementSibling.removeAttribute("style");

            }
         });
         //* Удаляет или добавляет атрибут id,style в зависемости от условия *//
         if (nextElement.getAttribute("id") === id) {

            nextElement.removeAttribute("id", id);
            nextElement.removeAttribute("style");
            nextElement.setAttribute("aria-hidden", "true");

         } else {

            nextElement.setAttribute("id", id);
            nextElement.style.height = nextElement.scrollHeight + "px";
            nextElement.setAttribute("aria-hidden", "false");

         }
      });
   });
};

//* Параметр 1 - элемент. Параметр 2 - добавляемый id *//
accordion("accordion__btn", "accordion");
