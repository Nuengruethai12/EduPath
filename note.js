const container =
document.getElementById("notes-container");


let notes =
JSON.parse(
localStorage.getItem("notes")
) || [];



if(notes.length === 0){


container.innerHTML = `

<p>
No saved notes yet.
</p>

`;


}

else{


notes.forEach((note,index)=>{


container.innerHTML += `

<div class="note-card">


<h2>
${note.title}
</h2>


<p>
Type:
${note.type || "University"}
</p>


<p>
Category:
${note.subtitle || "-"}
</p>


<p>
Location:
${note.location || "-"}
</p>


<p>
Saved:
${note.date}
</p>



<a href="${note.description || "#"}" target="_blank">

Visit Website

</a>


<br><br>


<button onclick="deleteNote(${index})">

Delete

</button>


</div>


<hr>


`;


});


}



function deleteNote(index){


notes.splice(index,1);


localStorage.setItem(
"notes",
JSON.stringify(notes)
);


location.reload();


}