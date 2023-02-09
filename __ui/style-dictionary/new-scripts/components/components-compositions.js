// config.js
module.exports = {
    source: [
    `ui-tokens/__absolute-colors.json`, 
    `ui-tokens/__dark-theme.json`, 
    `ui-tokens/_foundation-tokens.json`, 
    `ui-tokens/c_card.json`,
    `ui-tokens/c_component-color.json`
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
    // Same with formats, you can now write them directly to this config
    // object. The name of the format is the key.
    format: {
        myFormat: ({dictionary, platform}) => {
  
           
          // let nombreFiltrado =  token.name.replace(/(-[a-z])\w+/, ''); 
          //esto lo hice para eliminar las palabras repetidas
          // Antes: blue-blue-200
          // despues: blue-200
  
          // let mapName = 'dark-theme-colors';
          

          let tokens = dictionary.allTokens.map(token => {
            if(token.type === 'composition'){
             
             
              let props = []
              Object.entries(token.value).forEach(([key, value], index) => {
               

                

                
           

               console.log(token);
          

                if(value.toString().startsWith("#")){
                  let newValue = Object.values(token.original.value)[index];
                  newValue = newValue.replaceAll(/[{|}]/g, '');
                  newValue = newValue.replaceAll(/\./g, '-');
                  newValue = newValue.replaceAll(/_ct_|__ct_+/g, '--ct-');
                  colorVar = `var(${newValue})`
                 
                  props = [...props, `--${token.name}-${key}:${colorVar};\n`]
                  console.log('____________________ '+ newValue)
                }else{
                
                  props = [...props, `--${token.name}-${key}:${value};\n`]

                 
                }
               
              });
   

              return  props                    
                     
        }
        
        
        }).join('');



  



  
         
    
        let format = `
       
        :root{
          ${tokens}
          
        }
        `

let formatSeparator = format.replaceAll(",", ""); 

console.log(formatSeparator);

          return formatSeparator;
                

  
        }
      },
    platforms: {
      
       //scss
       "css": {
        "transformGroup": "css",
        // "prefix": "sd", // agregamos un prefijo a todas las cariables (Le agrega un guión también) 
        "buildPath": "__scss-input/abstracts/variables/components/compositions/", // la ruta donde irá nuestro archivo de salida 
        "files": [{
          "destination": "components-compositions.css", // nombre de archivo 
          "format": "myFormat", // formato 
          "mapName": "font-style"
        }]
      }
    }
  }