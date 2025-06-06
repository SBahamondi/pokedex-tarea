function getPokemon() {
    let search = document.getElementById('search');
    let pokemon = search.value.toLowerCase(); // Esto les convierte en minuscula cualquier palabra para evitar errores gramaticales

    const url = 'https://pokeapi.co/api/v2/pokemon/' + pokemon;

    fetch(url)
        .then(res => res.json())
        .then(data => {

            // Datos principales
            let name = data.name;
            let type = "Tipo: " + data.types.map(t => t.type.name).join(', ');
            let ability = "Habilidades: " + data.abilities.map(a => a.ability.name).join(', ');
            let move = "Movimiento: " + data.moves[0].move.name;
            let weight = "Peso: " + data.weight + " hectogramos";
            let height = "Altura: " + data.height + " decímetros";
            let id = "ID: " + data.id;
            let sprite = data.sprites.front_default;

            // Mostrar en HTML
            document.getElementById('name').textContent = name.toUpperCase();
            document.getElementById('type').textContent = type;
            document.getElementById('ability').textContent = ability;
            document.getElementById('move').textContent = move;
            document.getElementById('weight').textContent = weight;
            document.getElementById('height').textContent = height;
            document.getElementById('id').textContent = id;
            document.getElementById('sprite').src = sprite;

            // Mostrar estadísticas base una por una
            document.getElementById('hp').textContent = "HP: " + data.stats[0].base_stat;
            document.getElementById('attack').textContent = "Ataque: " + data.stats[1].base_stat;
            document.getElementById('defense').textContent = "Defensa: " + data.stats[2].base_stat;
            document.getElementById('special-attack').textContent = "Ataque Especial: " + data.stats[3].base_stat;
            document.getElementById('special-defense').textContent = "Defensa Especial: " + data.stats[4].base_stat;
            document.getElementById('speed').textContent = "Velocidad: " + data.stats[5].base_stat;

            // Segundo fetch para generación
            fetch(data.species.url)
                .then(res => res.json())
                .then(speciesData => {
                    document.getElementById('generation').textContent = "Generación: " + speciesData.generation.name;
                });

        })

        // Manejo de errores
        .catch(() => {
            alert('Pokemon no encontrado');
        });
}
