// =====================================
// EduPath Search Engine v2
// search.js
// =====================================

// ---------- Elements ----------
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const results = document.getElementById("results");
const detail = document.getElementById("detail");
const recommendations = document.getElementById("recommendations");
let currentType = "all";
let database = [];
const educationDatabase = [

    // University

    {
        title:"Chulalongkorn University",
        subtitle:"Thailand",
        location:"Bangkok",
        description:"https://www.chula.ac.th/",
        type:"university"
    },


    {
        title:"Mahidol University",
        subtitle:"Thailand",
        location:"Nakhon Pathom",
        description:"https://www.mahidol.ac.th/",
        type:"university"
    },


    // Program

    {
        title:"Computer Science",
        subtitle:"Program",
        location:"Faculty of Science",
        description:"Study programming, AI and software development",
        type:"program"
    },


    {
        title:"Medicine",
        subtitle:"Program",
        location:"Faculty of Medicine",
        description:"Medical education and healthcare",
        type:"program"
    },


    // Career

    {
        title:"Software Engineer",
        subtitle:"Career",
        location:"Technology",
        description:"Develop software applications",
        type:"career"
    },


    {
        title:"Data Scientist",
        subtitle:"Career",
        location:"AI & Data",
        description:"Analyze data and build AI models",
        type:"career"
    },


    // Research

    {
        title:"Artificial Intelligence Research",
        subtitle:"Research",
        location:"AI Technology",
        description:"Research about machine learning",
        type:"research"
    },


    // Course

    {
        title:"Introduction to Artificial Intelligence",
        subtitle:"Course",
        location:"Online Learning",
        description:"Basic AI concepts",
        type:"course"
    },


    {
        title:"Python Programming",
        subtitle:"Course",
        location:"Online Learning",
        description:"Learn Python programming",
        type:"course"
    }

];
const recommendedUniversities = [

    {
        title:"Chulalongkorn University",
        subtitle:"Thailand",
        location:"Bangkok",
        description:"https://www.chula.ac.th/",
        image:"https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
    },


    {
        title:"Mahidol University",
        subtitle:"Thailand",
        location:"Nakhon Pathom",
        description:"https://www.mahidol.ac.th/",
        image:"https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
    },


    {
        title:"Kasetsart University",
        subtitle:"Thailand",
        location:"Bangkok",
        description:"https://www.ku.ac.th/",
        image:"https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
    }

];
// =====================================
// โหลดข้อมูลมหาวิทยาลัยจาก API
// =====================================
async function loadUniversities(keyword = "") {


    results.innerHTML = `
        <div class="empty">
            กำลังค้นหา...
        </div>
    `;


    const data = [

        {
            name:"Chulalongkorn University",
            country:"Thailand",
            location:"Bangkok",
            website:"https://www.chula.ac.th/"
        },


        {
            name:"Kasetsart University",
            country:"Thailand",
            location:"Bangkok",
            website:"https://www.ku.ac.th/"
        },


        {
            name:"Mahidol University",
            country:"Thailand",
            location:"Nakhon Pathom",
            website:"https://www.mahidol.ac.th/"
        },


        {
            name:"Thammasat University",
            country:"Thailand",
            location:"Pathum Thani",
            website:"https://tu.ac.th/"
        }

    ];


   database = data.map(item => ({

    title:item.name,

    subtitle:item.country,

    location:item.location,

    description:item.website,

    image:
    "https://cdn-icons-png.flaticon.com/512/3135/3135755.png",

    type:"university"

}));


// Filter ตามคำค้นหา

if(keyword){

    database = database.filter(item =>

        item.title
        .toLowerCase()
        .includes(keyword.toLowerCase())

    );

}


render(database);


    render(database);


}

// =====================================
// แสดงผล
// =====================================
function showRecommendations(){


    recommendations.innerHTML = "";


    recommendedUniversities.forEach(item=>{


        const card = document.createElement("div");


        card.className = "recommend-card";


        card.innerHTML = `

            <h3>${item.title}</h3>

            <p>${item.subtitle}</p>

            <p>${item.location}</p>

        `;


    


        recommendations.appendChild(card);


    });


}
function render(data) {

    results.innerHTML = "";

    if (data.length === 0) {

        results.innerHTML = `
            <div class="empty">
                ไม่พบข้อมูล
            </div>
        `;

        detail.innerHTML = "";

        return;

    }

    data.forEach(item => {

        const card = document.createElement("div");

        card.className = "result-card";

        card.innerHTML = `

            <h3>${item.title}</h3>

            <p>${item.subtitle}</p>

            <p>${item.location}</p>

        `;

        card.onclick = () => showDetail(item);

        results.appendChild(card);

    });

}

// =====================================
// แสดงรายละเอียด
// =====================================
function showDetail(item) {


    let content = "";



    if(item.type === "university"){


        content = `

        <h2>${item.title}</h2>


        <p>
        <b>ประเภท:</b>
        University
        </p>


        <p>
        <b>ประเทศ:</b>
        ${item.subtitle}
        </p>


        <p>
        <b>สถานที่:</b>
        ${item.location}
        </p>


        <p>
        <b>Website:</b><br>

        ${item.description}

        </p>


        `;


    }



    else if(item.type === "program"){


        content = `


        <h2>${item.title}</h2>


        <p>
        <b>ประเภท:</b>
        Program
        </p>


        <p>
        <b>คณะ:</b>
        ${item.location}
        </p>


        <p>
        ${item.description}
        </p>


        `;


    }



    else if(item.type === "career"){


        content = `


        <h2>${item.title}</h2>


        <p>
        <b>ประเภท:</b>
        Career
        </p>


        <p>
        <b>สายงาน:</b>
        ${item.location}
        </p>


        <p>
        ${item.description}
        </p>


        `;


    }



    else if(item.type === "research"){


        content = `


        <h2>${item.title}</h2>


        <p>
        <b>ประเภท:</b>
        Research
        </p>


        <p>
        <b>Topic:</b>
        ${item.location}
        </p>


        <p>
        ${item.description}
        </p>


        `;


    }



    else if(item.type === "course"){


        content = `


        <h2>${item.title}</h2>


        <p>
        <b>ประเภท:</b>
        Course
        </p>


        <p>
        <b>รูปแบบ:</b>
        ${item.location}
        </p>


        <p>
        ${item.description}
        </p>


        `;


    }



    detail.innerHTML = `


        ${content}


        <button id="addNoteBtn">

            Add Note

        </button>


    `;

    document
    .getElementById("addNoteBtn")
    .onclick = () => {

        addNote(item);

    };


}

  
// =====================================
// ค้นหา
// =====================================

function search(){

    const keyword =
    searchInput.value.toLowerCase();


    let result = educationDatabase;


    if(currentType !== "all"){

        result =
        result.filter(item =>
            item.type === currentType
        );

    }


    if(keyword){

        result =
        result.filter(item =>
            item.title
            .toLowerCase()
            .includes(keyword)
        );

    }


    recommendations.style.display="none";


    render(result);

}

// =====================================
// Search Button
// =====================================

searchBtn.addEventListener("click", search);

// =====================================
// Enter Key
// =====================================

searchInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        e.preventDefault();

        search();

    }

});

// =====================================
// Realtime Search
// =====================================

let typingTimer;

searchInput.addEventListener("input", () => {

    clearTimeout(typingTimer);

    typingTimer = setTimeout(() => {

        search();

    }, 400);

});

// =====================================
// Filter
// =====================================

document.querySelectorAll(".filter").forEach(btn => {

    btn.addEventListener("click", () => {

        document.querySelectorAll(".filter").forEach(item => {

            item.classList.remove("active");

        });

        btn.classList.add("active");

      currentType = btn.dataset.type;


recommendations.style.display = "none";


search();

    });

});

// =====================================
// โหลดข้อมูลแนะนำตอนเปิดหน้า
// =====================================

showRecommendations();


// =====================================
// Export (ใช้ในอนาคต)
// =====================================

window.eduPathSearch = {

    search,
    loadUniversities,
    render

};
// =====================================
// Add Note Function
// =====================================

function addNote(item){


    let notes =
    JSON.parse(
        localStorage.getItem("notes")
    ) || [];


   notes.push({

    title:item.title,

    type:item.type,

    subtitle:item.subtitle,

    location:item.location,

    description:item.description,

    date:new Date().toLocaleDateString()

});


    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );


    alert(
        "Added to My Notes"
    );


}