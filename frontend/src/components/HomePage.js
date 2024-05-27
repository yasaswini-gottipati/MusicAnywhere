import React,{Component} from "react";
import RoomJoin from "./RoomJoin";
import CreateRoom from "./CreateRoom";
import Room from './Room';
import { Typography,ButtonGroup,Grid,Button } from "@mui/material";
import { BrowserRouter as Router,Route,Link,Redirect,Routes,Navigate } from "react-router-dom";

export default class HomePage extends Component{
    constructor(props){
        super(props);
        this.state={
            roomCode:null,
        };
        this.clearRoomCode=this.clearRoomCode.bind(this)
    }

    async componentDidMount(){
        fetch('/api/user-in-room')
        .then((response)=>response.json())
        .then((data)=>{
            this.setState({
                roomCode:data.code,
            });
        });
    }

    renderHomePage() {
        if (this.state.roomCode) {
            return (
              <Navigate to={`/room/${this.state.roomCode}`} replace={true}/>
            );
          } else {
        return (
            <Grid container spacing={3}>
            <Grid item xs={12} align="center">
                <Typography variant="h3" compact="h3">
                    House Party
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <ButtonGroup disableElevation variant="contained" style={{backgroundColor:'#3f51b5'}}>
                    <Button style={{backgroundColor:'#3f51b5'}} to="/join" component={Link}>
                        Join a Room
                    </Button>
                    <Button style={{backgroundColor:'#f50057'}} to="/create" component={Link}>
                        Create a Room
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
        );
      }
    }

    clearRoomCode(){
        this.setState({
            roomCode:null,
        });
    }

    render(){
        const room =this.state.roomCode
        return (
            <Router>
                    <Routes>
                    <Route exact path="/" element={this.renderHomePage()}/>
                    <Route path="/join" element={<RoomJoin />} />
                    <Route path="/create" element={<CreateRoom />} />
                    <Route path="/room/:roomCode" element={<Room leaveRoomCallback={this.clearRoomCode} />} />
                    </Routes>
            </Router>
        )
    }   
}