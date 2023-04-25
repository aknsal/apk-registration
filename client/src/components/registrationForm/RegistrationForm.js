import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Textfield from '../formUI/Textfield';
import { Button, CircularProgress,TextField,MenuItem, Grid, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setIsAuthenticated } from '../../redux/appSlice';
import axios from 'axios';

import { elementAcceptingRef } from '@mui/utils';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));



const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;



  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({ eventDetails }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const user = useSelector(state => state.app.authUser);
  const [userLoaded, setUserLoaded] = React.useState(false);
  const [submitloader, setSubmitLoader] = React.useState(false);
  const [areDetailsRequired, setAreDetailsRequired] = React.useState(false);
  const [isWhatsappNumberReq, setIsWhatsappNumberReq] = React.useState(false);
  const [isgithubUsernameReq, setIsGithubUsernameReq] = React.useState(false);
  const [isTeamEvent, setIsTeamEvent] = React.useState(false);
  const [eventTeamSize, setEventTeamSize] = React.useState(0);
  const [chosenTeamsize, setChosenTeamsize] = React.useState(0);
  const [teamSizeOptions, setTeamsizeOptions] = React.useState(null);

  // const INITIAL_FORM_STATE = {
  //   whatsappNumber:"",
  // }


  // console.log("Event Details", eventDetails );

  

  if (user && !userLoaded && Object.keys(eventDetails).length !== 0) {

    setUserLoaded(true);
    if(eventDetails.teamSize !== "1"){
      setIsTeamEvent(true);
      setEventTeamSize(parseInt(eventDetails.teamSize));
      setChosenTeamsize(eventDetails.teamSize);
      let minTeamSize = eventDetails.minTeamSize;
      let maxTeamSize = eventDetails.teamSize;
      let tempTeamOption = [];
      for(let i=minTeamSize ;i<=maxTeamSize;i++){
        tempTeamOption.push({
          value: i,
          label: i.toString()
        })
      }
      console.log(tempTeamOption);
      setTeamsizeOptions(tempTeamOption);

    }
    if (eventDetails.Inputs.find(ele => ele.inputVar === 'whatsappNumber') && !user.whatsappNumber) {
      setIsWhatsappNumberReq(true);
      setAreDetailsRequired(true);
    }

    if (eventDetails.Inputs.find(ele => ele.inputVar === 'githubUsername') && !user.githubUsername) {
      setIsGithubUsernameReq(true);
      setAreDetailsRequired(true);
    }
  }


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const INITIAL_FORM_STATE = {
    whatsappNumber: "",
    githubUsername:""
  }

  const INITIAL_FORM_STATE_TEAM = {
    username0:"",
    username1:"",
    username2:"",
    username3:"",
    whatsappNumber: "",
    githubUsername:"",
    teamName:"",
    chosenTeamsize:""
  }

  if(user && !INITIAL_FORM_STATE.username0){
    INITIAL_FORM_STATE_TEAM.username0 = user.username;
  }


  
  

  // if(user && !INITIAL_FORM_STATE.email){
  //   INITIAL_FORM_STATE.email = user.email;

  //   if(user.whatsappNumber){
  //     INITIAL_FORM_STATE.whatsappNumber = user.whatsappNumber;
  //   }
  // }

  const requiredStringSchema = Yup.string().required('Required Field');
  const requiredNumberSchema = Yup.number().required('Required Field');
  const checkTeamMates = Yup.string().test("username", "The User has not registered", function (username) {
    return checkUserRegistered(username);
  })
  const checkTeamMatesifAlreadyRegisteredForEvent = Yup.string().test("username", "The User has already registered for this event", function (username) {
    return checkUserRegisteredForEvent(username);
  })
  const checkTeamName = Yup.string().test("username", "Someone already stole your team name", function (teamName) {
    return checkTeamNameForEvent(teamName);
  })

  const checkUserRegistered = async (username) =>{
    const getUser = await axios.get(`http://localhost:5000/api/checkusername/${username}`).catch(err=>console.log("Error checking username",err))
    if(getUser){
      if(getUser.data.message==="User has Registered"){
        return true;
      }
      else{
        return false;
      }
    }
  }

  const checkUserRegisteredForEvent = async (username) =>{
    const getUser = await axios.get(`http://localhost:5000/api/check/user/event/reg/${username}/${eventDetails.eventCode}`).catch(err=>console.log("Error checking username",err))
    if(getUser){
      if(getUser.data.message==="User already registered for this event"){
        return false;
      }
      else{
        return true;
      }
    }
  }

  const checkTeamNameForEvent = async (teamName) =>{
    const teamNameCheck = await axios.get(`http://localhost:5000/api/check/teamname/${teamName}/${eventDetails.id}`).catch(err=>console.log("Error checking username",err))
    if(teamNameCheck){
      console.log("teamNameCheck",teamNameCheck.data,eventDetails.eventId);
      if(teamNameCheck.data.message==="Team name already exist"){
        return false;
      }
      else{
        return true;
      }
    }
  }

  const FORM_VALIDATION = Yup.object().shape({
    whatsappNumber: Yup.number()
      .integer()
      .typeError('Please eneter a valid phone number')
      .test(('len', 'Must be exactly 10 characters', val => !val ||val.toString().length === 10 ))  //phone number not exist or is equal to 10
      .concat(isWhatsappNumberReq? requiredNumberSchema :null ),
    githubUsername: Yup.string()
      .concat(isgithubUsernameReq ? requiredStringSchema : null)
  })

  const FORM_VALIDATION_TEAM = Yup.object().shape({
    whatsappNumber: Yup.number()
      .integer()
      .typeError('Please eneter a valid phone number')
      .test(('len', 'Must be exactly 10 characters', val => !val ||val.toString().length === 10 ))  //phone number not exist or is equal to 10
      .concat(isWhatsappNumberReq? requiredNumberSchema :null ),
    githubUsername: Yup.string()
      .concat(isgithubUsernameReq ? requiredStringSchema : null),
    username1: Yup.string()
      .concat(chosenTeamsize>1 ? checkTeamMates : null)
      .concat(eventTeamSize>1 ? checkTeamMatesifAlreadyRegisteredForEvent : null)
      .concat(chosenTeamsize>1 ? requiredStringSchema : null),
    username2: Yup.string()
      .concat(chosenTeamsize>2 ?  checkTeamMates : null)
      .concat(eventTeamSize>1 ? checkTeamMatesifAlreadyRegisteredForEvent : null)
      .concat(chosenTeamsize>2 ? requiredStringSchema : null),
    username3: Yup.string()
      .concat(chosenTeamsize>3 ?  checkTeamMates : null)
      .concat(eventTeamSize>1 ? checkTeamMatesifAlreadyRegisteredForEvent : null)
      .concat(chosenTeamsize>3 ? requiredStringSchema : null),
      teamName:Yup.string()
      .concat(checkTeamName)
      .required("Team name is Required")
  })



  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    setSubmitLoader(true);

    const response = await axios.post(`http://localhost:5000/api/registeruser/${eventDetails.eventCode}`, { ...values }, { withCredentials: true }).catch((err) => {
      console.log("Error while updating", err);
    })
    if (response && response.data) {
      if (response.data.message == "User registered for event") {
        console.log("User registered for event");
      }
    }


    const userData = await axios.get("http://localhost:5000/api/auth/user", { withCredentials: true }).catch((err) => {
      console.log("Not properly authenticated", err);
      dispatch(setIsAuthenticated(false));
      dispatch(setAuthUser(null));
    });

    if (userData && userData.data) {
      dispatch(setIsAuthenticated(true));
      dispatch(setAuthUser(userData.data));
    }

    setSubmitLoader(false);

    navigate('/dashboard');
  }

  const handleDirectRegister = async(values) => {

    setSubmitLoader(true);

    const response = await axios.post(`http://localhost:5000/api/directregister/${eventDetails.eventCode}`,{email:user.email}, { withCredentials: true }).catch((err) => {
      console.log("Error while updating", err);
    })
    if (response && response.data) {
      if (response.data.message == "User registered for event") {
        console.log("User registered for event");
      }
    }


    const userData = await axios.get("http://localhost:5000/api/auth/user", { withCredentials: true }).catch((err) => {
      console.log("Not properly authenticated", err);
      dispatch(setIsAuthenticated(false));
      dispatch(setAuthUser(null));
    });

    if (userData && userData.data) {
      dispatch(setIsAuthenticated(true));
      dispatch(setAuthUser(userData.data));
    }

    setSubmitLoader(false);

    navigate('/dashboard');

  }

  const handleTeamSubmit = async(values) => {
    setSubmitLoader(true);
    console.log(values);
    const response = await axios.post(`http://localhost:5000/api/registerteam/${eventDetails.eventCode}`, { ...values, chosenTeamsize }, { withCredentials: true }).catch((err) => {
      console.log("Error while updating", err);
    })
    if (response && response.data) {
      if (response.data.message == "Team registered for event") {
        console.log("Team registered for event");
      }
    }

    const userData = await axios.get("http://localhost:5000/api/auth/user", { withCredentials: true }).catch((err) => {
      console.log("Not properly authenticated", err);
      dispatch(setIsAuthenticated(false));
      dispatch(setAuthUser(null));
    });

    if (userData && userData.data) {
      dispatch(setIsAuthenticated(true));
      dispatch(setAuthUser(userData.data));
    }


    setSubmitLoader(false);
    navigate('/dashboard');

  }

  const logValues = (values) => {
    console.log(values);
  }

  const handleChosenTeamSize = (event) => {
    setChosenTeamsize(event.target.value);
  };

  const ref = React.useRef(null);

  return (
    <div>
      <Button variant="contained" color='success' onClick={handleClickOpen}>
        Register
      </Button>

    { isTeamEvent ? 

<BootstrapDialog
onClose={handleClose}
aria-labelledby="customized-dialog-title"
open={open}
>

  <Formik
    innerRef={ref}
    enableReinitialize={true}
    initialValues={{
      ...INITIAL_FORM_STATE_TEAM
    }}
    validationSchema={FORM_VALIDATION_TEAM}
    validateOnChange={false}
    validateOnBlur={false}
    onSubmit={handleTeamSubmit}
  >

    <Form>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Fill Team Details
      </BootstrapDialogTitle>
      <DialogContent dividers>





        <Grid container spacing={4} >

              <Grid item xs={12} lg={12} >
                <Textfield name="teamName" label="Team Name"  />
            </Grid>

            <Grid item xs={12} lg={12} >
              <Textfield select label="Team Size" name="chosenTeamsize" value={chosenTeamsize} onChange={handleChosenTeamSize} >
                    {console.log("TeamOpt", ref)}
                          {teamSizeOptions.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                              </MenuItem>
                          ))}
              </Textfield>
            </Grid>

            
            

            <Grid item xs={12} lg={12} >
                <Textfield disabled name="username0" label="Participant 0"  />
            </Grid> 



            {chosenTeamsize > 1 ? 
            <Grid item xs={12} lg={12} >
                <Textfield name="username1" label="Participant 1"  />
            </Grid>  : null }

            {chosenTeamsize > 2 ? 
            <Grid item xs={12} lg={12} >
                <Textfield name="username2" label="Participant 2" />
            </Grid>  : null }

            {chosenTeamsize > 3 ? 
            <Grid item xs={12} lg={12} >
                <Textfield name="username3" label="Participant 3" />
            </Grid>  : null }

            {isWhatsappNumberReq ?
              <Grid item xs={12} lg={12} >
                <Textfield name="whatsappNumber" label="Whatsapp Number" />
              </Grid> : null}

              {isgithubUsernameReq ?
              <Grid item xs={12} lg={12} >
                <Textfield name="githubUsername" label="Github Username" />
              </Grid> : null}



        </Grid>
        <div className='profile-button-container'>

        </div>


      </DialogContent>
      <DialogActions>
        <Button variant='contained' type="submit" color="success" size="large"> Submit {submitloader ? <CircularProgress style={{ marginLeft: 8 }} size="1rem" /> : null} </Button>
      </DialogActions>



    </Form>

  </Formik>
</BootstrapDialog>
:



    <div>
      {areDetailsRequired ?
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >

          <Formik
            enableReinitialize={true}
            initialValues={{
              ...INITIAL_FORM_STATE
            }}
            validationSchema={FORM_VALIDATION}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={handleSubmit}
          >

            <Form>
              <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                Fill Details
              </BootstrapDialogTitle>
              <DialogContent dividers>





                <Grid container spacing={4} >

                    {isWhatsappNumberReq ?
                      <Grid item xs={12} lg={12} >
                        <Textfield name="whatsappNumber" label="Whatsapp Number" />
                      </Grid> : null}

                      {isgithubUsernameReq ?
                      <Grid item xs={12} lg={12} >
                        <Textfield name="githubUsername" label="Github Username" />
                      </Grid> : null}



                </Grid>
                <div className='profile-button-container'>

                </div>


              </DialogContent>
              <DialogActions>
                <Button variant='contained' type="submit" color="success" size="large"> Submit {submitloader ? <CircularProgress style={{ marginLeft: 8 }} size="1rem" /> : null} </Button>
              </DialogActions>



            </Form>

          </Formik>
      </BootstrapDialog>
          :
          <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            Confirm
        </BootstrapDialogTitle>
        <DialogContent dividers>     
          <Typography>Are you sure you want to register</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' type="submit" onClick={handleDirectRegister} color="success" size="large"> Submit {submitloader ? <CircularProgress style={{ marginLeft: 8 }} size="1rem" /> : null} </Button>
        </DialogActions>
      </BootstrapDialog>
        }

</div>
}
    </div>
  );
}
