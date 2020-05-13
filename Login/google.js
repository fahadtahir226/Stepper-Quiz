// let firebase = firebase.auth();
var user;
const googleLogin = (event) => {
    var provider = new firebase.auth.GoogleAuthProvider();
    event.preventDefault();
    auth.signInWithPopup(provider)
    .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        user = result.user;
        if(document.getElementById('bodyTag').classList.contains('vit')){
          window.location.replace('/home_vi.html');
        }
        else{
          window.location.replace('/home_en.html');
        }
        // ...
        // console.log(token, user);
        // firebase.firestore().collection('lang').doc(user.uid)
        // .get()
        // .then(res => {
        //     // console.log(res.data().lang);
        //   if(!res.data()) {
        //     askLanguague().then(value => {
        //       console.log(value)
        //       firebase.firestore().collection('lang').doc(user.uid).set({lang: value})                        
        //         window.location.replace(`./home${value}.html`);  
        //       });
        //       // console.log(lang);
        //   }
        //   else{
        //     window.location.replace(`./home${res.data().lang}.html`);  
        //   }
        // })
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorCode, errorMessage);
        // ...
    });
}
