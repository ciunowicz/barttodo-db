
const saveLoc = (id) => {

  let data = { iddesc: id };
  
  if (typeof(Storage) !== "undefined") 
  {
      localStorage.setItem("BartTodo", JSON.stringify(data));
  }
 
}

const loadLoc = () => {
  let todosData;

  if (typeof(Storage) !== "undefined") {
   
    if (localStorage.getItem("BartTodo")) {
        todosData = JSON.parse(localStorage.getItem("BartTodo"));
    } 
    
  } 

  return  todosData;
}




export {saveLoc, loadLoc};