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

$('#txtunits').on('change', function () {
    var unitid = $("#txtunits").val();
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'GET',
        url: '/User/getDepartmentdetails',
        data: {
            UnitId: unitid
        },
        success: function (response) {
            var len = response.length;

            $("#ddlDepartment").empty();
            $("#ddlDepartment").append("<option  selected disabled>Select Department</option>");
            for (var i = 0; i < len; i++) {
                var id = response[i]['NodeId'];
                var name = response[i]['NodeName'];

                $("#ddlDepartment").append("<option value='" + id + "'>" + name + "</option>");

            }



        },
        error: function (response) {
        }
    });
});
$('#txtusercode').on('change', function () {
    var dcode = this.value;

    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'GET',
        url: '/User/CheckUserCode',
        data: {
            code: dcode
        },
        success: function (data) {
            if (data === false) {
                $('#txtusercode').val("");
                $('#txtusercodemsg').text("This Code Already Exits");

                return false;
            }
            else {
                $('#txtusercodemsg').text("");
            }
        },
        error: function (response) {
        }
    });
});
function Unitdepartmentchange(uid, did) {
    var unitid = $("#txtunits").val();
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'GET',
        url: '/User/getDepartmentdetails',
        data: {
            UnitId: unitid
        },
        success: function (response) {
            var len = response.length;

            $("#ddlDepartment").empty();
            $("#ddlDepartment").append("<option  selected disabled>Select Department</option>");
            for (var i = 0; i < len; i++) {
                var id = response[i]['NodeId'];
                var name = response[i]['NodeName'];
                if (did === id) {
                    $("#ddlDepartment").append("<option value='" + id + "' selected>" + name + "</option>");
                } else {
                    $("#ddlDepartment").append("<option value='" + id + "'>" + name + "</option>");
                }

            }


        },
        error: function (response) {
        }
    });
}

function Dosubmit() {
    if ($("#Adduserdetails").parsley().validate()) {
        var FirstName = $("#txtfirstname").val();
        var LastName = $("#txtlastname").val();
        var UserCode = $("#txtusercode").val();

        //var BloodGroup = $("#txtbloodgroup").val();
        //var Dob = $("#txtDob").val();
        //var Doj = $("#txtDoj").val();
        var MobileNo = $("#txtphone").val();
        var ClientConfigurationId = $("#txtunits option:selected").val();
        var DepartmentId = $("#ddlDepartment option:selected").val();
        var EmployeeTypeid = $("#ddlEmployeeType option:selected").val();
        var Designation = $("#txtdesignation").val();
        var Email = $("#txtEmailaddress").val();
        //var CountryId = $("#CountryId option:selected").val();
        //var StateId = $("#StateId option:selected").val();
        //var Address = $("#txtaddress").val();
        //var PostalCode = $("#txtpostalcode").val();

        var Userrolemappingarray = [];
        var Roleusermapping = {};
        $("#ddlrole option:selected").map(function (i, el) {

            Roleusermapping = {
                JobRoleId: $(el).val()
            };
            Userrolemappingarray.push(Roleusermapping);
        });

        var UnitObj = {
            "FirstName": FirstName,
            "LastName": LastName,
            "UserCode": UserCode,
            //"BloodGroup": BloodGroup,
            "UserTypeId": EmployeeTypeid,
            //"Dob": Dob,
            //"Doj": Doj,
            "ClientConfigurationId": ClientConfigurationId,
            "DepartmentId": DepartmentId,
            "Designation": Designation,
            "Email": Email,
            "MobileNo": MobileNo,
            "UserName": Email,
            //"CountryId": CountryId,
            //"StateId": StateId,
            //"Address": Address,
            //"PostalCode": PostalCode,
            "UserRoleMapping": Userrolemappingarray

        }
        UnitObj = JSON.stringify({ 'model': UnitObj });
        $.ajax({
            url: "/User/UserDetails",
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: UnitObj,
            success: function (data) {
                if (data === true) {

                    location.reload();

                }
            }
        });
    }

}

function Dosubmit_Update() {
    if ($("#hdn_UID").val() != "") {
        if ($("#Adduserdetails").parsley().validate()) {
            var FirstName = $("#txtfirstname").val();
            var LastName = $("#txtlastname").val();
            var UserCode = $("#txtusercode").val();

            //var BloodGroup = $("#txtbloodgroup").val();
            //var Dob = $("#txtDob").val();
            //var Doj = $("#txtDoj").val();
            var MobileNo = $("#txtphone").val();
            var ClientConfigurationId = $("#txtunits option:selected").val();
            var DepartmentId = $("#ddlDepartment option:selected").val();
            var EmployeeTypeid = $("#ddlEmployeeType option:selected").val();
            var Designation = $("#txtdesignation").val();
            var Email = $("#txtEmailaddress").val();
            //var CountryId = $("#CountryId option:selected").val();
            //var StateId = $("#StateId option:selected").val();
            //var Address = $("#txtaddress").val();
            //var PostalCode = $("#txtpostalcode").val();

            var Userrolemappingarray = [];
            var Roleusermapping = {};
            $("#ddlrole option:selected").map(function (i, el) {

                Roleusermapping = {
                    JobRoleId: $(el).val()
                };
                Userrolemappingarray.push(Roleusermapping);
            });

            var UnitObj = {
                "UserId": $("#hdn_UID").val(),
                "FirstName": FirstName,
                "LastName": LastName,
                "UserCode": UserCode,
                //"BloodGroup": null,
                "UserTypeId": EmployeeTypeid,
                "ClientConfigurationId": ClientConfigurationId,
                "DepartmentId": DepartmentId,
                "Designation": Designation,
                "Email": Email,
                "MobileNo": MobileNo,
                "UserName": Email,
                "UserRoleMapping": Userrolemappingarray

            };
            UnitObj = JSON.stringify({ 'model': UnitObj });
            $.ajax({
                url: "/User/UserDetailsUpdate",
                type: "POST",
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                data: UnitObj,
                success: function (data) {
                    if (data === true) {

                        location.reload();

                    }
                }
            });
        }
    }
  

}

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


function LoadStatesByCountryId(cid, sid) {

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

            $("#StateId").empty();
            for (var i = 0; i < len; i++) {
                var id = response[i]['StateId'];
                var name = response[i]['StateName'];

                if (parseInt(sid) === parseInt(id)) {
                    $("#StateId").append("<option value='" + id + "' selected>" + name + "</option>");
                } else {
                    $("#StateId").append("<option value='" + id + "'>" + name + "</option>");
                }
            }



        },
        error: function (response) {
        }
    });
}

function EditUserModal(Userid) {
    ClearUserFormModal();   
    getUserdeatils(Userid);
    return false;
}
function AddUserModal() {
    ClearUserFormModal();
    $("#AddUserModal").modal('show');
  
}
function LoadUserRoleDetails(id,code,name) {
    $("#empid").text(code);
    $("#empname").text(name);
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'GET',
        url: '/User/GetUserRoleDetails',
        data: {
            UserId:id
        },
        async: true,
        success: function (response) {
            $('#LevelUpdateDV').html("");

            var len = response.length;
         
            
            for (var i = 0; i < len; i++) {
                var index = i + 1;
                var tblrole = "role" + index;
                var html = '';
                var role = '<div class="alert alert-solid alert-primary mg-b-0" role="alert"><b>Role Name :  </b>' + response[i]['RoleName'] + '-(' + response[i]['RoleID'] + ')</div>';
                var compCount = response[i]['Competency'].length;
                html += '<table class="tblrole table table-dark table-hover table-striped mg-t-0"><thead><tr>' + role+'</tr>';
                html += '<tr><th>Competeny</th><th>Desired Level</th><th>Actual Level</th>';
                html += '</tr></thead><body>';
                var ddlhtml = $("#compLevel").html();
                for (var j = 0; j < compCount; j++) {
                 
               
                    html += '<tr>';
                    html += '<td>' + response[i]['Competency'][j]['CompetencyName'] + '</td>';                 
                    html += '<td class="text-center"><span class="badge badge-primary" style=font-size:13px;>' + response[i]['Competency'][j]['CompetencyLevelName'] + '</span></td>';
                    html += '<td><select class="al_tblrole form-control">' + ddlhtml + '</select></td>';
                    html += '</tr>';
                }
                $('#LevelUpdateDV').prepend(html);
                //var ddl = $("#myselect").clone();
                //$("td.elevel").append(ddl);
                //$("td.alevel").append(ddl);
            }
        
            $('#UserLevelUpdateModal').modal('show');
        },
        error: function (response) {
        }
    });
}


function getUserdeatils(Userid) {
    UnitObj = JSON.stringify({ 'UserId': Userid });
    $("#hdn_UID").val(Userid);
    $("#btnsubmit").hide();
    $("#btnsubmit_Update").show();
    $.ajax({
        url: "/User/GetUserdetailsByID",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: UnitObj,
        async: true,
        success: function (data) {
            $("#txtunits").val(data.ClientConfigurationId);
            
            $("#txtfirstname").val(data.FirstName);
            $("#txtlastname").val(data.LastName);
            $("#txtusercode").val(data.UserCode);
            $("#ddlEmployeeType").val(data.UserTypeId);
            //$("#txtbloodgroup").val(data.BloodGroup);
            //$("#txtDob").val(getdateformat(new Date(parseInt(data.Dob.substr(6)))));
            //$("#txtDoj").val(getdateformat(new Date(parseInt(data.Doj.substr(6)))));


            $("#txtdesignation").val(data.Designation);
            $("#txtEmailaddress").val(data.Email);
            $("#txtphone").val(data.MobileNo);
            //$("#CountryId").val(data.CountryId);
            //LoadStatesByCountryId(data.CountryId, data.StateId);
     
            //$("#txtaddress").val(data.Address);
            //$("#txtpostalcode").val(data.PostalCode);
            var rolearray = [];
            $.each(data.UserRoleMapping, function (index, value) {

                rolearray.push(this.JobRoleId);
            });
            $('#ddlrole').val(rolearray).change();

            Unitdepartmentchange(data.ClientConfigurationId, data.DepartmentId);
            $("#AddUserModal").modal('show');
        }
    });
}


function getdateformat(obj) {
    var date = new Date(obj);
   var finaldate = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear();
    return finaldate;
}

function ClearUserFormModal() {
   $("#txtfirstname").val("");
$("#txtlastname").val("");
 $("#txtusercode").val("");
$("#txtphone").val("");
    $("#ddlEmployeeType").val("");
    $("#ddlrole").val("").change();    
 $("#txtunits").val("");
 $("#ddlDepartment").val("");
$("#txtdesignation").val("");
$("#txtEmailaddress").val("");
//$("#CountryId").val("");
//$("#StateId").val("");
//$("#txtaddress").val("");
//$("#txtpostalcode").val("");
}
function deleteUser(id, name) {
    $('#lblDeleteTitle').text(name);
    $('#deleteModal').modal('show');
    $('#dyes').click(function (event) {

        if ($('#formDeleteModal').parsley().validate()) {
            var msg = $('#ReasonMsg').val();
            deleteUserMethod(id, msg);
        }
    });
    $('#dno').click(function (event) {
        location.reload();
    });
}

function deleteUserMethod(aid, msg) {
    var obj = {
        Id: aid,
        ReasonMsg: msg
    };
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: "POST",
        url: "/User/DeleteUserDetail",
        data: JSON.stringify(obj),
        success: function (data) {
            location.reload();
        },
        error: function () {

        }
    });
}