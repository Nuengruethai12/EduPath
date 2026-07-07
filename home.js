// =====================================
// EduPath Dashboard 2.0
// home.js (Part 1)
// =====================================

import app from "./firebase.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const auth = getAuth(app);

// =====================================
// DOM
// =====================================

const welcomeTitle = document.querySelector(".welcome-card h1");
const welcomeText = document.querySelector(".welcome-card p");
const avatar = document.querySelector(".avatar img");

// =====================================
// User
// =====================================

let currentUser = null;

// =====================================
// Auth Check
// =====================================

onAuthStateChanged(auth, (user) => {

    if (!user) {

        // ยังไม่ได้ Login
        window.location.href = "login.html";
        return;

    }

    currentUser = user;

    loadUser();

});

// =====================================
// Load User
// =====================================

function loadUser() {

    if (!currentUser) return;

    // ชื่อผู้ใช้

    let displayName = "";

    if (currentUser.displayName) {

        displayName = currentUser.displayName;

    } else {

        displayName = currentUser.email.split("@")[0];

    }

    // Welcome

    welcomeTitle.textContent =
        `Welcome back, ${displayName} 👋`;

    welcomeText.textContent =
        "Continue your learning journey with EduPath AI.";

    // Avatar

    if (currentUser.photoURL) {

        avatar.src = currentUser.photoURL;

    }

}

// =====================================
// Greeting ตามเวลา
// =====================================

function getGreeting() {

    const hour = new Date().getHours();

    if (hour < 12) {

        return "Good Morning";

    }

    if (hour < 18) {

        return "Good Afternoon";

    }

    return "Good Evening";

}

// =====================================
// Greeting Update
// =====================================

function updateGreeting() {

    if (!currentUser) return;

    let name = "";

    if (currentUser.displayName) {

        name = currentUser.displayName;

    } else {

        name = currentUser.email.split("@")[0];

    }

    welcomeTitle.textContent =
        `${getGreeting()}, ${name} 👋`;

}

updateGreeting();
// =====================================
// Home.js Part 2
// Logout
// Navigation
// Search
// =====================================

// ---------- Elements ----------

const searchInput = document.querySelector(".search-box input");

const notificationBtn = document.querySelectorAll(".top-actions button")[0];

const settingsBtn = document.querySelectorAll(".top-actions button")[1];

const navLinks = document.querySelectorAll(".sidebar nav a");

const mobileLinks = document.querySelectorAll(".mobile-nav a");

// =====================================
// Search
// =====================================

function goSearch(){

    const keyword = searchInput.value.trim();

    if(keyword===""){

        window.location.href="search.html";

    }else{

        window.location.href=
        `search.html?q=${encodeURIComponent(keyword)}`;

    }

}

searchInput.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        goSearch();

    }

});

// =====================================
// Sidebar Active
// =====================================

const currentPage = window.location.pathname
.split("/")
.pop();

navLinks.forEach(link=>{

    const href = link.getAttribute("href");

    if(href===currentPage){

        link.classList.add("active");

    }else{

        link.classList.remove("active");

    }

});

// =====================================
// Mobile Active
// =====================================

mobileLinks.forEach(link=>{

    const href = link.getAttribute("href");

    if(href===currentPage){

        link.classList.add("active");

    }else{

        link.classList.remove("active");

    }

});

// =====================================
// Notification
// =====================================

notificationBtn.onclick=()=>{

    alert(
`Notifications

• Welcome to EduPath 🎉

• AI Advisor is ready.

• Continue your learning today!`
    );

};

// =====================================
// Settings
// =====================================

settingsBtn.onclick=()=>{

    window.location.href="profile.html";

};

// =====================================
// Logout
// =====================================

import{
signOut
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

function logout(){

    const ok=confirm(
"ออกจากระบบใช่หรือไม่?"
    );

    if(!ok) return;

    signOut(auth)

    .then(()=>{

        window.location.href="login.html";

    })

    .catch((error)=>{

        alert(error.message);

    });

}

// =====================================
// Logout Button Auto
// =====================================

const profileMenu=document.createElement("button");

profileMenu.innerHTML=
'<i class="fa-solid fa-right-from-bracket"></i>';

profileMenu.title="Logout";

profileMenu.className="logout-btn";

profileMenu.onclick=logout;

document
.querySelector(".top-actions")
.appendChild(profileMenu);
// =====================================
// Home.js Part 3
// Dashboard Data
// =====================================

// ---------- Statistics ----------

const statistics = {

    notes:25,

    flashcards:12,

    courses:5

};

// =====================================
// Update Statistics
// =====================================

function loadStatistics(){

    const statNumbers =
        document.querySelectorAll(".stat-box h3");

    if(statNumbers.length<3) return;

    statNumbers[0].textContent =
        statistics.notes;

    statNumbers[1].textContent =
        statistics.flashcards;

    statNumbers[2].textContent =
        statistics.courses;

}

loadStatistics();


// =====================================
// Recommended Universities
// =====================================

const recommendedUniversities=[

{
title:"Massachusetts Institute of Technology",
country:"United States"
},

{
title:"Harvard University",
country:"United States"
},

{
title:"University of Oxford",
country:"United Kingdom"
},

{
title:"National University of Singapore",
country:"Singapore"
}

];


// =====================================
// Planner
// =====================================

const planner=[

{

time:"09:00",

title:"Study Mathematics"

},

{

time:"13:30",

title:"AI Course"

},

{

time:"19:00",

title:"Review Flashcards"

}

];


// =====================================
// Recent Notes
// =====================================

const recentNotes=[

{

title:"Biology Chapter 5",

date:"Today"

},

{

title:"Physics Formula",

date:"Yesterday"

},

{

title:"Programming JavaScript",

date:"2 days ago"

}

];


// =====================================
// Continue Learning
// =====================================

const learning={

course:

"Introduction to Artificial Intelligence",

progress:65

};


// =====================================
// Update Continue Learning
// =====================================

function updateLearning(){

    const title=document.querySelector(
".course-info h3"
);

    const text=document.querySelector(
".course-info p"
);

    const bar=document.querySelector(
".progress-bar"
);

    if(title)
        title.textContent=
        learning.course;

    if(text)
        text.textContent=
        `Progress : ${learning.progress}%`;

    if(bar)
        bar.style.width=
        learning.progress+"%";

}

updateLearning();


// =====================================
// Today's Planner Highlight
// =====================================

function highlightPlanner(){

    const items=document
    .querySelectorAll(".planner-item");

    if(items.length===0) return;

    items[0].style.background=
        "#eff6ff";

    items[0].style.borderRadius=
        "12px";

    items[0].style.padding=
        "12px";

}

highlightPlanner();


// =====================================
// Dashboard Refresh
// =====================================

function refreshDashboard(){

    loadStatistics();

    updateLearning();

    highlightPlanner();

}

refreshDashboard();


// =====================================
// Ready for Firestore
// =====================================

console.log(
"Dashboard Ready"
);
