// config.js
module.exports = {
    source: [
    `ui-tokens/absolute-colors.json`, 
    `ui-tokens/theme-dark-colors.json`, 
    `ui-tokens/foundation-tokens.json`, 
    `ui-tokens/fixed-colors.json`, 
    `ui-tokens/c_card.json`,
    `ui-tokens/c_button_dt.json`,
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
              //  console.log(token);
                if(value.toString().startsWith("#")){
                  let newValue = Object.values(token.original.value)[index];
                  newValue = newValue.replaceAll(/[{|}]/g, '');
                  newValue = newValue.replaceAll(/\./g, '-');
                  newValue = newValue.replaceAll(/_ct_|__ct_+/g, '--ct-');
                  colorVar = `var(${newValue})`
                  props = [...props, `--${token.name}-${key}:${colorVar};\n`]
                  // console.log('____________________ '+ newValue)
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
                
            let props = []
            Object.entries(token.value).forEach(([key, value], index) => {
      
            //  console.log(token);
      
            if(key == 'boxShadow'){
              // console.log('????????=====================::::::: '+Object.values(token.original.value)[index]);
              let newValue = Object.values(token.original.value)[index];
              newValue = newValue.replaceAll(/[{|}]/g, '');
              newValue = newValue.replaceAll(/\./g, '-');
             
              
              let shadow = `box-shadow:`;
              Object.values(value).forEach((shadowValue, shadowIndex) => {
                   
                
                console.log(token.original.value);
if(shadowValue != 'dropShadow'){

  if(shadowValue.toString().startsWith("#")){
    let newValue = Object.values(token.original.value)[index];
    newValue = newValue.replaceAll(/[{|}]/g, '');
    newValue = newValue.replaceAll(/\./g, '-');
    newValue = newValue.replaceAll(/_ct_|__ct_+/g, '--ct-');
    colorVar = `var(${newValue})`

   
   
    shadow = [...shadow, ` var(--shadow-color-base)`]
    // console.log('____________________ '+ newValue)
  }else{
             shadow = [...shadow, ` ${shadowValue}`]
            }      
            }
            });
              props = `.${token.name}{
                ${shadow}
              }\n`
            }          
            });
            return  props                           
      }
      
      
      }).join('');
        let format = `
       
        :root{
          ${tokens}
          
        }

        ${mixins}
        `
let formatSeparator = format.replaceAll(",", ""); 
// console.log(formatSeparator);
          return formatSeparator;

        }
      },
    platforms: {
      
       //scss
       "scss": {
        "transformGroup": "scss",
        // "prefix": "sd", // agregamos un prefijo a todas las cariables (Le agrega un guión también) 
        "buildPath": "__scss-input/abstracts/variables/components/compositions/", // la ruta donde irá nuestro archivo de salida 
        "files": [{
          "destination": "components-compositions.scss", // nombre de archivo 
          "format": "myFormat", // formato 
          "mapName": "font-style"
        }]
      }
    }
  }