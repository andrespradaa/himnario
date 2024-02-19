document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('seleccion').addEventListener('change', function(e) {
        var lista = document.getElementById('lista');
        var titulo = document.getElementById('titulo');
        lista.innerHTML = ''; // Limpiar la lista

        // Determinar la ruta al archivo JSON basado en la selección
        var ruta;
        if (e.target.value === 'manantial') {
            titulo.textContent = 'Manantial de Inspiracion';
            ruta = 'data/manantial.json';
        } else if (e.target.value === 'lluvia') {
            titulo.textContent = 'Lluvia de Bendiciones';
            ruta = 'ruta/a/lluvia.json';
        } else if (e.target.value === 'corario') {
            titulo.textContent = 'Corario IPUC';
            ruta = 'ruta/a/corario.json';
        }

        // Cargar las canciones del archivo JSON
        fetch(ruta)
            .then(response => response.json())
            .then(canciones => {
                canciones.forEach(function(cancion) {
                    var div = document.createElement('div');
                    div.textContent = `${cancion.id}. ${cancion.title}`; // Mostrar ID y Título
                    div.addEventListener('click', function() {
                        mostrarLetra(cancion);
                        // Eliminar la clase 'active' de todos los coros
                        var coros = document.querySelectorAll('#lista div');
                        coros.forEach(function(cor) {
                            cor.classList.remove('active');
                        });
                        // Agregar la clase 'active' al coro en el que se hizo clic
                        div.classList.add('active');
                    });
                    lista.appendChild(div);
                });
            });
    });

        // Obtener referencia al campo de entrada de búsqueda
        var buscarInput = document.getElementById('buscarInput');

        // Escuchar el evento 'input' para filtrar los himnos
        buscarInput.addEventListener('input', function() {
            // Obtener el texto ingresado en la barra de búsqueda
            var filtro = buscarInput.value.toLowerCase();
    
            // Filtrar los himnos según el texto ingresado
            var coros = document.querySelectorAll('#lista div');
            coros.forEach(function(cor) {
                var titulo = cor.textContent.toLowerCase();
                if (titulo.includes(filtro)) {
                    cor.style.display = ''; // Mostrar el himno si coincide con el filtro
                } else {
                    cor.style.display = 'none'; // Ocultar el himno si no coincide con el filtro
                }
            });
        });


    function mostrarLetra(cancion) {
        var letra = document.getElementById('letra');
        letra.innerHTML = ''; // Limpiar la letra

          // Crear un nuevo elemento para el título
            var h2 = document.createElement('h2');
            h2.textContent = `${cancion.id}. ${cancion.title}`; // Asignar el id y el título al elemento h2
            letra.appendChild(h2); // Agregar el título al DOM
            
        cancion.verses.forEach(function(verso) {
            // Crear un nuevo elemento para la sección
            var section = document.createElement('div');
            section.classList.add('section');
    
            // Crear un nuevo elemento para el título de la sección si está presente
            if (verso.section) {
                var h2 = document.createElement('h2');
                h2.textContent = verso.section; // Asignar el título al elemento h2
                section.appendChild(h2); // Agregar el título al DOM
            }
    
            verso.content.forEach(function(line) {
            var p = document.createElement('p');
            p.textContent = line; // Asignar el texto al elemento p
            section.appendChild(p); // Agregar el elemento <p> al DOM
            });
            // Agregar la sección al DOM
            letra.appendChild(section);
        });
    }

});

