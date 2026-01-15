var data = {};
var xhr = new XMLHttpRequest();
var requestUrl = "https://fakestoreapi.com/products";

var tbody = document.getElementById("tableBodyData");
var btnRemove = document.getElementById("btnRemove");
var btnLoad = document.getElementById("btnLoad");
var btnSearch = document.getElementById("btnSearch");
var inputSearch = document.getElementById("inputSearch");

function genTr(json) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");

    td1.innerText = json.id;
    td2.innerText = json.title;
    td3.innerText = json.price;
    td4.innerText = json.description;
    td5.innerText = json.category;

    tr.append(td1, td2, td3, td4, td5);
    return tr;
}

// consumir api
function getData() {
    xhr.open("GET", requestUrl, true);
    xhr.onload = function() {
        let array = JSON.parse(xhr.responseText);
        data.json = array;

        tbody.innerHTML = "";

        array.forEach(element => {
            console.log(element); 
            tbody.append(genTr(element));
        });
    };
    xhr.send();
}

// Paso 3
btnLoad.addEventListener("click", function() {
    getData();
    btnLoad.classList.replace("btn-outline-primary", "btn-primary");
});

btnRemove.addEventListener("click", function(e) {
    tbody.innerHTML = "";
});

// Paso 4
btnSearch.addEventListener("click", function() {
    if (data.json) {
        let filtered = data.json.filter(function(e) {
            return e.title.toLowerCase().includes(inputSearch.value.toLowerCase());
        });

        console.log(filtered);

        tbody.innerHTML = "";
        filtered.forEach(element => {
            tbody.append(genTr(element));
        });
    } else {
        alert("Primero carga los datos con 'Load Data'");
    }
});