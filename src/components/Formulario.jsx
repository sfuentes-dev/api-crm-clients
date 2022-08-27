import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import Alerta from './Alerta';
import Spinner from './Spinner';

const Formulario = ({ cliente, cargando }) => {
    const navigate = useNavigate();

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
            .min(3, 'El nombre es muy corto')
            .max(20, 'El nombre es muy largo')
            .required('El Nombre del Cliente es Obligatorio'),

        empresa: Yup.string().required(
            'El nombre de la empresa es obligatorio'
        ),

        email: Yup.string()
            .email('Email no válido')
            .required('El email es obligatorio'),

        tel: Yup.number()
            .positive('Número no válido')
            .integer('Número no válido')
            .typeError('El número no es válido'),
    });

    const handleSubmit = async (values) => {
        try {
            let response;
            if (cliente.id) {
                //Editando un registro
                const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`;
                response = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            } else {
                // Nuevo Registro
                const url = import.meta.env.VITE_API_URL;
                response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }
            await response.json();
            navigate('/clientes');
        } catch (error) {
            console.log(error);
        }
    };

    return cargando ? (
        <Spinner />
    ) : (
        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
            <h1 className='text-slate-700 font-bold text-xl uppercase text-center'>
                {cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
            </h1>

            <Formik
                initialValues={{
                    nombre: cliente?.nombre ?? '',
                    empresa: cliente?.empresa ?? '',
                    email: cliente?.email ?? '',
                    tel: cliente?.tel ?? '',
                    notas: cliente?.notas ?? '',
                }}
                enableReinitialize={true}
                onSubmit={async (values, { resetForm }) => {
                    await handleSubmit(values);
                    resetForm();
                }}
                validationSchema={nuevoClienteSchema}
            >
                {({ errors, touched }) => {
                    return (
                        <Form className='mt-10'>
                            <div className='mb-4'>
                                <label
                                    className='text-slate-800 font-bold'
                                    htmlFor='nombre'
                                >
                                    Nombre:
                                </label>
                                <Field
                                    id='nombre'
                                    type='text'
                                    name='nombre'
                                    placeholder='Nombre del cliente'
                                    className='mt-2 block w-full p-3 bg-gray-50'
                                />

                                {errors.nombre && touched.nombre ? (
                                    <Alerta>{errors.nombre}</Alerta>
                                ) : null}
                            </div>

                            <div className='mb-4'>
                                <label
                                    className='text-slate-800 font-bold'
                                    htmlFor='empresa'
                                >
                                    Empresa:
                                </label>
                                <Field
                                    id='empresa'
                                    type='text'
                                    name='empresa'
                                    placeholder='Empresa del cliente'
                                    className='mt-2 block w-full p-3 bg-gray-50'
                                />
                                {errors.empresa && touched.empresa ? (
                                    <Alerta>{errors.empresa}</Alerta>
                                ) : null}
                            </div>

                            <div className='mb-4'>
                                <label
                                    className='text-slate-800 font-bold'
                                    htmlFor='email'
                                >
                                    Email:
                                </label>
                                <Field
                                    id='email'
                                    type='email'
                                    name='email'
                                    placeholder='Email del cliente'
                                    className='mt-2 block w-full p-3 bg-gray-50'
                                />

                                {errors.email && touched.email ? (
                                    <Alerta>{errors.email}</Alerta>
                                ) : null}
                            </div>

                            <div className='mb-4'>
                                <label
                                    className='text-slate-800 font-bold'
                                    htmlFor='tel'
                                >
                                    Teléfono:
                                </label>
                                <Field
                                    id='tel'
                                    type='tel'
                                    name='tel'
                                    placeholder='Teléfono del cliente'
                                    className='mt-2 block w-full p-3 bg-gray-50'
                                />

                                {errors.tel && touched.tel ? (
                                    <Alerta>{errors.tel}</Alerta>
                                ) : null}
                            </div>

                            <div className='mb-4'>
                                <label
                                    className='text-slate-800 font-bold'
                                    htmlFor='notas'
                                >
                                    Notas:
                                </label>
                                <Field
                                    as='textarea'
                                    id='notas'
                                    type='text'
                                    name='notas'
                                    placeholder='Notas del cliente'
                                    className='mt-2 block w-full p-3 bg-gray-50'
                                />
                                {errors.notas && touched.notas ? (
                                    <Alerta>{errors.notas}</Alerta>
                                ) : null}
                            </div>

                            <input
                                type='submit'
                                value={
                                    cliente?.nombre
                                        ? 'Editar Cliente'
                                        : 'Agregar Cliente'
                                }
                                className='mt-5 w-full p-3 text-white uppercase font-bold text-lg rounded-md shadow-md bg-gradient-to-r from-yellow-400 to-amber-500 active:translate-y-px cursor-pointer hover:from-yellow-300 hover:to-amber-400'
                            />
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

Formulario.defaultProps = {
    cliente: {},
    cargando: false,
};

export default Formulario;
