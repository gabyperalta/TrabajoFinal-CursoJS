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

//Al ingresar email, verifico que tenga el formato correspondiente
$('#email').on('input',function() {
    var email= $('#email').val();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        $('#email')[0].setCustomValidity("Por favor ingrese un correo electrónico válido.");
    }
    else
    {
        $('#email')[0].setCustomValidity("");

    }
});

//Valido que la edad sea un número válido
$('#edad').on('input',function() {
    var edad= $('#edad').val();
    console.log(edad)
    if (edad<0 || edad>120) //valido que sea mayor a 0 y menor a 120, pero podría ser que controlando solo que sea mayor que 0 alcance
    {
        $('#edad')[0].setCustomValidity("Por favor ingrese una edad válida.");
    }
    else
    {
        $('#edad')[0].setCustomValidity("");

    }
});

//Al enviarse los datos del formulario, muestro mensaje de envio correcto
//NO ME FUNCIONA POR EL MOMENTO
$('#miFormulario').submit(function(){
    $('#envioCorrecto').attr('hidden',false);
});

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


