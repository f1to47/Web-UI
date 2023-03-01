// config.js
module.exports = {
    source: [`ui-tokens/fixed-colors.json`],
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
          

          let colorTokens = dictionary.allTokens.map(token => {

            

            
            if(token.type === 'color'){
          return  `--${token.name}: ${token.value};\n`
        }
        
        }).join('');



        let opacityImage = dictionary.allTokens.map(token => {

            

            
          if(token.type === 'opacity'){
        return  `--${token.name}: ${token.value};\n`
      }
     
      
      }).join('');



  
        //   let shadowTokens = dictionary.allTokens.map(token => {
        //     if(token.type === 'boxShadow'){
             
        //       console.log(token);
        //       let props = []
        //       Object.entries(token.value).forEach(([key, value]) => {
                
        //         props = [...props, `--${token.name}-${key}:${value};\n`]
        //       });
   

        //       return  props                    
                     
        // }
        
        
        // }).join('');
    
        let format = `
        :root{
          ${colorTokens}                 
          ${opacityImage}
        }
        `

let formatSeparator = format.replaceAll(",", ""); 

console.log(formatSeparator);

          return formatSeparator;
                

  
        }
      },
    platforms: {
      
       //scss
       "scss": {
        "transformGroup": "scss",
        // "prefix": "sd", // agregamos un prefijo a todas las cariables (Le agrega un guión también) 
        "buildPath": "__scss-input/abstracts/variables/colors/", // la ruta donde irá nuestro archivo de salida 
        "files": [{
          "destination": "fixed-colors.scss", // nombre de archivo 
          "format": "myFormat", // formato 
          "mapName": "font-style"
        }]
      }
    }
  }