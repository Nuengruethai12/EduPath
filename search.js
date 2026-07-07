// search.js

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const results = document.getElementById("results");
const detail = document.getElementById("detail");

let currentType = "all";

// ======================
// ข้อมูลตัวอย่าง
// ======================

let database = [
    async function loadUniversities(keyword=""){

    const url =
    `https://universities.hipolabs.com/search?name=${encodeURIComponent(keyword)}`;

    const response = await fetch(url);

    const data = await response.json();

    database = data.map(item=>({

        title:item.name,

        subtitle:item.country,

        location:item["state-province"] || "",

        description:item.web_pages[0],

        image:"https://cdn-icons-png.flaticon.com/512/3135/3135755.png"

    }));

    render(database);

}
];

// ======================
// แสดงข้อมูล
// ======================

function render(data){

    results.innerHTML="";

    if(data.length===0){

        results.innerHTML=`
            <div class="empty">
                ไม่พบข้อมูล
            </div>
        `;

        return;

    }

    data.forEach(item=>{

        const card=document.createElement("div");

        card.className="result-card";

        card.innerHTML=`

            <h3>${item.title}</h3>

            <p>${item.subtitle}</p>

            <p>${item.location}</p>

        `;

        card.onclick=()=>{

            detail.innerHTML=`

                <img src="${item.image}">

                <h2>${item.title}</h2>

                <p><b>ประเภท :</b> ${item.subtitle}</p>

                <p><b>ข้อมูล :</b> ${item.description}</p>

                <p><b>สถานที่ :</b> ${item.location}</p>

            `;

        };

        results.appendChild(card);

    });

}

// ======================
// ค้นหา
// ======================

function search(){

    const keyword=searchInput.value.toLowerCase();

    const filtered=database.filter(item=>{

        const matchKeyword=

        item.title.toLowerCase().includes(keyword) ||

        item.description.toLowerCase().includes(keyword);

        const matchType=

        currentType==="all" ||

        item.type===currentType;

        return matchKeyword && matchType;

    });

    render(filtered);

}

// ======================
// Search Button
// ======================

searchBtn.addEventListener("click",search);

// ======================
// Enter
// ======================

searchInput.addEventListener("input",()=>{

    loadUniversities(searchInput.value);

});
// ======================
// Realtime Search
// ======================

searchInput.addEventListener("input",search);

// ======================
// Filter
// ======================

document.querySelectorAll(".filter").forEach(btn=>{

    btn.onclick=()=>{

        document.querySelectorAll(".filter").forEach(b=>{

            b.classList.remove("active");

        });

        btn.classList.add("active");

        currentType=btn.dataset.type;

        search();

    };

});

// ======================
// โหลดข้อมูลครั้งแรก
// ======================

loadUniversities();
