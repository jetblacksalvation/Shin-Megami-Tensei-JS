// import './style.css'
import {BoxGeometry, MeshBasicMaterial,TextureLoader,Mesh} from 'three';
// function LoadLevel(LevelGrid, PlayerPosition){
//     //Level grid is an array. PlayerPosition is also and array, but only ever has two elements. 
//     //first index is x, second is z 

//     //load level ...
//     if(LevelGrid.length == 0){
//         LevelGrid.push.apply(LevelGrid, [ 
//             [1,1,1,1,1,1,1],
//             [1,0,0,0,0,0,1],
//             [1,1,1,0,0,0,0,1],
//             [1,1,1,1,2,1,0,1],
//             [0,0,0,0,0,1,0,1],
//             [0,0,0,0,0,1,0,1],
//             [0,0,0,0,0,1,0,1],
//             [0,0,0,0,0,1,1,1]
//         ]
            
//         );
//     }
//     if (PlayerPosition.length == 0){
//         PlayerPosition.push.apply(PlayerPosition,[1,1]);

//     }
// }


class LoadThings{
    PlayerPosition = [1,1];
    LevelGrid = [];

    static LoadIfNotLoaded(string){
        //where string is a file/dir to file 
        var isInsideDict = false;
        for(let k in this.LoadedInDict){
            if (string === k){
                isInsideDict = true;
                
            }

        }
        if(isInsideDict){
            // console.log("is in dict");
        }
        else{
            // console.log("Loading ", string, "...");
            LoadThings.LoadedInDict[string] = new TextureLoader().load(string);
        }
    }
    CellHandlerDict = {
        //here function must return a list
        0 : { 'function' : function(xPosition, zPosition){
            for(let x in this.dependancies){
                LoadThings.LoadIfNotLoaded(this.dependancies[x]);
            }
    
            var CubeBuffer = [];
     
            // CubeBuffer.push(new Mesh(new BoxGeometry(2,2,2), new MeshBasicMaterial({map:LoadThings.LoadedInDict[this.dependancies[0]]})));
            // CubeBuffer[CubeBuffer.length-1].position.x = xPosition;
            // CubeBuffer[CubeBuffer.length-1].position.y = 2;
            // //y is actually z here...
            // CubeBuffer[CubeBuffer.length-1].position.z =zPosition;
    
            CubeBuffer.push(new Mesh(new BoxGeometry(2,2,2), new MeshBasicMaterial({map:LoadThings.LoadedInDict[this.dependancies[1]]})));
            CubeBuffer[CubeBuffer.length-1].position.x = xPosition;
            CubeBuffer[CubeBuffer.length-1].position.y = -2;
            //y is actually z here...
            CubeBuffer[CubeBuffer.length-1].position.z =zPosition;
            return CubeBuffer;
    
        },'dependancies' :["Images/blue.png", "Images/road.png"], 'tileName':"RoadAndsky"},
        1 : {'function':function(xPosition,zPosition){
            for(let x in this.dependancies){
                LoadThings.LoadIfNotLoaded(this.dependancies[x]);
            }
            var CubeBuffer = [];
            CubeBuffer.push(new Mesh(new BoxGeometry(2,2,2), new MeshBasicMaterial({map:LoadThings.LoadedInDict[this.dependancies[0]]})) );
            CubeBuffer[CubeBuffer.length-1].position.x = xPosition;
            //y is actually z here...
            CubeBuffer[CubeBuffer.length-1].position.z =zPosition;
            return CubeBuffer;
        }, 'dependancies' :["Images/brickWall.png"], 'tileName':"bricks"},
        2 : {'function':function(xPosition,zPosition){
            for(let x in this.dependancies){
                LoadThings.LoadIfNotLoaded(this.dependancies[x]);
            }
            var CubeBuffer = [];
            CubeBuffer.push(new Mesh(new BoxGeometry(2,2,2), new MeshBasicMaterial({map:LoadThings.LoadedInDict[this.dependancies[0]]})) );
            CubeBuffer[CubeBuffer.length-1].position.x = xPosition;
            //y is actually z here...
            CubeBuffer[CubeBuffer.length-1].position.z =zPosition;
            return CubeBuffer;
        }, 'dependancies':["Images/brickDoor.png"]}
    };//for drawing cells
    LevelHandlerDict = {
        1 : {"function":function (LevelGrid, PlayerPosition) {
            //Level grid is an array. PlayerPosition is also and array, but only ever has two elements. 
            //first index is x, second is z 
        
            //load level ...
            if(LevelGrid.length == 0){
                LevelGrid.push.apply(LevelGrid, [ 
                    [1,1,1,1,1,1,1],
                    [1,0,0,0,0,0,1],
                    [1,1,1,0,0,0,0,1],
                    [1,1,1,1,2,1,0,1],
                    [0,0,0,0,0,1,0,1],
                    [0,0,0,0,0,1,0,1],
                    [0,0,0,0,0,1,0,1],
                    [0,0,0,0,0,1,1,1]
                ]
                    
                );
            }
            if (PlayerPosition.length == 0){
                PlayerPosition.push.apply(PlayerPosition,[1,1]);
        
            }}
        }
    }
    static LoadedInDict = {
    };//start off empty. If CellHandler is called, populates with texture objects...
};


const LoaderInstance = new LoadThings; export default LoaderInstance;