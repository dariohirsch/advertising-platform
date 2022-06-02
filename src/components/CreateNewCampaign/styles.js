import colors from '../../config/colors';
import { makeStyles } from '@mui/styles';

export const formStyles = makeStyles({
  mainContainer: {
    height: '80vh',
    justifyContent: 'flex-start',
    marginLeft: 16,
    marginTop: 16,
  },
  bar: {
    marginBottom: 110,
    marginTop: 20,
  },
  imageContainer: {
    position: 'relative',
    width: 260,
    height: 380,
    marginBottom: '1rem',
    border: '0.8px solid rgb(133, 133, 133)',
    '&:hover': {
      border: '0.8px solid black',
    },
  },

  imageFit: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
  backButton: {
    backgroundColor: colors.primary,
    border: '1px solid rgba(0, 0, 0, 0.5)',
    color: '#7D7D7D',
    width: '30%',
    marginTop: '1.5rem',
    '&:hover': {
      background: 'none',
    },
  },
  storyButton: {
    width: '100%',
  },
  textField: {
    width: '100%',
    marginBottom: '2rem',
  },
  submitButton: {
    backgroundColor: 'black',
    width: '60%',
    marginTop: '1.5rem',
    '&:hover': {
      background: colors.black,
    },
  },
  imageContainer2: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButton: {
    position: 'absolute',
    marginLeft: 'auto',
    marginLight: 'auto',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'white',
  },
});
