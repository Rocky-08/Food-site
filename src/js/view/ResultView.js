 import icons from 'url:../../img/icons.svg';  // give the location address 
import View from './View.js'

class ResultView extends View {

    _parentElement = document.querySelector('.results');
    _errorMessage = 'We could not find the recipe. Please try again!!';

    _generateHTML()
    {  
          console.log(this._datas);
     return `${this._datas.map(this._generateHTMLPreview).join('')}`;

     
    }

    _generateHTMLPreview(res)
     {
       let id = window.location.hash.slice(1);
         return `
         <li class="preview">
         <a class="preview__link ${id == res.id ? 'preview__link--active' : ''}" href="#${res.id}">
           <figure class="preview__fig">
             <img src="${res.image}" alt="${res.title}" />
           </figure>
           
           </div>
           <div class="preview__data">
           <h4 class="preview__title">${res.title} ...</h4>
           <p class="preview__publisher">${res.publisher}</p>
           <div class="preview__user-generated ${res.key? '' : 'hidden'}">
           <svg>
           <use href="${icons}#icon-user"></use>
          </svg>
            
           </div>
           </div>
         </a>
       </li>
         `;  // this data goes into the view.js
         
     }

   

      

             
       
}





export default new ResultView();