import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import useForm from '../../../hooks/useForm';
import Button from '../../../components/Button';
import videoRepository from '../../../repository/videos';
import categoriasRepository from '../../../repository/categorias';

function CadastroVideo() {

  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const categoryTitles = categorias.map(({ titulo }) => titulo);

  const { handleChange, values } = useForm({

    titulo: 'Video Padrão',
    url: 'https://www.youtube.com/watch?v=o7cpQezokTs&list=RDEMSpb02IdcLqFoSrTWO3DRlA&index=10&ab_channel=yupsure',
    categoria: 'Music',
  });

  useEffect(() => {
    categoriasRepository
      .getAll()
      .then((categoriasFromServer) => {
        setCategorias(categoriasFromServer);
      });    
  }, []);

  console.log(categorias);

  return (
    <PageDefault>
      <h1>Cadastro de Video</h1>

      <form onSubmit={(e) => {
        e.preventDefault();

        const categoriaEscolhida = categorias.find((categoria) => {
          return categoria.titulo === values.categoria
        });

        videoRepository.create({
          titulo: values.titulo,
          url: values.url,
          categoriaId: categoriaEscolhida.id,
        })
          .then(() => {
            console.log('Cadastrado com sucesso!');
            history.push('/');
          })

        history.push('/');
      }}>
        <FormField
          label="Titulo do Video"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />

        <FormField
          label="URL"
          name="url"
          value={values.url}
          onChange={handleChange}
        />

        <FormField
          label="Categoria"
          name="categoria"
          value={values.categoria}
          onChange={handleChange}
          suggestions={categoryTitles}
        />      

        <Button type="submit">
          Cadastrar
        </Button>
      </form>

      <Link to="/cadastro/categoria">
        Cadastrar Categoria
      </Link>
    </PageDefault>
  )
}

export default CadastroVideo;