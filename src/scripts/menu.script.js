

var ElMenuBien = $("#menuBien");
var ElMenuLocataire = $("#menuLocataire");
var ElMenuquittance = $("#menuquittance");


function actionmen(
    thisElement,
    ElDeleteClass1,
    ElDeleteClass3
) {
    $(thisElement).addClass("vg-active");

    $(ElDeleteClass1).removeClass("vg-active");
    $(ElDeleteClass3).removeClass("vg-active");
}



$(document).ready(function () {
    actionmen( ElMenuBien, ElMenuLocataire, ElMenuquittance);
});




$("#menuBien").on("click", async function () {
    document.getElementById("loading_page").style.display = "block";
    actionmen(this, ElMenuLocataire, ElMenuquittance);
    loadBien($("#token_").val());
});

$("#menuLocataire").on("click", async function () {
    document.getElementById("loading_page").style.display = "block";
    actionmen(this, ElMenuBien, ElMenuquittance);
    loadLocataire($("#token_").val());
});

$("#menuquittance").on("click", async function () {
    document.getElementById("loading_page").style.display = "block";
    actionmen(this, ElMenuBien, ElMenuLocataire);
    loadquittance($("#token_").val());
});


