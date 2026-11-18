// document.getElementById("btn-register").onclick = function (event) {
//     event.preventDefault();

//     const inputName = document.getElementById('name-form');
//     const nameStudent = inputName.value;

//     const inputLastName = document.getElementById('last-name-form');
//     const lastNameStudent = inputLastName.value;

//     const inputAge = document.getElementById('age-form');
//     const ageStudent = inputAge.value;

//     const inputEmail = document.getElementById('email-form');
//     const emailStudent = inputEmail.value;

//     const inputPhone = document.getElementById('phone-form');
//     const phoneStudent = inputPhone.value;

//     const inputDate = document.getElementById('date-form');
//     const dateStudent = inputDate.value;


//     fetch('https://dummyjson.com/users/add', {

//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             firstName: nameStudent,
//             lastName: lastNameStudent,
//             age: ageStudent,
//             email: emailStudent,
//             phone: phoneStudent,
//             birthDate: dateStudent,
//             // address: {
//             //     country: "Colombia",
//             // }
//         })
//     })
//         // .then(res => res.json())
//         // .then(console.log);
//         .then(function (respuesta) {
//             if (!respuesta.ok) {
//                 throw new Error("No se pudo registrar");
//             }
//             return respuesta.json();

//         }).then(function (student) {
//             alert("Registro exitoso!");

//             console.log(student);

//         }).catch(function (error) {
//             console.log(error.message);
//         });
// }

document.getElementById("btn-register").onclick = function (event) {
    event.preventDefault();

    const datos = {
        name: document.getElementById('name-form').value,
        lastName: document.getElementById('last-name-form').value,
        age: document.getElementById('age-form').value,
        email: document.getElementById('email-form').value,
        phone: document.getElementById('phone-form').value,
        date: document.getElementById('date-form').value,
        password: document.getElementById('password-form').value
    };

    console.log("Enviando:", datos); 

    fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    })
        .then(async respuesta => {
            const resultado = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(resultado.mensaje);
            }

            return resultado;
        })
        .then(resultado => {
            alert(resultado.mensaje);
        })
        .catch(error => {
            alert(error.message);
        });
}


//Metodo puro JQUERY
// $("#btn-register").click(function (event) {
//     event.preventDefault();


//     const name = $('#name-form').val();
//     const lastName = $('#last-name-form').val();
//     const age = $('#age-form').val();
//     const email = $('#email-form').val();
//     const phone = $('#phone-form').val();
//     const date = $('#date-form').val();


//     fetch('https://dummyjson.com/users/add', {

//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             firstName: name,
//             lastName: lastName,
//             age: age,
//             email: email,
//             phone: phone,
//             birthDate: date,
//             // address: {
//             //     country: "Colombia",
//             // }
//             /* other user data */
//         })
//     })
//         // .then(res => res.json())
//         // .then(console.log);
//
//         .then(function (respuesta) {
//             if (!respuesta.ok) {
//                 throw new Error("No se pudo registrar");
//             }
//             return respuesta.json();

//         }).then(function (student) {
//             console.log(student);

//         }).catch(function (error) {
//             console.log("Ërror:", error.message);
//         });
// })