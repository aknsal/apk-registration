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
  typography:{
    h2:{
      fontFamily:[
        'Quicksand',
        'Helvetica',
        'sans-serif'
      ].join(','),
    },
    fontFamily:[
      'poppins',
      'sans-serif'
    ].join(','),
  },


  //  part of novu color scheme not mui pallete
  notificationStyles : {
    bellButton:{
      root:{
        color:'#ffffff',
      },
      dot:{
        color:"#ffffff"
      }
    },
    notifications: {
      listItem: { 
        layout: { color: "#ffffff" },
        unread:{
          background: "#52606b"
        },
        read:{
          background: "#424e57"
        },
        timestamp:{
          color: '#f0f0f0'
        }
      },
      
    },
    layout: {
      root : {
        backgroundColor: '#2F383E',
        borderRadius: '0',
        border: '1px solid #878787'

      }
    },
    popover:{
      arrow:{
        display:'none'
      }
    },
    header:{
      markAsRead:{
        color:'#ffffff'
      }
    }
  }
});

const lightTheme = createTheme({
  palette: {
    type: 'light', // Set the theme type to light
    mode: 'light', // Set the mode to light

    // Adjust primary and secondary colors
    primary: {
      main: '#020914', // Change to your desired color
      contrastText: '#f1f1f1', // Change to your desired text color
    },
    secondary: {
      main: '#ffffff', // Change to your desired color
      contrastText: 'rgba(0, 0, 0, 0.87)', // Change to your desired text color
    },

    // Adjust background and text colors
    background: {
      default: '#f1f1f1', // Change to your desired default background color
      paper: '#ffffff', // Change to your desired paper background color
    },
    text: {
      primary: '#020914', // Change to your desired text color
    },

    // Adjust info color if needed
    info: {
      main: '#020914', // Change to your desired color
    },
  },
  shape: {
    borderRadius: 1,
  },
  typography: {
    h2: {
      fontFamily: ['Quicksand', 'Helvetica', 'sans-serif'].join(','),
    },
    fontFamily: ['poppins', 'sans-serif'].join(','),
  },
});

const darkTheme = createTheme({
  palette: {
    type: 'dark', // Set the theme type to light
    mode: 'dark', // Set the mode to light

    // Adjust primary and secondary colors
    primary: {
      main: '#76ABAE', // Change to your desired color
      contrastText: '#f1f1f1', // Change to your desired text color
    },
    secondary: {
      main: '#ffffff', // Change to your desired color
      contrastText: 'rgba(0, 0, 0, 0.87)', // Change to your desired text color
    },

    // Adjust background and text colors
    background: {
      default: '#222831', // Change to your desired default background color
      paper: '#31363F', // Change to your desired paper background color
    },
    text: {
      primary: '#EEEEEE', // Change to your desired text color
    },

    // Adjust info color if needed
    info: {
      main: '#31363F', // Change to your desired color
    },
  },
  shape: {
    borderRadius: 1,
  },
  typography: {
    h2: {
      fontFamily: ['Quicksand', 'Helvetica', 'sans-serif'].join(','),
    },
    fontFamily: ['poppins', 'sans-serif'].join(','),
  },

  notificationStyles : {
    notifications: {
      listItem: { 
        layout: { color: "#ffffff" } 
      }
    },
    layout: {
      root : {
        backgroundColor: '#192229',
        borderRadius: '#ffffff'
      }
    }
  }
});

export default theme;