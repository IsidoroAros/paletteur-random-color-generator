//* ------------------------------- Vars

const paletteContainer = document.querySelector('.palette-container').children;
const floatingButton = document.querySelector('.floating-button');
let colorContainers = [];

//* ------------------------------- Event listeners

floatingButton.addEventListener('click', changeAllColors);
document.addEventListener('DOMContentLoaded', colorsInit);


//* ------------------------------- Functions

function colorsInit()
{
     for(let i = 0; i < paletteContainer.length; i++)
     {
          paletteContainer[i].children[1].children[0].addEventListener('click', changeIndividualColor);
          const containerProps = {
               color: paletteContainer[i].children[2].children[0].textContent,
               locked: false,
               id: colorContainers.length
          }
          colorContainers.push(containerProps);
          paletteContainer[i].setAttribute('data-id', containerProps.id)
     }
}

console.log(colorContainers)

function getRandomColor()
{
     let color = Math.floor(Math.random() * 16777215).toString(16);
     return color.length < 6 ? getRandomColor() : color;
}

function changeAllColors()
{
     for(let i = 0; i < paletteContainer.length; i++)
     {
          const color = getRandomColor();
          paletteContainer[i].style.backgroundColor = `#${color}`;
          paletteContainer[i].children[2].children[0].textContent = `#${color}`;
     }
}

function changeIndividualColor(e)
{
     //! Usé el metodo closest y una clase para encontrar para arriba en el DOM tree el elemento mas cercano coincidente
     if(e.target.closest('.color-container').getAttribute('data-id') !== null)
     {
          const dataId = e.target.closest('.color-container').getAttribute('data-id');
          const color = getRandomColor();
          paletteContainer[dataId].style.backgroundColor = `#${color}`;
          paletteContainer[dataId].children[2].children[0].textContent = `#${color}`;
     }
}

function lockColor()
{

}
