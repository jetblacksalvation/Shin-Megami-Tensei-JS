import * as THREE from 'three';
import Game_Globals_Instance from './init';

import LoaderInstance from './CellHandler';

import React from 'react';
import ReactDOM from 'react-dom/client';
import * as styles from'/src/style.css?inline';

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
        // var health = 10;
        Game_Globals_Instance.root.render(
            <React.StrictMode>
                <img src="/Images/astolfo.jpg" width={800} height={800 } style={{'user-select': 'none', 'right' : 20, 'zIndex':50, 'background-size':'cover'}}></img>
            </React.StrictMode>,
        )
        // document.body.insertAdjacentHTML('beforeBegin' , img);

       
    }, "HasRunAgain":false, "HasCreatedImage" : false}//put refs to metaData here. MetaData is a list of vargs used by invoked function. Function will be bound to dict 
};  


export default LevelandStateDrawer;


