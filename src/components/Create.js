import React , { useState, useEffect  } from 'react';
//import { useHistory } from 'react-router-dom';
// import data from '../Data';
// import history from '../history';
import dbSave, {nullDate, addLink, addNoteLink, getdbDesc, dbSaveNote} from '../Db';

import {
    Card,
    CardContent,
    CardActions,
    IconButton
  } from '@material-ui/core';
  
  import {Grid} from '@material-ui/core';
  import TextField from '@material-ui/core/TextField';
  import SaveIcon from '@material-ui/icons/Save';
  import AddIcon from '@material-ui/icons/Add';
  import { makeStyles } from '@material-ui/core/styles';
  import Container from '@material-ui/core/Container';
  import Typography from '@material-ui/core/Typography';
  import Select from '@material-ui/core/Select';
  import MenuItem from '@material-ui/core/MenuItem';
  import InputLabel from '@material-ui/core/InputLabel';
  import FormControl from '@material-ui/core/FormControl';

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
    
    select: {
      marginBottom: theme.spacing(2),
    },
    divForm: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
     
      display: 'flex',
    },
    formControl: {
      // marginLeft: 'auto',
      minWidth: 200,
    },
    textFieldName: {
     /*  marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),  */
      display: 'flex',
      width: 200,
    },
    textFieldDate: {
      /* marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),  */
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
    button: {
      marginLeft: 'auto',
      display: 'flex',
    },
  }));

const Create = ()=> {
   
    const classes = useStyles();
   // let history = useHistory();
    const [text, setText] = useState('');
    const [textDesc, setTextDesc] = useState('');
    const [desc, setDesc] = useState([]);
    const [desc_id, setDesc_id] = useState('')
    const [datetime_end, setDatetime_end] = useState('');
    
    let today = new Date();

    const date = today.getFullYear()+'-'+((today.getMonth()+1)<10 ? ('0' + (today.getMonth()+1)) : (today.getMonth()+1)) +'-'+today.getDate();
    const time = (today.getHours() < 10 ? ('0' + today.getHours()) : today.getHours()) + ":" + (today.getMinutes()<10 ? ('0' + today.getMinutes()): today.getMinutes());
    const datetime = date + ' ' + time;

    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const date_end = tomorrow.getFullYear()+'-'+((tomorrow.getMonth()+1)<10 ? ('0' + (tomorrow.getMonth()+1)) : (tomorrow.getMonth()+1)) +'-'+ (tomorrow.getDate()<10 ? ('0' + tomorrow.getDate()) : (tomorrow.getDate()));
    const time_end = (tomorrow.getHours() < 10 ? ('0' + tomorrow.getHours()) : tomorrow.getHours()) + ":" + (tomorrow.getMinutes()<10 ? ('0' + tomorrow.getMinutes()): tomorrow.getMinutes());
    // const datetime2 = date_end + 'T' + time_end;
  

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


  const handleTextDesc = event => {
    setTextDesc(event.target.value);
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
                        rows={4}
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
