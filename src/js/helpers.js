// in this module we put all that function that we use over the entire project

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

export let getJSON = async function(url)
{
    try{
    let res = await Promise.race([fetch(url) , timeout(10)]) ;  
    let datas = await res.json();
     
    if(!res.ok)
    {
      throw new Error(`${datas.message} (${res.status})`)
    }

   
      return datas;
} catch(err)
    {
        throw err;
    }
} 


// Upload the data and convert it into a url and to upload daat we need to send options in fetch 

export let sendJSON = async function(url , uploadData)
{
    try{

       let fetchPro = fetch(url , {
         method: 'POST',
         headers : {
           'Content-Type' : 'application/json' // by this tell the API that data is in JSON format
         },
         body : JSON.stringify(uploadData)  // by this send the data

       });

    let res = await Promise.race([fetchPro , timeout(10)]) ;  
    let datas = await res.json();   // it return the data back that we just sent
      
    if(!res.ok)
    {
      throw new Error(`${datas.message} (${res.status})`)
    }

   
      return datas;
} catch(err)
    {
        throw err;
    }
} 