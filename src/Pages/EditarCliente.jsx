import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Formulario from '../components/Formulario';

const EditarCliente = () => {
    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        const obtenerClienteAPI = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`;
                const response = await fetch(url);
                const resultado = await response.json();
                setCliente(resultado);
            } catch (error) {
                console.log(error);
            }

            setTimeout(() => {
                setCargando(!cargando);
            }, 500);
        };
        obtenerClienteAPI();
    }, []);

    return (
        <>
            <h1 className='font-black text-4xl text-yellow-400'>
                Editar Cliente
            </h1>
            <p className='mt-3'>
                Utiliza este formulario para editar datos de un cliente
            </p>

            {cliente?.nombre ? (
                <Formulario cliente={cliente} cargando={cargando} />
            ) : (
                <p>Cliente ID no valido!</p>
            )}
        </>
    );
};

export default EditarCliente;
