const form = document.getElementById("my-form");

form.addEventListener('submit', function (e) {
    e.preventDefault();
})

// function hideMenu() {
//     document.getElementById("menu").style.display = "none";

// }

// function showMenu() {
//     document.getElementById("menu").style.display = "flex";
// }

function showDataForm(idName, idProgram, idEmail) {

    let name = document.getElementById(idName).value;
    let program = document.getElementById(idProgram).value;
    let email = document.getElementById(idEmail).value;

    alert(
        "Hola " + name + " te eviaremos más información sobre el programa " +
        program + " al correo " + email
    );
}