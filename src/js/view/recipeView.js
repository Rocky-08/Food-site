import View from './View.js';

import icons from 'url:../../img/icons.svg';  // give the location address

import {Fraction} from 'fractional';  // destructing




class RecipeView extends View {
    _parentElement = document.querySelector('.recipe');
    _errorMessage = 'We could not find the recipe. Please try again!!';

    
    
        
        addHandler(handler)
       {
         
        window.addEventListener('hashchange' , handler)
        window.addEventListener('load' , handler);   // because when we copy the address then it not load the data so to loading we use 'load'
       }
      
       
      addHandlerUpdateServings(handler)
      {
         this._parentElement.addEventListener('click',function(e)
         {
          /*  e.preventDefault(); */
           let btn = e.target.closest('.btn--update-servings')
           if(!btn)
           {
             return;
           }
           
           console.log(btn);
           
           let serving = Number(btn.getAttribute('data-servings'));

           if(serving < 1)
           {
             return;
           }
           
           handler(serving);
          
          })
       }
      
       addHandlerAddBookmark(handler)
       {
         this._parentElement.addEventListener('click',function(e)
         {
           e.preventDefault();

           let btn = e.target.closest('.btn--bookmark');
           if(!btn)
           {
             return;
           }

           handler();
         })
       }

      
           

            
             

    _generateHTML ()
     {
        console.log(this._datas);
/*         this._parentElement.innerHTML = '';
 */        return `
        <figure class="recipe__fig">
        <img src="${this._datas.image}" alt="${this._datas.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._datas.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${this._datas.cookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${this._datas.servings}</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button data-servings= "${this._datas.servings-1}" class="btn--tiny btn--update-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button data-servings= "${this._datas.servings+1}" class="btn--tiny btn--update-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>
       
        <div class="recipe__user-generated ${this._datas.key? '' : 'hidden'}">
        <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
       
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}#icon-bookmark${this._datas.bookMarked == true ? '-fill' : ''}"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">

        
        
        ${this._datas.ingredients.map(ing => {
            return `
            <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${ing.quantity > 0 ? new Fraction (ing.quantity).toString() : ''}</div>
            <div class="recipe__description">
              <span class="recipe__unit">${ing.unit}</span>
              ${ing.description}
            </div>
          </li>

            `
          }).join('')}
          </ul>
       </div>
 
       <div class="recipe__directions">
         <h2 class="heading--2">How to cook it</h2>
         <p class="recipe__directions-text">
           This recipe was carefully designed and tested by
           <span class="recipe__publisher">${this._datas.publisher}</span>. Please check out
           directions at their website.
         </p>
         <a
           class="btn--small recipe__btn"
           href="${this._datas.sourceUrl}"
           target="_blank"
         >
           <span>Directions</span>
           <svg class="search__icon">
             <use href="${icons}#icon-arrow-right"></use>
           </svg>
         </a>
       </div>
       
   `;
  
  }
  
}


export default new RecipeView();  // export a object if this class