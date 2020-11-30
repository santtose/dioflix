import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import FormField from '../../../components/FormField';
import PageDefault from '../../../components/PageDefault';

function CadastroCategoria() {

  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  }

  const [categorias, setCategorias] = useState([]);
  const [values, setValues] = useState(valoresIniciais);

  function setValue(chave, valor){
    setValues({
      ...values,
      [chave]: valor,
    })
  }

  function handleChange(infos) {
    const { getAttribute, value } = infos.target;
    setValue(
      infos.target.getAttribute('name'),
      infos.target.value
    );
  }

  useEffect(() => {

    const URL = window.location.hostname.includes('localhost')
      ? 'http://localhost:8080/categorias'
      : 'https://dioflixapp.herokuapp.com/categorias';
    fetch(URL)
      .then(async (respostaServidor) => {
        const resposta = await respostaServidor.json();
        setCategorias([
          ...resposta,
        ]);
      })

  }, []);

  return (
    <PageDefault>
      <h1>Cadastro de Categoria: {values.nome}</h1>

      <form onSubmit={function handleSubmit(infos){
        infos.preventDefault();
        setCategorias([
          ...categorias,
          values,
        ]);

        setValues(valoresIniciais);
      }}>

        <FormField
          label="Nome da Categoria"
          name="nome"
          type="text"
          value={values.nome}
          onChange={handleChange}
        />

        <FormField
          label="Descrição"
          name="descricao"
          type="textarea"
          value={values.descricao}
          onChange={handleChange}
        />

        <FormField
          label="Cor"
          name="cor"
          type="color"
          value={values.cor}
          onChange={handleChange}
        />

        <Button>
          Cadastrar
        </Button>
      </form>

      {categorias.length === 0 && (
        <div>
          Loading...
        </div>
      )}

      <ul>
        {categorias.map((categoria) => {
          return (
            <li key={`${categoria.nome}`}>
              {categoria.nome}
            </li>
          )
        })}
      </ul>

      <Link to="/">
        Home
      </Link>
    </PageDefault>
  )
}

export default CadastroCategoria;