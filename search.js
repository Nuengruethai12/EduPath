// search.js

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const results = document.getElementById("results");
const detail = document.getElementById("detail");

let currentType = "all";

// ======================
// ข้อมูลตัวอย่าง
// ======================

const database = [

{
    type:"university",
    title:"Chulalongkorn University",
    subtitle:"มหาวิทยาลัย",
    location:"Bangkok, Thailand",
    description:"มหาวิทยาลัยชั้นนำของประเทศไทย",
    image:"https://picsum.photos/400/220?1"
},

{
    type:"university",
    title:"Kasetsart University",
    subtitle:"มหาวิทยาลัย",
    location:"Bangkok, Thailand",
    description:"มหาวิทยาลัยด้านเกษตรศาสตร์และวิทยาศาสตร์",
    image:"https://picsum.photos/400/220?2"
},

{
    type:"program",
    title:"Computer Science",
    subtitle:"คณะ",
    location:"Bachelor Degree",
    description:"เรียนเกี่ยวกับการพัฒนาซอฟต์แวร์ AI และ Data",
    image:"https://picsum.photos/400/220?3"
},

{
    type:"career",
    title:"Software Engineer",
    subtitle:"อาชีพ",
    location:"Technology",
    description:"พัฒนาโปรแกรมและระบบสารสนเทศ",
    image:"https://picsum.photos/400/220?4"
},

{
    type:"research",
    title:"Machine Learning Research",
    subtitle:"งานวิจัย",
    location:"AI",
    description:"งานวิจัยด้าน Machine Learning",
    image:"https://picsum.photos/400/220?5"
},

{
    type:"course",
    title:"Python Programming",
    subtitle:"คอร์สเรียน",
    location:"Online",
    description:"เรียน Python ตั้งแต่พื้นฐานจนถึงขั้นสูง",
    image:"https://picsum.photos/400/220?6"
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

searchInput.addEventListener("keyup",(e)=>{

    if(e.key==="Enter"){

        search();

    }

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

render(database);
