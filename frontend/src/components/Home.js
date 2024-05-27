import React,{Component} from "react";
import { Typography,ButtonGroup,Grid,Button } from "@mui/material";
import { Link } from "react-router-dom";

export default class Home extends Component{
    constructor(props){
        super(props);
    }

    render(){
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
        )
    }
}
