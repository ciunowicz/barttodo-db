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
export const updateLink = dbHost + "update/";
export const deleteLink = dbHost + "delete/";

export const nullDate = '1970-01-01T00:00:00.000Z';

// let num = Math.floor(Math.random() * 1000001);  

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
        // return data;
        window.location.href = "/";
        } catch (err) {
          throw err;
    }

 
   }

   export const dbDelete = async  (link) => {

  
    const response = await fetch(link);
  
      try {
          const data = await response.json();
          setTimeout( () =>{  window.location.href = "/" },500);
          
          } catch (err) {
            throw err;
      }
  
   
     }


export default dbSave;
