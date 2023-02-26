import React, { useEffect, useState } from 'react'
import { Typography, TextField, Paper, MenuItem, Button, Grid, Checkbox, FormGroup, FormControlLabel, ButtonBase, InputAdornment } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import "./AddEvent.css"
import CircularProgress from '@mui/material/CircularProgress';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        "& .MuiFormLabel-root": {
            color: "#9e9e9e" // or black
        },
        "& $notchedOutline": {
            borderColor: "#9e9e9e"
        }
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
    const [eventName, setEventName] = useState("");
    const [eventCode, setEventCode] = useState("");
    const [about, setAbout] = useState("");
    const [category, setCategory] = useState("");
    const [teamSize, setTeamSize] = useState(1);
    const [rounds, setRounds] = useState(1);
    const [prizes, setPrizes] = useState("");
    const [organiser1, setOrganiser1] = useState("");
    const [organiser1Error, setOrganiser1Error] = useState(false);
    const [organiser1Success, setOrganiser1Success] = useState(false);
    const [organiser1Loader, setOrganiser1Loader] = useState(false);
    const [organiser1ErrorMessage, setOrganiser1ErrorMessage] = useState("");
    const [organiser2, setOrganiser2] = useState("");
    const [organiser2Error, setOrganiser2Error] = useState(false);
    const [organiser2Success, setOrganiser2Success] = useState(false);
    const [organiser2Loader, setOrganiser2Loader] = useState(false);
    const [organiser2ErrorMessage, setOrganiser2ErrorMessage] = useState("");
    const [organiser3, setOrganiser3] = useState("");
    const [organiser3Error, setOrganiser3Error] = useState(false);
    const [organiser3Success, setOrganiser3Success] = useState(false);
    const [organiser3Loader, setOrganiser3Loader] = useState(false);
    const [organiser3ErrorMessage, setOrganiser3ErrorMessage] = useState("");
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
        console.log(selectedImage1);
        setImageLoad1(true);
        const formData = new FormData();
        formData.append("file", selectedImage1);
        formData.append("upload_preset", "Aparoksha");
        axios.post("https://api.cloudinary.com/v1_1/dm7azk7jr/image/upload", formData).then((res) => {

            console.log(res);
            setImagePublicId1(res.data.public_id);
            setImage1URL(res.data.secure_url);
            setImageLoad1(false);

        }).catch((err) => {
            console.log(err);
            setImageLoad1(false);
        })
    }

    const uploadImage2 = async () => {
        console.log(selectedImage2);
        setImageLoad2(true);
        const formData = new FormData();
        formData.append("file", selectedImage2);
        formData.append("upload_preset", "Aparoksha");
        axios.post("https://api.cloudinary.com/v1_1/dm7azk7jr/image/upload", formData).then((res) => {

            console.log(res);
            setImagePublicId2(res.data.public_id);
            setImage2URL(res.data.secure_url);
            setImageLoad2(false);

        }).catch((err) => {
            console.log(err);
            setImageLoad2(false);
        })
    }

    const handleOrg1Click = async () => {
        setOrganiser1Loader(true);
        const response = await axios.get(`http://localhost:5000/api/getuser/${organiser1}`).catch((err) => console.log("Error getting user"))
        console.log("got Organiser result", response);
        if (response && response.data) {
            if (response.data.isRegistered) {
                setOrganiser1Error(false);
                setOrganiser1ErrorMessage("");
                setOrganiser1Success(true);
            }
            if (!response.data.isRegistered) {
                setOrganiser1Error(true);
                setOrganiser1ErrorMessage("User has not Registered")
            }
            if (response.data.isRegistered && !response.data.whatsappNumber) {
                setOrganiser1Error(true);
                setOrganiser1ErrorMessage("User has not Entered Mobile Number");
            }
        }
        setOrganiser1Loader(false);
    }

    const handleOrg2Click = async () => {
        setOrganiser2Loader(true);
        const response = await axios.get(`http://localhost:5000/api/getuser/${organiser2}`).catch((err) => console.log("Error getting user"))
        console.log("got Organiser result", response);
        if (response && response.data) {
            if (response.data.isRegistered) {
                setOrganiser2Error(false);
                setOrganiser2ErrorMessage("");
                setOrganiser2Success(true);
            }
            if (!response.data.isRegistered) {
                setOrganiser2Error(true);
                setOrganiser2ErrorMessage("User has not Registered")
            }
            if (response.data.isRegistered && !response.data.whatsappNumber) {
                setOrganiser2Error(true);
                setOrganiser2ErrorMessage("User has not Entered Mobile Number");
            }
        }
        setOrganiser2Loader(false);
    }

    const handleOrg3Click = async () => {
        setOrganiser3Loader(true);
        const response = await axios.get(`http://localhost:5000/api/getuser/${organiser3}`).catch((err) => console.log("Error getting user"))
        console.log("got Organiser result", response);
        if (response && response.data) {
            if (response.data.isRegistered) {
                setOrganiser3Error(false);
                setOrganiser3ErrorMessage("");
                setOrganiser3Success(true);
            }
            if (!response.data.isRegistered) {
                setOrganiser3Error(true);
                setOrganiser3ErrorMessage("User has not Registered")
            }
            if (response.data.isRegistered && !response.data.whatsappNumber) {
                setOrganiser3Error(true);
                setOrganiser3ErrorMessage("User has not Entered Mobile Number");
            }
        }
        setOrganiser3Loader(false);
    }


    const handleSubmit = async () => {
        setSubmitLoaderFinal(true);
        console.log(eventName, about, category, teamSize, rounds, prizes, organiser1, organiser2, organiser3, date, image1URL, image2URL, eventCode, whatsappNumber, githubUsername);
        const response = await axios.post("http://localhost:5000/api/addevent", { eventName, about, category, teamSize, rounds, prizes, organiser1, organiser2, organiser3, date, image1URL, image2URL, eventCode, whatsappNumber, githubUsername }, { withCredentials: true }).catch((err) => {
            console.log("There was a problem adding event", err);
        });
        if (response) {
            console.log("Event added successfully", response);
            navigate("/events");
        }
        setSubmitLoaderFinal(false);
    }

    return (
        <div className='add-event-super-container'>
            <Paper className='add-event-container'>


                <Typography className='add-event-container-heading' variant="h3">Add event</Typography>
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
                    maxRows={4}
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
                    maxRows={4}
                    value={prizes}
                    onChange={(e) => { setPrizes(e.target.value) }}
                />

                <FormGroup>

                    <FormControlLabel control={<Checkbox checked={whatsappNumber} onChange={() => { setWhatsappNumber((val) => !val) }} />} label="WhatsApp Number" />

                    <FormControlLabel control={<Checkbox checked={githubUsername} onChange={() => setGithubUsername((val) => !val)} />} label="Github Username" />

                </FormGroup>
                <div className="add-event-organizer">
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
                </div>
                

                <div className='upload-image-1-container'>

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
                </div>
            </Paper>
        </div>
    )
}
