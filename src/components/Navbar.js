import React, { useState} from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import TypoGraphy from '@material-ui/core/Typography'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import EditIcon from "@material-ui/icons/Edit";


// import history from './history';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    button: {
      marginRight: theme.spacing(2),
    }, 
    menuButton: {
      marginRight: theme.spacing(2),
    },
    rightToolbar: {
      marginLeft: "auto",
      marginRight: -12
    },
  title: {
    cursor: 'pointer',
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
      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          
          </IconButton>
          <TypoGraphy variant="subtitle1" className={classes.title} color="inherit" onClick={()=>handleClick("/")}>
          Barttodo
        </TypoGraphy>          
       
        <section className={classes.rightToolbar}>
               {/*  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={()=>handleClick("/add/")}
                >
        Add
      </Button> */}

<IconButton color="inherit" aria-label="Edit" onClick={()=>handleClick("/add/")}>
            <EditIcon />
          </IconButton>
                
                   {/* <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<ListAltIcon />}
                    onClick={()=>handleClick("/")}
                >
        List
      </Button> */}
<IconButton color="inherit" aria-label="ListAlt"  onClick={()=>handleClick("/")}>
            <ListAltIcon />
          </IconButton>

      </section>
      </Toolbar>
    </AppBar>         
    </div> 
    )
}


export default NavBar;
