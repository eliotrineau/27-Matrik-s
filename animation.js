const scrollConcours = document.querySelector('#concours');
const scrollEvent = document.querySelector('#event');
const scrollPoles = document.querySelector('#poles');
const scrollTxtPoles = document.querySelector('#txtPoles');
const btnConcours = document.querySelector('#btnConcours');
const president = document.querySelector('#president');
const listeBDE = document.querySelector('#listeBDE');
const btnEvent = document.querySelector('#btnEvent');
const btn27M = document.querySelector('#btn27M');
const btnBDE = document.querySelector('#btnBDE');

listeBDE.style.cursor = 'pointer';
president.style.cursor = 'pointer';
btnConcours.style.cursor = 'pointer';
btnEvent.style.cursor = 'pointer';
btn27M.style.cursor = 'pointer';
btnBDE.style.cursor = 'pointer';

btn27M.addEventListener('click',()=>{
  scrollTxtPoles.scrollIntoView({
    behavior:'smooth'
  });
  Window.scrollBy(0, -30);
});

btnBDE.addEventListener('click',()=>{
  scrollPoles.scrollIntoView({
    behavior:'smooth'
  });
  Window.scrollBy(0, -30);
  
});


btnEvent.addEventListener('click',()=>{
  scrollEvent.scrollIntoView({
    behavior:'smooth'
  });
  Window.scrollBy(0, -100);
  
});

btnConcours.addEventListener('click',()=>{
  scrollConcours.scrollIntoView({
    behavior:'smooth'
  });
  Window.scrollBy(0, -30);
  
});
