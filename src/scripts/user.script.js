function search() {
    var dataTable = $(
        "#table_appartement,#table_member,#table_contact_team , #table_contact, #table_call_history"
    ).DataTable();
    var searchValue = document.getElementById("searchContact");

    dataTable.search(searchValue.value).draw();
}


async function connected() {
    try {
        const response = await fetch("/user-connected", { method: "GET" });
        const data = await response.json();
        if (data) {

            $("#name_user_connected").html(data.first_name+" "+data.last_name);
            $("#email_user_connected").html(data.username);
            $("#phone_user_connected").html(data.phone);
            $("#token_").attr("value", "" + data._id);

            loadBien(data._id);

        }
    } catch (error) {
        toastError(error.message);
    }
}


$(document).ready(function () {
    connected();
});