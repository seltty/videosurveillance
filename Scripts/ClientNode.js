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
                FunctionCode: "",
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
                        $('#FunctionName').val("");
                        $('#FunctionDesc').val("");
                        $('#sucessNodeMsgInsert').text("Successfully Function Created");
                        LoadAllFunctions();                      
                        $('#AddFunctionModal').modal('hide');
                    } else {
                        $('#errNodeMsgInsert').text("Invalid Data");
                    }



                },
                error: function (response) {
                }
            });
        }
    });
    $('#btnUnitInsert').on('click', function () {

        if ($('#AddUnit').parsley().validate()) {
          
            var UnitObj = {
                ParentId: $('#ParentId').val(),
                NodeName: $('#NodeName').val(),
               // NodeDesc: $('#NodeDesc').val(),
                IndustryTypeId: $('#IndustryTypeId').val(),
                Email: $('#Email').val(),
                PhoneNo: $('#PhoneNo').val(),
                CountryId: parseInt($('#CountryId').val()),
                StateId: parseInt($('#StateId').val()),
                City: $('#City').val(),
                PostalCode: $('#PostalCode').val(),
                Address: $('#Address').val()
               
            };
            UnitObj = JSON.stringify({ 'model': UnitObj });
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                url: '/Node/AddUnit',
                data: UnitObj,
                success: function (response) {
                    if (response === true) {
                        location.reload();
                    } else {
                        $('#errUnitMsgInsert').text("Invalid Data");
                    }
                    
                  

                },
                error: function (response) {
                }
            });
        }
    });
    $('#btnUnitUpdate').on('click', function () {

        if ($('#UpdateUnit').parsley().validate()) {

            var UnitObj = {
                NodeId:$('#eNodeId').val(),
                ParentId: $('#eParentId').val(),
                NodeName: $('#eNodeName').val(),
               // NodeDesc: $('#eNodeDesc').val(),
                IndustryTypeId: $('#eIndustryTypeId').val(),
                Email: $('#eEmail').val(),
                PhoneNo: $('#ePhoneNo').val(),
                CountryId: parseInt($('#eCountryId').val()),
                StateId: parseInt($('#eStateId').val()),
                City: $('#eCity').val(),
                PostalCode: $('#ePostalCode').val(),
                Address: $('#eAddress').val()

            };
            UnitObj = JSON.stringify({ 'model': UnitObj });
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                url: '/Node/UpdateUnit',
                data: UnitObj,
                success: function (response) {
                    if (response === true) {
                        location.reload();
                    } else {
                        $('#errUnitMsgUpdate').text("Invalid Data");
                    }



                },
                error: function (response) {
                }
            });
        }
    });
    
    $('#btnDeparmentInsert').on('click', function () {

        if ($('#formAddDepartment').parsley().validate()) {
            var lineItem = [], fun={ };
            //$('#Functions option:selected').each(function () {
            //    if ($(this).val() !== "") {
            //    fun = {
            //        FunctionId: $(this).val()
            //    };
            //    lineItem.push(fun);
            //    }
            //});
            var NodeObj = {
                ParentId: $('#ParentId').val(),
                NodeName: $('#NodeName').val(),
                NodeCode: $('#NodeCode').val(),
                ContactPerson: $('#ContactPerson').val(),
                Email: $('#Email').val(),
                //Functions: lineItem

            };
            NodeObj = JSON.stringify({ 'model': NodeObj });
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                url: '/Node/AddDepartment',
                data: NodeObj,
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
    $('#btnDeparmentUpdate').on('click', function () {

        if ($('#formUpdateDepartment').parsley().validate()) {
            var lineItem = [], fun = {};
            //$('#eFunctions option:selected').each(function () {
            //    if ($(this).val() !== "") {
            //        fun = {
            //            FunctionId: $(this).val()
            //        };
            //        lineItem.push(fun);
            //    }
            //});
            var NodeObj = {
                NodeId: $('#eNodeId').val(),
                ParentId: $('#eParentId').val(),
                NodeName: $('#eNodeName').val(),
                NodeCode: $('#eNodeCode').val(),
                ContactPerson: $('#eContactPerson').val(),
                Email: $('#eEmail').val(),
                //Functions: lineItem

            };
            NodeObj = JSON.stringify({ 'model': NodeObj });
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                url: '/Node/UpdateDepartment',
                data: NodeObj,
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

    $('#CountryId').on('change', function () {
        
      
        var cid = parseInt($(this).val());
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'GET',
            url: '/Settings/GetStatesByCountryId',
            data: {
                CountryId: cid
            },
            success: function (response) {
                var len = response.length;

                $("#StateId").empty();
                for (var i = 0; i < len; i++) {
                    var id = response[i]['StateId'];
                    var name = response[i]['StateName'];

                    $("#StateId").append("<option value='" + id + "'>" + name + "</option>");

                }



            },
            error: function (response) {
            }
        });
    });
    $('#eCountryId').on('change', function () {


        var cid = parseInt($(this).val());
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'GET',
            url: '/Settings/GetStatesByCountryId',
            data: {
                CountryId: cid
            },
            success: function (response) {
                var len = response.length;

                $("#eStateId").empty();
                for (var i = 0; i < len; i++) {
                    var id = response[i]['StateId'];
                    var name = response[i]['StateName'];

                    $("#eStateId").append("<option value='" + id + "'>" + name + "</option>");

                }



            },
            error: function (response) {
            }
        });
    });
    $('#NodeCode').on('change', function () {
        var dcode = this.value;
   
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'GET',
            url: '/Node/CheckNodeCode',
            data: {
                code: dcode
            },
            success: function (data) {
                if (data === false) {
                    $('#NodeCode').val("");
                    $('#NodeCodemsg').text("This Code Already Exits");

                    return false;
                }
                else {
                    $('#NodeCodemsg').text("");
                }
            },
            error: function (response) {
            }
        });
    });
    $('#eNodeCode').on('change', function () {
        var dcode = this.value;
        var fixedcode = $('#FixedCode').val();
        if (dcode !== fixedcode) {
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'GET',
                url: '/Node/CheckNodeCode',
                data: {
                    code: dcode
                },
                success: function (data) {
                    if (data === false) {
                        $('#eNodeCode').val("");
                        $('#eNodeCodemsg').text("This Code Already Exits");
                        return false;
                    } else {
                        $('#eNodeCodemsg').text("");
                    }
                },
                error: function (response) {
                }
            });
        } else {
            $('#eNodeCodemsg').text("");
        }
    });
});
function editUnit(id) {

    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'GET',
        url: '/Node/UpdateUnit',
        data: {
            uid:id
        },
        success: function (data) {
            if (data !== null) {
                $('#eNodeId').val(id);
                $('#eNodeName').val(data.NodeName);
               // $('#eNodeDesc').val(data.NodeDesc);
                $('#eIndustryTypeId').val(data.IndustryTypeId);              
                $('#eEmail').val(data.ContactEmail);
                $('#ePhoneNo').val(data.ContactPhone);
                $('#eCountryId').val(data.CountryId);
                LoadStatesByCountryId(data.CountryId, data.StateId);
                //$('#eStateId').val(data.StateId);
                $('#eCity').val(data.City);
                $('#ePostalCode').val(data.PostalCode);
                $('#eAddress').val(data.Address);
            $('#UpdateUnitModal').modal('show');
            }
        },
        error: function (response) {
        }
    });

}
function editDepartment(id) {
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'GET',
        url: '/Node/UpdateDepartment',
        data: {
            uid: id
        },
        success: function (data) {
           
            if (data !== null) {
                $('#eNodeId').val(id);
                $('#eNodeName').val(data.NodeName);
                $('#eNodeCode').val(data.NodeCode);
                $('#FixedCode').val(data.NodeCode);
                $('#eContactPerson').val(data.ContactPerson);
                $('#eEmail').val(data.ContactEmail);
                //var options = [];
                //$.each(data.Functions, function (index, value) {                  
                //    options.push(value.FunctionId);
                //});
                //$('#eFunctions').val(options).trigger('change');
                $('#UpdateDepartmentModal').modal('show');
            }
        },
        error: function (response) {
        }
    });

}

function LoadStatesByCountryId(cid,sid) {

    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'GET',
        url: '/Settings/GetStatesByCountryId',
        data: {
            CountryId: parseInt(cid)
        },
        success: function (response) {
            var len = response.length;

            $("#eStateId").empty();
            for (var i = 0; i < len; i++) {
                var id = response[i]['StateId'];
                var name = response[i]['StateName'];
               
                if (parseInt(sid) === parseInt(id)) {
                    $("#eStateId").append("<option value='" + id + "' selected>" + name + "</option>");
                } else {
                    $("#eStateId").append("<option value='" + id + "'>" + name + "</option>");
                }
            }



        },
        error: function (response) {
        }
    });
}

function showDepts(id, nodeName) {
    $('#nodeTitle').text(nodeName);
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'GET',
        url: '/Node/GetDepartments',
        data: {
            Nid: id
        },
        success: function (response) {

            $('#tblShowDepts tbody').html("");
              
                var len = response.length;
            for (var i = 0; i < len; i++) {
                var html = '<tr>';
                html += '<td>' + response[i].NodeName + '</td>';
                html += '<td>' + response[i].NodeCode + '</td></tr>';
                $('#tblShowDepts').prepend(html);
                $('#deptListModal').modal('show');
            }
        },
        error: function (response) {
        }
    });
    
}
function showFunctions(id, nodeName) {
    $('#nodeTitle').text(nodeName);
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'GET',
        url: '/Node/GetFunctionsByNodeId',
        data: {
            Nid: id
        },
        success: function (response) {

            $('#tblShowFunctions tbody').html("");
       
            var len = response.length;
            for (var i = 0; i < len; i++) {
                var html = '<tr>';
                html += '<td>' + response[i].FunctionName + '</td>';
                html += '<td>' + response[i].FunctionCode + '</td></tr>';
                $('#tblShowFunctions').prepend(html);
                $('#functionListModal').modal('show');
            }
        },
        error: function (response) {
        }
    });
}
function LoadAllFunctions() {
    alert("Test");
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'GET',
        url: '/Node/GetAllFunctions',
        data: {},
        async: true,
        success: function (response) {
            var len = response.length;

            $(".selectfun").empty();
            for (var i = 0; i < len; i++) {
                var id = response[i].FunctionId;
                var name = response[i].FunctionName;

                $(".selectfun").append("<option value='" + id + "'>" + name + "</option>");

            }
           
        },
        error: function (response) {
        }
    });
}
function selectFunctionsModal(id) {
    LoadRemainingFunctionsByNodeId(id);
   
}
function LoadFunctionsByNodeId(id) {
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'GET',
        url: '/Node/GetFunctionsByNodeId',     
        data: {
            Nid: id
        },
        async: false,
        success: function (response) {
           
         
            var len = response.length;
            $("#dfunCount").text(len);
            if (len > 0) {
                $("#divSpinner").show();

                $('#tblFunctions tbody').html("");
           
            for (var i = 0; i < len; i++) {
                var html = '<tr>';
                html += '<td>' + response[i].FunctionName + '</td>';
                html += '<td class="text-center"><a class="btn btn-dark">' + response[i].RoleCount + '</a></td>';
                html += '<td class="text-center"><a class="btn btn-dark">' + response[i].CompetencyCount + '</a></td>';

                var parsedDate = new Date(parseInt(response[i].UpdatedDate.substr(6)));
                var jsDate = new Date(parsedDate); //Date object
                var month = parseInt(jsDate.getMonth()) + 1;
                html += '<td >' + jsDate.getDate() + ' / ' + month + ' / ' + jsDate.getFullYear() + '</td>';
                html += '<td class="text-center"><a style="cursor: pointer;" onclick="removeFunctionFromNode(\''+ response[i].FunctionId + '\',\'' + response[i].FunctionName + '\',\'' + id + '\')"><span data-feather="trash" width="20"></span></a></td></tr>';
                $('#tblFunctions').prepend(html);
             
                }
                feather.replace();
              
                $("#divSpinner").hide();
            }
        
        },
        error: function (response) {
        }
    });
}
function LoadRemainingFunctionsByNodeId(id) {
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'GET',
        url: '/Settings/GetRemainingFunctionsByNodeId',
        data: {
            id: id
        },
        async: true,
        success: function (response) {
            $("#divSpinner").show();
            $('#tblRemainingFunctions tbody').html("");

            var len = response.length;
            $("#dfunCount").text(len);
            for (var i = 0; i < len; i++) {
                var html = '<tr>';
                var nameCheckbox = '<div class="custom-control custom-checkbox"><input class="custom-control-input" type = "checkbox" name = "FunctionId[]" value = "' + response[i].FunctionId + '" data-parsley-multiple="browser" id = "' + response[i].FunctionId + '"><label class="custom-control-label" for="' + response[i].FunctionId + '">' + response[i].FunctionName + '</label></div>';
                html += '<td>' + nameCheckbox + '</td></tr>';
                $('#tblRemainingFunctions').prepend(html);
                

            }
            $('#SelectFunctionModal').modal('show');
            $("#divSpinner").hide();
        },
        error: function (response) {
        }
    });
}
function removeFunctionFromNode(id, name, nodeid) {
    $('#lblDeleteTitle').text(name);
$('#deleteModal').modal('show');
    $('#dyes').click(function (event) {

        if ($('#formDeleteModal').parsley().validate()) {
            var msg = $('#ReasonMsg').val();
            removeFunctionFromNodeMethod(id, msg, nodeid);
        }
    });
    $('#dno').click(function (event) {
        LoadFunctionsByNodeId(nodeid);
        $('#deleteModal').modal('hide');
    });
}
function removeFunctionFromNodeMethod(aid, msg, nodeid) {
    var obj = {
        FunctionId: aid,
        ReasonMsg: msg,
        NodeId: nodeid
    };
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: "POST",
        url: "/Node/RemoveFunctionFromNode",
        data: JSON.stringify(obj),
        async: true,
        success: function (data) {
            LoadFunctionsByNodeId(nodeid);
            $('#deleteModal').modal('hide');
        
        },
        error: function () {

        }
    });
}
function deleteUnit(id, name) {
    $('#lblDeleteTitle').text(name);
    $('#deleteModal').modal('show');
    $('#dyes').click(function (event) {
      
        if ($('#formDeleteModal').parsley().validate()) {
            var msg = $('#ReasonMsg').val();
            deleteUnitMethod(id, msg);
        }
    });
    $('#dno').click(function (event) {
        location.reload();
    });
}
function deleteDept(id, name) {
    $('#lblDeleteTitle').text(name);
    $('#deleteModal').modal('show');
    $('#dyes').click(function (event) {
        if ($('#formDeleteModal').parsley().validate()) {
            var msg = $('#ReasonMsg').val();
            deleteDeptMethod(id, msg);
        }
    });
    $('#dno').click(function (event) {
        location.reload();
    });
}
function deleteUnitMethod(aid, msg) {
    var obj = {
        Id: aid,
        ReasonMsg: msg
    };
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: "POST",
        url: "/Node/DeleteUnit",
        data: JSON.stringify(obj),
        async: true,
        success: function (data) {
            location.reload();
        },
        error: function () {

        }
    });
}
function deleteDeptMethod(aid, msg) {
    var obj = {
        Id: aid,
        ReasonMsg: msg
    };
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: "POST",
        url: "/Node/DeleteDepartment",
        data: JSON.stringify(obj),
        async: true,
        success: function (data) {
            location.reload();
        },
        error: function () {

        }
    });
}