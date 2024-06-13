import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';

const FormularioPresentacion = () => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      nombre: '',
      imagen: null,
      titulos: [
        { titulo: '', video: null },
        { titulo: '', video: null },
        { titulo: '', video: null }
      ]
    }
  });

  const { fields } = useFieldArray({
    control,
    name: 'titulos'
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('nombre', data.nombre);
    formData.append('imagen', data.imagen[0]);

    data.titulos.forEach((titulo, index) => {
      formData.append(`titulos[${index}][titulo]`, titulo.titulo);
      formData.append(`titulos[${index}][video]`, titulo.video[0]);
    });

    try {
      const response = await axios.post('http://localhost:3000/presentar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Datos de presentación guardados exitosamente', response.data);
    } catch (error) {
      console.error('Error al guardar los datos de presentación', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nombre de la presentación</label>
        <input type="text" {...register('nombre', { required: true })} />
      </div>
      <div>
        <label>Imagen</label>
        <input type="file" {...register('imagen', { required: true })} />
      </div>
      {fields.map((item, index) => (
        <div key={item.id}>
          <label>Título {index + 1}</label>
          <input type="text" {...register(`titulos[${index}][titulo]`, { required: true })} />
          <label>Video {index + 1}</label>
          <input type="file" {...register(`titulos[${index}][video]`, { required: true })} />
        </div>
      ))}
      <button type="submit">Enviar</button>
    </form>
  );
};

export default FormularioPresentacion;
