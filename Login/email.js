const auth = firebase.auth();
const db = firebase.firestore();


// User login 
let email, password;
const login = (e) => {
    e.preventDefault();
    email = document.getElementById("login-email").value;
    pass = document.getElementById("login-password").value;

    auth.signInWithEmailAndPassword(email, pass).then(res => {
        // console.log(res);
        window.location.replace('../home.html');
    })
    .catch(err => {
        alert(`${err.message}`)
    });
}

// user Sign Up  
const Register = (e) => {
    e.preventDefault();
    var name = document.getElementById('name').value;
    var email = document.getElementById("email").value;
    var pass = document.getElementById("password").value;

    if ((email.length && pass.length && name.length) !== 0) {
        auth.createUserWithEmailAndPassword(email, pass)
            .then(async (user) => {
                alert(`Your Account Has Been Created Successfully !!`)
                await db.collection('users').add({
                    name,
                    email
                }).then(res => console.log(res, 'added'))
                window.location.reload();
            })
            .catch(err => {
                alert(`${err.message}`)
            })
    }
}



// USer Sign Out
const SignOut = (e) => {
    e.preventDefault();
    auth.signOut().then(res => {
        alert("You're Logged Out Successfully");
        window.location.replace("../index.html");
    }).catch(err => alert(err.message))
}


