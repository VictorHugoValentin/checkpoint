/* 
 * validacion de los campos nombre y descripcion de las valoraciones
 */

//parte de la validacion
$(document).ready(function () {
    $("#formulario").validate({
        rules: {
            nombre: {
                required: true,
                minlength: 3,
                maxlength: 45
            },
            descripcion: {
                required: true,
                minlength: 5,
                maxlength: 140
            }
        },
        messages: {
            nombre: {
                required: "Por favor, ingrese un nombre.",
                minlength: "El nombre debe contener al menos 3 letras.",
                maxlength: "El nombre debe contener 45 letras como máximo."
            },
            descripcion: {
                required: "Por favor, ingrese una descripción.",
                minlength: "La descripción debe contener al menos 5 letras.",
                maxlength: "La descripción debe contener 140 letras como máximo."
            }
        },
        errorElement: "em",
        errorPlacement: function (error, element) {
            // Add the `help-block` class to the error element
            error.addClass("help-block");

            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.parent("label"));
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element, errorClass, validClass) {
            $(element).parents(".col-sm-5").addClass("has-error").removeClass("has-success");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parents(".col-sm-5").addClass("has-success").removeClass("has-error");
        }
    });
});