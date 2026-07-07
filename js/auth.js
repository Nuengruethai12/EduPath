// =======================================
// EduPath Authentication Module
// Version 2.0
// =======================================

import app from "../firebase.js";

import {

    getAuth,

    onAuthStateChanged,

    signOut

}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const auth = getAuth(app);

// =======================================
// User
// =======================================

let currentUser = null;

// =======================================
// Get User
// =======================================

export function getCurrentUser(){

    return currentUser;

}

// =======================================
// Login Check
// =======================================

export function requireLogin(callback){

    onAuthStateChanged(auth,(user)=>{

        if(!user){

            window.location.href="login.html";

            return;

        }

        currentUser=user;

        if(callback){

            callback(user);

        }

    });

}

// =======================================
// Logout
// =======================================

export async function logout(){

    try{

        await signOut(auth);

        window.location.href="login.html";

    }

    catch(error){

        console.error(error);

        alert(error.message);

    }

}
