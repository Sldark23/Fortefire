const fs = require('fs');
const { google } = require('googleapis');

// Substitua 'SUA_CHAVE_DE_API' pela sua chave de API do YouTube
const API_KEY = 'AIzaSyAudLr9RXaUK_ed99gSBAfyruUmcTfACBY';

// Nome do arquivo JSON onde os vídeos serão armazenados
const JSON_FILE = 'videos.json';

// Função para carregar vídeos existentes do arquivo JSON (se existirem)
function loadVideos() {
  try {
    const data = fs.readFileSync(JSON_FILE);
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Configurar a autenticação com a API do YouTube
const youtube = google.youtube({
  version: 'v3',
  auth: API_KEY,
});

// Parâmetros da busca de vídeos (sem palavra-chave específica)
const searchParams = {
  maxResults: 1239860, // Número máximo de resultados a serem retornados
  part: 'snippet', // Partes do vídeo a serem incluídas na resposta (snippet = informações básicas)
};

// Realiza a busca de vídeos no YouTube sem palavra-chave específica
youtube.search.list(searchParams, async (err, res) => {
  if (err) {
    console.error('Erro ao buscar vídeos:', err);
    return;
  }

  // Processa os resultados
  const videos = res.data.items.map((item) => {
    return {
      "title": item.snippet.title,      "src": `https://www.youtube.com/embed/${item.id.videoId}`,
    };
  });

  // Carrega os vídeos existentes
  const existingVideos = loadVideos();

  // Adiciona os novos vídeos aos existentes
  existingVideos.push(...videos);

  // Salva os dados atualizados no arquivo JSON
  fs.writeFile(JSON_FILE, JSON.stringify(existingVideos, null, 2), (err) => {
    if (err) {
      console.error('Erro ao salvar arquivo JSON:', err);
      return;
    }
    console.log('Dados atualizados e salvos em videos.json');
  });
});