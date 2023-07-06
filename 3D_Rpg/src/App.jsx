import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Game_Globals from "./init"
import LoaderInstance from "./CellHandler"
import InputHandler from "./InputHandler"
import LevelandStateDrawer from "./DrawLevel";

var LevelNumber = 1;
window.addEventListener('load', () =>{
    LoaderInstance.LevelHandlerDict[ LevelNumber]['function'](LoaderInstance.LevelGrid, LoaderInstance.PlayerPosition);

    function MainLoop(){
        //request animation frame here for infinate loop 
        LevelandStateDrawer[Game_Globals.state].function(Game_Globals.renderer, Game_Globals.scene, Game_Globals.camera);
        requestAnimationFrame(MainLoop);
    }
    MainLoop();
}
)

function App() {
  const [count, setCount] = useState(0)
  
 console.log(window)
}

export default App
