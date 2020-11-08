import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
// import TypoGraphy from '@material-ui/core/Typography';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { useHistory } from 'react-router-dom';



function NavBar(props) {
    let history = useHistory();

    const handleClick = (link) => {

        history.push(link);
    }

    return (
        
        <List component="nav">
            <ListItem component="div" >
               
                <ListItemText >
                <Button
                    variant="contained"
                    color="primary"
                    // className={classes.button}
                    style={{margin: 4}}
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={()=>handleClick("/add/")}
                >
        Add
      </Button>
                </ListItemText>

                <ListItemText >
                    {/* <TypoGraphy color="inherit" variant="subtitle1" onClick={()=>handleClick("/")} style={{cursor: 'pointer'}}><ListAltIcon /></TypoGraphy> */}
                
                   <Button
                    variant="contained"
                    color="primary"
                    style={{margin: 4}}
                    // className={classes.button}
                    startIcon={<ListAltIcon />}
                    onClick={()=>handleClick("/")}
                >
        List
      </Button>
                </ListItemText>

            </ListItem >

        </List>
    )
}


export default NavBar;
