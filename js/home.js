// var db = firebase.database();
function checkValues(destroyFeedback, form, activeStepContent) {
      // Do your stuff here
      var checked_buttons = [];
      var radio_buttons = activeStepContent.getElementsByClassName('ques');
      
      
      // Taking out only checked radio buttons
      for(var i = 0 ; i < radio_buttons.length; i++){
         if(radio_buttons[i].checked) checked_buttons.push(radio_buttons[i]); 
      }
      if(checked_buttons.length < 4) {
         M.toast({html: 'Attempt all parts!'})
         activeStepContent.parentNode.classList.add('wrong');
         destroyFeedback(false);
      }

      // Comparing if any are same number selected`
      var repeat = false;
      for(var j = 0 ; j < checked_buttons.length - 1 ; j++ ){
         for(var k = j + 1 ;  k < checked_buttons.length ; k++ ){
            if(checked_buttons[j].value === checked_buttons[k].value) {
               repeat = true;
               break;
            }
         }
      }
      if(repeat){
         M.toast({html: 'No Numbers should be used more than once for each statement!'})
         activeStepContent.parentNode.classList.add('wrong');
      }

      if(!repeat && checked_buttons.length >= 4) {
        activeStepContent.parentNode.classList.remove('wrong');
        activeStepContent.parentNode.classList.add('Sucess');
      }
      if(activeStepContent.classList.contains('final')) submitData(form, activeStepContent);
      // The true parameter will proceed to the next step besides destroying the preloader
      destroyFeedback(!repeat);
   }



   // Only Run after the final submit button 
   function submitData(form){

      var checked_buttons = [];
      var radio_buttons = form.getElementsByClassName('ques');
      var steps = form.getElementsByClassName('step');
      var wrongstep = false;

      // Checking status "Sucess" in each question
      // if all say sucess only than go forward
      for(var i = 0; i < steps.length ; i++){
        if(!steps[i].classList.contains('Sucess')) wrongstep = true;
      }
      if(wrongstep) {
          M.toast({html: 'INVALIDLY DONE!'})
        return;
      }

      // Taking out only checked radio buttons from all buttons
      for(var i = 0 ; i < radio_buttons.length; i++){
         if(radio_buttons[i].checked) checked_buttons.push(radio_buttons[i]);
      }
      checked_buttons.forEach(btn => console.log(btn.value));
      submitToFirebase(checked_buttons);


   }

function submitToFirebase(checked_buttons) {
   var userData = {uid: auth.currentUser.uid, V_value: 0, A_value: 0, K_value: 0, Ad_value: 0, quizAttemped: true};
   userData.email = auth.currentUser.email;
   userData.first_name = auth.currentUser.displayName.split(' ')[0];
   userData.last_name = auth.currentUser.displayName.split(' ')[1];
   userData.profile = auth.currentUser.photoURL;
   //Arranging answers in Sequence of V A K Ad 

   userData.V_value = parseInt(checked_buttons[2].value) + parseInt(checked_buttons[5].value) + parseInt(checked_buttons[8].value) + parseInt(checked_buttons[13].value) + parseInt(checked_buttons[17].value)
   userData.A_value = parseInt(checked_buttons[1].value) + parseInt(checked_buttons[4].value) + parseInt(checked_buttons[10].value) + parseInt(checked_buttons[15].value) + parseInt(checked_buttons[19].value)
   userData.K_value = parseInt(checked_buttons[0].value) + parseInt(checked_buttons[7].value) + parseInt(checked_buttons[11].value) + parseInt(checked_buttons[14].value) + parseInt(checked_buttons[18].value)
   userData.Ad_value = parseInt(checked_buttons[3].value) + parseInt(checked_buttons[6].value) + parseInt(checked_buttons[9].value) + parseInt(checked_buttons[12].value) + parseInt(checked_buttons[16].value)
   console.log(auth.currentUser);
   uid = auth.currentUser.uid;
   firebase.firestore().collection("Users").doc(auth.currentUser.uid).set(userData).then(() => {
      M.toast({html: 'Quiz Submitted Successfully!',completeCallback: () => {
         // if(document.getElementById('bodyTag').classList.contains('vit')){
            window.location.replace('result.html');
         //  }
         //  else{
            // window.location.replace('/result_en.html');
         //  }
         }
      })

   })
}
