var SiteName = document.getElementById("SiteName");
var siteUrl = document.getElementById("SiteUrl");
var nameValid = document.getElementById("nameValid");
var nameEmpty = document.getElementById("nameEmpty");
var linkValid = document.getElementById("linkValid");
var linkEmpty = document.getElementById("linkEmpty");
var btnAdd = document.getElementById("btnAdd");
var contant = document.getElementById("contant");

var siteContainer;

if(localStorage.getItem("siteGroup") == null){
    siteContainer = [];
}
else{
    siteContainer = JSON.parse(localStorage.getItem("siteGroup"));
    display();
}

function addSite(){
    if(checkInputs() == "true"){
        nameEmpty.style.display = "none";
        linkEmpty.style.display = "none";
        if(nameInValid() == true && linkInValid() == true){
            var website = {
                site:SiteName.value,
                link:siteUrl.value
            }
        
            siteContainer.push(website);
            display()
            clear()
            localStorage.setItem("siteGroup" , JSON.stringify(siteContainer));
            nameValid.style.display = "none"
            linkValid.style.display = "none";
        }
        else if(nameInValid() == false && linkInValid() == true){
            nameValid.style.display = "block"
            linkValid.style.display = "none";
        }
        else if(nameInValid() == true && linkInValid() == false){
            nameValid.style.display = "none"
            linkValid.style.display = "block";
        }
        else{
            nameValid.style.display = "block"
            linkValid.style.display = "block";
        }
    }
    else if(checkInputs() == "bothEmpty"){
        nameEmpty.style.display = "block";
        linkEmpty.style.display = "block";
    }
    else if(checkInputs() == "linkEmpty" ){
        nameEmpty.style.display = "none";
        linkEmpty.style.display = "block";
    }
    else{
        nameEmpty.style.display = "block";
        linkEmpty.style.display = "none";
    }
}
btnAdd.addEventListener("click",addSite);

function display(){

    var Container = "";

    for (var index = 0; index < siteContainer.length; index++) {
        Container += `
        <tr>
        <td class="px-3 py-4"><h3>`+siteContainer[index].site+`</h3></td>
            <td></td>
            <td></td>
            <td class=" py-4">
                <a target="_blank" href="http://`+siteContainer[index].link+`" class="btn btn-primary">Viste</a>
                <button  onclick="deleteSite(`+index+`)" class="ml-3 btn btn-danger">Delete</button>
            </td>
        </tr>
        `;
    }
    contant.innerHTML = Container;

}

function clear(){
    SiteName.value = "";
    siteUrl.value = "";
}


function deleteSite(index){
    siteContainer.splice(index,1);
    localStorage.setItem("siteGroup" , JSON.stringify(siteContainer));
    display();
}

function checkInputs(){
    if(SiteName.value == "" && siteUrl.value == "" ){
        return "bothEmpty";
    }
    else if (SiteName.value == "" && siteUrl.value != "" ){
        return "nameEmpty"
    }
    else if(SiteName.value != "" && siteUrl.value == "" ){
        return "linkEmpty"
    }
    else{
        return "true"
    }
}


function nameInValid(){

    var regex = /^[A-Z][a-z]{4,}( [A-Z][a-z]{4,})?$/;

    if(regex.test(SiteName.value) == true){
        return true;
    }
    return false;
}

function linkInValid(){
    var regex = /^http(s)?:\/\/(www.)?[a-z]{4,}.com$/;
    if(regex.test(siteUrl.value) == true){
        return true;
    }
    return false;
}
