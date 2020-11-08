import React , { useState, useEffect  } from 'react';
import { useParams} from "react-router-dom";
import dbSave ,  { dbHost, deleteLink, nullDate } from '../Db';


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
  import { makeStyles } from '@material-ui/core/styles';
  import { useHistory } from 'react-router-dom';
  import Container from '@material-ui/core/Container';
  import CircularProgress from '@material-ui/core/CircularProgress';
  

  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: '#FAFAFA',
      minWidth: 375,
      paddingBottom: 8,
      [theme.breakpoints.down('md')]: {
        minWidth: 320,
    },
    },
   
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1), 
      width: '95%', 
      display: 'flex',
    },
    textFieldDate: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1), 
      display: 'flex',
      width: 190,
    },
     typography: {
     display: 'flex',
     justifyContent: 'flex-end',
     paddingBottom: 8,
    },
    container: {
      flexGrow: 1,
      // overflow: 'hidden',
      // padding: theme.spacing(0, 3),
      marginTop: theme.spacing(1),
    },
    cardActions: {
      display: 'flex',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column-reverse',
    },
    },
  }));


const Edit = (props)=> {
    let { id } = useParams();
    let history = useHistory();
    const classes = useStyles();
    const [todos,setTodos] = useState({});
    const [loading, setLoading] = useState(true);
  

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
            if(data.end === dataNull) { data.end = "" }
            setTodos(data);  
            setLoading(false); });
         
         },[id]);
  

  const Done = (idx) => {
    
    let todo_comp = {...todos, completed: !todos.completed}
    let todo_db = {...todo_comp};
    
    setTodos(todo_comp);
   
    if(todo_db.end === '' )
    { todo_db.end = nullDate; }

    todo_db.created = new Date(todo_db.created + ":00.000Z");
	  todo_db.created = todo_db.created.toISOString();

    dbSave(idx,todo_db);

    
  }


  function Save() {
    let newTodos = {...todos};

    if(todos.text.trim().length < 5) {
      alert('Wpisz tekst więcej niż 5 znaków');
      return;
  }

    if(todos.end !== null && todos.end !== '')
    {
      newTodos.end = new Date(newTodos.end + ":00.000Z");
      newTodos.end = newTodos.end.toISOString();
    }
    else 
    { 
      newTodos.end = nullDate; }
    
  //  return
     
	  newTodos.created = new Date(newTodos.created + ":00.000Z");
	  newTodos.created = newTodos.created.toISOString();

	  dbSave(id,newTodos);
     history.push('/');
    
  
  }

const Delete = (id) => {

fetch(deleteLink + id)
.then(response => {
  return response.json();
})

        history.push('/');

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
                        rows={4}
                        name="text"
                        //defaultValue=""
                        value={todos.text || "Loading"}
                        variant="outlined"
                        className={classes.textField}
                        onChange={handleText}
                      />
   
            </CardContent>
                   
          <CardActions disableSpacing >
            <div className={classes.cardActions}>
              <div style={{display: 'flex'}}>
                <IconButton aria-label="done" onClick={()=>Done(todos._id)}>
                      <CheckCircleOutlineIcon />
                </IconButton>
  
                <IconButton aria-label="save" onClick={Save}> 
                     <SaveIcon />
                </IconButton>
  
                <IconButton aria-label="delete" onClick={()=>Delete(todos._id)}>
                    <DeleteIcon />
                </IconButton>
                </div>
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
                </div>
          </CardActions>
    </Card>
  </Grid>
  </Grid>  
</Container>; }
}

export default Edit;
