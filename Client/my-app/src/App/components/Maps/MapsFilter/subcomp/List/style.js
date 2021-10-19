import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  formControl: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: 100,
    marginBottom: '10px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    height: '73vh',
    padding: '2px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'scroll',
  },
  marginBottom: {
    marginBottom: '10px',
  },
  list: {
    overflowY: 'scroll',
    margin: 'auto',
  },
}));
