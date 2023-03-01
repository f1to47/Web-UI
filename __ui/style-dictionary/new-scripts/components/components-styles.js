// config.js
module.exports = {
    source: [
      `ui-tokens/colors/*`, 
      `ui-tokens/foundation-tokens.json`, 
      `ui-tokens/components/*`,
    
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
            if(token.type === 'composition'){ 
              let props = []
              Object.entries(token.value).forEach(([key, value], index) => {
              
                if(value.toString().startsWith("#")){
                  let newValue = Object.values(token.original.value)[index];
                  newValue = newValue.replaceAll(/[{|}]/g, '');
                  newValue = newValue.replaceAll(/\./g, '-');
                  newValue = newValue.replaceAll(/_ct_|__ct_+/g, '--ct-');
                  colorVar = `var(${newValue})`
                  props = [...props, `--${token.name}-${key}:${colorVar};\n`]
                 
                }
                else{
                  props = [...props, `--${token.name}-${key}:${value};\n`]
                }
              });
              return  props                                     
        } 
        }).join('');

        let mixins = dictionary.allTokens.map(token => {
          if(token.type === 'composition'){

            let cssProps = []

           
                

                Object.entries(token.value).forEach(([key, value], index) => {
                  
           
                    
                  let translatedProp = propDictionary[key];

                  if(key === 'verticalPadding' || key === 'horizontalPadding'){
                    
          
                    cssProps = [...cssProps, `${propDictionary[key][0]}: ${value};\n ${propDictionary[key][1]}: ${value};\n`]

                  }


                  else if(key === 'boxShadow'){
                   
                    let newValue = Object.values(token.original.value)[index];
                    newValue = newValue.replaceAll(/[{|}]/g, '');
                    newValue = newValue.replaceAll(/\./g, '-');
                   
                    
                    let shadow = `box-shadow:`;
                    console.log(value);
                    Object.values(value).forEach((shadowValue, shadowIndex) => {
                         
                      
                 
      if(shadowValue != 'dropShadow'){
      
        if(shadowValue.toString().startsWith("#")){
          let newValue = Object.values(token.original.value)[index];
          newValue = newValue.replaceAll(/[{|}]/g, '');
          newValue = newValue.replaceAll(/\./g, '-');
          newValue = newValue.replaceAll(/_ct_|__ct_+/g, '--ct-');
          colorVar = `var(${newValue})`
      
         
         
          shadow = [...shadow, ` var(--shadow-color-base)`]

        }else{
                   shadow = [...shadow, ` ${shadowValue}`]
                  }      
                  }
                  });

                  cssProps = [...cssProps, `${shadow};\n`]
                   
                  }  
                  


                
                  else{


                   
                    cssProps = [...cssProps, `${translatedProp}: ${value};\n`]

                  }

                 



                  

                });

            
                let cssGroup = `.${token.name}{
                    
                  ${cssProps}

                }`
      
            return  cssGroup                           
      }
      
      
      }).join('');
        let format = `
       
        :root{
          ${styles}
          
        }

        ${mixins}
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
        "buildPath": "__scss-input/abstracts/variables/components/", // la ruta donde irá nuestro archivo de salida 
        "files": [{
          "destination": "components-styles.scss", // nombre de archivo 
          "format": "myFormat", // formato 
          "mapName": "font-style"
        }]
      }
    }
  }