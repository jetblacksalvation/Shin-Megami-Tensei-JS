import Game_Globals_Instance from "./init";
import LoaderInstance from "./CellHandler";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
class InputHandler{
    constructor(){
        this.lastKey = '';
        this.directionPointer = 0;
        this.direction = [0, Math.PI/2, Math.PI ,(3*Math.PI)/2]
        this.function_Dict = {"roam":roamInputHandler, 'fight-random':fightStateInputHandler};
        this.state;//pass state to inputhandler..
        window.addEventListener('keydown', (e) =>{
                
                if(this.function_Dict[Game_Globals_Instance.state] ){
                    var func = this.function_Dict[Game_Globals_Instance.state].bind(this);
                    func(e)
                }
                
            }
        );
        // window.addEventListener('keyup', (e)=>{var LoaderInstance = LoaderInstance.LoaderInstanceDict});

    }
}
const InputHandlerInstance = new InputHandler()
export default InputHandlerInstance;

function roamInputHandler(e){
    if(LoaderInstance.LevelGrid.length > 0)
    switch(e.key){
//send signal to a function that will handle any key that isn't e or q... this function determins movement on the grid 
    case 'r':
        Game_Globals_Instance.camera.position.x =0;
        Game_Globals_Instance.camera.position.y =0;
        Game_Globals_Instance.camera.position.z = 0;
        break;
    case 'w':

        if (this.directionPointer == 0){
            if (LoaderInstance.LevelGrid[LoaderInstance.PlayerPosition[0]][LoaderInstance.PlayerPosition[1] -1] ==0 ){
                LoaderInstance.PlayerPosition[1] -=1;
            }
            // camera.position.z -=2;
        }
        else if(this.directionPointer ==1){
            if(LoaderInstance.LevelGrid[LoaderInstance.PlayerPosition[0] -1][LoaderInstance.PlayerPosition[1]] == 0){
                LoaderInstance.PlayerPosition[0] -=1;
            }
            // camera.position.x -=2;
        }
        else if(this.directionPointer ==2){
            if(LoaderInstance.LevelGrid[LoaderInstance.PlayerPosition[0]][LoaderInstance.PlayerPosition[1] +1 ] ==0){
                LoaderInstance.PlayerPosition[1] +=1;
            }
            // camera.position.z +=2;
        }
        else if(this.directionPointer ==3){
            if(LoaderInstance.LevelGrid[LoaderInstance.PlayerPosition[0] +1][LoaderInstance.PlayerPosition[1]] == 0){
                LoaderInstance.PlayerPosition[0] +=1;
            }

            // camera.position.x +=2;
        }
        if (getRandomInt(10) <5){
            //draw to screen also change music
            Game_Globals_Instance.state = "fight-random";

            Game_Globals_Instance.sound.stop();
            Game_Globals_Instance.audioLoader.load( 'Music/20_Boss.mp3', ( buffer ) => {
                Game_Globals_Instance.sound.setBuffer( buffer );
                Game_Globals_Instance.sound.setLoop( true );
                Game_Globals_Instance.sound.setVolume( 0.5 );
                Game_Globals_Instance.sound.play();
            });
            console.log("You have run Into a demon!!");
        }
        break;
    //e and q are for turning. using hard coded vals cause idgaf 
    //i would be surprised if this code needs to be changed/ maintained in any way 
    case 'e':
        if (this.directionPointer - 1 <0){
            this.directionPointer = 3;
        }
        else{
            this.directionPointer -=1;
        }
        Game_Globals_Instance.camera.rotation.y = this.direction[this.directionPointer]+(Math.PI/4);
        Game_Globals_Instance.renderer.render(Game_Globals_Instance.scene, Game_Globals_Instance.camera);
        //moves clock wise
        break;
    case 'q':
        if (this.directionPointer + 1 >3){
            this.directionPointer = 0;
        }
        else{
            this.directionPointer +=1;
        }
        //moves counter clock wise  
        Game_Globals_Instance.camera.rotation.y = this.direction[this.directionPointer]-(Math.PI/4);
        Game_Globals_Instance.renderer.render(Game_Globals_Instance.scene, Game_Globals_Instance.camera);
        break;
        // default:
        //     HandleGridMovement(event.key);
        //f
    }

    console.log(this.directionPointer, 'is direction');
    // console.log(Game_Globals_Instance.camera)
    
    setTimeout(()=>{Game_Globals_Instance.camera.rotation.y = this.direction[this.directionPointer]; Game_Globals_Instance.renderer.render(Game_Globals_Instance.scene, Game_Globals_Instance.camera);},100);
    console.log("The rotation is ", Game_Globals_Instance.camera.rotation.y);
    this.lastKey = e.key;

}
function fightStateInputHandler(e){
    //fightStateInputHandler here 

    console.log("I AM IN FIGHT S")
    switch(e.key){
        case 'q':
            Game_Globals_Instance.state = 'roam'
            break;
    }
}