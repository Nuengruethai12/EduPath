// =====================================
// EduPath Dashboard 2.0
// js/home.js
// =====================================

import app from "../firebase.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} 
from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const auth = getAuth(app);


// =====================================
// DOM
// =====================================

const welcomeTitle = document.querySelector(".welcome-card h1");
const welcomeText = document.querySelector(".welcome-card p");
const avatar = document.querySelector(".avatar img");

const searchInput = document.querySelector(".search-box input");

const notificationBtn =
document.querySelectorAll(".top-actions button")[0];

const settingsBtn =
document.querySelectorAll(".top-actions button")[1];

const navLinks =
document.querySelectorAll(".sidebar nav a");

const mobileLinks =
document.querySelectorAll(".mobile-nav a");


// =====================================
// Current User
// =====================================

let currentUser = null;


// =====================================
// Authentication
// =====================================

onAuthStateChanged(auth,(user)=>{

    if(!user){

        window.location.href="login.html";
        return;

    }


    currentUser=user;

    loadUser();

});


// =====================================
// Load User
// =====================================

function loadUser(){

    if(!currentUser) return;


    let name =
    currentUser.displayName ||
    currentUser.email.split("@")[0];


    if(welcomeTitle){

        welcomeTitle.textContent =
        `${getGreeting()}, ${name} 👋`;

    }


    if(welcomeText){

        welcomeText.textContent =
        "Continue your learning journey with EduPath AI.";

    }


    if(
        avatar &&
        currentUser.photoURL
    ){

        avatar.src=currentUser.photoURL;

    }

}


// =====================================
// Greeting
// =====================================

function getGreeting(){

    const hour =
    new Date().getHours();


    if(hour < 12)
        return "Good Morning";


    if(hour < 18)
        return "Good Afternoon";


    return "Good Evening";

}



// =====================================
// Search
// =====================================

function goSearch(){

    if(!searchInput) return;


    const keyword =
    searchInput.value.trim();


    if(keyword===""){

        window.location.href="search.html";

    }

    else{

        window.location.href =
        `search.html?q=${encodeURIComponent(keyword)}`;

    }

}


if(searchInput){

    searchInput.addEventListener(
        "keydown",
        (e)=>{

            if(e.key==="Enter"){

                goSearch();

            }

        }
    );

}



// =====================================
// Navigation Active
// =====================================

const currentPage =
window.location.pathname
.split("/")
.pop();



navLinks.forEach(link=>{

    if(
        link.getAttribute("href")
        ===
        currentPage
    ){

        link.classList.add("active");

    }

});



mobileLinks.forEach(link=>{

    if(
        link.getAttribute("href")
        ===
        currentPage
    ){

        link.classList.add("active");

    }

});



// =====================================
// Notification
// =====================================

if(notificationBtn){

    notificationBtn.onclick=()=>{

        alert(
`Notifications

• Welcome to EduPath 🎉

• AI Advisor is ready.

• Continue learning today!`
        );

    };

}



// =====================================
// Settings
// =====================================

if(settingsBtn){

    settingsBtn.onclick=()=>{

        window.location.href="profile.html";

    };

}



// =====================================
// Logout
// =====================================

async function logout(){

    const confirmLogout =
    confirm(
    "ออกจากระบบใช่หรือไม่?"
    );


    if(!confirmLogout)
        return;


    try{

        await signOut(auth);

        window.location.href="login.html";

    }

    catch(error){

        alert(error.message);

    }

}



// =====================================
// Create Logout Button
// =====================================

const topActions =
document.querySelector(".top-actions");


if(topActions){

    const logoutBtn =
    document.createElement("button");


    logoutBtn.className =
    "logout-btn";


    logoutBtn.innerHTML =
    '<i class="fa-solid fa-right-from-bracket"></i>';


    logoutBtn.title =
    "Logout";


    logoutBtn.onclick =
    logout;


    topActions.appendChild(logoutBtn);

}



// =====================================
// Dashboard Data
// =====================================

const statistics={

    notes:25,

    flashcards:12,

    courses:5

};



function loadStatistics(){

    const stats =
    document.querySelectorAll(
    ".stat-box h3"
    );


    if(stats.length>=3){

        stats[0].textContent =
        statistics.notes;


        stats[1].textContent =
        statistics.flashcards;


        stats[2].textContent =
        statistics.courses;

    }

}



loadStatistics();



// =====================================
// Continue Learning
// =====================================

const learning={

    course:
    "Introduction to Artificial Intelligence",

    progress:65

};



function updateLearning(){

    const title =
    document.querySelector(
    ".course-info h3"
    );


    const text =
    document.querySelector(
    ".course-info p"
    );


    const bar =
    document.querySelector(
    ".progress-bar"
    );



    if(title)
        title.textContent =
        learning.course;


    if(text)
        text.textContent =
        `Progress : ${learning.progress}%`;


    if(bar)
        bar.style.width =
        learning.progress+"%";

}


updateLearning();



// =====================================
// Ready
// =====================================

console.log(
"EduPath Dashboard Ready"
);