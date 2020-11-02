import React , { useState, useEffect  } from 'react';
import { useHistory } from 'react-router-dom';
// import data from '../Data';
import {dbInsert, maxLink} from '../Db';

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
  }));


const Create = ()=> {
   
    const classes = useStyles();
    let history = useHistory();
    const [text, setText] = useState('');
    const [datetime_end, setDatetime_end] = useState('');
    
    let today = new Date();

    const date = today.getFullYear()+'-'+((today.getMonth()+1)<10 ? ('0' + (today.getMonth()+1)) : (today.getMonth()+1)) +'-'+today.getDate();
    const time = (today.getHours() < 10 ? ('0' + today.getHours()) : today.getHours()) + ":" + (today.getMinutes()<10 ? ('0' + today.getMinutes()): today.getMinutes());
    const datetime = date + ' ' + time;

    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const date_end = tomorrow.getFullYear()+'-'+((tomorrow.getMonth()+1)<10 ? ('0' + (tomorrow.getMonth()+1)) : (tomorrow.getMonth()+1)) +'-'+ (tomorrow.getDate()<10 ? ('0' + tomorrow.getDate()) : (tomorrow.getDate()));
    const time_end = (tomorrow.getHours() < 10 ? ('0' + tomorrow.getHours()) : tomorrow.getHours()) + ":" + (tomorrow.getMinutes()<10 ? ('0' + tomorrow.getMinutes()): tomorrow.getMinutes());
    const datetime2 = date_end + 'T' + time_end;
  

   


async function Save() {
  
  if(text.trim().length < 5) {
    alert('Wpisz tekst więcej niż 5 znaków');
    return;
}

    const response = await fetch(maxLink);
    const todo = await response.json();
    let idx = 0;
    const data_e = new Date(datetime_end + ":00.000Z");
    
    const data_ez = data_e.toISOString();

    const data_c = new Date(datetime + ":00.000Z");
    const data_cz = data_c.toISOString();

    if( todo.length > 0 ) { idx = todo[0].id; }
    const maxId = idx + 1;
    const rec = {id: maxId, text: text, created: data_cz, end: data_ez, completed: false};

    dbInsert(rec);

        history.push('/');
  
  }

  const handleText = event => {
     setText(event.target.value);
  }
  
  const handleData = event => {
    setDatetime_end(event.target.value);
  }

  useEffect(() => {

    setDatetime_end(datetime2);
  },[datetime2])


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
                   
          <CardActions disableSpacing style={{display: 'flex',justifyContent: 'space-between'}}>
               
  
                <IconButton aria-label="save" onClick={Save}> 
                     <SaveIcon />
                </IconButton>
  
                    
              <TextField  className={classes.textFieldDate}
                  id="datetime-local"
                  label="End"
                  type="datetime-local"
                  defaultValue={datetime2}
                  value={datetime_end}
                  onChange={handleData}
                  InputLabelProps={{
                  shrink: true,
                  }}
                />
          </CardActions>
    </Card>
  </Grid>
  </Grid>  
</Container>;
}

export default Create;
