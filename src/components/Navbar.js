import React from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import TypoGraphy from '@material-ui/core/Typography'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { makeStyles } from '@material-ui/core/styles';
// import history from './history';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    button: {
      marginRight: theme.spacing(2),
    }, 
    rightBar: {
      marginLeft: 'auto',
  }, 
}));

function NavBar(props) {
    //let history = useHistory();
    const classes = useStyles();
    const handleClick = (link) => {

    //   history.push(link);
      window.location.href = link;
    }

    return (
      <div className={classes.root}>
      <AppBar color="primary" position="static" >
      <Toolbar>
        <TypoGraphy  color="inherit" variant="title">
        Bart todo
        </TypoGraphy>              
           
         <div className={classes.rightBar}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={()=>handleClick("/add/")}
                >
        Add
      </Button>
                
                   <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<ListAltIcon />}
                    onClick={()=>handleClick("/")}
                >
        List
      </Button>
      </div>
      </Toolbar>
    </AppBar>         
    </div> 
    )
}


export default NavBar;
