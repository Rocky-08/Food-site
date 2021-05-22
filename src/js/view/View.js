import icons from 'url:../../img/icons.svg';  // give the location address

export default  class View {
    _datas;
    render(data)
    {
        if(!data || data.length === 0) 
        {
            return this.renderError();
        }

        this._datas = data;
        this._clear(); 
        this._parentElement.insertAdjacentHTML('afterbegin' , this._generateHTML());
    };

    update(data)
    {
        if(!data || data.length === 0) 
        {
            return this.renderError();
        }

        this._datas = data;
        let newHTML = this._generateHTML();  // by this we create a new HTML or we can say change HTML and it is string and then compare to the old HTML and update it but is very difficult to do so we use a nice trick it it convert the string to DOM object and then caomper it 

        // converting to DOM Object

        let newDOM = document.createRange().createContextualFragment(newHTML); // this create a virtual DOM which store in a memory
        let newElement = newDOM.querySelectorAll('*');
        /* console.log(newElement);  */ // show all the update element not on webpage but in dom object

        newElement =  Array.from(newElement);
        let curElement =  Array.from(this._parentElement.querySelectorAll('*'))
        console.log(newElement); 
        console.log(curElement); 


        newElement.forEach((newel , i) => {
            let curel = curElement[i];

            // Update Change Text
            if(!newel.isEqualNode(curel) && newel.firstChild.nodeValue.trim()!== '') // bu the  second condition w just only replace the text not the whole element which are different\
            {
                curel.textContent = newel.textContent; // this will only change the 3 or 5 not hte other so we also change the attribute
            }

            // Update Change attribute

            if(!newel.isEqualNode(curel))
            {
                Array.from(newel.attributes).forEach(attr => curel.setAttribute(attr.name , attr.value))
            }
        })
    
    }

    _clear(){
        this._parentElement.innerHTML = '';
    }

    renderSpinner = function()
     {
        let html = `
        <div class="spinner">
        <svg>
            <use href="${icons}#icon-loader"></use>
        </svg>
        </div>
        `;

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin' , html);
     }

     renderMessage(message = this._message)

     {
        let html = `
        <div class="message">
        <div>
        <svg>
        <use href="${icons}#icon-smile"></use>
        </svg>
        </div>
        <p>${message}</p>
        </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin' , html);
     }

     
     renderError(message = this._errorMessage)  // by default message
     {
       let html = `
       <div class="error">
       <div>
       <svg>
       <use href="${icons}#icon-alert-triangle"></use>
       </svg>
       </div>
       <p>${message}</p>
       </div>
       `;
       this._clear();
       this._parentElement.insertAdjacentHTML('afterbegin' , html);
     }
}