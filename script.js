window.onload = function () {
    const images = document.querySelectorAll('.image');
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect(); // Pega as coordenadas da área de contagem
    const positions = [];

    // Função para gerar um número aleatório dentro de um intervalo
    function getRandomPosition(max) {
        return Math.floor(Math.random() * max);
    }

    // Função para verificar se a imagem sobrepõe outras imagens
    function isOverlapping(x, y, width, height) {
        for (let pos of positions) {
            const distanceX = Math.abs(pos.x - x);
            const distanceY = Math.abs(pos.y - y);
            const minDistance = 20; // Distância mínima para evitar sobreposição

            if (distanceX < width + minDistance && distanceY < height + minDistance) {
                return true; // Se a imagem está sobrepondo, retornamos true
            }
        }
        return false;
    }

    // Função para posicionar as imagens de forma fixa e sem sobreposição
    function positionImages() {
        images.forEach(image => {
            let randomX, randomY;
            const imageWidth = image.width;
            const imageHeight = image.height;

            // Gera a posição X e Y de forma que a imagem não se sobreponha às outras
            do {
                randomX = getRandomPosition(window.innerWidth - imageWidth - 10); // Ajuste para o tamanho das imagens
                randomY = getRandomPosition(window.innerHeight - imageHeight - 10);
            } while (isOverlapping(randomX, randomY, imageWidth, imageHeight)); // Verifica se a posição está livre

            // Aplica a posição da imagem e armazena
            image.style.position = 'absolute';
            image.style.left = `${randomX}px`;
            image.style.top = `${randomY}px`;

            // Armazena a posição da imagem para futuras verificações
            positions.push({ x: randomX, y: randomY });
        });
    }

    positionImages(); // Chama a função para posicionar as imagens

    // Função para atualizar o contador
    function updateCountdown() {
        const targetDate = new Date("2024-06-12T00:00:00Z"); // Data alvo (12 de junho de 2024)
        const currentDate = new Date(); // Data atual

        const diff = targetDate - currentDate; // Diferença entre as duas datas

        if (diff <= 0) {
            // Se a data já passou, exibe quanto tempo faz
            document.getElementById('days').querySelector('.time-value').textContent = Math.floor(-diff / (1000 * 60 * 60 * 24));
            document.getElementById('hours').querySelector('.time-value').textContent = Math.floor(-diff / (1000 * 60 * 60) % 24);
            document.getElementById('minutes').querySelector('.time-value').textContent = Math.floor(-diff / (1000 * 60) % 60);
            document.getElementById('seconds').querySelector('.time-value').textContent = Math.floor(-diff / 1000 % 60);
        } else {
            // Se ainda não passou, atualiza o contador normalmente
            document.getElementById('days').querySelector('.time-value').textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
            document.getElementById('hours').querySelector('.time-value').textContent = Math.floor(diff / (1000 * 60 * 60) % 24);
            document.getElementById('minutes').querySelector('.time-value').textContent = Math.floor(diff / (1000 * 60) % 60);
            document.getElementById('seconds').querySelector('.time-value').textContent = Math.floor(diff / 1000 % 60);
        }
    }

    // Atualiza o contador a cada segundo
    setInterval(updateCountdown, 1000);
};
