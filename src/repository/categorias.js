import config from '../config';

const URL_CATEGORIES = `${config.URL_BACK}/categorias`;

function getAll() {

  return fetch(`${URL_CATEGORIES}`)
    .then(async (respostaDoServidor) => {

      if(respostaDoServidor.ok){
        const resposta = await respostaDoServidor.json();

        return resposta;
      }

      throw new Error('Não foi possivel obter os dados!');
      
    });
}

function getAllWithVideos() {

  return fetch(`${URL_CATEGORIES}?_embed=videos`)
    .then(async (respostaDoServidor) => {

      if(respostaDoServidor.ok){
        const resposta = await respostaDoServidor.json();

        return resposta;
      }

      throw new Error('Não foi possivel obter os dados!');
      
    });
}

export default {
  getAllWithVideos,
  getAll
}