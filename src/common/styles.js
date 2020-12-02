import { makeStyles } from '@material-ui/core/styles';

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
     /*  marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),  */
      display: 'flex',
      width: 190,
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
    select: {
      marginBottom: theme.spacing(2),
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
    cardActions: {
      display: 'flex',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column-reverse',
    },
    },
  }));

  export default useStyles;