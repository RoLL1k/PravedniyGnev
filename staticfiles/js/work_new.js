"use strict";
/*Нужные глобальные переменные*/
let select_language_russian=document.querySelector('#russia_list__id');//Переменные для смены языков в блоке языки
let select_language_english=document.querySelector('#english_list__id');//Переменные для смены языков в блоке языки
let select_language_germany=document.querySelector('#germany_list__id');//Переменные для смены языков в блоке языки
let select_main_flag=document.querySelector('#flag_picture__selected');//Содержит имя файла с картинкой флага страны выбранного языка
let select_main_text=document.querySelector('#select_language__name');//Выбранный язык
let select_ul=document.querySelector("#list_languages__down");//Список всех языков - для появления или скрытия на экране
let mouse_ul=document.querySelector("#list_languages");//Вешаем слушатель мыши для выбора языка
select_language_russian.style.display='none';//Нужна что бы сразу скрыть русский пункт из меню выбора языков
let control_select_language=1;//Важная переменная контроля текущего языка - нужна для смены текста на любом элементе
let control_current_screen;
let globalImages=[];
let globalImages4=[];
let globalImageControl=0,globalImageControl4=0;
let allPhoto=[];
let allPhoto4=[];
let cur_photo2,cur_photo4;
let rez0,rez0_4;

/*Обработка списка выбора языка*/
select_ul.addEventListener("click", function(e) {      
   switch (e.target.id) {
      case 'russia_selected':
      case 'russia_selected__name':
      case 'russia_selected__id':         
         control_select_language=1;              
         select_main_flag.src="images/russia.jpg";    
         select_main_text.innerHTML="Русский";
         select_language_russian.style.display='none';
         select_language_english.style.display='block';
         select_language_germany.style.display='block';
         select_ul.style.left="-9999px";
         control_current_screen=1;
         page1();
         inner_language("russian_paragraph");
         break;
      case 'english_selected':
      case 'english_selected__name':
      case 'english_selected__id':   
         control_select_language=2;         
         select_main_flag.src="images/english.jpg";    
         select_main_text.innerHTML="English";
         select_language_russian.style.display='block';
         select_language_english.style.display='none';
         select_language_germany.style.display='block';
         select_ul.style.left="-9999px";
         control_current_screen=1;
         page1();
         inner_language("english_paragraph");
         break;
      case 'germany_selected':
      case 'germany_selected__name':
      case 'germany_selected__id':   
         control_select_language=3;
         select_main_flag.src="images/germany.jpg";    
         select_main_text.innerHTML="Deutschland";
         select_language_russian.style.display='block';
         select_language_english.style.display='block';
         select_language_germany.style.display='none';
         select_ul.style.left="-9999px";        
         control_current_screen=1;
         page1();
         inner_language("german_paragraph");
         break;
   }    



});

mouse_ul.addEventListener("mouseover", function(e) {      
   select_ul.style.left=0;      
});
mouse_ul.addEventListener("mouseout", function(e) {      
   select_ul.style.left="-9999px";         
});

page1();
page2();
page3();
page4();
page5();
page6();
page7();
page8();

/*Код для корректного отображения скролла первой страницы*/
function page1() {
   if (document.querySelector('#page1')) {
      control_current_screen=1;     
      
      document.querySelector('#page1').style.display="flex";  
      let page1ParagraphClassName;
      switch (control_select_language) {
         case 1:
            page1ParagraphClassName="russian_paragraph"        
            break;
         case 2:
            page1ParagraphClassName="english_paragraph"
            break;
         case 3:
            page1ParagraphClassName="german_paragraph"
            break;
      }   
      let page1ParagraphControl=document.querySelectorAll('#page1_text p,#page1_text h1,#page1_text h2');   
      for (let b of page1ParagraphControl) {
         if (b.className==page1ParagraphClassName || b.className=="all_paragraph") {
            b.style.display="block";
         } else {
            b.style.display="none";
         }
      } 

      if (parseInt(getComputedStyle(document.querySelector('#page1_text')).height)>(parseInt(getComputedStyle(document.querySelector('#page1_container')).height))) {      
         document.querySelector("#page1_container").classList.remove("sb-container");   
         document.querySelector("#page1_container").classList.add("sb-container");                  
         
         $(".sb-container").scrollBox();        
         
         document.querySelector("#sb-scrollbar--container1").classList.add("scrollbar-container--position1");     


      } else {
         document.querySelector("#page1_container").style.backgroundColor="rgba(223, 223, 223, 0.9)";

         let dopA=document.querySelectorAll("#page1_text p,#page1_text h1,#page1_text h2");
         for (let a of dopA) {
         a.style.backgroundColor="rgba(223, 223, 223, 0)";
         }      
      }

      let vis1=parseInt(getComputedStyle(document.querySelector('#page1_container')).height);        
      let vis2=parseInt(getComputedStyle(document.querySelector('#sb-scrollbar--container1')).height);        
      let vis3=document.querySelector('#page1_text').clientHeight;
      document.querySelector('#sb-scrollbar1').style.height=((vis1*vis2)/vis3)+'px';
   }   
}


function page2() { 
   if (document.querySelector('#page2_1')) {           
      control_current_screen=2;      
      let ddd=document.querySelectorAll('.test_hight');
      let size1=parseInt(getComputedStyle(ddd[0]).height);
      let height_review_block=size1;
      ddd=document.querySelectorAll('.text2_1');
      let size2=parseInt(getComputedStyle(ddd[0]).height);   

   /*.block_review*/
      let count_review=0;
      let newSize=document.querySelectorAll('.test_hight');
      for (let dopCount of newSize) {
         count_review++;
      }




      if (size2-(count_review*size1)>0) {            
         document.querySelector('#text2_1').style.background=`linear-gradient(to top,white ${size2-(size1*count_review)}px,transparent ${size2-(size1*count_review)}px,transparent 100%)`;      
      }
      else {
          document.querySelector("#text2_1").classList.remove("sb-container");
          document.querySelector("#text2_1").classList.add("sb-container");
          $(".sb-container").scrollBox();
          document.querySelector("#sb-scrollbar--container2").classList.add("scrollbar-container--position2");
      }
   }   
   
}


function page3() {
   if (document.querySelector('#main-view')) { 
      let cur_photo=0;
      globalImageControl=0;
      allPhoto.length=0;      
      document.querySelector('#wrapper_left').style.display="none";
      document.querySelector('#wrapper_right').style.display="none";
      document.querySelector('#view-big--photo').style.display="none";
      document.querySelector('#wrapper_left').style.color='#cacaca';      

      document.querySelector('#pic-mail').onclick=() => {
         let dop_str=document.querySelector('#user_rebuttal3').value;
         dop_str=dop_str.replace(/\r|\n/g, '');
         dop_str=dop_str.replace( / +(?= )/g, ' ');
         window.open(`mailto:?subject=ПРАВЕДНЫЙ ГНЕВ&body=${encodeURI(dop_str)}`);      
      }

      let kolImages=document.querySelectorAll('.all-images');
      let photo_review=[];
      for (let kol of kolImages) {
         photo_review.push(kol.src);
      }

      for (let count1_3=0;count1_3<=3;count1_3++) {

         if (((typeof (photo_review[count1_3])) !== 'undefined') && (((photo_review[count1_3]).length)>0)) {              
            document.querySelector(`#photo${count1_3+1}`).style.backgroundImage=`url(${photo_review[count1_3]})`;

            document.querySelector(`#photo${count1_3+1}`).style.backgroundColor="white";

            document.querySelector(`#photo${count1_3+1}`).innerHTML='';   
            document.querySelector(`#photo${count1_3+1}`).addEventListener("click",addList);
            globalImages[count1_3]=photo_review[count1_3];
         } else {
            break;
         }

      }   

      if ((typeof photo_review !== 'undefined') && ((photo_review.length)>4)) {      
         document.querySelector('#wrapper_left').style.display="flex";
         document.querySelector('#wrapper_right').style.display="flex";
         document.querySelector('#wrapper_right').style.color="black";      
         document.querySelector('#wrapper_left').onclick=function() {
            if (cur_photo>0) {                        
               cur_photo--;             
               document.querySelector('#wrapper_right').style.color='black'            
               if (cur_photo==0) {
                  document.querySelector('#wrapper_left').style.color='#cacaca';               
               }                     
               for (let count1_dop=1;count1_dop<=4;count1_dop++) {
                  document.querySelector(`#photo${count1_dop}`).style.backgroundImage=`url(${photo_review[(count1_dop+cur_photo)-1]})`;
                  
                  document.querySelector(`#photo${count1_dop}`).innerHTML='';            
                  globalImages[count1_dop-1]=photo_review[(count1_dop+cur_photo)-1];
               }  
               if (globalImageControl>0) {               
                  addListDop();
               }
               if (cur_photo==0) {
                  document.querySelector('#wrapper_left').style.color='#cacaca';
               }                     
            }
         }
         document.querySelector('#wrapper_right').onclick=function() {
            if (cur_photo<(photo_review.length)-4) {
               cur_photo++;            
               document.querySelector('#wrapper_left').style.color='black'            
               if (cur_photo==(photo_review.length)-4) {
                  document.querySelector('#wrapper_right').style.color='#cacaca';                 
               }
               for (let count1_2=1;count1_2<=4;count1_2++) {
                  document.querySelector(`#photo${count1_2}`).style.backgroundImage=`url(${photo_review[(count1_2+cur_photo)-1]})`;
                  
                  document.querySelector(`#photo${count1_2}`).innerHTML='';            
                  globalImages[count1_2-1]=photo_review[(count1_2+cur_photo)-1];
               }
               if (globalImageControl>0) {               
                  addListDop();
               }                        
            }
         }   

      }
   }   
}



function page4() {
   if (document.querySelector('#anger-post')) {
/*************************Функция запрета более 2-х строк в наименовании сообщения****************/
      var textArea = $('#name_anger');
      var maxRows = textArea.attr('rows');
      var maxChars = textArea.attr('cols');
      textArea.keypress(function(e){
            var text = textArea.val();
            var lines = text.split('\n');
            if (e.keyCode == 13){
               return lines.length < maxRows;
            }
            else{ 
               var caret = textArea.get(0).selectionStart;          
               var line = 0;
               var charCount = 0;
               $.each(lines, function(i,e){
                  charCount += e.length;
                  if (caret <= charCount){
                        line = i;
                        return false;
                  }

                  charCount += 1;
               });
                     
               var theLine = lines[line];
               return theLine.length < maxChars;
            }

      });
   }   
}   
/*********************************************************************************************/    

/*********Размещение фото гнева***************************************************************/
function page5() {
   if (document.querySelector('#photo-anger-post')) {
      control_current_screen=12;         
      control_select_language=1;       
      document.querySelector('#wrapper_up12').style.display="none";
      document.querySelector('#wrapper_down12').style.display="none";
      document.querySelector('#real-container--photo12').style.backgroundImage="none";
      
      document.querySelector('#wrapper_up12').style.color='#cacaca';
      document.querySelector('#wrapper_down12').style.color='#cacaca';
   
   /**********************Блок вставки  фото по дропу*******************************************/
   
      var blockdrop = document.getElementsByTagName('*');
      
      for (let ss of blockdrop) {
         ss.addEventListener('dragenter', noopHandler, false);
         ss.addEventListener('dragexit', noopHandler, false);
         ss.addEventListener('dragover', noopHandler, false);
         ss.addEventListener('drop', noopHandler, false);
      }
   
      var dropbox = document.getElementById('main-photo--center12');
      var dropbox2 = document.getElementById('real-container--photo12');
      var dropbox3 = document.getElementById('photo-text12');
      dropbox.addEventListener('drop', drop, false);
      dropbox2.addEventListener('drop', drop, false);
      dropbox3.addEventListener('drop', drop, false);
      
      function noopHandler(evt) {
         evt.stopPropagation();
         evt.preventDefault();
      }
      function drop(evt) {
         evt.stopPropagation();
         evt.preventDefault(); 
         let files = event.dataTransfer.files;      
         checkFile5(files);
      }
   /**********************************************************************************************/
   
   
      let dz1=document.querySelector('#change_dop12');   
      let dz2=document.querySelector('#change_dop13');   
      let dz3=document.querySelector('#change_dop14');   
      let dz4=document.querySelector('#photo-text12');   
      dz1.onclick=function() {
         dz1.addEventListener("focusin", hide_button);
         dz1.addEventListener("focusout", show_button);     
         document.getElementById('input_file12').addEventListener('change', 
                                                      checkFile4, 
                                                      false);
      }
      dz4.onclick=function() {
         dz1.addEventListener("focusin", hide_button);
         dz1.addEventListener("focusout", show_button);     
         document.getElementById('input_file12').addEventListener('change', 
                                                      checkFile4, 
                                                      false);
      }
   
      if (typeof cur_photo4 == "undefined") {
         cur_photo4=0;
      }  
   
      if (typeof rez0_4 == "undefined") {
         dz2.classList.add('none_button');
         dz2.classList.remove('punch_button');
   
         dz3.classList.add('none_button');
         dz3.classList.remove('punch_button');
      }  
      
      if (typeof rez0_4 != "undefined") {
         if (rez0_4.length>0) {
            document.querySelector('#real-container--photo12').style.backgroundImage=`url(${rez0_4})`;
            document.querySelector('#photo-text12').innerHTML='';
   
            if (globalImageControl4==0) {
               dz2.classList.remove('none_button');
               dz2.classList.add('punch_button');
            } else {
               dz2.classList.remove('punch_button');
               dz2.classList.add('none_button');
            }   
   
            dz3.classList.remove('none_button');
            dz3.classList.add('punch_button');
         } else {
            
            
            switch (control_select_language) {  
               case 1:
                  document.querySelector('#photo-text12').innerHTML='Выберите<br />изображение';
                  break;
               case 2:
                  document.querySelector('#photo-text12').innerHTML='Select <br />an image';
                  break;
               case 3:               
                  document.querySelector('#photo-text12').innerHTML='Wählen Sie <br />ein Bild aus';
                  break;
            }
   
            dz2.classList.add('none_button');
            dz2.classList.remove('punch_button');
            dz3.classList.add('none_button');
            dz3.classList.remove('punch_button');
         } 
      }
      dz2.addEventListener("click",addPhoto4);
      dz3.addEventListener("click",delPhoto4);
   
           
      slider4();
   
   }
   
}

function page6() {
   if (document.querySelector('#photo-rebuttal--post')) {
      let numReview;      
      
      control_current_screen=9;     
      
      document.querySelector('#block-rebuttal3--dop').innerHTML="";
      document.querySelector('#block-rebuttal3--dop').style.top="0px";
        
      /*color_text();*/
      
      document.querySelector('#wrapper_up3').style.display="none";
      document.querySelector('#wrapper_down3').style.display="none";
      document.querySelector('#real-container--photo').style.backgroundImage="none";
      
      document.querySelector('#wrapper_up3').style.color='#cacaca';
      document.querySelector('#wrapper_down3').style.color='#cacaca';
   
   
      var blockdrop = document.getElementsByTagName('*');
      
      for (let ss of blockdrop) {
         ss.addEventListener('dragenter', noopHandler, false);
         ss.addEventListener('dragexit', noopHandler, false);
         ss.addEventListener('dragover', noopHandler, false);
         ss.addEventListener('drop', noopHandler, false);
      }
   
      var dropbox = document.getElementById('main-photo--center');
      var dropbox2 = document.getElementById('real-container--photo');   
      var dropbox3 = document.getElementById('photo-text1');   
      dropbox.addEventListener('drop', drop, false);
      dropbox2.addEventListener('drop', drop, false);
      dropbox3.addEventListener('drop', drop, false);
   
      function noopHandler(evt) {
          evt.stopPropagation();
          evt.preventDefault();
      }
      function drop(evt) {
          evt.stopPropagation();
          evt.preventDefault(); 
         let files = event.dataTransfer.files;      
         checkFile2(files);
      }
   
      let dz1=document.querySelector('#change_dop7');   
      let dz2=document.querySelector('#change_dop8');   
      let dz3=document.querySelector('#change_dop9');   
      let dz4=document.querySelector('#photo-text1');   
      dz1.onclick=function() {
         dz1.addEventListener("focusin", hide_button);
         dz1.addEventListener("focusout", show_button);     
         document.getElementById('input_file').addEventListener('change', 
                                                     checkFile, 
                                                     false);
      }
      dz4.onclick=function() {
         dz1.addEventListener("focusin", hide_button);
         dz1.addEventListener("focusout", show_button);     
         document.getElementById('input_file').addEventListener('change', 
                                                     checkFile, 
                                                     false);
      }
   
      
      if (typeof cur_photo2 == "undefined") {
         cur_photo2=0;
      }  
   
      if (typeof rez0 == "undefined") {
         dz2.classList.add('none_button');
         dz2.classList.remove('punch_button');
   
         dz3.classList.add('none_button');
         dz3.classList.remove('punch_button');
      }     
      if (typeof rez0 != "undefined") {
         if (rez0.length>0) {
            document.querySelector('#real-container--photo').style.backgroundImage=`url(${rez0})`;
            document.querySelector('#photo-text1').innerHTML='';
   
            if (globalImageControl==0) {
               dz2.classList.remove('none_button');
               dz2.classList.add('punch_button');
            } else {
               dz2.classList.remove('punch_button');
               dz2.classList.add('none_button');            
            }   
   
            dz3.classList.remove('none_button');
            dz3.classList.add('punch_button');
         } else {
            switch (control_select_language) {
               case 1:
                  document.querySelector('#photo-text1').innerHTML='Выберите<br />изображение';
                  break;
               case 2:
                  document.querySelector('#photo-text1').innerHTML='Select <br />an image';
                  break;
               case 3:               
                  document.querySelector('#photo-text1').innerHTML='Wählen Sie <br />ein Bild aus';
                  break;
            }         
/*            color_text();*/
   
            dz2.classList.add('none_button');
            dz2.classList.remove('punch_button');
   
            dz3.classList.add('none_button');
            dz3.classList.remove('punch_button');
         } 
      }
      dz2.addEventListener("click",addPhoto);
      dz3.addEventListener("click",delPhoto);
      
      slider1();
   }
}


function page7() { 
   if (document.querySelector('#rebuttal-pay')) {           
      let cur_rez=document.querySelector('#save_dop8');

      cur_rez.onclick=() => {      
         let pattern=/^[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}$/i;
         let mail_value=document.querySelector('#mail1');      
         if (pattern.test(mail_value.value)==true){
            cur_rez.classList.add('none_button');
            cur_rez.classList.remove('punch_button');
            mail_value.disabled=true;
            mail_value.style.cursor="default";
         } else {         
            mail_value.style.border="1px solid red";      
            setTimeout(function(){ 
               mail_value.style.border="1px solid #5b7ea4";   
            },200);
         }
      }   
   

      /*Разобраться с ценой*/
      document.querySelector('#change-currency').onchange=() => {
         let check=document.querySelector('#change-currency').value;      
         switch (check) {
            case "RUB":
               if (price_review[numReview]==10000) {
                  document.querySelector("#price-field8").innerHTML=`10 000`;
               }  else { 
                  document.querySelector("#price-field8").innerHTML=`${price_review[numReview]}`;
               }   
               break;
            case "USD":
               document.querySelector("#price-field8").innerHTML=`${price_review2[numReview]}`;
               break;
            case "EUR":
               document.querySelector("#price-field8").innerHTML=`${price_review3[numReview]}`;
               break;            
         }
      }
   }   
   
}

function page8() {
   if (document.querySelector('#block-pay')) {     
      
      control_current_screen=13;     

      let allSummaValues=document.querySelectorAll("#block-summa p");
      document.querySelector('#change-currency2').removeEventListener("change",changeCurrency);
      for (let dopSumma of allSummaValues)  {
         dopSumma.removeEventListener("click",selectSummaValue);
      }
      document.querySelector('#save13').onclick=()=>{
         document.querySelector("#save_dop15").classList.remove('none_button');
         document.querySelector("#save_dop15").classList.add('punch_button');      
      }
      document.querySelector('#summa1').onclick=()=>{
         document.querySelector("#block-summa").style.display="flex";           
         for (let dopSumma of allSummaValues)  {
            dopSumma.addEventListener("click",selectSummaValue);
         }
      }
      document.querySelector('#change-currency2').addEventListener("change",changeCurrency);
      
   
      document.querySelector("#save15").onclick=()=> {
         if (document.querySelector("#save_dop15").className!="none_button") {
            let pattern=/^[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}$/i;
            let mail_value=document.querySelector('#mail2');      
            if (mail_value.value.length>0) {
               if (pattern.test(mail_value.value)==true) {
/*                  screen3_3();*/
               } else {         
                  mail_value.style.border="1px solid red";      
                  setTimeout(function(){ 
                     mail_value.style.border="1px solid #5b7ea4";   
                  },200);
               }     
            } else {
/*               screen3_3();*/
            }   
         }   
      }
   
      document.querySelector("#butWindow1").onclick=()=> {
         document.querySelector("#modalWindow1").style.display="none";
         document.querySelector("#mainWindow3").style.display="block";
      }   
      document.querySelector("#modalWindow1").onclick=()=> {
         document.querySelector("#modalWindow1").style.display="none";
         document.querySelector("#mainWindow3").style.display="block";
      }   
      document.querySelector("#text_block_p2_4").onclick=()=> {
         document.querySelector("#modalWindow1").style.display="flex";
         document.querySelector("#mainWindow3").style.display="none";
      }   
   
   
      document.querySelector("#butWindow2").onclick=()=> {
         document.querySelector("#modalWindow2").style.display="none";
         document.querySelector("#mainWindow3").style.display="block";
      }   
      document.querySelector("#modalWindow2").onclick=()=> {
         document.querySelector("#modalWindow2").style.display="none";
         document.querySelector("#mainWindow3").style.display="block";
      }   
      document.querySelector("#text_block_p2_5").onclick=()=> {
         document.querySelector("#modalWindow2").style.display="flex";
         document.querySelector("#mainWindow3").style.display="none";
      }   
   
   
      document.querySelector("#butWindow3").onclick=()=> {
         document.querySelector("#modalWindow3").style.display="none";
         document.querySelector("#mainWindow3").style.display="block";
      }   
      document.querySelector("#modalWindow3").onclick=()=> {
         document.querySelector("#modalWindow3").style.display="none";
         document.querySelector("#mainWindow3").style.display="block";
      }   
      document.querySelector("#text_block_p2_3").onclick=()=> {
         document.querySelector("#modalWindow3").style.display="flex";
         document.querySelector("#mainWindow3").style.display="none";
      }  


   }   
}


function changeCurrency() {
   let check=document.querySelector('#change-currency2').value;     
   let valCurrent=document.querySelector('#valueSumma').innerHTML;     
   let currentIndex;
   let summaRussia=["10 000 р.","5000 р.","3000 р.","2000 р.","1000 р.","500 р.","300 р.","100 р."];
   let summaRussia2=["50 000 р.","25 000 р.","15 000 р.","10 000 р.","5000 р.","2500 р.","1500 р.","500 р."];
   let summaEnglish=["155 $","80 $","48 $","32 $","16 $","8 $","5 $","1.6 $"];      
   let summaEnglish2=["775 $","400 $","240 $","160 $","80 $","40 $","25 $","8 $"];      
   let summaGerman=["140 €","70 €","42 €","28 €","14 €","7 €","4 €","1.4 €"]; 
   let summaGerman2=["700 €","350 €","210 €","140 €","70 €","35 €","20 €","7 €"]; 
   if (summaRussia.indexOf(valCurrent)>-1) {currentIndex=summaRussia.indexOf(valCurrent);}
   if (summaEnglish.indexOf(valCurrent)>-1) {currentIndex=summaEnglish.indexOf(valCurrent);}
   if (summaGerman.indexOf(valCurrent)>-1) {currentIndex=summaGerman.indexOf(valCurrent);}     
   let promResult=document.querySelectorAll('#block-summa p');
   let countResult=0;       
   switch (check) {
      case "RUB":
         document.querySelector("#valueSumma").innerHTML=summaRussia[currentIndex];
         document.querySelector("#pay-text1").value=summaRussia[currentIndex];
         document.querySelector("#pay-text2").value=summaRussia2[currentIndex];
         for (let z of promResult) {
            z.innerHTML=summaRussia[countResult];
            countResult++;
         }   
         break;
      case "USD":
         document.querySelector("#valueSumma").innerHTML=summaEnglish[currentIndex];
         document.querySelector("#pay-text1").value=summaEnglish[currentIndex];
         document.querySelector("#pay-text2").value=summaEnglish2[currentIndex];
         for (let z of promResult) {
            z.innerHTML=summaEnglish[countResult];
            countResult++;
         }   
         break;
      case "EUR":
         document.querySelector("#valueSumma").innerHTML=summaGerman[currentIndex];
         document.querySelector("#pay-text1").value=summaGerman[currentIndex];
         document.querySelector("#pay-text2").value=summaGerman2[currentIndex];
         for (let z of promResult) {
            z.innerHTML=summaGerman[countResult];
            countResult++;
         }   
         break;            
   }
   return false;
}

function selectSummaValue(e) {
   let dopIdName=e.target.id;   
   let dopClassName=e.target.className;   
   let currentSummaClassName=document.querySelector("#summa1").className;   
   document.querySelector("#summa1").classList.remove(`${currentSummaClassName}`);
   document.querySelector("#valueSumma").innerHTML=document.querySelector(`#${dopIdName}`).innerHTML;
   document.querySelector("#summa1").classList.add(`${dopClassName}`);   
   document.querySelector("#block-summa").style.display="none";      
   changeCurrency();
   return false;     
}
/**************Конец размещения фото гнева******/


/*Потом разоюраться с цветом*/
/*function color_text() {   
   let dop=document.querySelector('#photo-text1');   
   let dop_id=parseInt(idName.slice(10));
   dop.classList.remove('photo-text1');   
   dop.classList.add(`photo-text1_${price_review[dop_id]}`);   
}*/  



function addListDop() {
   let img = new Image();
   img.onload = function() {     

      let hg=(parseInt(getComputedStyle(document.querySelector('#block-review4')).height))+(parseInt(getComputedStyle(document.querySelector('#spis-container')).height));
      let lf=((parseInt(getComputedStyle(document.querySelector('#view-header')).width))-((hg*img.width)/img.height))/2;
      document.querySelector('#view-big--photo').style.left=`${lf}px`;  
      document.querySelector('#view-big--photo').style.width=`${(hg*img.width)/img.height}px`;  
      document.querySelector('#view-big--photo').style.display="block";      
      document.querySelector('#view-big--photo').style.backgroundImage=`url(${img.src})`;              
      document.querySelector('#close_button').addEventListener("click",function() {
         document.querySelector('#view-big--photo').style.display="none";                        
         globalImageControl=0;
      });
   };
   img.src=globalImages[globalImageControl-1];            
}

function addList(e) {
   let this_photo=e.target.id;         
   let num=parseInt(this_photo.slice(5));        
   /************************Подгонка под реальное изображение*********************************/
   let img = new Image();
   img.onload = function() {     

      let hg=(parseInt(getComputedStyle(document.querySelector('#block-review4')).height))+(parseInt(getComputedStyle(document.querySelector('#spis-container')).height));
      let lf=((parseInt(getComputedStyle(document.querySelector('#view-header')).width))-((hg*img.width)/img.height))/2;
      document.querySelector('#view-big--photo').style.left=`${lf}px`;  
      document.querySelector('#view-big--photo').style.width=`${((hg*img.width)/img.height)}px`;  
      document.querySelector('#view-big--photo').style.display="block";      
      document.querySelector('#view-big--photo').style.backgroundImage=`url(${img.src})`; 
      document.querySelector('#view-big--photo').style.border="5px solid #5b7ea4"; 
      document.querySelector(`#${this_photo}`).style.border="2px solid red";                        
      document.querySelector('#close_button').addEventListener("click",function() {
         document.querySelector('#view-big--photo').style.display="none";                        
         if (document.querySelector(`#photo${globalImageControl}`)) {
            document.querySelector(`#photo${globalImageControl}`).style.border="2px solid #5b7ea4";                        
         }   
         globalImageControl=0;
      });
   };
   img.src=globalImages[num-1];   
   if (globalImageControl>0) {
      document.querySelector(`#photo${globalImageControl}`).style.border="2px solid #5b7ea4";                        
   }
   globalImageControl=num;      
   
   /*******************************************************************************************/   
}




function addPhoto4() {
   if (globalImageControl4==0) {
      if (rez0_4.length>0) {
         allPhoto4.push(rez0_4);
         rez0_4='';
         document.querySelector('#real-container--photo12').style.backgroundImage="none";
         
         switch (control_select_language) {  
            case 1:
               document.querySelector('#photo-text12').innerHTML='Выберите<br />изображение';
               break;
            case 2:
               document.querySelector('#photo-text12').innerHTML='Select <br />an image';
               break;
            case 3:               
               document.querySelector('#photo-text12').innerHTML='Wählen Sie <br />ein Bild aus';
               break;
         }
      
      }      
      hide_button2(document.querySelector("#change_dop13"));
      hide_button2(document.querySelector("#change_dop14"));
      if (allPhoto4.length>4) {
         cur_photo4=allPhoto4.length-4;
      } else {
         cur_photo4=0;
      }      
      slider4();
   }      
}
/*************************************************************************************************/

/******************************Функция работы слайдера в слайдер!!!*******************************/
function slider4() {
   document.querySelector('#wrapper_up12').style.display="none";
   document.querySelector('#wrapper_down12').style.display="none";
   for (let count3=1;count3<=4;count3++) {      
      document.querySelector(`#photo${count3}_4`).style.backgroundImage='none';
      document.querySelector(`#photo${count3}_4`).innerHTML='<span class="text-photo">ФОТО</span>';
      switch (control_select_language) {
         case 1:
            document.querySelector(`#photo${count3}_4`).innerHTML='<span class="text-photo">ФОТО</span>';
            break;
         case 2:
            document.querySelector(`#photo${count3}_4`).innerHTML='<span class="text-photo">PHOTO</span>';
            break;
         case 3:
            document.querySelector(`#photo${count3}_4`).innerHTML='<span class="text-photo">FOTO</span>';
            break;
      }      
      document.querySelector(`#photo${count3}_4`).style.backgroundColor="#ffc003";
      document.querySelector(`#photo${count3}_4`).style.border="2px solid #5b7ea4";
      document.querySelector(`#photo${count3}_4`).removeEventListener('click', addList_rebuttal4);
   }
     
   if (globalImageControl4>0) {
      document.querySelector(`#photo${globalImageControl4}_4`).style.border="2px solid red";  
   }

   

   document.querySelector('#wrapper_up12').style.color='#cacaca';
   document.querySelector('#wrapper_down12').style.color='#cacaca';
   for (let count5=0;count5<=3;count5++) {

         
         if ((typeof allPhoto4[count5]!=='undefined') && (allPhoto4[count5].length>0)) {               
            
            document.querySelector(`#photo${count5+1}_4`).style.backgroundImage=`url(${allPhoto4[(count5+cur_photo4)]})`;

            document.querySelector(`#photo${count5+1}_4`).style.backgroundColor="white";         

            document.querySelector(`#photo${count5+1}_4`).innerHTML='';   
            
            document.querySelector(`#photo${count5+1}_4`).addEventListener("click",addList_rebuttal4);
            globalImages4[count5]=allPhoto4[(count5+cur_photo4)];
            
         } else {
            break;
         }

   }   
   
   if ((allPhoto4.length)>4) {      
      document.querySelector('#wrapper_up12').style.display="flex";
      document.querySelector('#wrapper_down12').style.display="flex";
      if (cur_photo4>0) {document.querySelector('#wrapper_up12').style.color='black';}
      else {document.querySelector('#wrapper_up12').style.color='#cacaca';}
      if (cur_photo4==(allPhoto4.length-4)) {document.querySelector('#wrapper_down12').style.color='#cacaca';}
      else {document.querySelector('#wrapper_down12').style.color='black';}        
      document.querySelector('#wrapper_up12').addEventListener("click",sliderUp4);
      document.querySelector('#wrapper_down12').addEventListener("click",sliderDown4);
   }
   
}

/******************************Функция слайдера по нажатию кнопки вверх или удалаени(добавления)**************/
function sliderDown4() {
   if (cur_photo4<(allPhoto4.length)-4) {
      cur_photo4++;            
      document.querySelector('#wrapper_up12').style.color='black'            
      if (cur_photo4==(allPhoto4.length)-4) {
         document.querySelector('#wrapper_down12').style.color='#cacaca';                 
      }
      for (let count1=1;count1<=4;count1++) {
         document.querySelector(`#photo${count1}_4`).style.backgroundImage=`url(${allPhoto4[(count1+cur_photo4)-1]})`;
         
         document.querySelector(`#photo${count1}_4`).innerHTML='';            
         globalImages4[count1-1]=allPhoto4[(count1+cur_photo4)-1];
      }
      if (globalImageControl4>0) {               
         addListDop_rebuttal4();
      }                        
   }
}
/*************************************************************************************************************/
/******************************Функция слайдера по нажатию кнопки вверх или удалаени(добавления)**************/
function sliderUp4() {
   if (cur_photo4>0) {                        
      cur_photo4--;             
      document.querySelector('#wrapper_down12').style.color='black'            
      if (cur_photo4==0) {
         document.querySelector('#wrapper_up12').style.color='#cacaca';               
      }                     
      for (let count1=1;count1<=4;count1++) {
         document.querySelector(`#photo${count1}_4`).style.backgroundImage=`url(${allPhoto4[(count1+cur_photo4)-1]})`;
         
         document.querySelector(`#photo${count1}_4`).innerHTML='';            
         globalImages4[count1-1]=allPhoto4[(count1+cur_photo4)-1];
      }  
      if (globalImageControl4>0) {               
         addListDop_rebuttal4();
      }
      if (cur_photo4==0) {
         document.querySelector('#wrapper_up12').style.color='#cacaca';
      }                     
   }
}   
/*************************************************************************************************************/


/*************************************************************************************************************/
function addList_rebuttal4(e) {   
   let this_photo=e.target.id;     
   let num=parseInt(this_photo.slice(5,6));        
   /************************Подгонка под реальное изображение*********************************/
   let img = new Image();
   img.onload = function() {     
     
      if (img.width>img.height) {
         
         if ((window.screen.width)>1680) {
            document.querySelector('#real-container--photo12').style.width="600px";
            document.querySelector('#real-container--photo12').style.height="422px";
         }
         if (((window.screen.width)<=1680) && ((window.screen.width)>1440)) {
            document.querySelector('#real-container--photo12').style.width="525px";
            document.querySelector('#real-container--photo12').style.height="369px";
         }
         if (((window.screen.width)<=1440) && ((window.screen.width)>1280)) {
            document.querySelector('#real-container--photo12').style.width="450px";
            document.querySelector('#real-container--photo12').style.height="316px";
         }
         if (((window.screen.width)<=1280) && ((window.screen.width)>1024)) {
            document.querySelector('#real-container--photo12').style.width="400px";
            document.querySelector('#real-container--photo12').style.height="281px";
         }
         if (((window.screen.width)<=1024) && ((window.screen.width)>800)) {
            document.querySelector('#real-container--photo12').style.width="320px";
            document.querySelector('#real-container--photo12').style.height="225px";
         }
         if ((window.screen.width)<=800) {
            document.querySelector('#real-container--photo12').style.width="250px";
            document.querySelector('#real-container--photo12').style.height="175px";
         }


      }
      else {
         
         let dop_height=parseInt(getComputedStyle(document.querySelector('#real-container--photo12')).height);
         document.querySelector('#real-container--photo12').style.width=`${(dop_height*img.width)/img.height}px`;
      }
      document.querySelector(`#${this_photo}`).style.border="2px solid red"; 
      document.querySelector('#real-container--photo12').style.backgroundImage=`url(${img.src})`;
      rez0_4=img.src;
   };
   img.src=globalImages4[num-1];   

   show_button2(document.querySelector("#change_dop14"));


   document.querySelector('#photo-text12').innerHTML=``;   

   if (globalImageControl4>0) {
      document.querySelector(`#photo${globalImageControl4}_4`).style.border="2px solid #5b7ea4";                        
   }
   globalImageControl4=num;    
}
/**************************************************************************************************************/
function addListDop_rebuttal4() {   
   let img = new Image();
   img.onload = function() {    
      if (img.width>img.height) {
         
         if ((window.screen.width)>1680) {
            document.querySelector('#real-container--photo12').style.width="600px";
            document.querySelector('#real-container--photo12').style.height="422px";
         }
         if (((window.screen.width)<=1680) && ((window.screen.width)>1440)) {
            document.querySelector('#real-container--photo12').style.width="525px";
            document.querySelector('#real-container--photo12').style.height="369px";
         }
         if (((window.screen.width)<=1440) && ((window.screen.width)>1280)) {
            document.querySelector('#real-container--photo12').style.width="450px";
            document.querySelector('#real-container--photo12').style.height="316px";
         }
         if (((window.screen.width)<=1280) && ((window.screen.width)>1024)) {
            document.querySelector('#real-container--photo12').style.width="400px";
            document.querySelector('#real-container--photo12').style.height="281px";
         }
         if (((window.screen.width)<=1024) && ((window.screen.width)>800)) {
            document.querySelector('#real-container--photo12').style.width="320px";
            document.querySelector('#real-container--photo12').style.height="225px";
         }
         if ((window.screen.width)<=800) {
            document.querySelector('#real-container--photo12').style.width="250px";
            document.querySelector('#real-container--photo12').style.height="175px";
         }


      }
      else {
         
         let dop_height=parseInt(getComputedStyle(document.querySelector('#real-container--photo12')).height);
         document.querySelector('#real-container--photo12').style.width=`${(dop_height*img.width)/img.height}px`;
      }
      document.querySelector('#real-container--photo12').style.backgroundImage=`url(${img.src})`;
      rez0_4=img.src;
      document.querySelector('#photo-text12').innerHTML=``;

   };
   img.src=globalImages4[globalImageControl4-1];    
}
/***********************************************************************************************************************/


/******************************Функция помещения фото в слайдер!!!********************************/
function delPhoto4() {
   
   if (rez0_4.length>0) {   
      if (globalImageControl4>0) {      
         allPhoto4.splice((allPhoto4.indexOf(rez0_4)),1);
         document.querySelector(`#photo${globalImageControl4}_4`).style.border="2px solid #5b7ea4";   
         globalImageControl4=0;
      }
      rez0_4='';
      document.querySelector('#real-container--photo12').style.backgroundImage="none";
   
      if ((window.screen.width)>1680) {
         document.querySelector('#real-container--photo12').style.width="600px";
         document.querySelector('#real-container--photo12').style.height="422px";
      }
      if (((window.screen.width)<=1680) && ((window.screen.width)>1440)) {
         document.querySelector('#real-container--photo12').style.width="525px";
         document.querySelector('#real-container--photo12').style.height="369px";
      }
      if (((window.screen.width)<=1440) && ((window.screen.width)>1280)) {
         document.querySelector('#real-container--photo12').style.width="450px";
         document.querySelector('#real-container--photo12').style.height="316px";
      }
      if (((window.screen.width)<=1280) && ((window.screen.width)>1024)) {
         document.querySelector('#real-container--photo12').style.width="400px";
         document.querySelector('#real-container--photo12').style.height="281px";
      }
      if (((window.screen.width)<=1024) && ((window.screen.width)>800)) {
         document.querySelector('#real-container--photo12').style.width="320px";
         document.querySelector('#real-container--photo12').style.height="225px";
      }
      if ((window.screen.width)<=800) {
         document.querySelector('#real-container--photo12').style.width="250px";
         document.querySelector('#real-container--photo12').style.height="175px";
      }


      switch (control_select_language) {  
         case 1:
            document.querySelector('#photo-text12').innerHTML='Выберите<br />изображение';
            break;
         case 2:
            document.querySelector('#photo-text12').innerHTML='Select <br />an image';
            break;
         case 3:               
            document.querySelector('#photo-text12').innerHTML='Wählen Sie <br />ein Bild aus';
            break;
      }
      
      hide_button2(document.querySelector("#change_dop13"));
      hide_button2(document.querySelector("#change_dop14"));
   }   
   if (allPhoto4.length>4) {
      if (cur_photo4>(allPhoto4.length-4)) {cur_photo4--;}
   } else {
      cur_photo4=0;
   }   
   slider4();
}
/*************************************************************************************************/




function checkFile4(evt) {    
   
   const MAX_WIDTH=800;
   const MAX_HEIGHT=600;
   let file=event.target.files[0];     

   document.querySelector(`#${event.target.id}`).value='';
   document.getElementById(`${event.target.id}`).removeEventListener('change', checkFile4, false);
   let types=["image/png","image/jpeg","image/gif","image/webp","image/svg+xml"];   

   
   if (types.indexOf((file.type))<0) {       
       document.querySelector('#photo-text12').innerHTML='Неверный формат файла.<br />Выберите другое изображение.';       
       return;
   }
   if (file.size>10485760) {       
       document.querySelector('#photo-text12').innerHTML='Размер файла превышает допустимые 10МБ.<br />Выберите другое изображение.';       
       return;
   }
   evt.stopPropagation();
   evt.preventDefault();
   var fileReader=new FileReader();
   fileReader.onload=function(progressEvent) {
      var url=fileReader.result;        
      var myImg=document.getElementById("myimage12");
      myImg.src=url;
      myImg.onerror=function() {
         document.querySelector('#photo-text12').innerHTML='Формат не поддерживается браузером.<br />Выберите другое изображение.';                  
         return;
      }
      myImg.onload=function() {

         var img = document.getElementById('myimage12');
         if ((img.width>MAX_WIDTH) || (img.height>MAX_HEIGHT)) {
            var scalingFactor=Math.min((MAX_WIDTH/img.width),(MAX_HEIGHT/img.height));    
            var iw=img.width*scalingFactor;
            var ih=img.height*scalingFactor;    
            var c=document.createElement('canvas');
            var ctx=c.getContext('2d');    
            c.width=iw;
            c.height=ih;
            if (c.width>c.height) {
               
               if ((window.screen.width)>1680) {
                  document.querySelector('#real-container--photo12').style.width="600px";
                  document.querySelector('#real-container--photo12').style.height="422px";
               }
               if (((window.screen.width)<=1680) && ((window.screen.width)>1440)) {
                  document.querySelector('#real-container--photo12').style.width="525px";
                  document.querySelector('#real-container--photo12').style.height="369px";
               }
               if (((window.screen.width)<=1440) && ((window.screen.width)>1280)) {
                  document.querySelector('#real-container--photo12').style.width="450px";
                  document.querySelector('#real-container--photo12').style.height="316px";
               }
               if (((window.screen.width)<=1280) && ((window.screen.width)>1024)) {
                  document.querySelector('#real-container--photo12').style.width="400px";
                  document.querySelector('#real-container--photo12').style.height="281px";
               }
               if (((window.screen.width)<=1024) && ((window.screen.width)>800)) {
                  document.querySelector('#real-container--photo12').style.width="320px";
                  document.querySelector('#real-container--photo12').style.height="225px";
               }
               if ((window.screen.width)<=800) {
                  document.querySelector('#real-container--photo12').style.width="250px";
                  document.querySelector('#real-container--photo12').style.height="175px";
               }

               
            }
            else {
               
               let dop_height2=parseInt(getComputedStyle(document.querySelector('#real-container--photo12')).height);
               document.querySelector('#real-container--photo12').style.width=`${(dop_height2*c.width)/c.height}px`;
               
            }           
            ctx.drawImage(img,0,0,iw,ih);
            rez0_4=c.toDataURL("image/png");     
         }
         else {
            rez0_4=img.src;
            if (img.width>img.height) {
               
               if ((window.screen.width)>1680) {
                  document.querySelector('#real-container--photo12').style.width="600px";
                  document.querySelector('#real-container--photo12').style.height="422px";
               }
               if (((window.screen.width)<=1680) && ((window.screen.width)>1440)) {
                  document.querySelector('#real-container--photo12').style.width="525px";
                  document.querySelector('#real-container--photo12').style.height="369px";
               }
               if (((window.screen.width)<=1440) && ((window.screen.width)>1280)) {
                  document.querySelector('#real-container--photo12').style.width="450px";
                  document.querySelector('#real-container--photo12').style.height="316px";
               }
               if (((window.screen.width)<=1280) && ((window.screen.width)>1024)) {
                  document.querySelector('#real-container--photo12').style.width="400px";
                  document.querySelector('#real-container--photo12').style.height="281px";
               }
               if (((window.screen.width)<=1024) && ((window.screen.width)>800)) {
                  document.querySelector('#real-container--photo12').style.width="320px";
                  document.querySelector('#real-container--photo12').style.height="225px";
               }
               if ((window.screen.width)<=800) {
                  document.querySelector('#real-container--photo12').style.width="250px";
                  document.querySelector('#real-container--photo12').style.height="175px";
               }

               
            }
            else {
               
               let dop_height=parseInt(getComputedStyle(document.querySelector('#real-container--photo12')).height);
               document.querySelector('#real-container--photo12').style.width=`${(dop_height*img.width)/img.height}px`;
               
            }       
         }  
         if (allPhoto4.indexOf(rez0_4)>-1) {
            document.querySelector('#photo-text12').innerHTML='Изображение уже загружено.<br />Выберите другое изображение.';
            rez0_4='';
            document.querySelector('#real-container--photo12').style.backgroundImage=`none`;
            return;
         }
         else {            
            document.querySelector('#real-container--photo12').style.backgroundImage=`url(${rez0_4})`;
            document.querySelector('#photo-text12').innerHTML=``;           
            show_button2(document.querySelector("#change_dop13"));
            show_button2(document.querySelector("#change_dop14"));
         }       
      }           
      if (globalImageControl4>0) {
         document.querySelector(`#photo${globalImageControl4}_4`).style.border="2px solid #5b7ea4";                        
         globalImageControl4=0;           
      }                   
   }
   fileReader.readAsDataURL(file);
   
}








/******************************Функция работы слайдера в слайдер!!!*******************************/
function slider1() {
   document.querySelector('#wrapper_up3').style.display="none";
   document.querySelector('#wrapper_down3').style.display="none";
   for (let count3=1;count3<=4;count3++) {      
      document.querySelector(`#photo${count3}_3`).style.backgroundImage='none';
      document.querySelector(`#photo${count3}_3`).innerHTML='<span class="text-photo">ФОТО</span>';
      switch (control_select_language) {
         case 1:
            document.querySelector(`#photo${count3}_3`).innerHTML='<span class="text-photo">ФОТО</span>';
            break;
         case 2:
            document.querySelector(`#photo${count3}_3`).innerHTML='<span class="text-photo">PHOTO</span>';
            break;
         case 3:
            document.querySelector(`#photo${count3}_3`).innerHTML='<span class="text-photo">FOTO</span>';
            break;
      }      
      document.querySelector(`#photo${count3}_3`).style.backgroundColor="#ffc003";
      document.querySelector(`#photo${count3}_3`).style.border="2px solid #5b7ea4";
      document.querySelector(`#photo${count3}_3`).removeEventListener('click', addList_rebuttal3);
   }
   
   
   if (globalImageControl>0) {
      document.querySelector(`#photo${globalImageControl}_3`).style.border="2px solid red";  
   }



   document.querySelector('#wrapper_up3').style.color='#cacaca';
   document.querySelector('#wrapper_down3').style.color='#cacaca';
   for (let count4=0;count4<=3;count4++) {

      if ((typeof allPhoto[count4]!=='undefined') && (allPhoto[count4].length>0)) {               
         document.querySelector(`#photo${count4+1}_3`).style.backgroundImage=`url(${allPhoto[(count4+cur_photo2)]})`;

         document.querySelector(`#photo${count4+1}_3`).style.backgroundColor="white";         

         document.querySelector(`#photo${count4+1}_3`).innerHTML='';   
         document.querySelector(`#photo${count4+1}_3`).addEventListener("click",addList_rebuttal3);
         globalImages[count4]=allPhoto[(count4+cur_photo2)];
      } else {
         break;
      }

   }      
   if ((allPhoto.length)>4) {      
      document.querySelector('#wrapper_up3').style.display="flex";
      document.querySelector('#wrapper_down3').style.display="flex";
      if (cur_photo2>0) {document.querySelector('#wrapper_up3').style.color='black';}
      else {document.querySelector('#wrapper_up3').style.color='#cacaca';}
      if (cur_photo2==(allPhoto.length-4)) {document.querySelector('#wrapper_down3').style.color='#cacaca';}
      else {document.querySelector('#wrapper_down3').style.color='black';}        
      document.querySelector('#wrapper_up3').addEventListener("click",sliderUp);
      document.querySelector('#wrapper_down3').addEventListener("click",sliderDown);
   }
}
/*************************************************************************************************************/
/**************************************************************************************************************/
function addListDop_rebuttal3() {   
   let img = new Image();
   img.onload = function() {    
      if (img.width>img.height) {
         
         if ((window.screen.width)>1680) {
            document.querySelector('#real-container--photo').style.width="600px";
            document.querySelector('#real-container--photo').style.height="422px";
         }
         if (((window.screen.width)<=1680) && ((window.screen.width)>1440)) {
            document.querySelector('#real-container--photo').style.width="525px";
            document.querySelector('#real-container--photo').style.height="369px";
         }
         if (((window.screen.width)<=1440) && ((window.screen.width)>1280)) {
            document.querySelector('#real-container--photo').style.width="450px";
            document.querySelector('#real-container--photo').style.height="316px";
         }
         if (((window.screen.width)<=1280) && ((window.screen.width)>1024)) {
            document.querySelector('#real-container--photo').style.width="400px";
            document.querySelector('#real-container--photo').style.height="281px";
         }
         if (((window.screen.width)<=1024) && ((window.screen.width)>800)) {
            document.querySelector('#real-container--photo').style.width="320px";
            document.querySelector('#real-container--photo').style.height="225px";
         }
         if ((window.screen.width)<=800) {
            document.querySelector('#real-container--photo').style.width="250px";
            document.querySelector('#real-container--photo').style.height="175px";
         }


      }
      else {
         
         let dop_height=parseInt(getComputedStyle(document.querySelector('#real-container--photo')).height);
         document.querySelector('#real-container--photo').style.width=`${(dop_height*img.width)/img.height}px`;
      }
      document.querySelector('#real-container--photo').style.backgroundImage=`url(${img.src})`;
      rez0=img.src;
      document.querySelector('#photo-text1').innerHTML=``;

   };
   img.src=globalImages[globalImageControl-1];    
}
/***********************************************************************************************************************/



function sliderDown() {
   if (cur_photo2<(allPhoto.length)-4) {
      cur_photo2++;            
      document.querySelector('#wrapper_up3').style.color='black'            
      if (cur_photo2==(allPhoto.length)-4) {
         document.querySelector('#wrapper_down3').style.color='#cacaca';                 
      }
      for (let count1=1;count1<=4;count1++) {
         document.querySelector(`#photo${count1}_3`).style.backgroundImage=`url(${allPhoto[(count1+cur_photo2)-1]})`;
         
         document.querySelector(`#photo${count1}_3`).innerHTML='';            
         globalImages[count1-1]=allPhoto[(count1+cur_photo2)-1];
      }
      if (globalImageControl>0) {               
         addListDop_rebuttal3();
      }                        
   }
}
/*************************************************************************************************************/
/******************************Функция слайдера по нажатию кнопки вверх или удалаени(добавления)**************/
function sliderUp() {
   if (cur_photo2>0) {                        
      cur_photo2--;             
      document.querySelector('#wrapper_down3').style.color='black'            
      if (cur_photo2==0) {
         document.querySelector('#wrapper_up3').style.color='#cacaca';               
      }                     
      for (let count1=1;count1<=4;count1++) {
         document.querySelector(`#photo${count1}_3`).style.backgroundImage=`url(${allPhoto[(count1+cur_photo2)-1]})`;
         
         document.querySelector(`#photo${count1}_3`).innerHTML='';            
         globalImages[count1-1]=allPhoto[(count1+cur_photo2)-1];
      }  
      if (globalImageControl>0) {               
         addListDop_rebuttal3();
      }
      if (cur_photo2==0) {
         document.querySelector('#wrapper_up3').style.color='#cacaca';
      }                     
   }
}   
/*************************************************************************************************************/


function addList_rebuttal3(e) {   
   let this_photo=e.target.id;     
   let num=parseInt(this_photo.slice(5,6));        
   /************************Подгонка под реальное изображение*********************************/
   let img = new Image();
   img.onload = function() {     
     
      if (img.width>img.height) {
         
         if ((window.screen.width)>1680) {
            document.querySelector('#real-container--photo').style.width="600px";
            document.querySelector('#real-container--photo').style.height="422px";
         }
         if (((window.screen.width)<=1680) && ((window.screen.width)>1440)) {
            document.querySelector('#real-container--photo').style.width="525px";
            document.querySelector('#real-container--photo').style.height="369px";
         }
         if (((window.screen.width)<=1440) && ((window.screen.width)>1280)) {
            document.querySelector('#real-container--photo').style.width="450px";
            document.querySelector('#real-container--photo').style.height="316px";
         }
         if (((window.screen.width)<=1280) && ((window.screen.width)>1024)) {
            document.querySelector('#real-container--photo').style.width="400px";
            document.querySelector('#real-container--photo').style.height="281px";
         }
         if (((window.screen.width)<=1024) && ((window.screen.width)>800)) {
            document.querySelector('#real-container--photo').style.width="320px";
            document.querySelector('#real-container--photo').style.height="225px";
         }
         if ((window.screen.width)<=800) {
            document.querySelector('#real-container--photo').style.width="250px";
            document.querySelector('#real-container--photo').style.height="175px";
         }


      }
      else {
         
         let dop_height=parseInt(getComputedStyle(document.querySelector('#real-container--photo')).height);
         document.querySelector('#real-container--photo').style.width=`${(dop_height*img.width)/img.height}px`;
      }
      document.querySelector(`#${this_photo}`).style.border="2px solid red"; 
      document.querySelector('#real-container--photo').style.backgroundImage=`url(${img.src})`;
      rez0=img.src;
   };
   img.src=globalImages[num-1];   

   show_button2(document.querySelector("#change_dop9"));


   document.querySelector('#photo-text1').innerHTML=``;   

   if (globalImageControl>0) {
      document.querySelector(`#photo${globalImageControl}_3`).style.border="2px solid #5b7ea4";                        
   }
   globalImageControl=num;    
}
/**************************************************************************************************************/

function addPhoto() {
   if (globalImageControl==0) {
      if (rez0.length>0) {
         allPhoto.push(rez0);
         rez0='';
         document.querySelector('#real-container--photo').style.backgroundImage="none";
         switch (control_select_language) {  
            case 1:
               document.querySelector('#photo-text1').innerHTML='Выберите<br />изображение';
               break;
            case 2:
               document.querySelector('#photo-text1').innerHTML='Select <br />an image';
               break;
            case 3:               
               document.querySelector('#photo-text1').innerHTML='Wählen Sie <br />ein Bild aus';
               break;
         }
/*         color_text();*/

      }      
      hide_button2(document.querySelector("#change_dop8"));
      hide_button2(document.querySelector("#change_dop9"));
      if (allPhoto.length>4) {
         cur_photo2=allPhoto.length-4;
      } else {
         cur_photo2=0;
      }      
      slider1();
   }      
}
/*************************************************************************************************/
/******************************Функция помещения фото в слайдер!!!********************************/
function delPhoto() {
   if (rez0.length>0) {   
      if (globalImageControl>0) {      
         allPhoto.splice((allPhoto.indexOf(rez0)),1);
         document.querySelector(`#photo${globalImageControl}_3`).style.border="2px solid #5b7ea4";   
         globalImageControl=0;
      }
      rez0='';
      document.querySelector('#real-container--photo').style.backgroundImage="none";

      if ((window.screen.width)>1680) {
         document.querySelector('#real-container--photo').style.width="600px";
         document.querySelector('#real-container--photo').style.height="422px";
      }
      if (((window.screen.width)<=1680) && ((window.screen.width)>1440)) {
         document.querySelector('#real-container--photo').style.width="525px";
         document.querySelector('#real-container--photo').style.height="369px";
      }
      if (((window.screen.width)<=1440) && ((window.screen.width)>1280)) {
         document.querySelector('#real-container--photo').style.width="450px";
         document.querySelector('#real-container--photo').style.height="316px";
      }
      if (((window.screen.width)<=1280) && ((window.screen.width)>1024)) {
         document.querySelector('#real-container--photo').style.width="400px";
         document.querySelector('#real-container--photo').style.height="281px";
      }
      if (((window.screen.width)<=1024) && ((window.screen.width)>800)) {
         document.querySelector('#real-container--photo').style.width="320px";
         document.querySelector('#real-container--photo').style.height="225px";
      }
      if ((window.screen.width)<=800) {
         document.querySelector('#real-container--photo').style.width="250px";
         document.querySelector('#real-container--photo').style.height="175px";
      }
      

      switch (control_select_language) {  
         case 1:
            document.querySelector('#photo-text1').innerHTML='Выберите<br />изображение';
            break;
         case 2:
            document.querySelector('#photo-text1').innerHTML='Select <br />an image';
            break;
         case 3:               
            document.querySelector('#photo-text1').innerHTML='Wählen Sie <br />ein Bild aus';
            break;
      }


/*      color_text();*/

      hide_button2(document.querySelector("#change_dop8"));
      hide_button2(document.querySelector("#change_dop9"));
   }   
   if (allPhoto.length>4) {
      if (cur_photo2>(allPhoto.length-4)) {cur_photo2--;}
   } else {
      cur_photo2=0;
   }   
   slider1();
}



function show_button() {      
   let dz=document.querySelector(`#${this.id}`);   
   dz.classList.add('none_button');
   dz.classList.remove('punch_button');
   dz.removeEventListener("focusout",show_button);   
}
function hide_button() {   
   let dz=document.querySelector(`#${this.id}`);   
   dz.classList.remove('none_button');
   dz.classList.add('punch_button');   
   dz.removeEventListener("focusin",hide_button);   
}

function show_button2(el1) {
   el1.classList.remove('none_button');
   el1.classList.add('punch_button');   
}
function hide_button2(el1) {
   el1.classList.add('none_button');
   el1.classList.remove('punch_button');      
}

function checkFile(evt) {    
   const MAX_WIDTH=800;
   const MAX_HEIGHT=600;
   let file=event.target.files[0];      
   document.querySelector(`#${event.target.id}`).value='';
   document.getElementById(`${event.target.id}`).removeEventListener('change', checkFile, false);
   let types=["image/png","image/jpeg","image/gif","image/webp","image/svg+xml"];   
   if (types.indexOf((file.type))<0) {       
       document.querySelector('#photo-text1').innerHTML='Неверный формат файла.<br />Выберите другое изображение.';       
       return;
   }
   if (file.size>10485760) {       
       document.querySelector('#photo-text1').innerHTML='Размер файла превышает допустимые 10МБ.<br />Выберите другое изображение.';       
       return;
   }
   evt.stopPropagation();
   evt.preventDefault();
   var fileReader=new FileReader();
   fileReader.onload=function(progressEvent) {
      var url=fileReader.result;        
      var myImg=document.getElementById("myimage");
      myImg.src=url;
      myImg.onerror=function() {
         document.querySelector('#photo-text1').innerHTML='Формат не поддерживается браузером.<br />Выберите другое изображение.';                  
         return;
      }
      myImg.onload=function() {

         var img = document.getElementById('myimage');
         if ((img.width>MAX_WIDTH) || (img.height>MAX_HEIGHT)) {
            var scalingFactor=Math.min((MAX_WIDTH/img.width),(MAX_HEIGHT/img.height));    
            var iw=img.width*scalingFactor;
            var ih=img.height*scalingFactor;    
            var c=document.createElement('canvas');
            var ctx=c.getContext('2d');    
            c.width=iw;
            c.height=ih;
            if (c.width>c.height) {
               
               if ((window.screen.width)>1680) {
                  document.querySelector('#real-container--photo').style.width="600px";
                  document.querySelector('#real-container--photo').style.height="422px";
               
               }
               if (((window.screen.width)<=1680) && ((window.screen.width)>1440)) {
                  document.querySelector('#real-container--photo').style.width="525px";
                  document.querySelector('#real-container--photo').style.height="369px";
               
               }
               if (((window.screen.width)<=1440) && ((window.screen.width)>1280)) {
                  document.querySelector('#real-container--photo').style.width="450px";
                  document.querySelector('#real-container--photo').style.height="316px";
               }
               if (((window.screen.width)<=1280) && ((window.screen.width)>1024)) {
                  document.querySelector('#real-container--photo').style.width="400px";
                  document.querySelector('#real-container--photo').style.height="281px";
               }
               if (((window.screen.width)<=1024) && ((window.screen.width)>800)) {
                  document.querySelector('#real-container--photo').style.width="320px";
                  document.querySelector('#real-container--photo').style.height="225px";
               }
               if ((window.screen.width)<=800) {
                  document.querySelector('#real-container--photo').style.width="250px";
                  document.querySelector('#real-container--photo').style.height="175px";
               }

               
            }
            else {
               
               let dop_height2=parseInt(getComputedStyle(document.querySelector('#real-container--photo')).height);
               document.querySelector('#real-container--photo').style.width=`${(dop_height2*c.width)/c.height}px`;
               
            }           
            ctx.drawImage(img,0,0,iw,ih);
            rez0=c.toDataURL("image/png");     
         }
         else {
            rez0=img.src;
            if (img.width>img.height) {
               
               if ((window.screen.width)>1680) {
                  document.querySelector('#real-container--photo').style.width="600px";
                  document.querySelector('#real-container--photo').style.height="422px";
               }
               if (((window.screen.width)<=1680) && ((window.screen.width)>1440)) {
                  document.querySelector('#real-container--photo').style.width="525px";
                  document.querySelector('#real-container--photo').style.height="369px";
               }
               if (((window.screen.width)<=1440) && ((window.screen.width)>1280)) {
                  document.querySelector('#real-container--photo').style.width="450px";
                  document.querySelector('#real-container--photo').style.height="316px";
               }
               if (((window.screen.width)<=1280) && ((window.screen.width)>1024)) {
                  document.querySelector('#real-container--photo').style.width="400px";
                  document.querySelector('#real-container--photo').style.height="281px";
               }
               if (((window.screen.width)<=1024) && ((window.screen.width)>800)) {
                  document.querySelector('#real-container--photo').style.width="320px";
                  document.querySelector('#real-container--photo').style.height="225px";
               }
               if ((window.screen.width)<=800) {
                  document.querySelector('#real-container--photo').style.width="250px";
                  document.querySelector('#real-container--photo').style.height="175px";
               }
               
            }
            else {
               
               let dop_height=parseInt(getComputedStyle(document.querySelector('#real-container--photo')).height);
               document.querySelector('#real-container--photo').style.width=`${(dop_height*img.width)/img.height}px`;
               
            }       
         }  
         if (allPhoto.indexOf(rez0)>-1) {
            document.querySelector('#photo-text1').innerHTML='Изображение уже загружено.<br />Выберите другое изображение.';
            rez0='';
            document.querySelector('#real-container--photo').style.backgroundImage=`none`;
            return;
         }
         else {
            document.querySelector('#real-container--photo').style.backgroundImage=`url(${rez0})`;
            document.querySelector('#photo-text1').innerHTML=``;           
            show_button2(document.querySelector("#change_dop8"));
            show_button2(document.querySelector("#change_dop9"));

         }       
      }           
      if (globalImageControl>0) {
         document.querySelector(`#photo${globalImageControl}_3`).style.border="2px solid #5b7ea4";                        
         globalImageControl=0;           
      }                   
   }
   fileReader.readAsDataURL(file);
   
}
/***************************************************************************************************************************/



function checkFile2(rez) {    
   const MAX_WIDTH=800;
   const MAX_HEIGHT=600;
   let file=rez[0];   
   
   let types=["image/png","image/jpeg","image/gif","image/webp","image/svg+xml"];   
   if (types.indexOf((file.type))<0) {       
       document.querySelector('#photo-text1').innerHTML='Неверный формат файла.<br />Выберите другое изображение.';       
       return;
   }
   if (file.size>10485760) {       
       document.querySelector('#photo-text1').innerHTML='Размер файла превышает допустимые 10МБ.<br />Выберите другое изображение.';       
       return;
   }
   var fileReader=new FileReader();
   fileReader.onload=function(progressEvent) {
      var url=fileReader.result;        
      var myImg=document.getElementById("myimage");
      myImg.src=url;
      myImg.onerror=function() {
         document.querySelector('#photo-text1').innerHTML='Формат не поддерживается браузером.<br />Выберите другое изображение.';                  
         return;
      }
      myImg.onload=function() {

         var img = document.getElementById('myimage');
         if ((img.width>MAX_WIDTH) || (img.height>MAX_HEIGHT)) {
            var scalingFactor=Math.min((MAX_WIDTH/img.width),(MAX_HEIGHT/img.height));    
            var iw=img.width*scalingFactor;
            var ih=img.height*scalingFactor;    
            var c=document.createElement('canvas');
            var ctx=c.getContext('2d');    
            c.width=iw;
            c.height=ih;
            if (c.width>c.height) {
               
               if ((window.screen.width)>1680) {
                  document.querySelector('#real-container--photo').style.width="600px";
                  document.querySelector('#real-container--photo').style.height="422px";
               }
               if (((window.screen.width)<=1680) && ((window.screen.width)>1440)) {
                  document.querySelector('#real-container--photo').style.width="525px";
                  document.querySelector('#real-container--photo').style.height="369px";
               }
               if (((window.screen.width)<=1440) && ((window.screen.width)>1280)) {
                  document.querySelector('#real-container--photo').style.width="450px";
                  document.querySelector('#real-container--photo').style.height="316px";
               }
               if (((window.screen.width)<=1280) && ((window.screen.width)>1024)) {
                  document.querySelector('#real-container--photo').style.width="400px";
                  document.querySelector('#real-container--photo').style.height="281px";
               }
               if (((window.screen.width)<=1024) && ((window.screen.width)>800)) {
                  document.querySelector('#real-container--photo').style.width="320px";
                  document.querySelector('#real-container--photo').style.height="225px";
               }
               if ((window.screen.width)<=800) {
                  document.querySelector('#real-container--photo').style.width="250px";
                  document.querySelector('#real-container--photo').style.height="175px";
               }
               
            }
            else {
               
               let dop_height2=parseInt(getComputedStyle(document.querySelector('#real-container--photo')).height);
               document.querySelector('#real-container--photo').style.width=`${(dop_height2*c.width)/c.height}px`;
               
            }           
            ctx.drawImage(img,0,0,iw,ih);
            rez0=c.toDataURL("image/png");     
         }
         else {
            rez0=img.src;
            if (img.width>img.height) {
               
               if ((window.screen.width)>1680) {
                  document.querySelector('#real-container--photo').style.width="600px";
                  document.querySelector('#real-container--photo').style.height="422px";
               }
               if (((window.screen.width)<=1680) && ((window.screen.width)>1440)) {
                  document.querySelector('#real-container--photo').style.width="525px";
                  document.querySelector('#real-container--photo').style.height="369px";
               }
               if (((window.screen.width)<=1440) && ((window.screen.width)>1280)) {
                  document.querySelector('#real-container--photo').style.width="450px";
                  document.querySelector('#real-container--photo').style.height="316px";
               }
               if (((window.screen.width)<=1280) && ((window.screen.width)>1024)) {
                  document.querySelector('#real-container--photo').style.width="400px";
                  document.querySelector('#real-container--photo').style.height="281px";
               }
               if (((window.screen.width)<=1024) && ((window.screen.width)>800)) {
                  document.querySelector('#real-container--photo').style.width="320px";
                  document.querySelector('#real-container--photo').style.height="225px";
               }
               if ((window.screen.width)<=800) {
                  document.querySelector('#real-container--photo').style.width="250px";
                  document.querySelector('#real-container--photo').style.height="175px";
               }

               
            }
            else {
               
               let dop_height=parseInt(getComputedStyle(document.querySelector('#real-container--photo')).height);
               document.querySelector('#real-container--photo').style.width=`${(dop_height*img.width)/img.height}px`;
               
            }       
         }  
         if (allPhoto.indexOf(rez0)>-1) {
            document.querySelector('#photo-text1').innerHTML='Изображение уже загружено.<br />Выберите другое изображение.';
            rez0='';
            document.querySelector('#real-container--photo').style.backgroundImage=`none`;
            return;
         }
         else {
            document.querySelector('#real-container--photo').style.backgroundImage=`url(${rez0})`;
            document.querySelector('#photo-text1').innerHTML=``;           
            show_button2(document.querySelector("#change_dop8"));
            show_button2(document.querySelector("#change_dop9"));

         }       
      }           
      if (globalImageControl>0) {
         document.querySelector(`#photo${globalImageControl}_3`).style.border="2px solid #5b7ea4";                        
         globalImageControl=0;           
      }                   
   }
   fileReader.readAsDataURL(file);
   
}



(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

   var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
   
   function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
   
   var SPRITE = '<svg xmlns="http://www.w3.org/2000/svg"><symbol id="sharetastic-googleplus" viewBox="0 0 32 32"><title>Google +</title><path d="M28,15.1h-2.3v-2.2h-1.8v2.2h-2.3v1.8h2.3v2.2h1.8v-2.2H28 M13.3,14.7v2.7h4c-0.3,1.6-1.8,2.8-4,2.8c-2.4,0-4.4-2-4.4-4.3s2-4.3,4.4-4.3c1.1,0,2.1,0.4,2.8,1.1v0l2.1-2C17,9.7,15.3,9,13.3,9C9.3,9,6,12.1,6,16s3.3,7,7.3,7c4.2,0,7-2.8,7-6.8c0-0.5-0.1-1-0.1-1.5C20.2,14.7,13.3,14.7,13.3,14.7z"/></symbol><symbol id="sharetastic-facebook" viewBox="0 0 32 32"><title>Facebook</title><path d="M16.8,25v-8.2h2.7l0.4-3.2h-3.1v-2c0-0.9,0.2-1.6,1.5-1.6l1.6,0V7.1c-0.3,0-1.3-0.1-2.4-0.1c-2.4,0-4,1.5-4,4.2v2.4H11v3.2h2.7V25H16.8z"/></symbol><symbol id="sharetastic-twitter" viewBox="0 0 32 32"><title>Twitter</title><path d="M13.7,23c6.8,0,10.5-5.4,10.5-10.1c0-0.2,0-0.3,0-0.5c0.7-0.5,1.3-1.1,1.8-1.8c-0.7,0.3-1.4,0.5-2.1,0.6c0.8-0.4,1.3-1.1,1.6-2c-0.7,0.4-1.5,0.7-2.3,0.9C22.5,9.4,21.5,9,20.5,9c-2,0-3.7,1.6-3.7,3.5c0,0.3,0,0.5,0.1,0.8c-3.1-0.1-5.8-1.6-7.6-3.7c-0.3,0.5-0.5,1.1-0.5,1.8c0,1.2,0.7,2.3,1.6,2.9c-0.6,0-1.2-0.2-1.7-0.4c0,0,0,0,0,0c0,1.7,1.3,3.1,3,3.5c-0.3,0.1-0.6,0.1-1,0.1c-0.2,0-0.5,0-0.7-0.1c0.5,1.4,1.8,2.4,3.4,2.5c-1.3,0.9-2.9,1.5-4.6,1.5c-0.3,0-0.6,0-0.9,0C9.6,22.4,11.6,23,13.7,23"/></symbol><symbol id="sharetastic-tumblr" viewBox="0 0 32 32"><title>Tumblr</title><path d="M17.8,21.7c-1.4,0-1.7-1-1.7-1.8v-5.3h3.3v-3.1h-3.3V7h-2.6c0,0-0.1,0-0.1,0.1C13.3,8.5,12.6,11,10,12v2.6h2v5.6c0,2,1.2,4.9,5,4.8c1.3,0,2.7-0.6,3-1.1l-0.9-2.6C18.9,21.6,18.2,21.7,17.8,21.7z"/></symbol><symbol id="sharetastic-pinterest" viewBox="0 0 32 32"><title>Pinterest</title><path d="M11.5,27c0.5-0.8,2.1-3.1,2.3-4.1c0.2-0.6,0.8-2.9,0.8-2.9c0.4,0.7,1.6,1.4,2.9,1.4c3.8,0,6.5-3.3,6.5-7.5c0-4-3.4-6.9-7.7-6.9C10.9,7,8,10.5,8,14.3c0,1.8,1,4,2.5,4.7c0.2,0.1,0.4,0.1,0.4-0.2c0-0.2,0.3-1,0.3-1.4c0-0.1,0-0.2-0.1-0.3c-0.5-0.6-0.9-1.7-0.9-2.7c0-2.6,2.1-5.2,5.7-5.2c3.1,0,5.2,2,5.2,4.9c0,3.3-1.7,5.5-3.9,5.5c-1.2,0-2.2-1-1.9-2.2c0.4-1.4,1-3,1-4c0-0.9-0.5-1.7-1.6-1.7c-1.3,0-2.3,1.2-2.3,2.9c0,1.1,0.4,1.8,0.4,1.8s-1.2,5-1.5,6C11.2,23.3,11.4,26,11.5,27"/></symbol><symbol id="sharetastic-instagram" viewBox="0 0 32 32"><title>Instagram</title><path d="M24.9,12.3c0-1-0.2-1.6-0.4-2.2c-0.2-0.6-0.5-1.1-1-1.6c-0.5-0.5-1-0.8-1.6-1c-0.6-0.2-1.2-0.4-2.2-0.4C18.8,7,18.4,7,16,7s-2.8,0-3.7,0.1c-1,0-1.6,0.2-2.2,0.4C9.5,7.7,9,8,8.5,8.5c-0.5,0.5-0.8,1-1,1.6c-0.2,0.6-0.4,1.2-0.4,2.2C7,13.2,7,13.6,7,16c0,2.4,0,2.8,0.1,3.7c0,1,0.2,1.6,0.4,2.2c0.2,0.6,0.5,1.1,1,1.6c0.5,0.5,1,0.8,1.6,1c0.6,0.2,1.2,0.4,2.2,0.4c1,0,1.3,0.1,3.7,0.1s2.8,0,3.7-0.1c1,0,1.6-0.2,2.2-0.4c0.6-0.2,1.1-0.5,1.6-1c0.5-0.5,0.8-1,1-1.6c0.2-0.6,0.4-1.2,0.4-2.2c0-1,0.1-1.3,0.1-3.7C25,13.6,25,13.2,24.9,12.3z M23.3,19.6c0,0.9-0.2,1.4-0.3,1.7c-0.2,0.4-0.4,0.7-0.7,1c-0.3,0.3-0.6,0.5-1,0.7c-0.3,0.1-0.8,0.3-1.7,0.3c-0.9,0-1.2,0.1-3.6,0.1s-2.7,0-3.6-0.1c-0.9,0-1.4-0.2-1.7-0.3c-0.4-0.2-0.7-0.4-1-0.7c-0.3-0.3-0.5-0.6-0.7-1c-0.1-0.3-0.3-0.8-0.3-1.7c0-0.9-0.1-1.2-0.1-3.6s0-2.7,0.1-3.6c0-0.9,0.2-1.4,0.3-1.7c0.2-0.4,0.4-0.7,0.7-1s0.6-0.5,1-0.7c0.3-0.1,0.8-0.3,1.7-0.3c0.9,0,1.2-0.1,3.6-0.1s2.7,0,3.6,0.1c0.9,0,1.4,0.2,1.7,0.3c0.4,0.2,0.7,0.4,1,0.7c0.3,0.3,0.5,0.6,0.7,1c0.1,0.3,0.3,0.8,0.3,1.7c0,0.9,0.1,1.2,0.1,3.6S23.4,18.7,23.3,19.6z"/><path d="M16,11.4c-2.6,0-4.6,2.1-4.6,4.6s2.1,4.6,4.6,4.6s4.6-2.1,4.6-4.6S18.6,11.4,16,11.4z M16,19c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S17.7,19,16,19z"/><circle cx="20.8" cy="11.2" r="1.1"/></symbol><symbol id="sharetastic-linkedin" viewBox="0 0 32 32"><title>LinkedIn</title><path d="M11.6,23H8.3V12.3h3.3V23z M9.9,10.9C8.9,10.9,8,10,8,8.9C8,7.9,8.9,7,9.9,7c1.1,0,1.9,0.9,1.9,1.9C11.8,10,11,10.9,9.9,10.9z M24,23h-3.3v-5.2c0-1.2,0-2.8-1.7-2.8c-1.7,0-2,1.4-2,2.7V23h-3.3V12.3h3.2v1.5h0c0.4-0.8,1.5-1.7,3.1-1.7c3.4,0,4,2.2,4,5.1V23z"/></symbol><symbol id="sharetastic-flickr" viewBox="0 0 32 32"><title>Flickr</title><circle cx="10" cy="16" r="4"/><circle opacity="0.5" cx="22" cy="16" r="4"/></symbol><symbol id="sharetastic-email" viewBox="0 0 32 32"><title>Email</title><path d="M8,22h16c0.5,0,0.9-0.4,1-0.9l-5.4-5.4l-2.2,1.5c-0.4,0.3-0.9,0.4-1.4,0.4s-1-0.1-1.4-0.4l-2.2-1.5L7,21.1C7.1,21.6,7.5,22,8,22z"/><polygon points="11.6,15.2 7,12.1 7,19.8 "/><polygon points="25,19.7 25,12.1 20.5,15.2 "/><path d="M16.5,16.6l8.5-5.8c-0.1-0.5-0.5-0.8-1-0.8H8c-0.5,0-0.9,0.4-1,0.8l8.5,5.8C15.8,16.8,16.2,16.8,16.5,16.6z"/></symbol><symbol id="sharetastic-whatsapp" viewBox="0 0 32 32"><title>WhatsApp</title><path d="M22.361 9.6c-1.688-1.692-3.933-2.622-6.326-2.622-4.927 0-8.938 4.011-8.938 8.941 0 1.575 0.412 3.116 1.195 4.469l-1.269 4.634 4.74-1.244c1.308 0.712 2.777 1.089 4.271 1.089h0.003c0 0 0 0 0 0 4.927 0 8.941-4.011 8.941-8.941 0-2.389-0.93-4.634-2.619-6.326zM16.039 23.359v0c-1.336 0-2.643-0.359-3.785-1.036l-0.271-0.162-2.812 0.737 0.751-2.742-0.176-0.282c-0.747-1.181-1.138-2.548-1.138-3.954 0-4.099 3.334-7.433 7.436-7.433 1.984 0 3.852 0.775 5.255 2.178 1.403 1.406 2.175 3.271 2.175 5.258-0.003 4.102-3.338 7.436-7.433 7.436zM20.113 17.79c-0.222-0.113-1.322-0.652-1.526-0.726s-0.352-0.113-0.504 0.113c-0.148 0.222-0.578 0.726-0.708 0.878-0.13 0.148-0.261 0.169-0.483 0.056s-0.944-0.349-1.797-1.11c-0.663-0.592-1.114-1.325-1.244-1.547s-0.014-0.345 0.099-0.455c0.102-0.099 0.222-0.261 0.335-0.391s0.148-0.222 0.222-0.374c0.074-0.148 0.039-0.278-0.018-0.391s-0.504-1.212-0.687-1.66c-0.18-0.437-0.367-0.377-0.504-0.384-0.13-0.007-0.278-0.007-0.426-0.007s-0.391 0.056-0.596 0.278c-0.204 0.222-0.782 0.765-0.782 1.864s0.8 2.16 0.913 2.312c0.113 0.148 1.575 2.407 3.817 3.373 0.532 0.229 0.948 0.367 1.272 0.472 0.536 0.169 1.022 0.145 1.406 0.088 0.43-0.063 1.322-0.539 1.508-1.061s0.187-0.969 0.13-1.061c-0.053-0.099-0.201-0.155-0.426-0.268z"></path></symbol><symbol id="sharetastic-print" viewBox="0 0 32 32"><title>Print</title><rect x="12" y="18" width="8" height="1"/><rect x="12" y="20" width="8" height="1"/><rect x="12" y="22" width="8" height="1"/><path d="M24,12h-2V7H10v5H8c-0.5,0-1,0.5-1,1v6c0,0.5,0.5,1,1,1h2v5h12v-5h2c0.5,0,1-0.5,1-1v-6C25,12.5,24.5,12,24,12z M11,8h10v4H11V8z M21,24H11v-4v-2v-1h10v1v2V24z M23,15c-0.6,0-1-0.4-1-1c0-0.6,0.4-1,1-1s1,0.4,1,1C24,14.6,23.6,15,23,15z"/></symbol></svg>';
   
   var Sharetastic = function () {
       function Sharetastic(element, options) {
           _classCallCheck(this, Sharetastic);
   
           this.addSpriteToPage();
           this.element = element;           
           this.page = this.generateOpenGraph();
           this.options = this.generateOptions(options);
           this.element.classList.add('sharetastic');
           this.element.classList.add('sharetastic--initialized');
       }
   
       _createClass(Sharetastic, [{
           key: 'addSpriteToPage',
           value: function addSpriteToPage() {
               var spriteExistsOnPage = document.querySelectorAll('.sharetastic__sprite').length > 0;
               var wrapper = document.createElement('div');
               wrapper.classList.add('sharetastic__sprite');
               wrapper.innerHTML = SPRITE;
               if (!spriteExistsOnPage) {
                   document.body.insertBefore(wrapper, document.body.firstChild);
               }
           }
       }, {
           key: 'getMetaContent',
           value: function getMetaContent(prop) {
               var meta = document.querySelector('meta[property="' + prop + '"]');
               return meta.getAttribute('content');
           }
       }, {
           key: 'generateOpenGraph',
           value: function generateOpenGraph() {
               return {
                   url: this.element.getAttribute('data-url') || this.getMetaContent('og:url'),
                   title: this.element.getAttribute('data-title') || this.getMetaContent('og:title'),
                   description: this.element.getAttribute('data-description') || this.getMetaContent('og:description'),                   
                   image: this.element.getAttribute('data-image') || this.getMetaContent('og:image')
               };
           }
       }, {
           key: 'generateUrl',
           value: function generateUrl(append) {
               if (!this.page.url) return;
               var prefix = append || '';
               return prefix + encodeURIComponent(this.page.url);
           }
       }, {
           key: 'generateTitle',
           value: function generateTitle(append) {
               if (!this.page.title) return;
               var prefix = append || '';
               return prefix + encodeURIComponent(this.page.title);
           }
       }, {
           key: 'generateDescription',
           value: function generateDescription(append) {
               if (!this.page.description) return;
               var prefix = append || '';
               return prefix + encodeURIComponent(this.page.description);
           }
       }, {
           key: 'generateImage',
           value: function generateImage(append) {
               if (!this.page.image) return;
               var prefix = append || '';
               return prefix + encodeURIComponent(this.page.image);
           }
       }, {
           key: 'generateOptions',
           value: function generateOptions(options) {
               var defaults = {
                   popup: true,
                   services: {
                       facebook: {
                           order: 0,
                           name: 'Facebook',
                           href: 'https://www.facebook.com/sharer/sharer.php?' + this.generateUrl('u=') + this.generateTitle('&title=') + this.generateDescription('&description='),
                           icon: {
                               width: 32,
                               height: 32,
                               id: 'sharetastic-facebook'
                           }
                       },
                       instagram: false,
                       twitter: {
                           order: 2,
                           name: 'Twitter',
                           href: 'https://twitter.com/intent/tweet?text=' + this.generateTitle() + this.generateUrl(' - '),
                           icon: {
                               width: 32,
                               height: 32,
                               id: 'sharetastic-twitter'
                           }
                       },
                       pinterest: {
                           order: 3,
                           name: 'Pinterest',
                           href: 'http://pinterest.com/pin/create/link/?' + this.generateUrl('url=') + this.generateTitle('&description=') + this.generateImage('&media='),
                           icon: {
                               width: 32,
                               height: 32,
                               id: 'sharetastic-pinterest'
                           }
                       },
                       linkedin: {
                           order: 4,
                           name: 'LinkedIn',
                           href: 'https://www.linkedin.com/shareArticle?mini=true' + this.generateUrl('&url=') + this.generateTitle('&title=') + this.generateDescription('&summary='),
                           icon: {
                               width: 32,
                               height: 32,
                               id: 'sharetastic-linkedin'
                           }
                       },
                       googleplus: false,
                       flickr: false,
                       tumblr: false,
                       email:false,
                       whatsapp: {
                           order: 8,
                           name: 'WhatsApp',
                           href: 'https://api.whatsapp.com/send?text=' + this.page.title + ' - ' + this.page.description + ' ' + this.page.url,
                           icon: {
                               width: 32,
                               height: 32,
                               id: 'sharetastic-whatsapp'
                           }
                       },
                       print: {
                           order: 9,
                           name: 'Print',
                           href: 'window.print()',
                           icon: {
                               width: 32,
                               height: 32,
                               id: 'sharetastic-print'
                           }
                       }
                   }
               };
   
               var exportOptions = $.extend(true, defaults, options);
   
               if (this.element.hasAttribute('data-tweet')) {
                   exportOptions.services.twitter.href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(this.element.getAttribute('data-tweet'));
               }
   
               return exportOptions;
           }
       }, {
           key: 'popup',
           value: function popup(url, width, height) {
               var left = screen.width / 2 - width / 2;
               var top = screen.height / 2 - height / 2;
               window.open(url, "", 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=' + width + ',height=' + height + ',left=' + left + ',top=' + top);               
           }
       }, {
           key: 'build',
           value: function build() {
               var _this = this;
   
               this.serviceOrder.map(function (key) {
                   var action = key === 'print' ? 'onclick' : 'href';
                   var link = document.createElement('a');
                   var self = _this;
                   var service = _this.options.services[key];
   
                   link.classList.add('sharetastic__button');
                   link.classList.add('sharetastic__button--' + key);
                   link.setAttribute(action, service.href);

                       link.setAttribute('target', '_blank')

            link.innerHTML = '<svg width="' + service.icon.width + '"" height="' + service.icon.height + '" class="sharetastic__icon"><use xlink:href="#' + service.icon.id + '"/></svg>' + service.name;

            if (key !== 'email' && key !== 'print' && _this.options.popup) {
               link.addEventListener('click', function (e) {
                  e.preventDefault();
                  self.popup(e.currentTarget.getAttribute('href'), 500, 300);
               });
            }
            _this.element.appendChild(link);
            });
            }
            },  {
           key: 'sort',
           value: function sort() {
               var _this2 = this;
   
               this.serviceOrder = [];
               Object.keys(this.options.services).map(function (k, i) {
                   Object.keys(_this2.options.services).map(function (key) {
                       if (_this2.options.services[key].order === i) {
                           _this2.serviceOrder.push(key);
                       }
                   });
               });
               this.build();
           }
       }]);
   
       return Sharetastic;
   }();
   
   (function (window, $) {
   
       $.fn.sharetastic = function (options) {
           return this.each(function () {
               var element = $(this);
               var isInitialized = element.hasClass('sharetastic--initialized');
               if (!isInitialized) {
                   new Sharetastic(element[0], options).sort();
               }
           });
       };
       
   })(window, jQuery);
   
   },{}]},{},[1]);

   $('.sharetastic').sharetastic();