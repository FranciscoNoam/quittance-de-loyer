async function loadBien(user_id) {
    const response = await fetch("/biens/" + user_id, { method: "GET" });
    const tmp = await response.json();
    $.get("pages/components/bien/index.ejs", function (data) {
        const html = ejs.render(data, { listes: tmp });
        $("#contentWrapper").empty();
        $("#contentWrapper").html(html);

        $("#table_appartement").dataTable();

        document.getElementById("loading_page").style.display = "none";
    });
}


async function refreshBien(user_id) {
    const response = await fetch("/biens/" + user_id, { method: "GET" });
    const tmp = await response.json();
    $.get("pages/components/bien/bien.ejs", function (data) {
        const html = ejs.render(data, { listes: tmp });
        $("#list-bien").empty();
        $("#list-bien").html(html);
        $("#table_appartement").dataTable();
        document.getElementById("loading_page").style.display = "none";
    });
}


async function show_modal_update_bien(id) {
    document
        .getElementById("bienidupdate")
        .setAttribute("value", id);

    const response = await fetch("/bien/" + id, { method: "GET" });
    const tmp = await response.json();

    $("#descriptionbienupdt").val(tmp.name);
    $("#surfacebienupdt").val(tmp.surface);
    $("#loyerbienupdt").val(tmp.loyer);
    $("#addressebienupdt").val(tmp.address);
}

function show_modal_delete_bien(id) {
    document
        .getElementById("bieniddelete")
        .setAttribute("value", id);
}


$("#addnewbien").on("click", function () {
    document.getElementById("loading_page").style.display = "block";

    if ($("#descriptionbien").val() != null && $("#surfacebien").val() != "" && $("#loyerbien").val() != "" && $("#addressebien").val() != "") {
        var url_ = "/bien/" + $("#token_").val();

        fetch(url_, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: $("#descriptionbien").val(), address: $("#addressebien").val(), surface: $("#surfacebien").val(), loyer: $("#loyerbien").val() }),
        })
            .then((res) => {
                if (res.ok) return res.json();
            })
            .then(async (response) => {
                if (response.status == 200) {

                    $("#close-modal-new-bien").click();

                    toastSuccess(response.message);
                    $("#descriptionbien").val("");
                    $("#surfacebien").val("");
                    $("#loyerbien").val("");
                    $("#addressebien").val("");

                    refreshBien($("#token_").val());

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

$("#updatebien").on("click", function () {
    document.getElementById("loading_page").style.display = "block";

    if ($("#descriptionbienupdt").val() != null && $("#surfacebienupdt").val() != "" && $("#loyerbienupdt").val() != "" && $("#addressebienupdt").val() != "") {
        var url_ = "/bien/" + $("#bienidupdate").val();

        fetch(url_, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: $("#descriptionbienupdt").val(), address: $("#addressebienupdt").val(), surface: $("#surfacebienupdt").val(), loyer: $("#loyerbienupdt").val() }),
        })
            .then((res) => {
                if (res.ok) return res.json();
            })
            .then(async (response) => {
                if (response.status == 200) {

                    $("#close-modal-update-bien").click();

                    toastSuccess(response.message);
                    $("#descriptionbienupdt").val("");
                    $("#surfacebienupdt").val("");
                    $("#loyerbienupdt").val("");
                    $("#addressebienupdt").val("");

                    refreshBien($("#token_").val());

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

$("#deletebien").on("click", function () {
    document.getElementById("loading_page").style.display = "block";

    if ($("#bieniddelete").val() != null && $("#bieniddelete").val() != "") {
        var url = "bien/" + $("#bieniddelete").val();

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

                    $("#close-modal-delete-bien").click();
                    refreshBien($("#token_").val());

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