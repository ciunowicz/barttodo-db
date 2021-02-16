import React, {useState, useEffect} from 'react';
//import { useHistory } from 'react-router-dom';

// import history from '../history';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Pagination from "@material-ui/lab/Pagination";
import useStyles from '../common/styles';

import { dbHost, nullDate, getdbDesc,getdb  } from '../common/Db';
import { saveLoc, loadLoc } from '../common/LocStore';
// import data from '../Data';



const TodoList = () => {
  const classes = useStyles();
  const [todos,setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
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
    // loadPages(event.target.value);
    saveLoc(event.target.value)
    setPage(1);
    
  }

  const handleChange = (event, value) => { 
       
    setPage(value);
   
}



  const loadData2 = React.useCallback( (desc) => {
    let host = dbHost + `page/?p=${page}&l=${pageSize}`;
 
    if(desc !== "" && desc !== "A") {
         host = host + `&desc=${desc}`;
    }
  
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

          let stringArray = data[i].text.split(/(\s+)/);
          
          const CHARNUM = 40;
         
          for(let j=0; j< stringArray.length; j++) {
             
              if(stringArray[j].length > CHARNUM) { 
                
                let arr1 =  stringArray[j].substring(0,CHARNUM); 
                let arr2 =  stringArray[j].substring(CHARNUM,stringArray[j].length);

                data[i].text = data[i].text.replace(stringArray[j], arr1 + " " + arr2)              
              }
           }

        }
  
        setTodos(data); 
        setLoading(false); 
      
      });
      
      getdbDesc().then((data) => { let descdata = [...data];  descdata.unshift({_id: 'A', text: 'All'});  setDesc(descdata); 
            
            if(!desc.length || desc === "A") {
              setDesc_id("A");
            }
            else 
              { setDesc_id(desc); }
                                   }).catch(reason => console.log(reason.message))
     
  }, [page]);
  
  useEffect(() => {

    let id = desc_id;

    if(id === "") {
      let idLoc =  loadLoc();

      if(idLoc !== undefined) { id = idLoc.iddesc;  } else { id = "A";  }
    }
  
    loadData2(id);
    //console.log("Use effect");
  }, [desc_id, loadData2]); 


    

if(loading) { return (<div className="circular"><CircularProgress disableShrink /></div>)

} 

else {
  
  return (
    <div className={classes.list} >
       <div className={classes.divForm} style={{ marginTop: '8px'}}>
            <FormControl    className={classes.formControl} style={{ marginLeft: 'auto',marginRight: 'auto'}}>
              <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={desc_id}
                  onChange={handleIdDesc}
                  >
            
                  {desc.map((name) => (
                    <MenuItem key={name._id} value={name._id} 
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
                        <Typography className={classes.typographyList} style={item.completed?{textDecoration:  "line-through"}:{textDecoration:  "none"}}>{item.text}</Typography>
                      </Grid>
                    </Grid>
                  </Paper>)}) } 
                  <div className={classes.contpagination} >
                      { totalPages > 1 ?  <Pagination className={classes.pagination} count={totalPages} page={page} onChange={handleChange} /> : '' }
                  </div>

    </div>
  );
          }
}

export default TodoList;