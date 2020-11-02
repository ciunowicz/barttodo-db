import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import { dbHost } from '../Db';
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
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  gridcontainer: {
    flexDirection: 'column',
  },
}));


export default function TodoList() {
  const classes = useStyles();
  const [todos,setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  let history = useHistory();

  const edit = (id) => {
    history.push("/edit/"+id);
  }

  useEffect(() => {

fetch(dbHost)
.then(response => response.json())
.then(data => { setTodos(data); setLoading(false); });

    },[]);

if(loading) { return (<div className="circular"><CircularProgress disableShrink /></div>)

} 

else {
  return (
    <div className={classes.root}>
      {  todos.map(item => {
          return (
                  <Paper className={classes.paper} onClick={() => edit(item.id)} key={item.id}>
                    <Grid container wrap="nowrap" spacing={1} className={classes.gridcontainer}>
                      <Grid item className={classes.grid}  >
                          <Typography variant="body2" ><div style={{fontSize: "small"}}>created</div> {item.created}</Typography>
                          <Typography variant="body2" ><div style={{fontSize: "small"}}>end</div> {item.end.search !== -1?item.end.replace('T', ' '):item.end}</Typography>                   
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
