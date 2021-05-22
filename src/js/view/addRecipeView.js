import icons from 'url:../../img/icons.svg';  // give the location address 
import View from './View.js'

class AddRecipeView extends View {

    _parentElement = document.querySelector('.upload');
    _message = 'Recipe is successfully Uploaded :)';

    _window = document.querySelector('.add-recipe-window');

    _overlay = document.querySelector('.overlay');

    _btnOpen = document.querySelector('.nav__btn--add-recipe')
    _btnClose = document.querySelector('.btn--close-modal')
     
    
    constructor()
    {
        super();
        this._addHandlerShowWindow();
/*         this.addHandlerUpload();
 */    }
    
    toogleWindow()
    {
        this._window.classList.toggle('hidden');
        this._overlay.classList.toggle('hidden');
    }

    closeWindow()
    {
        this._window.classList.toggle('hidden');
        this._overlay.classList.toggle('hidden');
    }
    _addHandlerShowWindow()
    {
        this._btnOpen.addEventListener('click',this.toogleWindow.bind(this));
        this._btnClose.addEventListener('click' , this.closeWindow.bind(this));
        
    }

    // to take data from upload form

    addHandlerUpload(handler)
    {
        this._parentElement.addEventListener('submit',function(e)
        {
            e.preventDefault();

            // to takew data we either do the each element of form and then store valuye in it but this is messy so we have a nice option which is to use FormData constructor

            let dataArr = [...new FormData(this)]; // we pass this so that e order to which data he takes and here 'this' is refer to form 
            
            // as data gives the array in which it conatins the entries so to convert entries to object we have a handy method
              
            let data = Object.fromEntries(dataArr)  // oposite to Object.entries()

            handler(data);
            
            
        })

    

      
    }

    

   _generateHTML()
    {
      
     }
     
}   


export default new AddRecipeView();
