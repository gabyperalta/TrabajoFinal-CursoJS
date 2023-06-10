//MI JS

//Al cargar la página, cargo los paises en el select correspondiente
$(document).ready(function(){
$.ajax({
    url: "https://restcountries.com/v3.1/all",

    method: "GET",
    dataType: "json",
    success: function(data) {
       
      var select = $("#pais");

      for (var i = 0; i < data.length; i++) {
        var option = $("<option>").text(data[i].name.common).val(data[i].name.common);
        select.append(option);
      }
    },
    error: function() {
      alert("Error al obtener la lista de países");
    }
  });
});

//Al realizar un cambio en el select de paises, traigo las provincias que en este caso siempre traemos laas de Argentina
$('#pais').change(function(){
   
    $.ajax({
        url: "https://apis.datos.gob.ar/georef/api/provincias",
        method: "GET",
        success: function(data) {
         
          var select = $("#provincia");
    
          for (var i = 0; i < data.provincias.length; i++) {
            var option = $("<option>").text(data.provincias[i].nombre).val(data.provincias[i].id);
            select.append(option);
          }
        },
        error: function() {
          alert("Error al obtener los datos de la API");
        }
      });

});

//Al realizar un cambio en las provincias y seleccionar una, traigo las localidades correspondientes a la provincia seleccionada
$('#provincia').change(function(){
    var idProvincia=$(this).val();
    $.ajax({
        url: "https://apis.datos.gob.ar/georef/api/localidades",
        method: "GET",
        data: {
            provincia:idProvincia,
            max:1000
        },
        success: function(data) {
          var select = $("#ciudad");
            var option="<option selected>Seleccione una Ciudad</option>";
          for (var i = 0; i < data.localidades.length; i++) {
            option += "<option value="+data.localidades[i].id+">"+data.localidades[i].nombre+"</option>";
            
          }
          select.html(option);
        },
        error: function() {
          alert("Error al obtener los datos de la API");
        }
      });

});

//Funcion para validar formulario
function  validarFormulario()
{
    //valido campos requeridos
    var nombre= $('#nombre').val();
    var apellido= $('#apellido').val();
    var email= $('#email').val();
    var nombreUsuario= $('#nombreUsuario').val();
    var contrasenia= $('#contrasenia').val();
    var validacion=true;

    if(nombre=='')
    {
        $('#nombre').addClass('error');
        $('#validacionNombre').css('display','block');
        validacion=false;
        
    }
    else
    {
        $('#nombre').removeClass('error');
        $('#validacionNombre').css('display','none');
    }
    if(apellido=='')
    {
        $('#apellido').addClass('error');
        $('#validacionApellido').css('display','block');
        validacion=false;

    }
    else
    {
        $('#apellido').removeClass('error');
        $('#validacionApellido').css('display','none');
    }
    
     //valido edad
     var edad= $('#edad').val();

     if (edad<0 || edad>120) //valido que sea mayor a 0 y menor a 120, pero podría ser que controlando solo que sea mayor que 0 alcance
     {
        $('#validacionEdad').html("Por favor ingrese una edad válida. Mayor que 0 y menor que 120");
        $('#edad').addClass('error');
        $('#validacionEdad').css('display','block');
        validacion=false;
     }
     else
     {
        $('#edad').removeClass('error');
        $('#validacionEdad').css('display','none');
     }
    //Valido email
    if(email=='')
    {
        $('#validacionEmail').html("Por favor ingrese un Correo electrónico.");
        $('#email').addClass('error');
        $('#validacionEmail').css('display','block');
        validacion=false;
    }
    else
    {
        $('#email').removeClass('error');
        $('#validacionEmail').css('display','none');

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            $('#validacionEmail').html("Por favor ingrese un correo electrónico válido.");
            $('#email').addClass('error');
            $('#validacionEmail').css('display','block');
            validacion=false;
        }
    }

    if(nombreUsuario=='')
    {
        $('#nombreUsuario').addClass('error');
        $('#validacionNombreUsuario').css('display','block');
        validacion=false;
    }
    else
    {
        $('#nombreUsuario').removeClass('error');
        $('#validacionNombreUsuario').css('display','none');
    }

    if(contrasenia=='')
    {
        $('#contrasenia').addClass('error');
        $('#validacionContrasenia').css('display','block');
        validacion=false;
    }
    else
    {
        $('#contrasenia').removeClass('error');
        $('#validacionContrasenia').css('display','none');
    }

    return validacion;

}

//Al enviarse los datos del formulario llamo a la funcion validarFormulario para validar los campos
$('#miFormulario').submit(function(e){
    e.preventDefault();
    if(!validarFormulario())
    {
       return;
    }
    else
    {
        const DatosUsuario={
            nombre:$('#nombre').val(),
            apellido:$('#apellido').val(),
            email:$('#email').val(),
        };
        localStorage.setItem('DatosUsuario', JSON.stringify(DatosUsuario));
        window.location.href = 'file:///D:/Users/GRABRIELA/Documents/GitHub/TrabajoFinal-CursoJS/juegos.html'


    }
  
});

//Al hacer click en el boton Adivinanzas, activo la seccion correspondiente
$('#adivinanzas').click(function(){
    $('#seccionJuegos').removeClass('seccionJuegos');
    $('#SeccionPreguntas').addClass('d-none');
    $('#SeccionAdivinanzas').removeClass('d-none');
});

//Función que valida que todas las adivinanzas esten contestadas, sino muestro mensaje para que se contesten todas
function validarFormularioAdivinanzas()
{
    var validacion=true;
    var adivinanza1=$('input[name=adivinanza1]:checked').val()
    var adivinanza2=$('input[name=adivinanza2]:checked').val()
    var adivinanza3=$('input[name=adivinanza3]:checked').val()
    var adivinanza4=$('input[name=adivinanza4]:checked').val()

    if(adivinanza1==null || adivinanza2==null || adivinanza3==null || adivinanza4==null)
    {
        validacion=false;
        $('#validacionAdivinanzas').removeClass("d-none");
    }

    return validacion;
}

//Función que compara las respuestas de las adivinanzas que ingresó el usuario, con las respuestas correctas 
function validarRespuestas(respuestasCorrectas)
{
    var puntuacion=0;
    var respuestasUsuario=[];
    respuestasUsuario.push($('input[name=adivinanza1]:checked').val())
    respuestasUsuario.push($('input[name=adivinanza2]:checked').val())
    respuestasUsuario.push($('input[name=adivinanza3]:checked').val())
    respuestasUsuario.push($('input[name=adivinanza4]:checked').val())

    for(i=0;i<respuestasCorrectas.length;i++)
    {
        
        if(respuestasCorrectas[i]!=respuestasUsuario[i])
        {
            $('#resultadoAdivinanza'+i).html('<i class="fa-solid fa-circle-xmark fa-beat fa-2xl" style="color: #f40101;"></i> <br> 0 PTOS')
        }
        else
        {
            puntuacion=puntuacion+25;
            $('#resultadoAdivinanza'+i).html('<i class="fa-solid fa-circle-check fa-beat fa-2xl" style="color: #38d219;"></i> <br> 25 PTOS')
        }
    }

    if(puntuacion>=50)
    {
        $('#puntuacionAdivinanzas').css('color','chartreuse')
        $('#puntuacionAdivinanzas').html('<em>Felicitaciones</em><p class="fs-6" style="color:black">Su puntuación fue de: '+puntuacion+' ptos</p>')
    }
    else
    {
        $('#puntuacionAdivinanzas').css('color','red')
        $('#puntuacionAdivinanzas').html('<em>La Próxima será</em><br> <p class="fs-6" style="color:black">Su puntuación fue de: '+puntuacion+' ptos</p>')
    }
    $('#botonEnviar').addClass('d-none')
    $('#reiniciarAdivinanzas').removeClass('d-none')


}

//Función para reiniciar el juego de las adivinanzas
function reiniciarAdivinanzas(){
    $('#formularioAdivinanzas')[0].reset();
    $('#botonEnviar').removeClass('d-none')
    $('#reiniciarAdivinanzas').addClass('d-none')
    $('#resultadoAdivinanza0').html('')
    $('#resultadoAdivinanza1').html('')
    $('#resultadoAdivinanza2').html('')
    $('#resultadoAdivinanza3').html('')

}

//Al enviar las respuestas de las adivinanzas, llamo a las funciones correspondientes de validación
$('#formularioAdivinanzas').submit(function(e){
    e.preventDefault();
    $('#validacionAdivinanzas').addClass("d-none");
    if(!validarFormularioAdivinanzas())
    {
       return;
    }
    else
    {
        var respuestas=['Peine','Cascara de huevo','Futuro','Avellana']
         validarRespuestas(respuestas);
    }
  
});

//Al hacer click en el boton Preguntas y Respuestas, activo la seccion correspondiente
$('#preguntasRespuestas').click(function(){
    $('#seccionJuegos').removeClass('seccionJuegos');
    $('#SeccionAdivinanzas').addClass('d-none');
    $('#SeccionPreguntas').removeClass('d-none');
});

//Función que se llama por cada respuesta a la pregunta del juego y se valida
function respuesta(nroPregunta, respuesta)
{
    var puntuacion='';
    if($('#valorPuntuacion').val()=='')
    {
        puntuacion=0;
    }
    else
    {
        puntuacion=parseInt($('#valorPuntuacion').val());
    }
    switch(nroPregunta) {
        case "1":
            if(respuesta=='1810')
            {
                puntuacion=puntuacion+20;
                $('#valorPuntuacion').val(puntuacion);
                $('#puntuacion').css('width',puntuacion+'%')
                $('#puntuacion').html(puntuacion+' ptos')
                $('#mensajeValidacion1').css('color','chartreuse')
                $('#mensajeValidacion1').html('<em>Correcta</em>')
            }
            else
            {
                $('#mensajeValidacion1').css('color','red')
                $('#mensajeValidacion1').html('<em>Incorrecta</em><br> <p class="fs-6">Respuesta correcta: 1810</p>')
            }
            $('#respuestas1').addClass('d-none')
            $('#mensajeValidacion1').removeClass('d-none')
            $('#pregunta2').removeClass('d-none')
            break;
        case "2":
            if(respuesta=='Coca-Cola')
            {
                puntuacion=puntuacion+20;
                $('#valorPuntuacion').val(puntuacion);
                $('#puntuacion').css('width',puntuacion+'%')
                $('#puntuacion').html(puntuacion+' ptos')
                $('#mensajeValidacion2').css('color','chartreuse')
                $('#mensajeValidacion2').html('<em>Correcta</em>')
            }
            else
            {
                $('#mensajeValidacion2').css('color','red')
                $('#mensajeValidacion2').html('<em>Incorrecta</em><br> <p class="fs-6">Respuesta correcta: Coca-Cola</p>')
            }
            $('#respuestas2').addClass('d-none')
            $('#mensajeValidacion2').removeClass('d-none')
            $('#pregunta3').removeClass('d-none')
           
            break;
        case "3":
            if(respuesta=='Cantante')
            {
                puntuacion=puntuacion+20;
                $('#valorPuntuacion').val(puntuacion);
                $('#puntuacion').css('width',puntuacion+'%')
                $('#puntuacion').html(puntuacion+' ptos')
                $('#mensajeValidacion3').css('color','chartreuse')
                $('#mensajeValidacion3').html('<em>Correcta</em>')
            }
            else
            {
                $('#mensajeValidacion3').css('color','red')
                $('#mensajeValidacion3').html('<em>Incorrecta</em><br> <p class="fs-6">Respuesta correcta: Cantante</p>')
            }
            $('#respuestas3').addClass('d-none')
            $('#mensajeValidacion3').removeClass('d-none')
            $('#pregunta4').removeClass('d-none')
           
            break;
        case "4":
            if(respuesta=='Zulma Lobato')
            {
                puntuacion=puntuacion+20;
                $('#valorPuntuacion').val(puntuacion);
                $('#puntuacion').css('width',puntuacion+'%')
                $('#puntuacion').html(puntuacion+' ptos')
                $('#mensajeValidacion4').css('color','chartreuse')
                $('#mensajeValidacion4').html('<em>Correcta</em>')
            }
            else
            {
                $('#mensajeValidacion4').css('color','red')
                $('#mensajeValidacion4').html('<em>Incorrecta</em><br> <p class="fs-6">Respuesta correcta: Zulma Lobato</p>')
            }
            $('#respuestas4').addClass('d-none')
            $('#mensajeValidacion4').removeClass('d-none')
            $('#pregunta5').removeClass('d-none')
           
            break;
        case "5":
            if(respuesta=='Agua')
            {
                puntuacion=puntuacion+20;
                $('#valorPuntuacion').val(puntuacion);
                $('#puntuacion').css('width',puntuacion+'%')
                $('#puntuacion').html(puntuacion+' ptos')
                $('#mensajeValidacion5').css('color','chartreuse')
                $('#mensajeValidacion5').html('<em>Correcta</em>')
            }
            else
            {
                $('#mensajeValidacion5').css('color','red')
                $('#mensajeValidacion5').html('<em>Incorrecta</em><br> <p class="fs-6">Respuesta correcta: Agua</p>')
            }
            $('#respuestas5').addClass('d-none')
            $('#mensajeValidacion5').removeClass('d-none')
            if(puntuacion>=50)
            {
                $('#puntuacionPreguntas').css('color','chartreuse')
                $('#puntuacionPreguntas').html('<em>Felicitaciones</em><p class="fs-6" style="color:black">Su puntuación fue de: '+puntuacion+' ptos</p>')
            }
            else
            {
                $('#puntuacionPreguntas').css('color','red')
                $('#puntuacionPreguntas').html('<em>La Próxima será</em><br> <p class="fs-6" style="color:black">Su puntuación fue de: '+puntuacion+' ptos</p>')
            }
            $('#reiniciarPreguntas').removeClass('d-none')

           
            break;  
    }
}

//Función para reiniciar el juego de las preguntas y respuestas
function reiniciarPreguntas(){
    $('#valorPuntuacion').val(0);
    $('#puntuacion').css('width','0%')
    $('#puntuacion').html('0 ptos')

    for(i=1;i<6;i++)
    {
        $('#mensajeValidacion'+i).html('')
        $('#mensajeValidacion'+i).addClass('d-none')
        $('#pregunta'+i).addClass('d-none')
        $('#respuestas'+i).removeClass('d-none')

    }
    $('#puntuacionPreguntas').html('')
    $('#reiniciarPreguntas').addClass('d-none')




}

//Funcion que tome de internet para mostrar u ocultar la contraseña 
function password_show_hide(idInput,nro) {
 
    var x = document.getElementById(idInput);
    var show_eye = document.getElementById("show_eye"+nro);
    var hide_eye = document.getElementById("hide_eye"+nro);
    hide_eye.classList.remove("d-none");
    if (x.type === "password") {
      x.type = "text";
      show_eye.style.display = "none";
      hide_eye.style.display = "block";
    } else {
      x.type = "password";
      show_eye.style.display = "block";
      hide_eye.style.display = "none";
    }
  }

//FIN DE MI JS


//JS DE LA PLANTILLA
window.addEventListener('DOMContentLoaded', event => {

    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    let scrollToTopVisible = false;
    // Closes the sidebar menu
    // const menuToggle = document.body.querySelector('.menu-toggle');
    // menuToggle.addEventListener('click', event => {
    //     event.preventDefault();
    //     sidebarWrapper.classList.toggle('active');
    //     _toggleMenuIcon();
    //     menuToggle.classList.toggle('active');
    // })

    // Closes responsive menu when a scroll trigger link is clicked
    var scrollTriggerList = [].slice.call(document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger'));
    scrollTriggerList.map(scrollTrigger => {
        scrollTrigger.addEventListener('click', () => {
            sidebarWrapper.classList.remove('active');
            menuToggle.classList.remove('active');
            _toggleMenuIcon();
        })
    });

    function _toggleMenuIcon() {
        const menuToggleBars = document.body.querySelector('.menu-toggle > .fa-bars');
        const menuToggleTimes = document.body.querySelector('.menu-toggle > .fa-xmark');
        if (menuToggleBars) {
            menuToggleBars.classList.remove('fa-bars');
            menuToggleBars.classList.add('fa-xmark');
        }
        if (menuToggleTimes) {
            menuToggleTimes.classList.remove('fa-xmark');
            menuToggleTimes.classList.add('fa-bars');
        }
    }

    // Scroll to top button appear
    document.addEventListener('scroll', () => {
        const scrollToTop = document.body.querySelector('.scroll-to-top');
        if (document.documentElement.scrollTop > 100) {
            if (!scrollToTopVisible) {
                fadeIn(scrollToTop);
                scrollToTopVisible = true;
            }
        } else {
            if (scrollToTopVisible) {
                fadeOut(scrollToTop);
                scrollToTopVisible = false;
            }
        }
    })
})

function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};
//FIN JS


