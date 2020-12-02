import{ useState } from 'react';

function useForm(valoresIniciais){

    const [values, setValues] = useState(valoresIniciais);
  
    function setValue(chave, valor){
      setValues({
        ...values,
        [chave]: valor,
      })
    }
  
    function handleChange(infos) {
      setValue(
        infos.target.getAttribute('name'),
        infos.target.value
      );
    }
  
    function clearForm() {
      setValues(valoresIniciais);
    }
  
    return {
      values,
      handleChange,
      clearForm,
    };
}

export default useForm;
