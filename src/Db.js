const port = 81;
export const dbHost = "http://localhost:" + port + "/todos/";
export const maxLink  = dbHost + "maximum";
export const addLink = dbHost + "add";
export const updateLink = dbHost + "update/";
export const deleteLink = dbHost + "delete/";

const dbSave = (idx,todo) => {
       
     fetch(updateLink  + idx,{
       method: 'post',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({...todo})
     })
     .then(function(response) {
       return response.json();
     });
 
   }

  export  const dbInsert = (todo) => {
       
    fetch(addLink ,{
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({...todo})
    })
    .then(function(response) {
      return response.json();
    });

  }



export default dbSave;
