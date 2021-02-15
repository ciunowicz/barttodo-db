import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: '#FAFAFA',
      minWidth: 460,
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
      display: 'flex',
      width: 190,
    },
    divForm: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      display: 'flex',
    },
    formControl: {
      minWidth: 200,
    },
     typography: {
     display: 'flex',
     justifyContent: 'flex-end',
     paddingBottom: 8,
    },
    typographyList: {
    whiteSpace: 'pre-line',
    [theme.breakpoints.down('md')]: {
      fontSize: 14,
  },
    },
    select: {
      marginBottom: theme.spacing(2),
    },
    container: {
      flexGrow: 1,
      marginTop: theme.spacing(1),
    },
    button: {
      marginLeft: 'auto',
      display: 'flex',
    },
    list: {
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
      paddingBottom: 0,
      marginBottom: 0, 
      
    },
    gridcontainer: {
      flexDirection: 'column',
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

  export default useStyles;