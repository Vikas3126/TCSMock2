const signUpBtn = document.getElementById('rsbtn');
const firstNameInputs = document.getElementById('fname');
const emailInputs = document.getElementById('remail');
const passwordInputs = document.getElementById('rpswd');
const emailLogin = document.getElementById("email");
const passLogin = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn")

document.addEventListener('DOMContentLoaded', function () {
  const signupForm = document.getElementById('signupForm');
  const otpVerificationForm = document.getElementById('otpVerificationForm');
  const verifyOtpBtn = document.getElementById('verifyOtpBtn');

  signUpBtn.addEventListener('click', function (event) {
      event.preventDefault();

      // Hide signup form, show OTP verification form
      signupForm.style.display = 'none';
      otpVerificationForm.style.display = 'block';

  });
});


// #################3
const form = document.getElementById("signupForm");
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
    })
    const registerUser=()=>{
    
    fetch("http://localhost:8800/signup",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({
            name:firstNameInputs.value,
            email:emailInputs.value,
            password:passwordInputs.value
        })
    }).then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem('user', JSON.stringify(data.user.name))

    })
    .catch((err) => console.log(err));
}


const form2 = document.getElementById("otpVerificationForm");
form2.addEventListener("submit", async(e) => {
    e.preventDefault();
});


const verifyUser = () => {
     fetch("http://localhost:8800/verifyOTP", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email:document.getElementById("emailverify").value,
                otp: document.getElementById("otp").value,
            }),
        })
        .then(res=>res.json())
        .then(data =>{
            if(data.msg === 'User email verified successfully'){
                document.getElementById("msgDisplay").innerText="Verification Successful 😊!"
                // alert("Verified")
            }else{
                console.log(data.msg);
                document.getElementById("msgDisplay").innerText="Wrong OTP, Try Again !"
                // alert("Wrong otp")
            }
        })
    }


const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
});
const logbtn = document.getElementById("loginBtn");

logbtn.addEventListener("click", async (e) => {
e.preventDefault();
try {
    const response = await fetch("http://localhost:8800/user/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            email: emailLogin.value,
            password: passLogin.value,
        }),
    });
    
    if (!response.ok) {
        document.getElementById("msgDisplayTag").innerText = "Wrong Email or Password"
        throw new Error(`Login failed: ${response.statusText}`);
        
    }else{

    const data = await response.json();
    console.log(data);

    localStorage.setItem("token", data.token);
    localStorage.setItem("name", data.user.name);
    localStorage.setItem("email", data.user.email);
    localStorage.setItem("userID", data.user._id);
    location.href = "./dashboard.html";
    }
} catch (err) {
    console.log(err.message);
}
});


















