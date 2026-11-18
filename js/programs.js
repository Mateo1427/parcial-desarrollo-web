$(".more-info").hide()

$(".js-buttons").click(function () {
    var $currentCard = $(this).closest(".programs-card")
    var currentProgram = $currentCard.find("#title-program").text().trim()

    $currentCard.find(".more-info").toggle()
    $currentCard.toggleClass("card-extended")

    if ($(this).text().trim() === "Ver más") {
        alert("Veras más información sobre el programa: " + currentProgram)
        $(this).text("Ver menos");

    } else {
        $(this).text("Ver más");
    }
})

$(".btn-course-dates").click(function () {
    var $currentCard = $(this).closest(".card-btns")
    var $currentModal = $currentCard.siblings(".modal")

    $currentModal.toggle();
})

$(".btn-close-modal").click(function () {
    var $currentModal = $(this).closest(".modal")

    $currentModal.toggle();
})