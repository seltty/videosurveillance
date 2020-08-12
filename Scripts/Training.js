//function AddCompetencyrows() {
//    //var conveniancecount = $("div[class*='getcomp']").length;
//    //$(".getCompdetails").attr("id", "ddlcompetency" + conveniancecount.toString());

//    //$('#ddlcompetency' + conveniancecount.toString()).removeClass('getCompdetails');
//    var ss = $('#new_div_Training').html();

//    //$('#ddlcompetency' + conveniancecount.toString()).addClass('getCompdetails');
//    $('#TextBoxContainer1').append(ss);
//}

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

$(function () {
    $('.number').keypress(function (event) {
        if ((event.which !== 46 || $(this).val().indexOf('.') !== -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });
});

function Dosubmit() {
    if ($('#formAddTraining').parsley().validate()) {
        var trainingname = $("#txtCoursename").val();
        var Coursedesc = $("#txtCoursedesc").val();
        var ddltrainingseries = $("#ddlTrainingSeries option:selected").val();
        var Trainer = $("#ddlTrainingType option:selected").val();

        var radioValue = $("input[name='customRadio']:checked").val();
        var TrainingDuration = $("#txtTrainingduration").val();
        var Courseoutline = $("#txtTrainingduration").val();

        var Competencyarray = [], Trainingmethod = []; var CompetencyMapping = {}; var TrainingMethodMapping = {};
        $('#table_Competencylevel tbody tr').each(function (i, element) {
            var html = $(this).html();

            if (html !== '' && html !== null) {
                CompetencyMapping = {
                    CompetencyId: $(this).find('.clscompetency option:selected').val(),
                    LevelId: $(this).find('.clslevels option:selected').val()
                }
                Competencyarray.push(CompetencyMapping);

            }

        });


        $("#ddlTrainingmethod option:selected").map(function (i, el) {

            TrainingMethodMapping = {
                TrainingMethodId: $(el).val()
            };
            Trainingmethod.push(TrainingMethodMapping);
        });

        var UnitObj = {
            "TrainingName": trainingname,
            "TrainingDesc": Coursedesc,
            "TrainingCategoryId": ddltrainingseries,
            "TrainingCoach": Trainer,
            "TrainingDurationType": radioValue,
            "TrainingDuration": TrainingDuration,
            "Competency": Competencyarray,
            "Methods": Trainingmethod,
            "CourseOutline": Courseoutline
        };
        UnitObj = JSON.stringify({ 'model': UnitObj });
        $.ajax({
            url: "/Training/AddTraining",
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: UnitObj,
            success: function (data) {
                if (data === true) {

                    location.href = "/Training/Trainings";

                }
            }
        });
    }
   
}


function Dosubmit_update() {
    var TrainingId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    var trainingname = $("#txtCoursename").val();
    var Coursedesc = $("#txtCoursedesc").html();
    var ddltrainingseries = $("#ddlTrainingSeries option:selected").val();
    var Trainer = $("#ddlTrainingType option:selected").val();

    var radioValue = $("input[name='customRadio']:checked").val();
    var TrainingDuration = $("#txtTrainingduration").val();
    var Courseoutline = CKEDITOR.instances['txtTrainingduration'].getData();;

    var Competencyarray = [], Trainingmethod = []; var CompetencyMapping = {}; var TrainingMethodMapping = {};
    $('#table_Competencylevel tbody tr').each(function (i, element) {
        var html = $(this).html();

        if (html !== '' && html !== null) {
            var firsttd = "";
            var $tds = $(this).find('td');
            var value_of_id = ($tds).attr('id');
            
            CompetencyMapping = {
                TrainingCompMapId: value_of_id,
                CompetencyId: $(this).find('.clscompetency option:selected').val(),
                LevelId: $(this).find('.clslevels option:selected').val()
            };
            Competencyarray.push(CompetencyMapping);

        }

    });


    $("#ddlTrainingmethod option:selected").map(function (i, el) {

        TrainingMethodMapping = {
            TrainingMethodId: $(el).val()
        };
        Trainingmethod.push(TrainingMethodMapping);
    });

    var UnitObj = {
        "TrainingName": trainingname,
        "TrainingDesc": Coursedesc,
        "TrainingCategoryId": ddltrainingseries,
        "TrainingCoach": Trainer,
        "TrainingDurationType": radioValue,
        "TrainingDuration": TrainingDuration,
        "Competency": Competencyarray,
        "Methods": Trainingmethod,
        "CourseOutline": Courseoutline
    };
    UnitObj = JSON.stringify({ 'TrainingId': TrainingId, 'model': UnitObj });
    $.ajax({
        url: "/Training/EditTrainings",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: UnitObj,
        success: function (data) {
            if (data === true) {

                location.href = "/Training/Trainings";

            }
        }
    });
}


function getTrainingmethodtype(obj) {
    if (obj != 1) {
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'GET',
            url: '/Training/GetTrainingMethodbyMethodtype',
            data: {
                MethodType: obj
            },
            success: function (response) {
                var data = [];
                for (i = 0; i < response.length; i++) {
                    data.push(response[i].TrainingMethodId)
                }
                $('#ddlTrainingmethod').select2().val(data).trigger("change");
            },
            error: function (response) {
            }
        });
    }
    else {
        $('#ddlTrainingmethod').select2().val('').trigger("change");
    }
    
}

$("input[name='tmethod']").click(function () {
    getTrainingmethodtype($(this).val());
});