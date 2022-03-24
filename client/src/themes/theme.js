import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'dark',
    mode:'dark',
    primary: {
      main: '#ffffff',
      contrastText: 'rgba(203,203,203,0.87)',
    },
    secondary: {
      main: '#020914',
    },
    background: {
      default: '#020914',
      paper: '#192229',
    },
    text: {
      primary: '#f1f1f1',
    },
    info: {
      main: '#dde0e0',
    },
  },
  shape: {
    borderRadius: 1,
  },
  // typography:{
  //   h2:{
  //     fontFamily:[
  //       'Quicksand',
  //       'Helvetica',
  //       'sans-serif'
  //     ].join(','),
  //   }
  // }
});

export default theme;