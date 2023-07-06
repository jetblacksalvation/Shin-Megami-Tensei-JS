import * as THREE from 'three';
import Game_Globals_Instance from './init';
import LoaderInstance from './CellHandler';
const LevelandStateDrawer = {
    "roam" : { "function":function(renderer, scene, camera) {
        //basicallly main...
        
        //draw level here 
        var LevelGrid = LoaderInstance.LevelGrid;
        renderer.renderLists.dispose();
        for(let x =0; this['metaData']['CubeBuffer'].length >0&& x <this['metaData']['CubeBuffer'].length; x++){
            scene.remove(this['metaData']['CubeBuffer'][x]);
        }
        
    
        // LoadLevel();
        //clear buffer later... 
        this['metaData']['CubeBuffer'] = [];
        for(let x =0; LevelGrid !== 'undefined' && x<LevelGrid.length; x++){
            //  ("level grid length =", LevelGrid.length);
            for (let y =0; y <LevelGrid[x].length; y++){
                
    
                this['metaData']['CubeBuffer'].push.apply(this['metaData']['CubeBuffer'],LoaderInstance.CellHandlerDict[LevelGrid[x][y]]['function']((x - LoaderInstance.PlayerPosition[0])*2, ( y - LoaderInstance.PlayerPosition[1])*2));
            }
            // console.log(LevelGrid[x], 'is x');
        }
        for(let x =0; this['metaData']['CubeBuffer'].length >0 && x <this['metaData']['CubeBuffer'].length; x++){
            scene.add(this['metaData']['CubeBuffer'][x]);
        }

        renderer.render(scene,camera);
    
    }, "metaData" :{"CubeBuffer" :[]}
    },
    "fight-random":{"function":function(renderer, scene, camera){
        if(!this.HasRunAgain){
            console.log("You have run into Pixie of the Fairy clan!");
            this.HasRunAgain = true;
        }
        var health = 10;
        var img = new Image(800,800);
        img.onload = () =>{console.log("done loading")};

        img.src = "/Images/astolfo.jpg"

        img.style.zIndex = 50;

        const newDiv = document.createElement("a");
        newDiv.id = "Show_Image"
        newDiv.appendChild(img);
        setTimeout(()=>{},10000);


        document.body.appendChild(newDiv);
        img.style.right = 20;
        // document.body.insertAdjacentHTML('beforeBegin' , img);
        setTimeout(()=>{},100);
        img.style.right = 40;

       
    }, "HasRunAgain":false, "HasCreatedImage" : false}//put refs to metaData here. MetaData is a list of vargs used by invoked function. Function will be bound to dict 
};  


export default LevelandStateDrawer;


