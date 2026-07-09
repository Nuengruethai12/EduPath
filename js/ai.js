import { GEMINI_API_KEY } from "./gemini.js";
// =====================================
// EduPath AI Mentor
// ai.js
// =====================================

const chatMessages = document.getElementById("chatMessages");
const promptInput = document.getElementById("promptInput");
const sendBtn = document.getElementById("sendBtn");
const newChatBtn = document.querySelector(".new-chat");

// =====================================
// Send Message
// =====================================

function sendMessage() {

    const text = promptInput.value.trim();

    if (text === "") return;

    addMessage(text, "user");

    promptInput.value = "";

   replyAI(text);

}

// =====================================
// Add Bubble
// =====================================

function addMessage(message, sender) {

    const wrapper = document.createElement("div");

    wrapper.className = `message ${sender}`;

    const bubble = document.createElement("div");

    bubble.className = "bubble";

    bubble.innerHTML = `<p>${message}</p>`;

    wrapper.appendChild(bubble);

    chatMessages.appendChild(wrapper);

    chatMessages.scrollTop = chatMessages.scrollHeight;

}

// =====================================
// Fake AI
// =====================================


   // =====================================
// Gemini AI
// =====================================

async function replyAI(question){

    const url =
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;


    try{

        const response = await fetch(url,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                contents:[
                    {
                        parts:[
                            {
                                text: question
                            }
                        ]
                    }
                ]

            })

        });


        const data = await response.json();

        console.log(data);


        if(data.error){

            addMessage(
                "Gemini Error: " + data.error.message,
                "ai"
            );

            return;

        }


        const answer =
        data.candidates[0]
        .content
        .parts[0]
        .text;


        addMessage(answer,"ai");


    }


    catch(error){

        console.log(error);

        addMessage(
            "ไม่สามารถเชื่อมต่อ Gemini AI ได้",
            "ai"
        );

    }

}

sendBtn.addEventListener("click", sendMessage);

promptInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        sendMessage();

    }

});

// =====================================
// New Chat
// =====================================

newChatBtn.addEventListener("click", () => {

    chatMessages.innerHTML = `
    <div class="message ai">
        <div class="bubble">
            <h3>👋 New Chat Started</h3>
            <p>Ask me anything about education, universities or careers.</p>
        </div>
    </div>
    `;

});

// =====================================
// Ready
// =====================================

console.log("EduPath AI Mentor Ready");