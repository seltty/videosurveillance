
function Dosubmit() {
    
    if ($('#formAddTrainingCategory').parsley().validate()) {
        var TrainingCategory = $("#txtCategory").val();
        var Desc = $("#txtDescription").val();


        var UnitObj = {
            "CategoryName": TrainingCategory,
            "CategoryDesc": Desc
        }
        UnitObj = JSON.stringify({ 'model': UnitObj });
        $.ajax({
            url: "/Training/TrainingCategory",
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: UnitObj,
            success: function (data) {
                if (data === true) {

                    location.href = "/Training/TrainingCategory";

                }
            }
        });
    }

}


function DosubmitUpdate() {

    if ($('#formAddTrainingCategory').parsley().validate()) {
            Categoryid = $("#hdnTc_ID").val();
        var TrainingCategory = $("#txtCategory").val();
        var Desc = $("#txtDescription").val();


        var UnitObj = {
            "CategoryId": Categoryid,
            "CategoryName": TrainingCategory,
            "CategoryDesc": Desc
        }
        UnitObj = JSON.stringify({ 'model': UnitObj });
        $.ajax({
            url: "/Training/TrainingCategoryUpdate",
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: UnitObj,
            success: function (data) {
                if (data === true) {

                    location.href = "/Training/TrainingCategory";

                }
            }
        });
    }

}

function EditTrainingCategorypopup(TrainingCategoryId) {
    $("#addTrainingCategoryModal").modal('toggle');
    getTrainingcategorydeatils(TrainingCategoryId);
}

function getTrainingcategorydeatils(TrainingCategoryId) {
    UnitObj = JSON.stringify({ 'TrainingCategoryId': TrainingCategoryId });
    $.ajax({
        url: "/Training/GetTrainingCategorydetails",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: UnitObj,
        success: function (data) {

            $("#txtCategory").val(data.CategoryName);
            $("#txtDescription").val(data.CategoryDesc);
            $("#btnSubmit").hide();
            $("#btnSubmitUpdate").show();
            $("#hdnTc_ID").val(TrainingCategoryId);

        }
    });
}

function Openpopup(TrainingCategoryId) {
    Clearfields();
    $("#addTrainingCategoryModal").modal('toggle');
}

function Clearfields() {
    $("#txtCategory").val('');
    $("#txtDescription").val('');
    $("#btnSubmit").show();
    $("#btnSubmitUpdate").hide();
}