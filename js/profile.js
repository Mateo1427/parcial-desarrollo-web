window.addEventListener('pageshow', function (event) {

    const token = localStorage.getItem('token');

    if (event.persisted || !token) {
        alert("No has iniciado sesión.");
        window.location.href = 'login.html';
        return;
    }

    console.log("Token:", token);
    //console.log("Usuario:", usuario.id);

    fetch("http://localhost:3000/api/perfil", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(function (respuesta) {
            if (!respuesta.ok) {
                throw new Error("No se pudo autenticar");
            }
            return respuesta.json();

        }).then(function (authUser) {

            $("#name-form").val(authUser.name);
            $("#last-name-form").val(authUser.lastName);
            $("#age-form").val(authUser.age);
            $("#phone-form").val(authUser.phone);
            $("#date-form").val(formatDate(authUser.date));
            $("#email-form").val(authUser.email);

        }).catch(function (error) {
            console.log("Ërror:", error.message);
        });
});

//$(document).ready(function () { -> JQUERY
// window.addEventListener('pageshow', function (event) {

//     const userString = localStorage.getItem('loggedUser');

//     //if (!userString) { -> JQUERY

//     if (event.persisted || !userString) {
//         alert("No has iniciado sesión.");
//         window.location.href = 'login.html';
//         return;
//     }

//     const user = JSON.parse(userString);
//     console.log("Datos del usuario:", user);

//     const token = user.accessToken;

//     fetch('https://dummyjson.com/user/me', {
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         },
//         credentials: 'include'
//     })
//         .then(function (respuesta) {
//             if (!respuesta.ok) {
//                 throw new Error("No se pudo autenticar");
//             }
//             return respuesta.json();

//         }).then(function (authUser) {

//             $("#name-form").val(authUser.firstName);
//             $("#last-name-form").val(authUser.lastName);
//             $("#age-form").val(authUser.age);
//             $("#phone-form").val(authUser.phone);
//             $("#date-form").val(formatDate(authUser.birthDate));
//             $("#email-form").val(authUser.email);
//             $("#username-form").val(authUser.username);
//             $("#password-form").val(authUser.password);
//             $("#photo").attr("src", authUser.image);

//         }).catch(function (error) {
//             console.log("Ërror:", error.message);
//             alert("Usuario o contraseña incorrectos");
//         });
// });


// $("#btn-delete").click(function (event) {
//     event.preventDefault();

//     const userString = localStorage.getItem('loggedUser');

//     if (!userString) {

//         alert("No has iniciado sesión.");
//         window.location.href = 'login.html';
//         return;
//     }

//     const user = JSON.parse(userString);

//     fetch(`https://dummyjson.com/users/${user.id}`, {
//         method: 'DELETE',
//     })
//         .then(function (respuesta) {
//             if (!respuesta.ok) {
//                 throw new Error("No se pudo eliminar");
//             }
//             return respuesta.json();

//         }).then(function (data) {

//             console.log("Usuario Eliminado", data)

//             localStorage.removeItem('loggedUser');
//             alert("Usuario Eliminado.");
//             window.location.replace('index.html')

//         }).catch(function (error) {
//             console.log("Error:", error.message);
//             alert("Usuario o contraseña incorrectos");
//         });
// });

$("#btn-logout").click(function (event) {
    event.preventDefault();

    localStorage.removeItem('token');

    alert("Sesión cerrada correctamente.");
    window.location.replace('login.html');

});

$("#btn-update").click(function (event) {
    event.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {

        alert("No has iniciado sesión.");
        window.location.href = 'login.html';
        return;
    }

    fetch("http://localhost:3000/api/usuarios/update", {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: $("#name-form").val(),
            lastName: $("#last-name-form").val(),
            age: $("#age-form").val(),
            phone: $("#phone-form").val(),
            email: $("#email-form").val(),
            date: $("#date-form").val(),
            password: $("#password-form").val()
        })
    })
        .then(function (respuesta) {
            if (!respuesta.ok) {
                throw new Error("No se pudo actualizar la información");
            }
            return respuesta.json();

        }).then(function (data) {
            alert(data.mensaje);
            console.log("Respuesta del servidor:", data);

        }).catch(function (error) {
            console.log("Error:", error.message);
            alert("No se pudo actualizar el usuario");
        });
});

$("#btn-delete").click(function (event) {
    event.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {

        alert("No has iniciado sesión.");
        window.location.href = 'login.html';
        return;
    }


    fetch("http://localhost:3000/api/usuarios/delete", {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    })
        .then(function (respuesta) {
            if (!respuesta.ok) {
                throw new Error("No se pudo eliminar");
            }
            return respuesta.json();

        }).then(function (data) {

            console.log("Usuario Eliminado", data)

            localStorage.removeItem('token');

            $("#name-form").val(""),
            $("#last-name-form").val(""),
            $("#age-form").val(""),
            $("#phone-form").val(""),
            $("#email-form").val(""),
            $("#date-form").val(""),
            $("#password-form").val("")

            alert("Usuario Eliminado.");
            window.location.replace('index.html')

        }).catch(function (error) {
            console.log("Error:", error.message);
        });
});

function formatDate(date) {
    const [year, month, day] = date.split('-');

    const monthFormated = month.padStart(2, '0');
    const dayFormated = day.padStart(2, '0');

    const formatedDate = `${year}-${monthFormated}-${dayFormated}`;
    return formatedDate
}
