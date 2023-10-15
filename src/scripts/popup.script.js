function toastSuccess(message) {
    toastr.success(
        "" + message + "",
        '<h5 class="text-white px-1 py-1"> Success  </h5>',
        {
            positionClass: "position-absolute top-50 start-50 translate-middle-x",
            timeout: 2000,
            rtl: false,
        }
    );
}
function toastWarning(message) {
    toastr.error(
        "" + message + "",
        '<h5 class="text-white px-2 py-2"><i class="feather fa fa-info-circle me-2"></i> Error  </h5>',
        {
            positionClass: "position-absolute top-50 start-50 translate-middle-x",
            timeout: 2000,
            rtl: false,
        }
    );
}
function toastError(description) {
    toastr.error(
        "" + description + "",
        '<h5 class="text-white px-1 py-1"> Error </h5>',
        {
            positionClass: "position-absolute top-50 start-50 translate-middle-x",
            timeout: 2000,
            rtl: false,
        }
    );
}