// config.js
module.exports = {
    source: [`ui-tokens/__absolute-colors.json`, `ui-tokens/__dark-theme.json`],
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
          

       



    



  
          let shadowTokens = dictionary.allTokens.map(token => {
            if(token.type === 'boxShadow'){
             
              // console.log('--------------------TIPO: '+ typeof token );
              let props = []
              Object.entries(token.value).forEach(([key, value]) => {
                console.log(`'${key}':${value},`);

                props = [...props, `${key}:${value}`]
      
              });


              return `${token.name}:(
                     ${props}
                    
                       ),`
        }
        
        
        }).join('');
    
          return `
                  
                  $${'dark-theme-shadows'}:( 
                    ${shadowTokens}
                    );

                   
                 `

  
        }
      },
    platforms: {
      
       //scss
       "scss": {
        "transformGroup": "scss",
        // "prefix": "sd", // agregamos un prefijo a todas las cariables (Le agrega un guión también) 
        "buildPath": "__scss-input/abstracts/variables/themes/dark-theme/", // la ruta donde irá nuestro archivo de salida 
        "files": [{
          "destination": "dark-theme-shadows.scss", // nombre de archivo 
          "format": "myFormat", // formato 
          "mapName": "font-style"
        }]
      }
    }
  }