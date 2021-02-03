//* ------------------------------- Vars

const paletteContainer = document.querySelector('.palette-container').children;
const floatingButton = document.querySelector('.floating-button');
let colorContainers = [];
const uiContainer = document.querySelector('.ui-messages');


//* ------------------------------- Event listeners

floatingButton.addEventListener('click', changeAllColors);
document.addEventListener('DOMContentLoaded', colorsInit);


//* ------------------------------- Functions

function colorsInit()
{
     for(let i = 0; i < paletteContainer.length; i++)
     {
          paletteContainer[i].children[1].children[0].addEventListener('click', changeIndividualColor);
          paletteContainer[i].children[0].addEventListener('click', lockColor);
          const containerProps = {
               color: paletteContainer[i].children[2].children[0].textContent,
               locked: false,
               id: colorContainers.length
          }
          colorContainers.push(containerProps);
          paletteContainer[i].setAttribute('data-id', containerProps.id)
     }
}

function getRandomColor()
{
     let color = Math.floor(Math.random() * 16777215).toString(16);
     return color.length < 6 ? getRandomColor() : color;
}

function changeAllColors()
{
     for(let i = 0; i < paletteContainer.length; i++)
     {
          if(colorContainers[i].locked === false)
          {
               const color = getRandomColor();
               paletteContainer[i].style.backgroundColor = `#${color}`;
               paletteContainer[i].children[2].children[0].textContent = `#${color}`;
          }
     }
}

function changeIndividualColor(e)
{
     //! Usé el metodo closest y una clase para encontrar para arriba en el DOM tree el elemento mas cercano coincidente
     const dataId = e.target.closest('.color-container').getAttribute('data-id');
     if(colorContainers[dataId].locked !== true)
     {
          if(dataId !== null)
          {
               const dataId = e.target.closest('.color-container').getAttribute('data-id');
               const color = getRandomColor();
               paletteContainer[dataId].style.backgroundColor = `#${color}`;
               paletteContainer[dataId].children[2].children[0].textContent = `#${color}`;
          }
          return;
     }
}

function lockColor(e)
{
     let dataId = e.target.closest('.color-container').getAttribute('data-id');
     const svgIcon = paletteContainer[dataId].children[0];
     if(colorContainers[dataId].locked === false)
     {
          svgIcon.innerHTML = `<svg class="lock-button" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>`
          colorContainers[dataId].locked = true;
          svgIcon.addEventListener('click', unlockColor);
          svgIcon.removeEventListener('click',lockColor)
     }
}

function unlockColor(e)
{
     let dataId = e.target.closest('.color-container').getAttribute('data-id');
     const svgIcon = paletteContainer[dataId].children[0];
     if(colorContainers[dataId].locked === true)
     {
          svgIcon.innerHTML = `<svg class="unlock-button" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
          </svg>`
          colorContainers[dataId].locked = false;
          svgIcon.addEventListener('click', lockColor);
          svgIcon.removeEventListener('click',unlockColor)
     }
}
