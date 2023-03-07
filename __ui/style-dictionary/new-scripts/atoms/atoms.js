// config.js
let nombreCarpetaAtoms = 'atoms';
module.exports = {
  
    source: [
      `ui-tokens/colors/*`, 
      `ui-tokens/foundation-tokens.json`, 
      `ui-tokens/${nombreCarpetaAtoms}/*`,
    // podría llamar automaticamente a todos los archivos json que empiecen por "c_"??
  ],
    // If you don't want to call the registerTransform method a bunch of times
    // you can override the whole transform object directly. This works because
    // the .extend method copies everything in the config
    // to itself, allowing you to override things. It's also doing a deep merge
    // to protect from accidentally overriding nested attributes.
    transform: {
      // Now we can use the transform 'myTransform' below
      myTransform: {
        type: 'name',
        transformer: (token) => token.path.join('_').toUpperCase()
      }
    },
    format: {
        myFormat: ({dictionary, platform}) => {
        //  let arr = ['padding-top', 'padding-bottom']
          let propDictionary = {
            fill: 'background-color',
            borderRadius: 'border-radius',
            verticalPadding: ['padding-top', 'padding-bottom'],
            horizontalPadding: ['padding-left', 'padding-right'],
            boxShadow: 'box-shadow',
          }
          let styles = dictionary.allTokens.map(token => {

            if(token.filePath.includes(nombreCarpetaAtoms)){
            if(token.type != 'composition'){ 

              if(token.type == 'boxShadow'){

                // console.log(token);

                let props = []
                let shadowProps = []

                Object.entries(token.value).forEach(([key, value], index) => {
                 
                  // console.log(key+' : '+value);
                  if(key != 'type'){
                  
                    if(key == 'color'){
                      let newValue = token.original.value['color'];
                       console.log(token);
                      console.log(newValue);
                  newValue = newValue.replaceAll(/[{|}]/g, '');
                  newValue = newValue.replaceAll(/\./g, '-');
                  newValue = newValue.replaceAll(/_ct_|__ct_+/g, '--ct-');
                  colorVar = `var(--${newValue})`

                  shadowProps = [...shadowProps, `${colorVar} `]

                // console.log(token);
                    }else{
                      
                      // console.log(value);

                      shadowProps = [...shadowProps, `${value}px `]

                    

                    }


                  // box-shadow: x y blur spread rgba(0,0,0,0.75);
                
                  
                }

                });
            
                props = [...props, `--${token.name}: ${shadowProps[0]} ${shadowProps[1]} ${shadowProps[2]} ${shadowProps[3]} ${shadowProps[4]};\n`]

                console.log(props);

                return  props     

              }else{
              let props = []
             
              
                if(token.value.toString().startsWith("#")){
                  let newValue = token.original.value;
                  newValue = newValue.replaceAll(/[{|}]/g, '');
                  newValue = newValue.replaceAll(/\./g, '-');
                  newValue = newValue.replaceAll(/_ct_|__ct_+/g, '--ct-');
                  colorVar = `var(--${newValue})`
                  props = [...props, `--${token.name}:${colorVar};\n`]
                 
                 
                }
                else{
                  props = [...props, `--${token.name}:${token.value};\n`]
                }

             
          
              return  props          
            }                           
        } 
      }
        }).join('');

        let format = `     
        :root{
          ${styles}        
        }
    
        `
let formatSeparator = format.replaceAll(",", ""); 
          return formatSeparator;
        }
      },
    platforms: {   
       //scss
       "scss": {
        "transformGroup": "scss",
        // "prefix": "sd", // agregamos un prefijo a todas las cariables (Le agrega un guión también) 
        "buildPath": "__scss-input/abstracts/variables/atoms/", // la ruta donde irá nuestro archivo de salida 
        "files": [{
          "destination": "atoms-styles.scss", // nombre de archivo 
          "format": "myFormat", // formato 
          "mapName": "font-style"
        }]
      }
    }
  }