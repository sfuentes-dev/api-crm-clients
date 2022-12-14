import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

const VerCliente = () => {
    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        const obtenerClienteAPI = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`;
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

    return cargando ? (
        <Spinner />
    ) : Object.keys(cliente).length === 0 ? (
        <p>No hay Resultados!</p>
    ) : (
        <div>
            <h1 className='font-black text-4xl text-yellow-400'>
                Ver Cliente: {cliente.nombre}
            </h1>
            <p className='mt-3'>Información del Cliente</p>

            <p className='text-4xl text-slate-800 mt-10'>
                <span className='uppercase font-bold'>Cliente: </span>
                {cliente.nombre}
            </p>

            <p className='text-2xl text-slate-800 mt-2.5'>
                <span className='uppercase font-bold'>Email: </span>
                {cliente.email}
            </p>

            {cliente.tel && (
                <p className='text-2xl text-slate-800 mt-2.5'>
                    <span className='uppercase font-bold'>Teléfono: </span>
                    {cliente.tel}
                </p>
            )}

            <p className='text-2xl text-slate-800 mt-2.5'>
                <span className='uppercase font-bold'>Empresa: </span>
                {cliente.empresa}
            </p>

            {cliente.notas && (
                <p className='text-2xl text-slate-800 mt-2.5'>
                    <span className='uppercase font-bold'>Notas: </span>
                    {cliente.notas}
                </p>
            )}
        </div>
    );
};

export default VerCliente;
