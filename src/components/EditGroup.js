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
  import { makeStyles } from '@material-ui/core/styles';
  import Container from '@material-ui/core/Container';
  import Typography from '@material-ui/core/Typography';
  import DeleteIcon from '@material-ui/icons/Delete';
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
    
    
    divForm: {
      marginTop: theme.spacing(2),
     
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

const EditGroup = ()=> {
   
    const classes = useStyles();
    const [textDesc, setTextDesc] = useState('');
    const [desc_id, setDesc_id] = useState('')
    const [desc, setDesc] = useState([]);

    const CHARACTER_LIMIT = 22;


    const handleTextDesc = event => {
      setTextDesc(event.target.value);
   }

   const handleIdDesc = event => {
    setDesc_id(event.target.value);
  }
   const loadData  = () => {
    
    getdbDesc().then((data) => { setDesc(data); setDesc_id(data[0]._id) }).catch(reason => console.log(reason.message))
  }

  const Delete = () => {

  }

  function SaveNoteGroup() {

    if(textDesc.trim().length < 4) {
      alert('Wpisz tekst dłuższy niż 4 znaki');
      return;
  }

    let rec = {text: textDesc};
    
    dbSaveNote(rec,addNoteLink);
  
    setTimeout( loadData ,1000);
  
  }

  useEffect(() => {
    // setTimeout(reloadIt, 1000);
loadData();
   
   
  },[])


      return <Container className={classes.container} maxWidth="sm" > 
           <Grid container spacing={3} style={{ display: 'flex', justifyContent: 'center'}} >
              
  <Grid item >
          <Card  className={classes.root}> 
          {/* zamienić div na typography */}
          <div className={classes.divForm}>
          <TextField
            className={classes.textFieldName}
              id="standard-helperText"
              label="add Name"
              inputProps={{
                maxlength: CHARACTER_LIMIT
              }}
              helperText="note group name"
              value={textDesc}
              onChange={handleTextDesc}
        />
        </div>

        <div className={classes.divForm} >
            <FormControl    className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper" >Name</InputLabel>
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
            <CardActions disableSpacing >
            <div className={classes.cardActions}>
            <IconButton style={{marginLeft: 'auto' }} aria-label="save" onClick={SaveNoteGroup}> 
                     <SaveIcon />
                </IconButton>
            <IconButton aria-label="delete" style={{marginLeft: 'auto' }} onClick={()=>Delete()}>
                    <DeleteIcon />
                </IconButton>   
                </div>
          </CardActions>
 
    </Card>

    


  </Grid>
  </Grid>  
</Container>;
}

// export default withRouter(Create);
export default EditGroup;
