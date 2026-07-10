let notes =
JSON.parse(
localStorage.getItem("notes")
)||[];


let html="";


notes.forEach((n,index)=>{


html += `

<div>

<h2>${n.name}</h2>

<p>
${n.location}
</p>

<p>
${n.faculty}
</p>


<button onclick="deleteNote(${index})">
Delete
</button>


</div>

<hr>

`;

});


document.getElementById("notes")
.innerHTML=html;



function deleteNote(index){

notes.splice(index,1);


localStorage.setItem(
"notes",
JSON.stringify(notes)
);


location.reload();

}