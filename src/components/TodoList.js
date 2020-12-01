import React, {useState, useEffect} from 'react';
//import { useHistory } from 'react-router-dom';


// import history from '../history';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Pagination from "@material-ui/lab/Pagination";

import { dbHost, nullDate, getdbDesc,getdb  } from '../Db';
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
  divForm: {
    paddingTop: theme.spacing(1),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    display: 'flex',
  },
  formControl: {
    minWidth: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  pagination: {
    marginLeft: 'auto', 
    marginRight: 'auto', 
  },
  contpagination: {
    marginTop: '20px', 
    width: '100%', 
    display: 'flex', 
  },

}));


const TodoList = () => {
  const classes = useStyles();
  const [todos,setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

 
    const [desc, setDesc] = useState([]);
    const [desc_id, setDesc_id] = useState('')
  //let history = useHistory();

  const edit = (id) => {
  //  history.push("/edit/"+id);
    window.location.href = "/edit/"+id;
  }
  const handleIdDesc = event => {
    setDesc_id(event.target.value);
    loadPages(event.target.value);
    setPage(1);
    
  }

  const handleChange = (event, value) => { 
       
    setPage(value);
   
}


const loadPages = (desc) => {
  let host;
  if(!desc.length || desc === "A")
    host = dbHost + 'page/' + '?p=' + page + '&l=' + pageSize;
    else
       host = dbHost + 'page/' + '?p=' + page + '&l=' + pageSize + '&desc=' + desc;

    getdb(host).then((dt) => { 
      
      let data = dt.docs;
      let  dataNull = nullDate.slice(0,16);
      setTotalPages(dt.totalPages);

      for(let i=0; i< data.length; i++)
      {
      let data_c = new Date(data[i].created); data[i].created = data_c.toISOString(); 
      let data_e = new Date(data[i].end); data[i].end = data_e.toISOString();
      
        data[i].end=data[i].end.slice(0,16)
        data[i].created=data[i].created.slice(0,16)
        if(data[i].end === dataNull) { data[i].end = "" }
      }

      setTodos(data); 
      setLoading(false); 
    
    });
   

}

  const loadData  = (desc) => {
    
    getdbDesc().then((data) => { let descdata = [...data];  descdata.unshift({_id: 'A', text: 'All'});  setDesc(descdata); 
          
          if(!desc.length || desc === "A") {
            setDesc_id("A");
          }
          else 
            { setDesc_id(desc); }
                                 }).catch(reason => console.log(reason.message))
   
  }


  useEffect(() => {
   loadPages(desc_id);
      // setTimeout( () =>{  window.location.reload(false)},60*4*1000);
      
    loadData(desc_id);
        },[page]);
    

if(loading) { return (<div className="circular"><CircularProgress disableShrink /></div>)

} 

else {
  
  return (
    <div className={classes.root}>
       <div className={classes.divForm}>
            <FormControl    className={classes.formControl}>
            {/* <InputLabel id="demo-simple-select-helper" >Name</InputLabel> */}
              <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  // defaultValue=""
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
                  <div className={classes.contpagination} ><Pagination className={classes.pagination} count={totalPages} page={page} onChange={handleChange} /></div>

    </div>
  );
          }
}

export default TodoList;