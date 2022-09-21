//katintásra történyen az ujratöltés

const dowButton = document.getElementById("downloadButton");
const addButton = document.getElementById("addButton");
const empTable = document.getElementById("empTable");
const empname = document.getElementById("name");
var host ="http://localhost:3000";

dowButton.addEventListener("click",()=>{
//fetch megkapjuk a dolgozok adatait
//akkor hajtódik végre amikor ujratöltödik az oldal
var endpoint="employees"
const url =host+"/"+endpoint;
fetch(url)
.then( response => response.json())
.then( result => {
    console.log(result[0].name)
    renderTable(result);
})
.catch(error => {
    console.log("Hiba")
    console.log(error) //ha error van kiirja
});
});

//táblázat létrehozása
function renderTable(employees){
    empTable.innerHTML="";
    employees.forEach(element => {
        let tr = document.createElement("tr"); //sor
        let tdId = document.createElement("td");//oslop 1
        let tdName = document.createElement("td");//oszlop2
        let tdDel = document.createElement("button");
        tdDel.textContent="törlés";
        tdDel.addEventListener("click",()=>{
            deleteEmployee(element.id)
        });
        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdDel);
        empTable.appendChild(tr);
       tdId.textContent = element.id;
       tdName.textContent=element.name;
    });
};

//inputtal hozzaadunk az adatbázishoz
addButton.addEventListener("click", ()=>{
    let endpoint ="employees";
    let url = host+"/"+endpoint;

    let employee={
        name: empname.value
    }
    if(empname.value===""){
        console.log("irjon be adatot");
    }
    else{
        fetch(url,{
            method: "post",
            body: JSON.stringify(employee),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(result => console.log(result));
    }
   
});

//Dologozó törlése
function deleteEmployee(id){
    console.log(id);
    let endpoint="employees";
    //oda kell füzni az id-t a törlésnél
    let url=host+"/"+endpoint+"/"+id;
    fetch(url,{
        method:"delete"
    })
    .then(response => response.json())
    .then(result => console.log(result));
    
};
