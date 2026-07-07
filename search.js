// =====================================
// EduPath Search Engine v2
// search.js
// =====================================

// ---------- Elements ----------
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const results = document.getElementById("results");
const detail = document.getElementById("detail");

let currentType = "all";
let database = [];

// =====================================
// โหลดข้อมูลมหาวิทยาลัยจาก API
// =====================================

async function loadUniversities(keyword = "") {

    try {

        results.innerHTML = `
            <div class="empty">
                กำลังค้นหา...
            </div>
        `;

        const response = await fetch(
            `https://universities.hipolabs.com/search?name=${encodeURIComponent(keyword)}`
        );

        const data = await response.json();

        database = data.map(item => ({

            title: item.name,

            subtitle: item.country,

            location: item["state-province"] || "-",

            description: item.web_pages[0],

            image:
                "https://cdn-icons-png.flaticon.com/512/3135/3135755.png",

            type: "university"

        }));

        render(database);

    } catch (error) {

        console.error(error);

        results.innerHTML = `
            <div class="empty">
                ไม่สามารถโหลดข้อมูลได้
            </div>
        `;

    }

}

// =====================================
// แสดงผล
// =====================================

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

    detail.innerHTML = `

        <img src="${item.image}" alt="${item.title}">

        <h2>${item.title}</h2>

        <p><b>ประเทศ :</b> ${item.subtitle}</p>

        <p><b>เมือง/รัฐ :</b> ${item.location}</p>

        <p>
            <b>เว็บไซต์ :</b><br>
            <a href="${item.description}" target="_blank">
                ${item.description}
            </a>
        </p>

    `;

}
// =====================================
// ค้นหา
// =====================================

function search() {

    const keyword = searchInput.value.trim();

    loadUniversities(keyword);

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

        search();

    });

});

// =====================================
// โหลดข้อมูลครั้งแรก
// =====================================

loadUniversities();


// =====================================
// Export (ใช้ในอนาคต)
// =====================================

window.eduPathSearch = {

    search,
    loadUniversities,
    render

};
