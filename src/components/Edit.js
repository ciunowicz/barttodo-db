import React , { useState, useEffect  } from 'react';
import { useParams} from "react-router-dom";
import dbSave ,  { dbHost, deleteLink, nullDate, updateLink,dbDelete, getdbDesc } from '../common/Db';
import useStyles from '../common/styles';
import { saveLoc } from '../common/LocStore';

import {
    Card,
    CardContent,
    CardActions,
    IconButton, Typography
  } from '@material-ui/core';
  
  import {Grid} from '@material-ui/core';
  import TextField from '@material-ui/core/TextField';
  import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
  import SaveIcon from '@material-ui/icons/Save';
  import DeleteIcon from '@material-ui/icons/Delete';
 // import { useHistory } from 'react-router-dom';
//  import history from '../history';
  import Container from '@material-ui/core/Container';
  import CircularProgress from '@material-ui/core/CircularProgress';
  import Select from '@material-ui/core/Select';
  import MenuItem from '@material-ui/core/MenuItem';
  import InputLabel from '@material-ui/core/InputLabel';
  import FormControl from '@material-ui/core/FormControl';

  


const Edit = (props)=> {
    let { id } = useParams();
    //let history = useHistory();
    const classes = useStyles();
    const [todos,setTodos] = useState({});
    const [loading, setLoading] = useState(true);

    const [desc, setDesc] = useState([]);
    const [desc_id, setDesc_id] = useState('')
  

    useEffect(() => {    
         

          fetch(dbHost+id)
          .then(response => response.json())
          .then(data => { let data_c = new Date(data.created); 
           
            data.created = data_c.toISOString(); 
            let data_e = new Date(data.end); 
            data.end = data_e.toISOString();  
            let dataNull = nullDate.slice(0,16);
            data.created=data.created.slice(0,16); 
            data.end=data.end.slice(0,16); 
            loadData(data.id_desc);
            if(data.end === dataNull) { data.end = "" }
            setTodos(data);  
            setLoading(false); });
            
           
         },[id]);
  

         const loadData  = (iddesc) => {
          console.log("load");
          console.log(iddesc)
          getdbDesc().then((data) => { setDesc(data); setDesc_id(data[0]._id); 
            for(let i=0; i< data.length; i++) 
            {
              if(data[i]._id === iddesc ) { setDesc_id(data[i]._id); break;}
            }
          
          }).catch(reason => console.log(reason.message))
          
        }

        const handleIdDesc = event => {
          todos.id_desc = event.target.value;
          let Todos = {...todos}
          setDesc_id(event.target.value);  
          setDesc_id(event.target.value);
           setTodos(Todos)
        }
      

  const Done = () => {
    todos.completed = !todos.completed;
    let Todos = {...todos};
// alert(todos.id_desc)
    if(todos.text.trim().length < 5) {
      alert('Wpisz tekst więcej niż 5 znaków');
      return;
  }
setTodos(Todos)
    if(Todos.end === null || Todos.end === '')
    {
     
      //Todos.end = new Date(Todos.end + ":00.000Z");
      Todos.end = nullDate;
    }
    else 
    { 
      if(Todos.end.indexOf("Z") === -1)
	       Todos.end = Todos.end + ":00.000Z"; 
    }
    
    if(Todos.created.indexOf("Z") === -1)
	       Todos.created = Todos.created + ":00.000Z";

	  dbSave(Todos, updateLink + id);
  }


  function Save() {
    let Todos = {...todos};
    Todos.id_desc = desc_id;
    

    if(todos.text.trim().length < 5) {
      alert('Wpisz tekst więcej niż 5 znaków');
      return;
  }

    if(Todos.end === null || Todos.end === '')
    {
      Todos.end = nullDate;
    }
    else 
    { 
      if(Todos.end.indexOf("Z") === -1)
         Todos.end = Todos.end + ":00.000Z"; 
     }
  
  if(Todos.created.indexOf("Z") === -1)
  Todos.created = Todos.created + ":00.000Z";
  
	  dbSave(Todos,  updateLink + id);
    saveLoc(desc_id);
    //  history.push('/');
   window.location.href = "/"
    
  
  }

const Delete = (id) => {

  dbDelete(deleteLink + id);
}

  const handleText = event => {
    let newTodos = {...todos};
    newTodos.text = event.target.value;
   setTodos(newTodos);
  }
  
  const handleData = event => {
    let newTodos = {...todos};
    newTodos.end = event.target.value;
  
   setTodos(newTodos);
  }

  if(loading) { return (<div className="circular"><CircularProgress disableShrink /></div>)

} 

else {
      return <Container className={classes.container}  maxWidth="sm" > 
           <Grid container spacing={3} style={{ display: 'flex', justifyContent: 'center'}} >
         
  <Grid item>
          <Card  className={classes.root}> 
            <CardContent>
              <Typography className={classes.typography}  variant='body2' name="created">created: {todos.created.search !== -1?todos.created.replace('T', ' '):todos.created}  </Typography>
                    <TextField style={todos.completed?{textDecoration:  "line-through"}:{textDecoration:  "none"}}
                        id="outlined-multiline-static"   
                        label="Note"
                        multiline
                        rows={8}
                        name="text"
                        //defaultValue=""
                        value={todos.text || "Loading"}
                        variant="outlined"
                        className={classes.textField}
                        onChange={handleText}
                      />
   
            </CardContent>
            <div className={classes.divForm}>
            <FormControl    className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper" >Name</InputLabel>
              <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  // defaultValue=""
                  className={classes.select}
                  value={desc_id}
                  onChange={handleIdDesc}
                  >
            
                  {desc.map((name) => (
                    <MenuItem key={name._id} value={name._id} 
                    // style={getStyles(name, personName, theme)}
                    >
                      {name.text}
                    </MenuItem>
                  ))}
               </Select>
            </FormControl>     
            </div>       
         
            <div className={classes.divForm}>
            <FormControl    className={classes.formControl}>
              <TextField style={{display: 'flex'}}
                  id="datetime-local"
                  label="End"
                  type="datetime-local"
               //  defaultValue={todos.end}
                   value={todos.end || ''}
                   name="end"
                  className={classes.textFieldDate}
                  onChange={handleData}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                </FormControl>
                </div>


<CardActions disableSpacing >
            <div className={classes.cardActions}>
                <IconButton aria-label="done" onClick={Done}>
                      <CheckCircleOutlineIcon />
                </IconButton>
  
                <IconButton aria-label="save" onClick={Save}> 
                     <SaveIcon />
                </IconButton>
  
                <IconButton aria-label="delete" onClick={()=>Delete(id)}>
                    <DeleteIcon />
                </IconButton>
                </div>
          </CardActions>
    </Card>
  </Grid>
  </Grid>  
</Container>; }
}

export default Edit;
