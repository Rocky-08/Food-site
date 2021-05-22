import icons from 'url:../../img/icons.svg';  // give the location address 
import View from './View.js'

class PaginationView extends View {

    _parentElement = document.querySelector('.pagination');


    addHandlerClick(handler)
    {
        this._parentElement.addEventListener('click' , function(e){

            let btn = e.target.closest('.btn--inline');
            if(!btn) return;
            
            let goToPage = Number( btn.getAttribute('data-goTo'));
           handler(goToPage);
        })
    }
            
            

      
    _generateHTML()
    {
        let currentPage = this._datas.page;
        let totalPages = Math.trunc(this._datas.result.length / 10) + 1;
        console.log(totalPages)
       
        // 1) when at page 1 and no other page
        
        if(currentPage === 1 && totalPages > 1)
        {
            return `
            <button data-goTo =" ${currentPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
            `;
        }
        
        
        
        
        // 2) last page
        if(currentPage === totalPages && totalPages > 1) // if totalpage is 1
        {
            return `
            <button data-goTo =" ${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span> Page ${currentPage -1}</span>
          </button>
            `;
        }
        
        //3) other pages\
        if(currentPage < totalPages)
        {
            return `
        <button data-goTo =" ${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span> Page ${currentPage -1}</span>
          </button>
          <button data-goTo =" ${currentPage + 1}" class="btn--inline pagination__btn--next">
          <span> Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
            ` ;
        }

        // 4) page 1 and other pages
            return '';
    }
}  




export default new PaginationView();
