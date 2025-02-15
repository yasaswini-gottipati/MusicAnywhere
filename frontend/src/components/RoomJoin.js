import React,{Component} from "react";
import { Typography,TextField,Grid,Button } from "@mui/material";
import { Link,useNavigate } from "react-router-dom";


class RoomJoin extends Component{
    constructor(props){
        super(props);

        this.state={
            roomCode:'',
            error:"",
        };
        this.handleTextFieldChange=this.handleTextFieldChange.bind(this);
        this.roomButtonPressed=this.roomButtonPressed.bind(this);
    }

    handleTextFieldChange(e) {
        this.setState({
          roomCode: e.target.value,
        });
    }

    roomButtonPressed(){
        const { navigate } = this.props;
        const requestOptions ={
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                code:this.state.roomCode,
            }),
        };
        fetch('api/join-room',requestOptions)
        .then((response)=>{
            if(response.ok){
                navigate(`/room/${this.state.roomCode}`)
            }else{
                this.setState({error:"Room not found."})
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    render(){
        return (
            <Grid container spacing={1} >
                <Grid item xs={12} align='center' >
                    <Typography variant="h4" component='h4' >
                        Join a Room
                    </Typography>
                </Grid>
                <Grid item xs={12} align='center' >
                    <TextField
                       error={this.state.error}
                       label="Code"
                       placeholder="Enter a Room Code"
                       value={this.state.roomCode}
                       helperText={this.state.error}
                       variant="outlined"
                       onChange={this.handleTextFieldChange}
                    />
                </Grid>
                <Grid item xs={12} align='center' >
                    <Button variant="contained" style={{backgroundColor:'#3f51b5'}} onClick={this.roomButtonPressed} >Enter Room</Button>
                </Grid>
                <Grid item xs={12} align='center' >
                    <Button variant="contained" style={{backgroundColor:'#f50057'}} to='/' component={Link} >Back</Button>
                </Grid>
            </Grid>
        );
    }

}

function NavigateTo() {
    const navigate = useNavigate();
  
    return (
      <div>
        <RoomJoin navigate={navigate} />
      </div>
    );
  }

  export default NavigateTo;