async function loadLocataire(user_id) {
    const response = await fetch("/locataires/" + user_id, { method: "GET" });
    const tmp = await response.json();
    $.get("pages/components/locataire/index.ejs", function (data) {
        const html = ejs.render(data, { listes: tmp });
        $("#contentWrapper").empty();
        $("#contentWrapper").html(html);

        $("#table_appartement").dataTable();

        document.getElementById("loading_page").style.display = "none";
    });
}

async function refreshLocataire(user_id) {
    const response = await fetch("/locataires/" + user_id, { method: "GET" });
    const tmp = await response.json();
    $.get("pages/components/locataire/locataire.ejs", function (data) {
        const html = ejs.render(data, { listes: tmp });
        $("#list-locataire").empty();
        $("#list-locataire").html(html);

        $("#table_appartement").dataTable();

        document.getElementById("loading_page").style.display = "none";
    });
}

async function add_new_locataire() {
    const response = await fetch("/biens/" + $("#token_").val(), { method: "GET" });
    const tmp = await response.json();

    if (tmp.length > 0) {
        var html = "";
        for (let index = 0; index < tmp.length; index++) {
            const element = tmp[index];
            html += `<option value="${element._id}">${element.name}</option>`;
        }
        $("#appartement_list_locataire").empty();
        $("#appartement_list_locataire").html(html);

        document.getElementById("message_list_appartement").innerHTML = "";
    } else {
        document.getElementById("message_list_appartement").innerHTML = "Aucun appartement trouvé";
    }
}



async function show_modal_update_locataire(id) {
    document
        .getElementById("locataireidupdate")
        .setAttribute("value", id);

    const response = await fetch("/locataire/" + id, { method: "GET" });
    const tmp = await response.json();

    $("#firstnamelocataireupdt").val(tmp.first_name);
    $("#lastnamelocataireupdt").val(tmp.last_name);
    $("#addresslocataireupt").val(tmp.address);
    $("#phonelocataireupdt").val(tmp.phone);
    $("#emaillocataireupdt").val(tmp.email);

    const response2 = await fetch("/biens/" + $("#token_").val(), { method: "GET" });
    const tmp2 = await response2.json();

    if (tmp2.length > 0) {
        var html = "";
        for (let index = 0; index < tmp2.length; index++) {
            const element = tmp2[index];
            if (element._id == tmp.bien._id) {
                html += `<option value="${element._id}" selected>${element.name}</option>`;

            } else {

                html += `<option value="${element._id}">${element.name}</option>`;
            }
        }
        $("#appartement_list_locataireupdt").empty();
        $("#appartement_list_locataireupdt").html(html);

    }

}

function show_modal_delete_locataire(id) {
    document
        .getElementById("locataireiddelete")
        .setAttribute("value", id);
}


$("#addnewlocataire").on("click", function () {

    document.getElementById("loading_page").style.display = "block";

    if ($("#addresslocataire").val() != null && $("#phonelocataire").val() != "" && $("#emaillocataire").val() != "" && $("#lastnamelocataire").val() != "") {
        var url_ = "/locataire/" + $("#token_").val();

        fetch(url_, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ appartement: $("#appartement_list_locataire").find(":selected").val(), firstname: $("#firstnamelocataire").val(), lastname: $("#lastnamelocataire").val(), address: $("#addresslocataire").val(), phone: $("#phonelocataire").val(), email: $("#emaillocataire").val() }),
        })
            .then((res) => {
                if (res.ok) return res.json();
            })
            .then(async (response) => {
                if (response.status == 200) {

                    $("#close-modal-new-locataire").click();

                    toastSuccess(response.message);

                    $("#firstnamelocataire").val("");
                    $("#lastnamelocataire").val("");
                    $("#addresslocataire").val("");
                    $("#phonelocataire").val("");
                    $("#emaillocataire").val("");

                    refreshLocataire($("#token_").val());

                } else {
                    toastError(response.message);
                    document.getElementById("loading_page").style.display = "none";
                }
            })
            .catch((err) => {
                toastError(err.message);
                document.getElementById("loading_page").style.display = "none";
            });
    } else {
        toastError("Veuillez remplir tous les champs");
        document.getElementById("loading_page").style.display = "none";
    }

});

$("#updatelocataire").on("click", function () {

    document.getElementById("loading_page").style.display = "block";

    if ($("#addresslocataireupt").val() != null && $("#phonelocataireupdt").val() != "" && $("#emaillocataireupdt").val() != "" && $("#lastnamelocataireupdt").val() != "") {
        var url_ = "/locataire/" + $("#locataireidupdate").val();

        fetch(url_, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ appartement: $("#appartement_list_locataireupdt").find(":selected").val(), firstname: $("#firstnamelocataireupdt").val(), lastname: $("#lastnamelocataireupdt").val(), address: $("#addresslocataireupt").val(), phone: $("#phonelocataireupdt").val(), email: $("#emaillocataireupdt").val() }),
        })
            .then((res) => {
                if (res.ok) return res.json();
            })
            .then(async (response) => {
                if (response.status == 200) {

                    $("#close-modal-update-locataire").click();

                    toastSuccess(response.message);

                    $("#firstnamelocataireupdt").val("");
                    $("#lastnamelocataireupdt").val("");
                    $("#addresslocataireupt").val("");
                    $("#phonelocataireupdt").val("");
                    $("#emaillocataireupdt").val("");

                    refreshLocataire($("#token_").val());

                } else {
                    toastError(response.message);
                    document.getElementById("loading_page").style.display = "none";
                }
            })
            .catch((err) => {
                toastError(err.message);
                document.getElementById("loading_page").style.display = "none";
            });
    } else {
        toastError("Veuillez remplir tous les champs");
    }

});

$("#deletelocataire").on("click", function () {

    document.getElementById("loading_page").style.display = "block";

    if ($("#locataireiddelete").val() != null && $("#locataireiddelete").val() != "") {
        var url = "locataire/" + $("#locataireiddelete").val();

        fetch(url, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
        })
            .then((res) => {
                if (res.ok) return res.json();
            })
            .then((response) => {
                if (response.status == 200) {
                    toastSuccess(response.message);

                    $("#close-modal-delete-locataire").click();
                    refreshLocataire($("#token_").val());

                } else {
                    toastError(response.message);
                    document.getElementById("loading_page").style.display = "none";
                }
            })
            .catch((err) => {
                toastError(err.message);
                document.getElementById("loading_page").style.display = "none";
            });
    } else {
        toastError("Donnée invalide");
        document.getElementById("loading_page").style.display = "none";
    }

});



function show_modal_new_quittance(locataire_id) {

    new MultiSelectTag('list_bien_locataire');
}