import React,{Component} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Grid,Button,Typography } from '@mui/material';
import CreateRoom from './CreateRoom';
import MusicPlayer from './MusicPlayer';

class Room extends Component{
    constructor(props){
        super(props);
        console.log(this.props)
        this.state={
            votesToSkip:2,
            guestCanPause:false,
            isHost:false,
            showSettings:false,
            spotifyAuthenticated:false,
            song:{},
        };
        this.roomCode=this.props.roomCode;
        this.leaveButtonPressed=this.leaveButtonPressed.bind(this)
        this.udateShowSettings=this.udateShowSettings.bind(this)
        this.renderSettingsButton=this.renderSettingsButton.bind(this)
        this.renderSettings=this.renderSettings.bind(this)
        this.getRoomDetails=this.getRoomDetails.bind(this)
        this.authenticateSpotify=this.authenticateSpotify.bind(this)
        this.getCurrentSong=this.getCurrentSong.bind(this)
        this.getRoomDetails()
    }
    componentDidMount(){
        this.interval=setInterval(this.getCurrentSong,1000)
    }
    componentWillUnmount(){
        clearInterval(this.interval);
    }
    getRoomDetails(){
        // const { navigate } = this.props;
        fetch("/api/get-room" + "?code=" + this.roomCode)
        .then((response) => {
            if (!response.ok){
                const { navigate } = this.props;
                this.props.leaveRoomCallback();
                navigate('/');
            }
           return response.json()
        })
        .then((data) => {
            this.setState({
            votesToSkip: data.votes_to_skip,
            guestCanPause: data.guest_can_pause,
            isHost: data.is_host,
            });
            console.log(data)
            if (!data.isHost){
                console.log("enter")
                this.authenticateSpotify();
                console.log("inin")
            }
        })
    }

    authenticateSpotify(){
        fetch('/spotify/is-authenticated')
        .then((response)=>response.json())
        .then((data)=>{
            this.setState({
                spotifyAuthenticated:data.status
            })
            console.log(data.status);
            if (!data.status){
                fetch("/spotify/get-auth-url")
                .then((response)=>response.json())
                .then((data)=>{
                    window.location.replace(data.url);
                })
            }
        })
    }

    getCurrentSong(){
        fetch('/spotify/current-song')
        .then((response)=>{
            if(!response.ok){
                return {};
            }else{
               return response.json();
            }
        })
        .then((data)=>{
            this.setState({song:data})
            console.log(data)
        })
    }

    leaveButtonPressed(){
        const { navigate } = this.props;
        const requestOptions ={
            method:'POST',
            headers:{'Content-Type':'application/json'},
        };
        fetch('/api/leave-room',requestOptions)
        .then((_response)=>{
            this.props.leaveRoomCallback();
            navigate('/')
        })
    }

    udateShowSettings(value){
        this.setState({
            showSettings:value,
        })
    }

    renderSettings(){
        return(
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <CreateRoom 
                update={true} 
                votesToSkip={this.state.votesToSkip}
                guestCanPause={this.state.guestCanPause}
                roomCode={this.roomCode}
                updateCallback={this.getRoomDetails}
                />
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant='contained' style={{backgroundColor:'#f50057'}} onClick={()=>this.udateShowSettings(false)} >
                    Close
                </Button>
            </Grid>
        </Grid>
        )
    }

    renderSettingsButton(){
        return (
            <Grid item xs={12} align="center">
                <Button variant='contained' style={{backgroundColor:'#3f51b5'}} onClick={()=>this.udateShowSettings(true)} >
                    Settings
                </Button>
            </Grid>
        );
    }

    render(){
        // const roomCode=this.props.roomCode;
        if (this.state.showSettings){
            return this.renderSettings();
        }
        return(

            <Grid container spacing={1}>
                <Grid item xs={12} align='center'>  
                    <Typography component='h4' variant='h4'>
                        Code:{this.roomCode}
                    </Typography>
                </Grid>
                <MusicPlayer {...this.state.song} /> 
                {this.state.isHost ? this.renderSettingsButton() : null}
                <Grid item xs={12} align='center'>
                    <Button variant="contained" style={{backgroundColor:'#f50057'}} onClick={this.leaveButtonPressed} >
                        Leave Room
                    </Button>
                </Grid>
            </Grid>
        )
    }
}
function RoomWrapper(props) {
    const { roomCode } = useParams();
    const navigate = useNavigate();
    return <Room {...props} roomCode={roomCode} navigate={navigate} />;
  }
export default RoomWrapper;