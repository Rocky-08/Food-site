class searchView {
_parentElement = document.querySelector('.search');

    getQuery()
    {
        let value =  this._parentElement.querySelector('.search__field').value;
        this._parentElement.querySelector('.search__field').value = '';
        return value;
    }

    addHandlerSearch(handler)
    {
         this._parentElement.addEventListener('submit' , function(e)
         {
             e.preventDefault();
             handler();
         })
    }

   
}

  

export default new searchView(); 