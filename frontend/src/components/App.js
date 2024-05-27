import React,{Component} from "react"
import {createRoot} from 'react-dom/client'
import HomePage from "./HomePage";
import RoomJoin from "./RoomJoin";


// export default App=()=>{
//  return(
//     <h1>Hiiii</h1>
//  )
// }

export default class App extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="center">
            <HomePage />
            </div>
        )
    }
}


const appDiv = document.getElementById('app');
createRoot(appDiv).render(<App />)
