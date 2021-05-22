import icons from 'url:../../img/icons.svg';  // give the location address 
import View from './View.js'

class BookmarkView extends View {

    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No Bookmark Yet , Find a new recipe and bookmark it';

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
           <div class="preview__data">
             <h4 class="preview__title">${res.title} ...</h4>
             <p class="preview__publisher">${res.publisher}</p>
            
           </div>
         </a>
       </li>
         `;  // this data goes into the view.js
         
     }

   
    }
    export default new BookmarkView(); 
    
    
    
    
    

      

             
       