const firebaseConfig = {
    apiKey: "AIzaSyADhdW2bIh3butUrSBcAqsumhVRPG9NTQo",
    authDomain: "login-f26f4.firebaseapp.com",
    projectId: "login-f26f4",
    storageBucket: "login-f26f4.appspot.com",
    messagingSenderId: "134843072321",
    appId: "1:134843072321:web:3ecda96dc403800de4abc0"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()
  
  
  function register() {
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const full_name = document.getElementById('full_name').value;
    const city = document.getElementById('city').value;
    const role = document.getElementById('role').value;
  
    // Validate input fields
    if (!validate_email(email) || !validate_password(password)) {
      alert('Email or Password is not valid!');
      return;
    }
    if (!validate_field(full_name) || !validate_field(city) || !validate_field(role)) {
      alert('One or more fields are empty!');
      return;
    }
  
    // Proceed with Auth
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Declare user variable
        const user = userCredential.user;
  
        // Add this user to Firebase Database
        const database_ref = database.ref('users/' + user.uid);
  
        // Create User data
        const user_data = {
          email: email,
          full_name: full_name,
          city: city,
          role: role,
          last_login: Date.now()
        };
  
        // Push to Firebase Database
        database_ref.set(user_data);
  
        // Done
        alert('User Created!');
      })
      .catch((error) => {
        // Firebase will use this to alert its errors
        const errorCode = error.code;
        const errorMessage = error.message;
  
        alert(errorMessage);
      });
  }
  
  // Set up our login function
  function login() {
    // Get all our input fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Validate input fields
    if (!validate_email(email) || !validate_password(password)) {
      alert('Email or Password is not valid!');
      return;
    }
  
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Declare user variable
        const user = userCredential.user;
  
        // Update last login timestamp in Firebase Database
        const database_ref = database.ref('users/' + user.uid);
        const user_data = {
          last_login: Date.now()
        };
  
        // Update last login time
        database_ref.update(user_data);
  
        // Done
        alert('User Logged In!');
      })
      .catch((error) => {
        // Firebase will use this to alert its errors
        const errorCode = error.code;
        const errorMessage = error.message;
  
        alert(errorMessage);
      });
  }
  
  // Validate Functions
  function validate_email(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
  }
  
  function validate_password(password) {
    // Firebase requires passwords to be at least 6 characters
    return password.length >= 6;
  }
  
  function validate_field(field) {
    return field !== null && field.trim().length > 0;
  }