import React, { useEffect, useState } from 'react'
import { Typography, TextField, Paper, MenuItem, Button, Grid, Checkbox, FormGroup, FormControlLabel, ButtonBase, InputAdornment } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import "./AddEvent.css"
import CircularProgress from '@mui/material/CircularProgress';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Textfield from "../formUI/Textfield"
import CustomCheckbox from "../formUI/CustomCheckbox"
import toast, { Toaster } from 'react-hot-toast';

const useStyles = makeStyles(theme => ({
    root: {
        "& .MuiFormLabel-root": {
            color: "#9e9e9e" // or black
        },
        // "& $notchedOutline": {
        //     borderColor: "#9e9e9e"
        // }
    }
}));


const categories = [
    {
        value: 'Development',
        label: 'Development',
    },
    {
        value: 'Design',
        label: 'Design',
    },
    {
        value: 'Coding',
        label: 'Coding',
    },
    {
        value: 'Blockchain',
        label: 'Blockchain',
    },
];

const modes = [
    {
        value: 'online',
        label: 'Online',
    },
    {
        value: 'offline',
        label: 'Offline',
    }
];

const teamSizes = [
    {
        value: 1,
        label: 'Individual',
    },
    {
        value: 2,
        label: '2',
    },
    {
        value: 3,
        label: '3'
    },
    {
        value: 4,
        label: '4',
    },
];

const totalRounds = [
    {
        value: 1,
        label: '1',
    },
    {
        value: 2,
        label: '2',
    },
    {
        value: 3,
        label: '3'
    },
    {
        value: 4,
        label: '4',
    },
];

export default function AddEvent() {
    const classes = useStyles();


    const INITIAL_FORM_STATE = {
        eventName: '',
        eventCode: '',
        about: '',
        teamSize: 1,
        rounds: 1,
        category: 'Development',
        mode: 'online',
        date: '', // Placeholder for the date field
        prizes: '',
        organiser1: '',
        organiser2: '',
        organiser3: '',

        // Do not change the below variable names... 
        // They are checked in the backend to match the inputs in the input table
        contactNumber: false,
        githubID: false,
        liChessID: false,
        
        
    }

    const [eventName, setEventName] = useState("");
    const [eventCode, setEventCode] = useState("");
    const [about, setAbout] = useState("");
    const [category, setCategory] = useState("");
    const [teamSize, setTeamSize] = useState(1);
    const [rounds, setRounds] = useState(1);
    const [prizes, setPrizes] = useState("");
    // const [organiser1, setOrganiser1] = useState("");
    // const [organiser1Error, setOrganiser1Error] = useState(false);
    // const [organiser1Success, setOrganiser1Success] = useState(false);
    // const [organiser1Loader, setOrganiser1Loader] = useState(false);
    // const [organiser1ErrorMessage, setOrganiser1ErrorMessage] = useState("");
    // const [organiser2, setOrganiser2] = useState("");
    // const [organiser2Error, setOrganiser2Error] = useState(false);
    // const [organiser2Success, setOrganiser2Success] = useState(false);
    // const [organiser2Loader, setOrganiser2Loader] = useState(false);
    // const [organiser2ErrorMessage, setOrganiser2ErrorMessage] = useState("");
    // const [organiser3, setOrganiser3] = useState("");
    // const [organiser3Error, setOrganiser3Error] = useState(false);
    // const [organiser3Success, setOrganiser3Success] = useState(false);
    // const [organiser3Loader, setOrganiser3Loader] = useState(false);
    // const [organiser3ErrorMessage, setOrganiser3ErrorMessage] = useState("");
    const [date, setDate] = useState("");
    const [selectedImage1, setSelectedImage1] = useState('');
    const [imagePublicId1, setImagePublicId1] = useState('');
    const [imageLoad1, setImageLoad1] = useState(false);
    const [image1URL, setImage1URL] = useState("");
    const [image2URL, setImage2URL] = useState("");
    const [selectedImage2, setSelectedImage2] = useState('');
    const [imagePublicId2, setImagePublicId2] = useState('');
    const [imageLoad2, setImageLoad2] = useState(false);
    const [inputData, setInputData] = useState([]);
    const [submitLoaderFinal, setSubmitLoaderFinal ] = useState(false);

    const [whatsappNumber, setWhatsappNumber] = useState(false);
    const [githubUsername, setGithubUsername] = useState(false);



    // const [isCheckedInputData, setIsCheckedInputData] = useState({});
    // const [isEventNameError, setIsEventNameError] = useState(false); 


    // useEffect(async() => {
    //     const inputDataObj = await axios.get("http://localhost:5000/api/getinput", {withCredentials:true}).catch((err)=> 
    //     console.log("Error getiing input Details",err)
    //     )
    //     if(inputDataObj){
    //         setInputData(inputDataObj.data);
    //         inputDataObj.forEach((input) => {
    //             setIsCheckedInputData({...isCheckedInputData, input.inputVar})
    //         });
    //     }
    // },[])


    const navigate = useNavigate();

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };

    const handleChangeTeamSize = (e) => {
        setTeamSize(e.target.value);
    }

    const handleChangeRounds = (e) => {
        setRounds(e.target.value);
    }

    const uploadImage1 = async () => {
        setImageLoad1(true);
        const formData = new FormData();
        formData.append("file", selectedImage1);
        formData.append("upload_preset", "Aparoksha");
        axios.post("https://api.cloudinary.com/v1_1/dm7azk7jr/image/upload", formData).then((res) => {

            setImagePublicId1(res.data.public_id);
            setImage1URL(res.data.secure_url);
            setImageLoad1(false);
            console.log(res.data);

        }).catch((err) => {
            console.log(err);
            setImageLoad1(false);
        })
    }

    const uploadImage2 = async () => {
        setImageLoad2(true);
        const formData = new FormData();
        formData.append("file", selectedImage2);
        formData.append("upload_preset", "Aparoksha");
        axios.post("https://api.cloudinary.com/v1_1/dm7azk7jr/image/upload", formData).then((res) => {

            setImagePublicId2(res.data.public_id);
            setImage2URL(res.data.secure_url);
            setImageLoad2(false);

        }).catch((err) => {
            console.log(err);
            setImageLoad2(false);
        })
    }


    const checkOrganiser = async (organiser) => {
        const response = await axios.get(`http://localhost:5000/api/getuser/${organiser}`).catch((err) => console.log("Error getting user"))
        if (response && response.data) {
            if (response.data.isRegistered) {
                return 'valid organiser'
            }
            if (!response.data.isRegistered) {
                return 'Organiser not registered'
            }
            if (response.data.isRegistered && !response.data.contactNumber) {
                return 'Organiser does not have a contact number'
            }
        }
        return 'Some error Occurred'
    }

    const handleSubmitForm = async (values) => {
        setSubmitLoaderFinal(true);
        console.log(values);

        // SetRequiredFields
        


        const {eventName, about, category, teamSize, rounds, prizes, organiser1, organiser2, organiser3, date, eventCode, whatsappNumber, githubUsername} = values
        

        console.log({...values, image1URL, image2URL});
        const response = await axios.post("http://localhost:5000/api/addevent", {...values, image1URL, image2URL}, { withCredentials: true }).catch((err) => {
            console.log("There was a problem adding event", err);
            toast.error("Error adding event: ", err)
            setSubmitLoaderFinal(false);
        });
        if (response) {
            console.log("Event added successfully", response);
            toast.success("Event added successfully")
            navigate("/events");
        }
        setSubmitLoaderFinal(false);
    }

    const organiserRule = Yup.string().test("organiser", async function (organiser, {createError, path}){
        if(!organiser || organiser==='') return true;
        console.log(organiser);
        const message = await checkOrganiser(organiser)
        console.log(message);
        if(message==='valid organiser'){
            return true;
        }
        return createError({
            path,
            message: message,
        })
    }) 

    const FORM_VALIDATION = Yup.object().shape({
        organiser1: organiserRule,
        organiser2: organiserRule,
        organiser3: organiserRule
      })

    return (
        <div className='add-event-super-container'>
            <Toaster 
                toastOptions={{
                    // Define default options
                    className: '',
                    duration: 5000,
                    style: {
                      background: '#363636',
                      color: '#fff',
                    },
                  }}
            />
            <Paper className='add-event-container'>


                <Formik
                    initialValues={{
                        ...INITIAL_FORM_STATE
                    }}
                    onSubmit={handleSubmitForm}
                    validationSchema={FORM_VALIDATION}
                    validateOnChange={false}
                    validateOnBlur={false}
                >

                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Textfield name='eventName' label="Event Name" required />
                            </Grid>
                            <Grid item xs={12}>
                                <Textfield name='eventCode' label="Event Code" required />
                            </Grid>
                            <Grid item xs={12}>
                                <Textfield name='about' label="About" required multiline rows={5} />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Textfield select name='teamSize' label="Teamsize" >
                                        {teamSizes.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                                </Textfield>
                            </Grid>

                            <Grid item xs={12} lg={6} md={6}>
                                <Textfield select name='rounds' label="Rounds" >
                                        {totalRounds.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                                </Textfield>
                            </Grid>

                            <Grid item xs={12} lg={6} md={6}>
                                <Textfield select name='category' label="Category" >
                                        {categories.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                                </Textfield>
                            </Grid>

                            <Grid item xs={12} lg={6} md={6}>
                                <Textfield select name='mode' label="Mode" >
                                        {modes.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                                </Textfield>
                            </Grid>

                            <Grid item xs={12} lg={6} md={6}>
                                <Textfield type='date' name='date' placeholder="" required />
                            </Grid>

                            <Grid item xs={12}>
                                <Textfield name='prizes' label='Prizes' multiline rows={3} />
                            </Grid>

                            <Grid item xs={12} lg={4} md={3}>
                                <FormGroup>
                                    <CustomCheckbox name='contactNumber' label='Number' />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12} lg={4} md={6}>
                                <FormGroup>
                                    <CustomCheckbox name='githubID' label='Github ID' />
                                </FormGroup>
                            </Grid>

                            <Grid item xs={12} lg={4} md={6}>
                                <FormGroup>
                                    <CustomCheckbox name='liChessID' label='LiChess ID' />
                                </FormGroup>
                            </Grid>

                            <Grid item xs={12}>
                                <Textfield name='organiser1' label="Organiser 1" required />
                            </Grid>
                            <Grid item xs={12}>
                                <Textfield name='organiser2' label="Organiser 2"  />
                            </Grid>
                            <Grid item xs={12}>
                                <Textfield name='organiser3' label="Organiser 3"  />
                            </Grid>



                    
                    <Grid item xs={12} lg={2} md = {2} sm={3}>

                    <Button
                        variant="outlined"
                        component="label"
                        style={{ marginRight: 5 }}
                    >
                        Choose Image 1
                        <input
                            type="file"
                            onChange={(e) => setSelectedImage1(e.target.files[0])}
                            hidden
                        />
                    </Button>
                    </Grid>
                    <Grid item xs={12} lg={2} md = {2} sm={3}>
                    {selectedImage1 ? <Typography style={{ marginRight: 5, marginTop:6  }}>{selectedImage1.name}</Typography> : null}
                    </Grid>
                    <Grid item xs={12} lg={2} md = {2} sm={6}>
                    <Button color='success' variant='outlined' onClick={uploadImage1}>
                        Upload That
                        {imageLoad1 ? <CircularProgress style={{ marginLeft: 8 }} size="1rem" /> : null}
                    </Button>
                    </Grid>

                    <Grid item xs={12} lg={6} md = {6} sm={12}>
                    <Image style={{ width: 350 }} cloudName="dm7azk7jr" publicId={imagePublicId1} />
                    </Grid>

            

                    <Grid item xs={12} lg={2} md = {2} sm={3} >
                    <Button
                        variant="outlined"
                        component="label"
                        style={{ marginRight: 5 }}
                    >
                        Choose Image 2
                        <input
                            type="file"
                            onChange={(e) => setSelectedImage2(e.target.files[0])}
                            hidden
                        />
                    </Button>
                    </Grid>

                    <Grid item xs={12} lg={2} md = {2} sm={3} >
                    {selectedImage2 ? <Typography style={{ marginRight: 5, marginTop:6 }}>{selectedImage2.name}</Typography> : null}
                    </Grid>
                    <Grid item xs={12} lg={2} md = {2} sm={6} >
                    <Button color='success' variant='outlined' onClick={uploadImage2}>
                        Upload That
                        {imageLoad2 ? <CircularProgress style={{ marginLeft: 8 }} size="1rem" /> : null}
                    </Button>
                    </Grid>

                    <Grid item xs={12} lg={6} md = {6} sm={12} >
                    <Image style={{ width: 350 }} cloudName="dm7azk7jr" publicId={imagePublicId2} />
                    </Grid>

                            <Grid item xs={12}>
                                <Button fullWidth variant='contained' size='large' type='submit' color='success'>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid> 
                    </Form>
                </Formik>


                {/* <Typography className='add-event-container-heading' variant="h3">Add event</Typography>
                <hr />
                <TextField required id="outlined-basic" label="Event Name" fullWidth margin="normal" variant="outlined" value={eventName} onChange={(e) => { setEventName(e.target.value) }} />

                <TextField required id="outlined-basic" label="Event Code" fullWidth margin="normal" variant="outlined" value={eventCode} onChange={(e) => { setEventCode(e.target.value) }} />

                <TextField
                    required
                    multiline
                    margin='normal'
                    label="About"
                    fullWidth
                    rows={3}
                    value={about}
                    onChange={(e) => { setAbout(e.target.value) }}
                />
                <div className='add-event-input-two'>

                    <TextField className='add-event-input-team-size' required id="outlined-select-currency" label="Teamsize" select margin="normal" value={teamSize} onChange={handleChangeTeamSize}  >
                        {teamSizes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        required

                        className='add-event-input-rounds'
                        id="outlined-select-currency"
                        select
                        label="Rounds"
                        margin="normal"
                        value={rounds}
                        onChange={handleChangeRounds}
                    >
                        {totalRounds.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>

                <div className='add-event-input-two'>
                    <TextField className='add-event-input-team-size' required id="outlined-select-currency" label="Category" select margin="normal" value={category} onChange={handleChangeCategory}  >
                        {categories.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField type="date" className='add-event-input-date' value={date} onChange={(e) => { setDate(e.target.value) }} />

                </div>

                <TextField
                    required
                    multiline
                    margin='normal'
                    label="Prizes"
                    fullWidth
                    rows={5}
                    value={prizes}
                    onChange={(e) => { setPrizes(e.target.value) }}
                />

                <FormGroup>

                    <FormControlLabel control={<Checkbox checked={whatsappNumber} onChange={() => { setWhatsappNumber((val) => !val) }} />} label="WhatsApp Number" />

                    <FormControlLabel control={<Checkbox checked={githubUsername} onChange={() => setGithubUsername((val) => !val)} />} label="Github Username" />

                </FormGroup> */}
                {/* <div className="add-event-organizer">
                    <TextField required margin='normal' error={organiser1Error} helperText={organiser1ErrorMessage} label="Organizer 1" InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {organiser1Success ? <DoneRoundedIcon color='success' /> : null}
                            </InputAdornment>
                        ),
                    }} fullWidth value={organiser1} onChange={e => { setOrganiser1(e.target.value); setOrganiser1Success(false) }} />
                    <Button style={{ marginLeft: 15 }} variant='outlined' color="success" onClick={handleOrg1Click} > Check {organiser1Loader ? <CircularProgress style={{ marginLeft: 8 }} size="1rem" /> : null}  </Button>
                </div>
                <div className="add-event-organizer">
                    <TextField margin='normal' error={organiser2Error} helperText={organiser2ErrorMessage} label="Organizer 2" InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {organiser2Success ? <DoneRoundedIcon color='success' /> : null}
                            </InputAdornment>
                        ),
                    }} fullWidth value={organiser2} onChange={e => { setOrganiser2(e.target.value); setOrganiser2Success(false) }} />
                    <Button style={{ marginLeft: 15 }} variant='outlined' color="success" onClick={handleOrg2Click} > Check {organiser2Loader ? <CircularProgress style={{ marginLeft: 8 }} size="1rem" /> : null}  </Button>
                </div>
                <div className="add-event-organizer">
                    <TextField required margin='normal' error={organiser3Error} helperText={organiser3ErrorMessage} label="Organizer 3" InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {organiser3Success ? <DoneRoundedIcon color='success' /> : null}
                            </InputAdornment>
                        ),
                    }} fullWidth value={organiser3} onChange={e => { setOrganiser3(e.target.value); setOrganiser3Success(false) }} />
                    <Button style={{ marginLeft: 15 }} variant='outlined' color="success" onClick={handleOrg3Click} > Check {organiser3Loader ? <CircularProgress style={{ marginLeft: 8 }} size="1rem" /> : null}  </Button>
                </div> */}
                

                {/* <div className='upload-image-1-container'>

                    <Button
                        variant="outlined"
                        component="label"
                        style={{ marginRight: 5 }}
                    >
                        Choose Image 1
                        <input
                            type="file"
                            onChange={(e) => setSelectedImage1(e.target.files[0])}
                            hidden
                        />
                    </Button>
                    {selectedImage1 ? <Typography style={{ marginRight: 5 }}>{selectedImage1.name}</Typography> : null}
                    <Button color='success' variant='outlined' onClick={uploadImage1}>
                        Upload That
                        {imageLoad1 ? <CircularProgress style={{ marginLeft: 8 }} size="1rem" /> : null}
                    </Button>


                    <Image style={{ width: 350 }} cloudName="dm7azk7jr" publicId={imagePublicId1} />
                </div>

                <div className='upload-image-1-container'>

                    <Button
                        variant="outlined"
                        component="label"
                        style={{ marginRight: 5 }}
                    >
                        Choose Image 2
                        <input
                            type="file"
                            onChange={(e) => setSelectedImage2(e.target.files[0])}
                            hidden
                        />
                    </Button>
                    {selectedImage2 ? <Typography style={{ marginRight: 5 }}>{selectedImage2.name}</Typography> : null}
                    <Button color='success' variant='outlined' onClick={uploadImage2}>
                        Upload That
                        {imageLoad2 ? <CircularProgress style={{ marginLeft: 8 }} size="1rem" /> : null}
                    </Button>


                    <Image style={{ width: 350 }} cloudName="dm7azk7jr" publicId={imagePublicId2} />
                </div>



                <div className='add-event-submit-button-container'>
                    <Button variant='contained' color='success' size='large' onClick={handleSubmit} > Submit {submitLoaderFinal ? <CircularProgress style={{ marginLeft: 8 }} size="1rem" /> : null} </Button>
                </div> */}
            </Paper>
        </div>
    )
}
