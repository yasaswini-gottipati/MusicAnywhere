import React,{Component} from "react";
import { Typography,TextField,FormHelperText,FormControl,Grid,Button,Radio,RadioGroup,FormControlLabel,Collapse } from "@mui/material";
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { Alert } from '@mui/material'



class CreateRoom extends Component{
    static defaultProps={
        votesToSkip:2,
        guestCanPause:true,
        update:false,
        roomCode:null,
        updateCallback:()=>{},
    }
    constructor(props){
        super(props);
        this.state={
            guestCanPause:this.props.guestCanPause,
            votesToSkip:this.props.votesToSkip,
            successMsg:"",
            errorMsg:"",
        };
        this.handleRoomButtonPressed=this.handleRoomButtonPressed.bind(this);
        this.handleGuestCanPauseChange=this.handleGuestCanPauseChange.bind(this);
        this.handleVotesChange=this.handleVotesChange.bind(this);
        this.handleUpdateButtonPressed=this.handleUpdateButtonPressed.bind(this);
    }

    handleVotesChange(e){
        this.setState({
            votesToSkip:e.target.value,
        })
    }

    handleGuestCanPauseChange(e){
        this.setState({
            guestCanPause:e.target.value ==='true'? true:false
        })
    }

    handleRoomButtonPressed(){
        const { navigate } = this.props;
        const requestOptions ={
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                votes_to_skip:this.state.votesToSkip,
                guest_can_pause:this.state.guestCanPause
            }),
        };
        fetch('/api/create-room',requestOptions)
        .then((response)=>response.json())
        .then((data)=>navigate(`/room/${data.code}`));

    }

    handleUpdateButtonPressed(){
        const { navigate } = this.props;
        const requestOptions ={
            method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                votes_to_skip:this.state.votesToSkip,
                guest_can_pause:this.state.guestCanPause,
                code:this.props.roomCode
            }),
        };
        fetch('/api/update-room',requestOptions)
        .then((response)=>{
            if (response.ok){
                this.setState({
                    successMsg:"Room updated successfully",
                })
            }else{
                this.setState({
                    errorMsg:"Error updating Room...",
                })
            }
            this.props.updateCallback();
        })   
    }

    renderCreateButtons(){
        return (
            <Grid container spacing={1}>
            <Grid item xs={12} align='center'>
                    <Button style={{backgroundColor:'#3f51b5'}} variant="contained" onClick={this.handleRoomButtonPressed}>Create A Room</Button>
                </Grid>
                <Grid item xs={12} align='center'>
                    <Button style={{backgroundColor:'#f50057'}} variant="contained" to='/' component={Link} >Back</Button>
                </Grid>
                </Grid>
        );
    }
    
    renderUpdateButtons(){
        return(
        <Grid item xs={12} align='center'>
                <Button style={{backgroundColor:'#3f51b5'}} variant="contained" onClick={this.handleUpdateButtonPressed}>Update Room</Button>
            </Grid>
        );
    }

    render(){
        const title=this.props.update?"Update Room":"Create a Room"
        return (
            <Grid container spacing={1}>
                 <Grid item xs={12} align='center'>
                    <Collapse in={this.state.errorMsg!="" || this.state.successMsg!=""} >
                    {this.state.successMsg!=""?
                    (<Alert severity="success" onClose={()=>{
                        this.setState({successMsg:""});
                    }}>{this.state.successMsg}</Alert>):
                    (<Alert severity="error" onClose={()=>{
                        this.setState({errorMsg:""});
                    }}>{this.state.errorMsg}</Alert>)}
                    </Collapse>
                </Grid>
                <Grid item xs={12} align='center'>
                    <Typography component='h4' variant="h4">
                        {title}
                    </Typography>
                </Grid>
                <Grid item xs={12} align='center'>
                    <FormControl component='fieldset'>
                        <FormHelperText>
                            <div align='center'>
                                Guest control of playback state
                            </div>
                        </FormHelperText>
                        <RadioGroup row defaultValue={this.props.guestCanPause.toString()} onChange={this.handleGuestCanPauseChange} >
                            <FormControlLabel 
                            value='true' 
                            control={<Radio color="primary" />}
                            label='play/pause'
                            labelPlacement="bottom"
                             />
                            <FormControlLabel 
                            value='flase' 
                            control={<Radio color="secondary" />}
                            label='No Control'
                            labelPlacement="bottom"
                             />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align='center'>
                    <FormControl>
                        <TextField 
                        required='true' 
                        type='number' 
                        onChange={this.handleVotesChange}
                        defaultValue={this.state.votesToSkip}
                        inputProps={{
                            min:1,
                            style:{textAlign:"center"},
                        }} 
                        />
                        <FormHelperText>
                            <div align='center'>
                                Votes Required  To Skip Song 
                            </div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                {this.props.update ? this.renderUpdateButtons():this.renderCreateButtons()}
            </Grid>
        )
    }
}

function NavigateWrapper(props) {
    const navigate = useNavigate();
  
    return (
      <div>
        <CreateRoom {...props} navigate={navigate} />
      </div>
    );
  }

  export default NavigateWrapper;