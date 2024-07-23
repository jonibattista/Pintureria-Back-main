function createTable() {

    // Crea el elemento tabla
    var table = document.createElement('table');

    // Crea el encabezado de la tabla
    var thead = document.createElement('thead');
    var headerRow = document.createElement('tr');

    var headers = ['Columna 1', 'Columna 2', 'Columna 3'];
    headers.forEach(function(header) {
        var th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

    // Crea el cuerpo de la tabla
    var tbody = document.createElement('tbody');
        for (var i = 0; i < 2; i++) {
            var row = document.createElement('tr');
            for (var j = 0; j < 3; j++) {
                var td = document.createElement('td');
                td.textContent = 'Dato ' + (i * 3 + j + 1);
                row.appendChild(td);
                }
                tbody.appendChild(row);
            }
            table.appendChild(tbody);

    // Agrega la tabla al contenido
    var contentDiv = document.querySelector('.content');
    contentDiv.appendChild(table);
        }
