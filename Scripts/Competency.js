$(document).ready(function () {

    //Category
    $('#btnCompCategoryInsert').on('click', function () {

        if ($('#formAddCompCategory').parsley().validate()) {
        
            var CatObj = {
                CategoryName: $('#CategoryName').val(),
                CategoryDesc: $('#CategoryDesc').val()
            };
            CatObj = JSON.stringify({ 'model': CatObj });
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                url: '/Competency/AddCompCategory',
                data: CatObj,
                success: function (response) {
                    if (response === true) {
                        location.reload();
                    } else {
                        $('#errCompCategoryMsgInsert').text("Invalid Data");
                    }



                },
                error: function (response) {
                }
            });
        }
    });
    $('#btnCompCategoryUpdate').on('click', function () {
    
        if ($('#formUpdateCompCategory').parsley().validate()) {
            var CatObj = {
                CategoryId: $('#eCategoryId').val(),
                CategoryName: $('#eCategoryName').val(),
                CategoryDesc: $('#eCategoryDesc').val()
            };
            CatObj = JSON.stringify({ 'model': CatObj });
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                url: '/Competency/UpdateCompCategory',
                data: CatObj,
                success: function (response) {
                    if (response === true) {
                        location.reload();
                    } else {
                        $('#errCompCategoryMsgUpdate').text("Invalid Data");
                    }



                },
                error: function (response) {
                }
            });
        }
    });

    //Level
    $('#btnCompLevelInsert').on('click', function () {

        if ($('#formAddCompLevel').parsley().validate()) {
            var CatObj = {
                LevelName: $('#LevelName').val(),
                LevelDesc: $('#LevelDesc').val()
            };
            CatObj = JSON.stringify({ 'model': CatObj });
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                url: '/Competency/AddCompLevel',
                data: CatObj,
                success: function (response) {
                    if (response === true) {
                        location.reload();
                    } else {
                        $('#errCompLevelMsgInsert').text("Invalid Data");
                    }



                },
                error: function (response) {
                }
            });
        }
    });
    $('#btnCompLevelUpdate').on('click', function () {

        if ($('#formUpdateCompLevel').parsley().validate()) {
            var CatObj = {
                CompetencyLevelId: $('#eCompetencyLevelId').val(),
                LevelName: $('#eLevelName').val(),
                LevelDesc: $('#eLevelDesc').val()
            };
            CatObj = JSON.stringify({ 'model': CatObj });
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                url: '/Competency/UpdateCompLevel',
                data: CatObj,
                success: function (response) {
                    if (response === true) {
                        location.reload();
                    } else {
                        $('#errCompLevelMsgUpdate').text("Invalid Data");
                    }



                },
                error: function (response) {
                }
            });
        }
    });

    //Competency
    $('#btnCompetencyInsert').on('click', function () {
       
        if ($('#formAddCompetency').parsley().validate()) {
            var lineItem = [], desc = {};

            $('#tblCompLevelDesc tbody tr').each(function (i, element) {
                var html = $(this).html();

                if (html !== '' && html !== null) {
                    desc = {
                        CompetencyLevelId: $(this).find('.levelId').val(),
                        LevelDesc: $(this).find('.levelDesc').val()
                    };
                    lineItem.push(desc);
       
                }
            });



            var CatObj = {
                CompetencyName: $('#CompetencyName').val(),
                CompetencyDesc: $('#CompetencyDesc').val(),
                CompetencyCode: $('#CompetencyCode').val(),
                CompCategoryId: $('#CompCategoryId').val(),
                LevelDesc: lineItem
            };
            CatObj = JSON.stringify({ 'model': CatObj });
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                url: '/Competency/AddCompetency',
                data: CatObj,
                success: function (response) {
                    if (response === true) {
                        location.reload();
                    } else {
                        $('#errCompetencyMsgInsert').text("Invalid Data");
                    }



                },
                error: function (response) {
                }
            });
        }
    });
    $('#btnCompetencyUpdate').on('click', function () {

        if ($('#formUpdateCompetency').parsley().validate()) {
            var lineItem = [], desc = {};

            $('#etblCompLevelDesc tbody tr').each(function (i, element) {
                var html = $(this).html();

                if (html !== '' && html !== null) {
                    desc = {
                        CompetencyLevelId: $(this).find('.levelId').val(),
                        LevelDesc: $(this).find('.levelDesc').val()
                    };
                    lineItem.push(desc);

                }
            });

        

            var CatObj = {
                CompetencyId: $('#eCompetencyId').val(),
                CompetencyName: $('#eCompetencyName').val(),
                CompetencyDesc: $('#eCompetencyDesc').val(),
                CompetencyCode: $('#eCompetencyCode').val(),
                CompCategoryId: $('#eCompCategoryId').val(),
                LevelDesc: lineItem
            };
            CatObj = JSON.stringify({ 'model': CatObj });
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                url: '/Competency/UpdateCompetency',
                data: CatObj,
                success: function (response) {
                    if (response === true) {
                        location.reload();
                    } else {
                        $('#errCompetencyMsgUpdate').text("Invalid Data");
                    }



                },
                error: function (response) {
                }
            });
        }
    });
});
function editCompCategory(id) {
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'GET',
        url: '/Competency/UpdateCompCategory',
        data: {
            cid: id
        },
        success: function (data) {
            if (data !== null) {
                $('#eCategoryId').val(id);
                $('#eCategoryName').val(data.CategoryName);
                $('#eCategoryDesc').val(data.CategoryDesc);

                $('#updateCompCategoryModal').modal('show');
            }
        },
        error: function (response) {
        }
    });
}
function editCompLevel(id) {
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'GET',
        url: '/Competency/UpdateCompLevel',
        data: {
            cid: id
        },
        success: function (data) {
            if (data !== null) {
                $('#eCompetencyLevelId').val(id);
                $('#eLevelName').val(data.LevelName);
                $('#eLevelDesc').val(data.LevelDesc);
                $('#updateCompLevelModal').modal('show');
            }
        },
        error: function (response) {
        }
    });
}

function editCompetency(id) {
    $('#etblCompLevelDesc tbody tr').each(function (i, element) {
        var html = $(this).html();

        if (html !== '' && html !== null) {
            $(this).find('.levelDesc').val("");
          
        }
    });
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'GET',
        url: '/Competency/UpdateCompetency',
        data: {
            cid: id
        },
        success: function (data) {
            if (data !== null) {
                $('#eCompetencyId').val(id);       
                $('#eCompetencyName').val(data.CompetencyName);
                $('#eCompetencyDesc').val(data.CompetencyDesc);
                $('#eCompetencyCode').val(data.CompetencyCode);
                $('#eCompCategoryId').val(data.CompCategoryId);
                $.each(data.LevelDesc, function (index, value) {
                    $('#' + value.CompetencyLevelId).val(value.LevelDesc);

                });
                $('#updateCompetencyModal').modal('show');
            }
        },
        error: function (response) {
        }
    });
}
function deleteCompetency(id, name) {
    $('#lblDeleteTitle').text(name);
    $('#deleteModal').modal('show');
    $('#dyes').click(function (event) {
        if ($('#formDeleteModal').parsley().validate()) {
            var msg = $('#ReasonMsg').val();
            deleteCompetencyMethod(id, msg);
        }
    });
    $('#dno').click(function (event) {
        location.reload();
    });
}
function deleteCompCategory(id, name) {
    $('#lblDeleteTitle').text(name);
    $('#deleteModal').modal('show');
    $('#dyes').click(function (event) {
        if ($('#formDeleteModal').parsley().validate()) {
            var msg = $('#ReasonMsg').val();
            deleteCompCategoryMethod(id, msg);
        }
    });
    $('#dno').click(function (event) {
        location.reload();
    });
}
function deleteCompetencyLevel(id, name) {
    $('#lblDeleteTitle').text(name);
    $('#deleteModal').modal('show');
    $('#dyes').click(function (event) {
        if ($('#formDeleteModal').parsley().validate()) {
            var msg = $('#ReasonMsg').val();
            deleteCompetencyLevelMethod(id, msg);
        }
    });
    $('#dno').click(function (event) {
        location.reload();
    });
}

function deleteCompetencyMethod(aid, msg) {
    var obj = {
        Id: aid,
        ReasonMsg: msg
    };
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: "POST",
        url: "/Competency/DeleteCompetency",
        data: JSON.stringify(obj),
        success: function (data) {
            location.reload();
        },
        error: function () {
          
        }
    });
}
function deleteCompCategoryMethod(aid, msg) {
    var obj = {
        Id: aid,
        ReasonMsg: msg
    };
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: "POST",
        url: "/Competency/DeleteCompCategory",
        data: JSON.stringify(obj),
        success: function (data) {
            location.reload();
        },
        error: function () {

        }
    });
}
function deleteCompetencyLevelMethod(aid, msg) {
    var obj = {
        Id: aid,
        ReasonMsg: msg
    };
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: "POST",
        url: "/Competency/DeleteCompetencyLevel",
        data: JSON.stringify(obj),
        success: function (data) {
            location.reload();
        },
        error: function () {
            
        }
    });
  
}
function showLevels(id, name) {
    $('#competencyTitle').text(name);
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'GET',
        url: '/Competency/GetLevelDetailsByCompetencyId',
        data: {
            CompetencyId: id
        },
        success: function (response) {

            $('#tblShowLevels tbody').html("");

            var len = response.length;
            for (var i = 0; i < len; i++) {
                var html = '<tr>';
                html += '<td>' + response[i].LevelName + '</td>';
                html += '<td>' + response[i].LevelDesc + '</td>';
                html += '<td><span class="btn btn-dark">1</span></td></tr>';
                $('#tblShowLevels').prepend(html);              
            }
            $('#showCompLevelsModal').modal('show');
        },
        error: function (response) {
        }
    });
}