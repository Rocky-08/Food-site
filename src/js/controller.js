import * as model from './model.js'
import recipeView from './view/recipeView.js'
import searchView from './view/searchView.js'
import resultView from './view/ResultView.js'
import paginationView from './view/paginationView.js'
import bookmarkView from './view/bookmarkView.js'
import addRecipeView from './view/addRecipeView.js'




import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { setTimeout } from 'core-js'


const { async } = require("q");

const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////



let controlRecipe = async function()
{
  try
  {
    
    id = window.location.hash.slice(1);  // this will shwo the different id
    console.log(id);
    
    if(!id)
    {
      return;
    }
    recipeView.renderSpinner();

    // 0) update result view to mark selected search result

    /* resultView.render(model.getSearchResultPage()); */
    
    // 1) Loading Recipe
    
    await model.loadRecipe(id);  // this will return a promise as it is a async function
    

        // 2) rendering Recipe
          recipeView.render(model.state.recipes);
        // 3) show the bookmark list  
          bookmarkView.render(model.state.bookmark);

          
        
         // 
/*          resultView._selectedElement();     
 */
 
    } catch(err) { 
      
      recipeView.renderError();
    };
        
        
 }

 
 
 let controlSearchResult = async function()
 {
   try
   {
       // show spinner
       resultView.renderSpinner();

     // 1) get Search Query
     let query = searchView.getQuery();
     
     if(!query)
     {
       return;
      }
      // 2) Load search Result
      await model.searchLoadRecipe(query);
      
      // 3) render result
     resultView.render(model.getSearchResultPage(1));
 
      // 4) render pagination

     paginationView.render(model.state.search)
     

    } 
    catch(err)
    {
      console.log(err);
    }
  }
  
/*   controlSearchResult();
 */  

    let controlPagination = function(goToPage)
    {
       // 3) render result
     
      resultView.render(model.getSearchResultPage(goToPage));
 
      // 4) render pagination

     paginationView.render(model.state.search)
    }


    let controlServings = function(newserving)
    {
      // 1) Update servings
     model.UpdateServings(newserving);

     // 2) render recipe
     /* recipeView.render(model.state.recipes); */
     recipeView.update(model.state.recipes);   // in this we only change the data and by this it not load the whole data again and again
    }

    let controlAddBookMark = function()
    { 
      // 1) add bookMark or remove
      if(!model.state.recipes.bookMarked)
      {

        model.addBookMark(model.state.recipes);
      }
      else {
        model.removeBookMark(model.state.recipes.id);
      }

      // 2) show bookmark
      recipeView.render(model.state.recipes)

      // 3) add in bookmark list and this exist because we update it once that's why when ew go on new item we can see our bookMark
      bookmarkView.render(model.state.bookmark);
    }


    // ------------------------ Control the upload data ---------------------------------------

    let controlUploadData = async function(newRecipe)
    {
      try{

        // add Spinner

        addRecipeView.renderSpinner();

       await model.UploadData(newRecipe);
       console.log(model.state.recipes);

       // Show successful Message

       addRecipeView.renderMessage();
       
       // render recipe
       recipeView.render(model.state.recipes);

       // render bookmark

       bookmarkView.render(model.state.bookmark);

       // change id into URL

       window.history.pushState(null , '' , `#${model.state.recipes.id}`) // this is help to change the URl without reload the page and in ithis pushState it takes three value  1) state  2) title  3) Id

       // Close Window
       setTimeout(function()
       {
         addRecipeView.toogleWindow();
       },2500);
      } catch (err)
      {
        console.error(err);
        addRecipeView.renderError(err.message);
      }
    }

 
    
    let init = function()
    {
      bookmarkView.render(model.state.bookmark);
      recipeView.addHandler(controlRecipe);
      recipeView.addHandlerAddBookmark(controlAddBookMark);
      
      searchView.addHandlerSearch(controlSearchResult);
      paginationView.addHandlerClick(controlPagination);
      recipeView.addHandlerUpdateServings(controlServings);
      addRecipeView.addHandlerUpload(controlUploadData);
      
  }
 
  init();

/*   console.log(JSON.parse(localStorage.getItem('bookmarks'))) */
  
         
          
        
   
 
 
 
 
 


  


        
