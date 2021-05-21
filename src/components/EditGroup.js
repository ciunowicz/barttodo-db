import React , { useState, useEffect  } from 'react';
//import { useHistory } from 'react-router-dom';
// import data from '../Data';
// import history from '../history';
import { addNoteLink, getdbDesc, dbSaveNote, dbDelete, deleteGroupLink} from '../common/Db';
import useStyles from '../common/styles';
import {
    Card,
    CardActions,
    IconButton
  } from '@material-ui/core';
  
  import {Grid} from '@material-ui/core';
  import TextField from '@material-ui/core/TextField';
  import SaveIcon from '@material-ui/icons/Save';
  import Container from '@material-ui/core/Container';
  import DeleteIcon from '@material-ui/icons/Delete';
  import Select from '@material-ui/core/Select';
  import MenuItem from '@material-ui/core/MenuItem';
  import InputLabel from '@material-ui/core/InputLabel';
  import FormControl from '@material-ui/core/FormControl';

  

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
     console.log(event.target)
    setDesc_id(event.target.value);
  }
   const loadData  = () => {
    
    getdbDesc().then((data) => { setDesc(data); setDesc_id(data[0]._id) }).catch(reason => console.log(reason.message))
  }

  const Delete = () => {
    if( window.confirm("Delete selected note group?") ) {
      dbDelete(deleteGroupLink + desc_id,false);
     
      setTimeout(loadData ,1500);
    }
  }

  function SaveNoteGroup() {

    if(textDesc.trim().length < 4) {
      alert('Wpisz tekst dłuższy niż 4 znaki');
      return;
  }

    let rec = {text: textDesc};
    
    dbSaveNote(rec,addNoteLink);
    setTextDesc('');
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
          <FormControl    className={classes.formControl}>
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
        </FormControl>
        </div>

        <div className={classes.divForm} style={{paddingTop: '10px'}}>
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
