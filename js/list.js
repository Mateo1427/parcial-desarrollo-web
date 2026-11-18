fetch("https://randomuser.me/api/?results=80")
    .then(function (respuesta) {
        if (!respuesta.ok) {
            throw new Error("No fue posible consultar usuarios");
        }

        return respuesta.json();
    })
    .then(function (datos) {
        console.log(datos)

        const contenedor = document.getElementById('students-table');
        contenedor.innerHTML = '';

        const headers = `
                    <tr class="table-titles">
                        <th>Nombre Completo</th>
                        <th>Número Celular</th>
                        <th>Correo</th>
                        <th>Documento - ID</th>
                    </tr>
                `

        contenedor.innerHTML += headers

        datos.results.forEach(function (user) {

            if (user.id.value !== null && !(user.id.value.includes("undefined"))) {
                const rowHtml = `
                    <tr>
                        <td>${user.name.first} ${user.name.last}</td>
                        <td>${user.phone}</td>
                        <td>${user.email}</td>
                        <td>${user.id.value}</td>
                    </tr>
                `;

                contenedor.innerHTML += rowHtml;
            }
        });
    })
    .catch(function (error) {
        console.log(error.message);
    });