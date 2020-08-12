
$(function () {
    $('#tblDesignations').DataTable({
        responsive: false,
        language: {
            searchPlaceholder: 'Search...',
            sSearch: '',
            lengthMenu: '_MENU_ ',
        }
    });
    // Select2
    $('.dataTables_length').select2({ minimumResultsForSearch: Infinity });


});
function loadDesignations() {
   
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'GET',
        url: '/Settings/GetDesignations',
        data: '{}',
        async: true,
        success: function (response) {
            $('#tblDesignations tbody').html("");

            var len = response.length;

            for (var i = 0; i < len; i++) {
                var html = '<tr>';
                html += '<td>' + response[i]['DesignationCode'] + '</td>';
                html += '<td>' + response[i]['DesignationName'] + '</td>';
                html += '<td><a><span data-feather="edit" width="20"></span></a><a><span data-feather="trash" width="20"></span></a></td></tr>';
                $('#tblDesignations').prepend(html);
            }
            $('#DesignationListModal').modal('show');
        },
        error: function (response) {
        }
    });
}