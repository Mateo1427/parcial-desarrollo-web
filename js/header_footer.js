$("#hide-btn").click(function() {
    alert("El menú se ocultará")
    $(".menu").fadeOut();
})

$("#show-btn").click(function() {
    alert("El menú estará visible")
    $(".menu").fadeIn();
})