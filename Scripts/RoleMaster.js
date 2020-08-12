

function EditRolepopup(jobroleid) {
    $("#AddJobRoleModal").modal('toggle');
    getRoledeatils(jobroleid);
}

function openpopup() {
    Clear();
    $("#AddJobRoleModal").modal('toggle');
}

function CompcountShowpopup(jobroleid) {
    $("#RoleCompListModal").modal('toggle');
    getCompcountdeatils(jobroleid);
}

function getCompcountdeatils(jobroleid) {
    $("#tblShowRoleComp tbody tr").remove();
    UnitObj = JSON.stringify({ 'jobroleid': jobroleid });
    $.ajax({
        url: "/Role/GetRoleCompetencyMappingdetails",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: UnitObj,
        success: function (data) {

            for (i = 0; i < data.length; i++) {
                $("#tblShowRoleComp tbody").append("<tr><td>" + data[i].CompetencyName + "</td><td>" + data[i].CompetencyLevelName + "</td>><td>Has a good understanding of the service to be provided. Responsive and helpful to customers; always puts the customers’ needs first .Provides timely service</td></tr>");
            }
        }
    });
}

function getRoledeatils(jobroleid) {
    $("#table_Competencylevel tbody tr").remove();
    UnitObj = JSON.stringify({ 'jobroleid': jobroleid });
    $.ajax({

        url: "/Role/GetRoledetailsByID",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: UnitObj,
        success: function (data) {
            $("#txtRoleName").val(data.RoleName);
            $("#txtRoledesc").text(data.RoleDesc)
            $("#txtRole").val(data.RoleID);
            // Get the items

            //alert(data.Competency.length);

            for (i = 0; i < data.Competency.length; i++) {


                $('#table_Competencylevel').append('<tr id="row' + (parseInt(i) + 1).toString() + '"></tr>');
                $('#row' + (i + 1).toString()).html($('#new_div_Training').html()).find('td:first-child');

                var $rowid = $("#row" + (i + 1).toString()).find('td');
                var getCompCat = $rowid.find('select.form-control.clscompcat');
                var getCompetency = $rowid.find('select.form-control.clscompetency');
                var getCOmplevle = $rowid.find('select.form-control.clslevels');
                $(getCompetency).val(data.Competency[i].CompetencyId);
                $(getCompetency).val(data.Competency[i].CompetencyId);
                $(getCOmplevle).val(data.Competency[i].CompetencyLevelId);

            }
            $('#table_Competencylevel').append('<tr id="row' + (parseInt(data.Competency.length) + 1).toString() + '"></tr>');
            $('#hdnrowno').val((parseInt(data.Competency.length) + 1).toString());
            $("#hdn_RID").val(jobroleid);
            $("#btnSubmit").hide();
            $("#btnSubmitUpdate").show();
            //$.each(data.Competency, function (index, value) {
            //    var hdnrowno = $("#hdnrowno").val();


            //    //var checkBox = '<div class="checkbox checkbox-danger"><input type="checkbox" id="' + rcount + '" name="dcheck" value="' + rcount + '"><label for="' + rcount + '">' + rcount + '</label></div>';
            //    $('#row' + hdnrowno).html($('#new_div_Training').html().find('td:first-child'));
            //    $('#table_Competencylevel').append('<tr id="row' + (parseInt(hdnrowno) + 1) + '"></tr>');
            //    $("#hdnrowno").val(parseInt(hdnrowno) + 1);
            //});

        }
    });
}


$("#btnAdd").click(function () {

    var hdnrowno = $("#hdnrowno").val();

    //var checkBox = '<div class="checkbox checkbox-danger"><input type="checkbox" id="' + rcount + '" name="dcheck" value="' + rcount + '"><label for="' + rcount + '">' + rcount + '</label></div>';
    $('#row' + hdnrowno).html($('#new_div_Training').html()).find('td:first-child');
    $('#table_Competencylevel').append('<tr id="row' + (parseInt(hdnrowno) + 1) + '"></tr>');
    $("#hdnrowno").val(parseInt(hdnrowno) + 1);
});


function removerow(obj) {

    var tablerowcount = $('#table_Competencylevel tr').length;
    if (tablerowcount > 3) {
        $(obj).closest("tr").remove();
    }
}

function Dosubmit() {
    if ($('#formAddRole').parsley().validate()) {

        //if (!files.length) {
        //    alert('Please select a file!');
        //    return;
        //}
        //var base64String = "";
        //var file = files[0];
        //var blob = file.slice();

        //var filetype = file.type;
        //var filename = file.name;

        //var reader = new FileReader();

        //reader.onloadend = function (evt) {
        //    if (evt.target.readyState == FileReader.DONE) {

        //        var cont = evt.target.result
        //         base64String = getB64Str(cont);
        //    }
        //}

        var rolename = $("#txtRoleName").val();
        var roledesc = $("#txtRoledesc").val();
        var roleid = $("#txtRole").val();
        var job_desc = null;

        var Competencyarray = []; var CompetencyMapping = {};
        $('#table_Competencylevel tbody tr').each(function (i, element) {
            var html = $(this).html();

            if (html != '' && html != null) {
                Rolecompetencymapping = {
                    CompetencyId: $(this).find('.clscompetency option:selected').val(),
                    CompetencyLevelId: $(this).find('.clslevels option:selected').val()
                }
                Competencyarray.push(Rolecompetencymapping);

            }

        });



        var UnitObj = {
            "RoleName": rolename,
            "RoleDesc": roledesc,
            "JobDesc_Documents": job_desc,
            "RoleID": roleid,
            "Competency": Competencyarray,
        }
        UnitObj = JSON.stringify({ 'model': UnitObj });
        $.ajax({
            url: "/Role/Roledetails",
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: UnitObj,
            success: function (data) {
                if (data === true) {

                    location.href = "/Role/Roledetails";

                }
            }
        });
    }

}


function Dosubmit_Submit() {
    if ($('#formAddRole').parsley().validate()) {
        var rolename = $("#txtRoleName").val();
        var roledesc = $("#txtRoledesc").val();
        var roleid = $("#txtRole").val();
        var job_desc = null;

        var Competencyarray = []; var CompetencyMapping = {};
        $('#table_Competencylevel tbody tr').each(function (i, element) {
            var html = $(this).html();

            if (html != '' && html != null) {
                Rolecompetencymapping = {
                    CompetencyId: $(this).find('.clscompetency option:selected').val(),
                    CompetencyLevelId: $(this).find('.clslevels option:selected').val()
                }
                Competencyarray.push(Rolecompetencymapping);

            }

        });



        var UnitObj = {
            "JobRoleId": $("#hdn_RID").val(),
            "RoleName": rolename,
            "RoleDesc": roledesc,
            "JobDesc_Documents": job_desc,
            "RoleID": roleid,
            "Competency": Competencyarray,
        }
        UnitObj = JSON.stringify({ 'model': UnitObj });
        $.ajax({
            url: "/Role/Roledetails",
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: UnitObj,
            success: function (data) {
                if (data === true) {

                    location.href = "/Role/Roledetails";

                }
            }
        });
    }

}

function Clear() {
    $('#txtRoleName').val('');
    $('#txtRoledesc').val('');
    $('#txtRole').val('');
    $("#table_Competencylevel tbody tr").remove();
    for (i = 0; i < 2; i++) {


        $('#table_Competencylevel').append('<tr id="row' + (parseInt(i) + 1).toString() + '"></tr>');
        $('#row' + (i + 1).toString()).html($('#new_div_Training').html()).find('td:first-child');


    }
    $('#table_Competencylevel').append('<tr id="row3"></tr>');
    $('#hdnrowno').val(3);
    $("#hdn_RID").val('');
    $("#btnSubmit").show();
    $("#btnSubmitUpdate").hide();
}


$('#txtRoleName').on('change', function () {


    var rolename = $(this).val();
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'GET',
        url: '/Role/GetRoleNameUnique',
        data: {
            RoleName: rolename
        },
        success: function (response) {
            if (response == '"C200"') {

                alert('Role Name already exist. Please enter new Role name');
                $("#txtRoleName").val('');
                $("#txtRoleName").focus();
            }
        },
        error: function (response) {
        }
    });
});


function compcat(obj) {
    var cid = $(obj).val();
    //var $row = $(obj).closest('tr').attr('id');
    var $row = $(obj).closest("tr").find("td select.clscompetency");
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'GET',
        url: '/Role/GetCompetencyByCategoryId',
        data: {
            CategoryId: cid
        },
        success: function (response) {
            $($row).empty();
            $($row).append("<option value='0'>Select Competency</option>");
            for (i = 0; i < response.length; i++) {
                $($row).append("<option value='" + response[i].CompetencyId + "'>" + response[i].CompetencyName + "</option>");
            }




        },
        error: function (response) {
        }
    });
}
var comparry = []; var compdataarry = {};
function compdetail(obj) {
    var cid = $(obj).val();
    var $Compid = $(obj).closest("tr").find("td select.clscompetency option:selected").val();
    var $Complevelid = $(obj).closest("tr").find("td select.clslevels option:selected").val();
    var $rowid = $(obj).closest('tr').attr('id');
    var j = 0;
    var table = document.getElementById("table_Competencylevel");
    $("#table_Competencylevel tbody tr").each(function (i, row) {
        var $row = $(row);
        var thisrowid = $row.attr('id');
        var $Compideach = $row.find("select.clscompetency option:selected").val();
        var $Complevelideach = $row.find("td select.clslevels option:selected").val();
        if ($rowid != thisrowid) {
            if ($Compid == $Compideach && $Complevelid == $Complevelideach) {
                alert("The Same competency and the level are already selected.");
                $(obj).closest("tr").find("td select.clscompetency").val('0');
                $(obj).closest("tr").find("td select.clslevels").val('0')
                return false;
            }
        }
       
    });

  
}

function deleteRole(id, name) {
    $('#lblDeleteTitle').text(name);
    $('#deleteModal').modal('show');
    $('#dyes').click(function (event) {

        if ($('#formDeleteModal').parsley().validate()) {
            var msg = $('#ReasonMsg').val();
            deleteRoleMethod(id, msg);
        }
    });
    $('#dno').click(function (event) {
        location.reload();
    });
}

function deleteRoleMethod(aid, msg) {
    var obj = {
        Id: aid,
        ReasonMsg: msg
    };
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: "POST",
        url: "/Role/DeleteRole",
        data: JSON.stringify(obj),
        success: function (data) {
            location.reload();
        },
        error: function () {

        }
    });
}