import hostname from "./Host"

// const port = 8080;
const port = 81;


/* if(hostname.includes(":")) 
{
  let n = hostname.indexOf(":")
  hostname = hostname.substr(0,n);
} */

// export const dbHost = "http://" + hostname + ":" + port + "/todos/";
export const dbHost = "http://" + hostname + ":" + port + "/todos/";
export const maxLink  = dbHost + "maximum";
export const addLink = dbHost + "add";
export const addNoteLink = dbHost + "adddesc";

export const updateLink = dbHost + "update/";
export const deleteLink = dbHost + "delete/";
export const deleteGroupLink = dbHost + "deletede/";

export const nullDate = '1970-01-01T00:00:00.000Z';

// let num = Math.floor(Math.random() * 1000001);  

export const getdbDesc = async () => {
let dataDesc;

    const response = await fetch(dbHost + 'desc' , {cache: 'no-cache'});
  
    try {
        const data = await response.json();
       
        dataDesc = data;
        } catch (err) {
          throw err;
    }


    return dataDesc;

}

export const getdb = async (link) => {
  let data;
  // let idLink = '';
  console.log(link)
  // if(id !== null) idLink="?desc=" + id;
  
      const response = await fetch(link, {cache: 'no-cache'});
    
      try {
          const data2 = await response.json();
         
          data = data2;
          } catch (err) {
            throw err;
      }
  
  
      return data;
  
  }

const dbSave = async  (todo,link) => {

  const settings = {
    method: 'post',
    cache: 'no-cache',
    body: JSON.stringify(todo),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }

  const response = await fetch(link, settings);
  
  if (!response.ok) throw Error(response.message);

    try {
        const data = await response.json();
       
        setTimeout( () =>{  window.location.href = "/" },500);
        return data;
        } catch (err) {
          throw err;
    }

 
   }


   export const dbSaveNote = async  (todo,link) => {

    const settings = {
      method: 'post',
      cache: 'no-cache',
      body: JSON.stringify(todo),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }
  
    const response = await fetch(link, settings);
    
    if (!response.ok) throw Error(response.message);
  
      try {
          const data = await response.json();
          return data;
          // setTimeout( () =>{  window.location.href = "/" },500);
          } catch (err) {
            throw err;
      }
  
   
     }

   export const dbDelete = async  (link, redir=true) => {

  
    const response = await fetch(link);

  
      try {
          const data = await response.json();
          // return data;
          } catch (err) {
            throw err;
      }
  
      if(response.status === 400) alert("Cannot delete")

      if(redir) setTimeout( () =>{  window.location.href = "/" },500);
     }


export default dbSave;
