$(document).ready(function () {


    $('#btnFunctionInsert').on('click', function () {

        if ($('#formAddFunction').parsley().validate()) {
            var lineItem = [], fun = {};
            $('#JobRoles option:selected').each(function () {
                if ($(this).val() !== "") {
                    fun = {
                        JobRoleId: $(this).val()
                    };
                    lineItem.push(fun);
                }
            });
            var FunObj = {
                FunctionName: $('#FunctionName').val(),
                FunctionDesc: $('#FunctionDesc').val(),
                FunctionCode: $('#FunctionCode').val(),
                JobRoles: lineItem

            };
            FunObj = JSON.stringify({ 'model': FunObj });
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                url: '/Settings/AddFunction',
                data: FunObj,
                success: function (response) {
                    if (response === true) {
                        location.reload();
                    } else {
                        $('#errNodeMsgInsert').text("Invalid Data");
                    }



                },
                error: function (response) {
                }
            });
        }
    });
    $('#btnFunctionUpdate').on('click', function () {

        if ($('#formUpdateFunction').parsley().validate()) {
            var lineItem = [], fun = {};
            $('#eJobRoles option:selected').each(function () {
                if ($(this).val() !== "") {
                    fun = {
                        JobRoleId: $(this).val()
                    };
                    lineItem.push(fun);
                }
            });
            var FunObj = {
                FunctionId:$('#eFunctionId').val(),
                FunctionName: $('#eFunctionName').val(),
                FunctionDesc: $('#eFunctionDesc').val(),
                FunctionCode: $('#eFunctionCode').val(),
                JobRoles: lineItem

            };
            FunObj = JSON.stringify({ 'model': FunObj });
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                url: '/Settings/UpdateFunction',
                data: FunObj,
                success: function (response) {
                    if (response === true) {
                        location.reload();
                    } else {
                        $('#errNodeMsgUpdate').text("Invalid Data");
                    }



                },
                error: function (response) {
                }
            });
        }
    });
    $('#FunctionCode').on('change', function () {
        var dcode = this.value;

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'GET',
            url: '/Node/CheckFunctionCode',
            data: {
                code: dcode
            },
            success: function (data) {
                if (data === false) {
                    $('#FunctionCode').val("");
                    $('#FunctionCodemsg').text("This Code Already Exits");

                    return false;
                }
                else {
                    $('#FunctionCodemsg').text("");
                }
            },
            error: function (response) {
            }
        });
    });
    $('#eFunctionCode').on('change', function () {
        var dcode = this.value;
        var fixedcode = $('#FixedCode').val();
        if (dcode !== fixedcode) {
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'GET',
                url: '/Node/CheckFunctionCode',
                data: {
                    code: dcode
                },
                success: function (data) {
                    if (data === false) {
                        $('#eFunctionCode').val("");
                        $('#eFunctionCodemsg').text("This Code Already Exits");
                        return false;
                    } else {
                        $('#eFunctionCodemsg').text("");
                    }
                },
                error: function (response) {
                }
            });
        } else {
            $('#eFunctionCodemsg').text("");
        }
    });
});

function editFunction(id) {
   
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'GET',
        url: '/Settings/UpdateFunction',
        data: {
            fid: id
        },
        success: function (data) {
            if (data !== null) {
                $('#eFunctionId').val(id);
                $('#eFunctionName').val(data.FunctionName);
                $('#eFunctionDesc').val(data.FunctionDesc);
                $('#eFunctionCode').val(data.FunctionCode);
                $('#FixedCode').val(data.FunctionCode);
                var options = [];
                $.each(data.JobRoles, function (index, value) {
                    options.push(value.JobRoleId);
                });
                $('#eJobRoles').val(options).trigger('change');
                $('#UpdateFunctionModal').modal('show');
            }
        },
        error: function (response) {
        }
    });
  
}
function deleteFunction(id, name) {
    $('#lblDeleteTitle').text(name);
    $('#deleteModal').modal('show');
    $('#dyes').click(function (event) {
        if ($('#formDeleteModal').parsley().validate()) {
            var msg = $('#ReasonMsg').val();
            deleteFunctionMethod(id, msg);
        }
    });
    $('#dno').click(function (event) {
        location.reload();
    });
}
function deleteFunctionMethod(aid, msg) {
    var obj = {
        Id: aid,
        ReasonMsg: msg
    };
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: "POST",
        url: "/Settings/DeleteFunction",
        data: JSON.stringify(obj),
        success: function (data) {
            location.reload();
        },
        error: function () {

        }
    });
}

function GetRoledetailsbyfunction(funcitonid) {
    var obj = {
        FunctionId: funcitonid
    };
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: "POST",
        url: "/Settings/GetRoledetailsbyfunction",
        data: JSON.stringify(obj),
        success: function (data) {
            $("#tbl_roledetailsbyfunction tbody tr").remove(); 
            var strcon = "";
            $.each(data, function (i, obj) {
                //use obj.id and obj.name here, for example:
                strcon = strcon + "<tr><td>" + obj.RoleID + "</td><td>" + obj.RoleName +"</td></tr>"; 
            });
            $("#tbl_roledetailsbyfunction tbody").append(strcon);
            $("#divRolepopup").modal('show');
        },
        error: function () {

        }
    });
}

function GetCompetencydetailsbyfunction(funcitonid) {
    var obj = {
        FunctionId: funcitonid
    };
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: "POST",
        url: "/Settings/GetCompetencydetailsbyfunction",
        data: JSON.stringify(obj),
        success: function (data) {
            $("#tbl_Competencydetailsbyfunction tbody tr").remove();
            var strcon = "";
            $.each(data, function (i, obj) {
                //use obj.id and obj.name here, for example:
                strcon = strcon + "<tr><td>" + obj.CompetencyCode + "</td><td>" + obj.CompetencyName + "</td></tr>";
            });
            $("#tbl_Competencydetailsbyfunction tbody").append(strcon);
            $("#divRolepopup").modal('show');
        },
        error: function () {

        }
    });
}