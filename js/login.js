$("#btn-login").click(function (event) {
    event.preventDefault();

    const datos = {
        email: $('#username-form').val(),
        password: $('#password-form').val()
    }
    console.log(datos)

    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),

    })

        .then(async respuesta => {
            const resultadoJson = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(resultado.mensaje);
            }
            return resultadoJson;

        }).then(resultadoJson => {
            console.log(resultadoJson)
            console.log(resultadoJson.token);
            console.log(resultadoJson.mensaje);

            localStorage.setItem('token', resultadoJson.token);

            $('#username-form').val("");
            $('#password-form').val("");

            alert(`Bienvenido, ${resultadoJson.usuario.name}`)

            window.location.href = 'profile.html';

        }).catch(function (error) {
            console.log(error.message);
            alert(error.message);
        });
})


// $("#btn-login").click(function (event) {
//     event.preventDefault();

//     const username = $('#username-form').val();
//     const password = $('#password-form').val();


//     fetch('https://dummyjson.com/user/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({

//             username: username,
//             password: password,
//             expiresInMins: 30, // optional, defaults to 60
//         }),
//     })

//         .then(function (respuesta) {
//             if (!respuesta.ok) {
//                 throw new Error("Credenciales incorrectas");
//             }
//             return respuesta.json();

//         }).then(function (user) {
//             console.log(user);

//             localStorage.setItem('loggedUser', JSON.stringify(user));

//             $('#username-form').val("");
//             $('#password-form').val("");

//             window.location.href = 'profile.html';

//         }).catch(function (error) {
//             console.log("Ërror:", error.message);
//             alert("Usuario o contraseña incorrectos");
//         });
// })

// fetch('https://dummyjson.com/users')
//     // .then(res => res.json())
//     // .then(console.log);
//     .then(function (respuesta) {
//         if (!respuesta.ok) {
//             throw new Error("No se pudo registrar");
//         }
//         return respuesta.json();

//     }).then(function (data) {
//         console.log(data.users[0].username);
//         console.log(data.users[0].password);
//     })