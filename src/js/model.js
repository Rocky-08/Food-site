import { async } from 'regenerator-runtime';
import {API_URL , KEY} from './config.js';
import {getJSON , sendJSON} from './helpers.js'

export let state = {
    recipes : {},
    search : {
       query : '',
       result : [],
       resultPerPage : 10,
       page: 1
    },
    bookmark : [],

}

let createdRecipeObject = function(datas)
{
  let {recipe} = datas.data;  // we not write the same but it is
  console.log(recipe);
  
  return  {
     id: recipe.id, 
     title: recipe.title,
     publisher : recipe.publisher,
     sourceUrl : recipe.source_url,
     image : recipe.image_url,
     servings : recipe.servings,
     cookingTime : recipe.cooking_time,
     ingredients : recipe.ingredients,
     ...(recipe.key && {key: recipe.key})  // this will act as and operator is recipe.key exist then ot moves ahead otherwise not and if true then it destructing
     
    }
 }
  


export let loadRecipe = async function(id)
{
try{

     
     let datas = await getJSON(`${API_URL}${id}?key=${KEY}`)

     console.log(datas);
   
     state.recipes = createdRecipeObject(datas);
   
  
   

     if(state.bookmark.some(bookmark => bookmark.id === id))
     {
       state.recipes.bookMarked = true;
     }
     else{
       state.recipes.bookMarked = false;
     }
     
/*      console.log(state.recipe);
 */} catch(err) {
    console.error(`${err}` );
    throw err;
}

}


export let searchLoadRecipe = async function(query)
{
  try{
    state.search.query = query;
    let datas = await getJSON(`${API_URL}?search=${query}&key=${KEY}`); // add the key so our recipe add to the list bu this if anyone has key or anyone has not both are show

   state.search.result =  datas.data.recipes.map(rec => {
      return{
        id: rec.id, 
        title: rec.title,
        publisher : rec.publisher,
        image : rec.image_url,
        ...(rec.key && {key: rec.key}) 
        
      }
    })

   /*  console.log(state.search.result) */
  }
   catch(err) {console.error(`${err}` );
  throw err;
  }
}

// -------------------------------- pagination ---------------------------

export let getSearchResultPage = function(page)
{
  state.search.page = page;
  let start = (page-1)*state.search.resultPerPage // start index of result array
  let end = page*state.search.resultPerPage; // last index of result array

  return state.search.result.slice(start, end);
}

// ----------------------Serving Update----------------------------
export let UpdateServings = function(newServings)
{
  state.recipes.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings)/state.recipes.servings;
  })

  state.recipes.servings = newServings;

  console.log(state.recipes);
}

// ---------------------------------------------- store BookMarks in local Storage ----------------------------------------

let storeBookmarks = function()
{
  localStorage.setItem('bookmarks' , JSON.stringify(state.bookmark));
}

export let addBookMark = function(recipe){
  // Add bookMark

  state.bookmark.push(recipe);

  // show BookMark when click on that recipe

  if(recipe.id==state.recipes.id)
  {
    state.recipes.bookMarked = true;
  }

  storeBookmarks();
}

// if we delete something then we use its id
export let removeBookMark = function(id)
{
  // Delete Bookmark
  let index = state.bookmark.findIndex(element => element.id === id)
 
  


    state.bookmark.splice(index , 1);

    
  // show BookMark when click on that recipe

  if(id==state.recipes.id)
  {
    state.recipes.bookMarked = false; 
  }

  storeBookmarks();
}

// Convert the upload data to the require promise that we receive from API

export let UploadData = async function(newRecipe)
{
  try{
    console.log(Object.entries(newRecipe));
    let ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '').map(ing => {
  
       let ingArr = ing[1].replaceAll(' ' , '').split(',');
  
       if(ingArr.length !== 3)
       {
         throw new Error('Wrong ingredient Format ! Please use the correct format :)')
       }
       
      let [quantity , unit , description] = ingArr; 
      return {quantity:quantity ? Number(quantity):null , unit , description}
      
      
    });
    
    let recipe = {
      title: newRecipe.title,
      source_url : newRecipe.sourceUrl,
      image_url : newRecipe.image,
      publisher: newRecipe.publisher, 
      cooking_time  : Number(newRecipe.cookingTime),
      servings: Number( newRecipe.servings),
      ingredients,
    }
    console.log(recipe);

  let datas =  await sendJSON(`${API_URL}?key=${KEY}` , recipe); // this send the receipe to us
   /* console.log(datas);  */
  state.recipes = createdRecipeObject(datas);
  



  addBookMark(state.recipes); // store it in bookMark list

  state.bookmark.push(state.recipes);

   }catch(err)
   {
     throw err;
  }} 


  let init1 = function()
  {
    let data = localStorage.getItem('bookmarks')
  
    if(data)
    {
      state.bookmark = JSON.parse(data);
    }
  
  }
  
  init1();
  



    

   
     
    
    
