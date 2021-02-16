import React , { useState, useEffect  } from 'react';
//import { useHistory } from 'react-router-dom';
// import data from '../Data';
// import history from '../history';
import dbSave, {nullDate, addLink, getdbDesc} from '../common/Db';
import useStyles from '../common/styles';
import {
    Card,
    CardContent,
    CardActions,
    IconButton
  } from '@material-ui/core';
  import { saveLoc } from '../common/LocStore';
  import {Grid} from '@material-ui/core';
  import TextField from '@material-ui/core/TextField';
  import SaveIcon from '@material-ui/icons/Save';
  import AddIcon from '@material-ui/icons/Add';
  import Container from '@material-ui/core/Container';
  import Typography from '@material-ui/core/Typography';
  import Select from '@material-ui/core/Select';
  import MenuItem from '@material-ui/core/MenuItem';
  import InputLabel from '@material-ui/core/InputLabel';
  import FormControl from '@material-ui/core/FormControl';

  

const Create = ()=> {
   
    const classes = useStyles();
   // let history = useHistory();
    const [text, setText] = useState('');
    const [desc, setDesc] = useState([]);
    const [desc_id, setDesc_id] = useState('')
    const [datetime_end, setDatetime_end] = useState('');
    
    let today = new Date();

    const date = today.getFullYear()+'-'+((today.getMonth()+1)<10 ? ('0' + (today.getMonth()+1)) : (today.getMonth()+1)) +'-'+today.getDate();
    const time = (today.getHours() < 10 ? ('0' + today.getHours()) : today.getHours()) + ":" + (today.getMinutes()<10 ? ('0' + today.getMinutes()): today.getMinutes());
    const datetime = date + ' ' + time;

    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    
/*     function reloadIt() {
      if (window.location.href.substr(-2) !== "?r") {
          window.location = window.location.href + "?r";
      }
  }  */  


function NoteGroup() {

  window.location.href = "/editd"
}



function Save() {
  
  if(text.trim().length < 5) {
    alert('Wpisz tekst więcej niż 5 znaków');
    return;
}


if(desc_id === null || desc_id === '')
{
  alert('Dodaj grupę notatek');
  return;
}

  
let data_save_created = datetime + ":00.000Z";
let date_save_end = datetime_end;

    if(date_save_end === null || date_save_end === '')
    {
      date_save_end = nullDate;
    }
    else {

      if(date_save_end.indexOf("Z") === -1)
        date_save_end = date_save_end + ":00.000Z";
  }

   
    let rec = {text: '', created: '', end: '', completed: false};
    rec.text = text;
    rec.created = data_save_created;
    rec.end =  date_save_end
    rec.id_desc = desc_id;

    saveLoc(desc_id);
    dbSave(rec,addLink);
    // history.push('/');
   /*  function sleep (time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    } */
    
    // Usage!
 /*    sleep(500).then(() => {
        // Do something after the sleep!
        window.location.href = "/";
    }); */
   
  
  }
  
  const handleText = event => {
     setText(event.target.value);
  }

  
  const handleData = event => {
    setDatetime_end(event.target.value);
  }

  const handleIdDesc = event => {
    setDesc_id(event.target.value);
  }

  const loadData  = () => {
    
    getdbDesc().then((data) => { setDesc(data); setDesc_id(data[0]._id) }).catch(reason => console.log(reason.message))
    
    setDatetime_end("");
  }

  useEffect(() => {
    // setTimeout(reloadIt, 1000);
loadData();
   
   
  },[])


      return <Container className={classes.container} maxWidth="sm" > 
           <Grid container spacing={3} style={{ display: 'flex', justifyContent: 'center'}} >
              
  <Grid item>
          <Card  className={classes.root} > 
          {/* zamienić div na typography */}
            <CardContent>
              <Typography className={classes.typography}  variant="body2">created: {datetime} </Typography>
                    <TextField 
                        id="outlined-multiline-static"   
                        label="Note"
                        multiline
                        rows={8}
                        // defaultValue="Bobek Kartofelek"
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
                    <MenuItem key={name._id} value={name._id} >
                      {name.text}
                    </MenuItem>
                  ))}
               </Select>
            </FormControl>  
            <IconButton className={classes.button} aria-label="add" onClick={NoteGroup}> 
                     <AddIcon />
                </IconButton>   
            </div>
            
          {/* <CardActions disableSpacing style={{display: 'flex',justifyContent: 'space-between'}}> */}
          <div className={classes.divForm}>
            <FormControl    className={classes.formControl}>                   
              <TextField  className={classes.textFieldDate}
                  id="datetime-local"
                  label="End"
                  type="datetime-local"
                  // defaultValue={datetime2}
                  value={datetime_end}
                  onChange={handleData}
                  InputLabelProps={{
                  shrink: true,
                  }}
                />
</FormControl> 

          </div>
          <CardActions disableSpacing >
            <div className={classes.cardActions}>
            <IconButton className={classes.button} aria-label="save" onClick={Save}> 
                     <SaveIcon />
                </IconButton>
                </div>
          </CardActions>
  
    </Card>

    


  </Grid>
  </Grid>  
</Container>;
}

// export default withRouter(Create);
export default Create;
