async function loadquittance(user_id) {
    const response = await fetch("/factures/" + user_id, { method: "GET" });
    const tmp = await response.json();
    $.get("pages/components/quittance/index.ejs", function (data) {
        const html = ejs.render(data, { listes: tmp });
        $("#contentWrapper").empty();
        $("#contentWrapper").html(html);

        $("#table_appartement").dataTable();

        document.getElementById("loading_page").style.display = "none";
    });
}

async function refreshquittance(user_id) {
    const response = await fetch("/factures/" + user_id, { method: "GET" });
    const tmp = await response.json();
    $.get("pages/components/quittance/quittance.ejs", function (data) {
        const html = ejs.render(data, { listes: tmp });
        $("#list-quinttage").empty();
        $("#list-quinttage").html(html);

        $("#table_appartement").dataTable();

        document.getElementById("loading_page").style.display = "none";
    });
}


async function newquittance() {
    document.getElementById("loading_page").style.display = "block";


    const responseLoc = await fetch("/locataires/" + $("#token_").val(), { method: "GET" });
    const tmpLoc = await responseLoc.json();

    const response2 = await fetch("/type_paiements", { method: "GET" });
    const tmp2 = await response2.json();

    $.get("pages/components/quittance/nouveau_quittance.ejs", function (data) {
        const html = ejs.render(data, { paiements: tmp2, locataires: tmpLoc });
        $("#contentWrapper").empty();
        $("#contentWrapper").html(html);

        document.getElementById("loading_page").style.display = "none";
    });
}


async function get_appartement() {
    const response = await fetch("/locataire/" + $("#locataire_id_list").find(":selected").val(), { method: "GET" });
    const tmp = await response.json();

    if (tmp) {
        var html = "";

        html += `<option value="${tmp.bien._id}">${tmp.bien.name}</option>`;

        $("#list_bien").empty();
        $("#list_bien").html(html);

        var html2 = "";
        html2 += tmp.bien.name;
        html2 += " <p> avec une surface de " + tmp.bien.surface + " </p>";
        $("#name_appartement").empty();
        $("#name_appartement").html(html2);
        $("#pu").val(tmp.bien.loyer);
        calcule_tarif();
    }
}




function calcule_tarif() {
    var total_ht = 0;
    var total_charge = 0;
    var total_tva = 0;
    var total_ttc = 0;

    $('#form-bon-commande tr').each(function () {
        var pu = parseFloat($(this).find('[name="pu[]"]').val()) || 0;
        var charge = parseFloat($(this).find('[name="charge[]"]').val()) || 0;

        var result = charge + pu;

        var result_final = result;
        result_final = result_final <= 0 ? 0 : result_final;

        var tva = parseFloat($(this).find('[name="tva[]"]').val()) || 0;
        var montant_tva = (result_final * tva) / 100;
        montant_tva = montant_tva <= 0 ? 0 : montant_tva;

        var result_ttc = result_final + montant_tva;

        total_ht += result_final;
        total_charge += charge;
        total_tva += montant_tva;
        total_ttc += result_ttc;

        $(this).find('.result_montant').text(result_final + " AR");
        $(this).find('.result_montant_ttc').text(result_ttc + " AR");
    });

    $("#total_ht").html(total_ht + " AR");
    $("#total_charge").html(total_charge + " AR");
    $("#total_tva").html(total_tva + " AR");
    $("#total_ttc").html(total_ttc + " AR");
}

function save_quittance() {
    document.getElementById("loading_page").style.display = "block";
    var data = {
        ref: $("#ref").val(),
        charge: $("#charge").val(),
        invoice_date: $("#invoice_date").val(),
        due_date: $("#due_date").val(),
        month_rental: $("#month_rental").val(),
        pu: $("#pu").val(),
        tva: $("#tva").val(),
        type_paiement: $("#type_paiements").find(":selected").val(),
        bien: $("#list_bien").find(":selected").val(),
        locataire: $("#locataire_id_list").find(":selected").val()
    };

    $.ajax({
        type: "POST",
        url: "/facture/" + $("#token_").val(),
        data: data,
        dataType: "json",
        success: function (response) {
            if (response.status == 200) {
                document.getElementById("loading_page").style.display = "none";
                actionmen(this, ElMenuBien, ElMenuLocataire);
                loadquittance($("#token_").val());
            } else {
                document.getElementById("loading_page").style.display = "none";

                toastError(response.message);
            }
        },
        error: function (response) {
            document.getElementById("loading_page").style.display = "none";

            toastError(response.message);
        }
    });
}


function sendEmail(locataire_id) {
    document.getElementById("loading_page").style.display = "block";
    $.ajax({
        type: 'GET',
        url: '/detail-quittance/' + locataire_id,
        success: function (data) {
            const htmlContent = data;
            $.ajax({
                type: 'POST',
                url: '/send-mail-locataire/' + locataire_id,
                data: { htmlContent },
                success: function (response) {
                    document.getElementById("loading_page").style.display = "none";
                    if (response.status == 200) {

                        toastSuccess(response.message);
                    } else {
                        toastError(response.message);
                    }
                },
                error: function (error1) {
                    document.getElementById("loading_page").style.display = "none";
                    toastError(error1.message);
                },
            });
        },
        error: function (error) {
            document.getElementById("loading_page").style.display = "none";
            toastError(error.message);
        },
    });
}


function show_modal_delete_quittance(id) {
    document
        .getElementById("quittanceiddelete")
        .setAttribute("value", id);
}


$("#deletequittance").on("click", function () {
    document.getElementById("loading_page").style.display = "block";

    if ($("#quittanceiddelete").val() != null && $("#quittanceiddelete").val() != "") {
        var url = "facture/" + $("#quittanceiddelete").val();

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

                    $("#close-modal-delete-quittance").click();
                    refreshquittance($("#token_").val());

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