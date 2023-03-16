
// tengo que crear una validacion mas, si tiene la clase cierre con flecha    
$('.accordion .accordion_header').click(function(){
   
   var acordeon = $(this).parents('.accordion');
   var acordeonItem = $(this).parents('.accordion_item');
   
   
   
   if(!acordeon.hasClass('accordion-open') && !acordeon.hasClass('accordion-multiple-open')  ){
   
   
      if(!acordeonItem.hasClass('accordion_item-active')){
         accordionOpen(acordeonItem, 'no');
   
         
         $('html, body').animate({
            scrollTop: acordeonItem.offset(300).top
         }, 200);
         
      }
      else{
     
       accordionClose(acordeonItem, 'no');
      }
   
   
   
   
   }else if(acordeon.hasClass('accordion-multiple-open')){
      
       // Abrir
       if(!acordeonItem.hasClass('accordion_item-active')){
         accordionOpen(acordeonItem, 'yes');
   
         //SCROLL
         $('html, body').animate({
            scrollTop: acordeonItem.offset(300).top
         }, 200);
         //SCROLL
   
      }
      else{
       // Cerrar 
       accordionClose(acordeonItem, 'yes');
      }
   }
   
   
   });
   
   
   // Funciones
   
   function accordionClose(item, multiple){
     
      item.removeClass('accordion_item-active');
   
      item.children('.accordion_content').removeClass('animate__animated animate__fadeInDown');
   
   }
   
   
   function accordionOpen(item, multiple){
   
      var acordeon = item.parents('.accordion');
      if( multiple == 'no'){
         acordeon.children('.accordion_item').removeClass('accordion_item-active');
      }
      item.addClass('accordion_item-active');
      item.children('.accordion_content').addClass('animate__animated animate__fadeInDown');
   }