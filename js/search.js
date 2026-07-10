const universities = [
{
name:"Chulalongkorn University",
location:"Bangkok",
faculty:"Engineering",
admission:"TCAS"
},

{
name:"Kasetsart University",
location:"Bangkok",
faculty:"Computer Science",
admission:"TCAS"
},

{
name:"Mahidol University",
location:"Nakhon Pathom",
faculty:"Medicine",
admission:"TCAS"
}

];


function searchUniversity(){

let keyword =
document.getElementById("searchInput").value;


let result =
universities.filter(u =>
u.name.toLowerCase()
.includes(keyword.toLowerCase())
);


let html="";


result.forEach(u=>{

html += `

<div class="university-card">

<h2>${u.name}</h2>

<p>
Location: ${u.location}
</p>

<p>
Faculty: ${u.faculty}
</p>

<p>
Admission: ${u.admission}
</p>


<button onclick='addNote(${JSON.stringify(u)})'>
Add Note
</button>


</div>

`;

});


document.getElementById("result").innerHTML=html;


}



function addNote(university){

let notes =
JSON.parse(
localStorage.getItem("notes")
)||[];


notes.push(university);


localStorage.setItem(
"notes",
JSON.stringify(notes)
);


alert("Added to Notes");

}