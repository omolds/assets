
//LIBRERIA: jquery.min.js
//SLIDER DE RANGOS ENVIA INFORMACION A LOS INPUTS

$(document).on('input', '.range', function() {
    var input = $(this).data("input");
    $('#'+input).val( $(this).val() );
});


//LIBRERIA: jquery.min.js
//MUESTRA U OCULTA LA ALERTA DE LA PARTE SUPERIOR DE NUESTRA PAGINAS

$(document).ready(function(){
    $(".btnOcultar").click(function(){
        $("#miPropioID").slideUp(300);
    });
    $(".btnMostrar").click(function(){
        $("#miPropioID").slideDown(300);
    });
});