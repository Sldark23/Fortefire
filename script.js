const videoFrame = document.getElementById("videoFrame");
		const searchInput = document.getElementById("searchInput");
        const videoList = document.getElementById("videoList");
		const videosJson = "videos.json"; // Nome do arquivo JSON

        // Função para carregar a lista de vídeos aleatórios na inicialização
        window.onload = loadRandomVideos;

		function searchVideo() {
			const searchTerm = searchInput.value.toLowerCase();
			fetch(videosJson)
				.then(response => response.json())
				.then(data => {
					const matchingVideos = data.filter(video => video.title.toLowerCase().includes(searchTerm));
					if (matchingVideos.length > 0) {
						const randomIndex = Math.floor(Math.random() * matchingVideos.length);
						playVideo(matchingVideos[randomIndex].src);
					} else {
						alert("Nenhum vídeo encontrado com esse termo.");
					}
				})
				.catch(error => {
					console.error("Erro ao carregar o arquivo JSON:", error);
				});
		}

		function showRandomVideo() {
			fetch(videosJson)
				.then(response => response.json())
				.then(data => {
					const randomIndex = Math.floor(Math.random() * data.length);
					playVideo(data[randomIndex].src);
				})
				.catch(error => {
					console.error("Erro ao carregar o arquivo JSON:", error);
				});
		}

        function loadRandomVideos() {
            fetch(videosJson)
				.then(response => response.json())
				.then(data => {
					const numberOfVideosToLoad = 5; // Defina quantos vídeos deseja carregar
                    const randomVideos = getRandomVideos(data, numberOfVideosToLoad);
                    displayVideoList(randomVideos);
				})
				.catch(error => {
					console.error("Erro ao carregar o arquivo JSON:", error);
				});
        }

		function playVideo(src) {
			videoFrame.src = src;
		}

        function getRandomVideos(array, count) {
            const shuffledArray = array.sort(() => 0.5 - Math.random());
            return shuffledArray.slice(0, count);
        }

        function displayVideoList(videos) {
            videoList.innerHTML = '';
            videos.forEach(video => {
                const videoElement = document.createElement('div');
                videoElement.innerHTML = `<iframe width="280" height="157.5" src="${video.src}" frameborder="0" allowfullscreen></iframe>`;
                videoList.appendChild(videoElement);
            });
        }
