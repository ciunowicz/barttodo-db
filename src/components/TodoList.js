import React, {useState, useEffect} from 'react';
//import { useHistory } from 'react-router-dom';


// import history from '../history';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import { dbHost, nullDate  } from '../Db';
// import data from '../Data';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row-reverse',
    cursor: 'pointer',
  },
  grid: {
    //display: 'flex', 
    // flexDirection: 'row',
    paddingBottom: 0,
    marginBottom: 0, 
    
  },
  gridcontainer: {
    flexDirection: 'column',
  },
}));


const TodoList = () => {
  const classes = useStyles();
  const [todos,setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  //let history = useHistory();

  const edit = (id) => {
  //  history.push("/edit/"+id);
    window.location.href = "/edit/"+id;
  }

  useEffect(() => {
console.log("fetch data")
fetch(dbHost, {cache: 'no-cache'})
.then(response => response.json())
.then(data => { 
  let dataNull = nullDate.slice(0,16);
  for(let i=0; i< data.length; i++)
  {
  let data_c = new Date(data[i].created); data[i].created = data_c.toISOString(); 
  let data_e = new Date(data[i].end); data[i].end = data_e.toISOString();
  
    data[i].end=data[i].end.slice(0,16)
    data[i].created=data[i].created.slice(0,16)
    if(data[i].end === dataNull) { data[i].end = "" }
  }
  setTodos(data); setLoading(false); });
  // setTimeout( () =>{  window.location.reload(false)},60*4*1000);
  

    },[]);

if(loading) { return (<div className="circular"><CircularProgress disableShrink /></div>)

} 

else {
  
  return (
    <div className={classes.root}>
      {  todos.map((item,id) => { 
          return (
                  <Paper className={classes.paper} onClick={() => edit(item._id)} key={id}>
                    <Grid container wrap="nowrap" spacing={1} className={classes.gridcontainer}>
                    
                      {/* <Grid item className={classes.grid}  > */}
                      <Grid item className={classes.grid}  >
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="body2" style={{fontSize: "small", display: 'flex'}}>created</Typography> 
                        <Typography variant="body2" style={{fontSize: "small", display: 'flex'}}>{item.end !== "" ? 'end' : '' }</Typography></div>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                          <Typography variant="body2" style={{fontSize: "small"}} >{item.created.search !== -1?item.created.replace('T', ' '):item.created}</Typography>
                          <Typography variant="body2"style={{fontSize: "small"}}> {item.end.search !== -1?item.end.replace('T', ' '):item.end}</Typography></div>                   
                      </Grid>
                      <Divider variant="middle" />
                      <Grid  item xs zeroMinWidth  >
                        <Typography style={item.completed?{textDecoration:  "line-through"}:{textDecoration:  "none"}}>{item.text}</Typography>
                      </Grid>
                    </Grid>
                  </Paper>)}) } 
    </div>
  );
          }
}

export default TodoList;