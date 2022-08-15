import { useNavigate } from 'react-router-dom';

const Cliente = ({ cliente, handleEliminar }) => {
    const navigate = useNavigate();

    const { nombre, empresa, email, tel, notas, id } = cliente;

    return (
        <tr className='border hover:bg-gray-50'>
            <td className='p-3'>{nombre}</td>
            <td className='p-3'>
                <p>
                    <span className='text-gray-800 uppercase font-bold'>
                        Email:{' '}
                    </span>{' '}
                    {email}
                </p>
                <p>
                    <span className='text-gray-800 uppercase font-bold'>
                        Teléfono:{' '}
                    </span>{' '}
                    {tel}
                </p>
            </td>
            <td className='p-3'>{empresa}</td>
            <td className='p-3'>
                <button
                    type='button'
                    className='shadow-md bg-gradient-to-r from-yellow-400 to-amber-500  hover:from-yellow-500 hover:to-amber-600 block w-full text-white p-2 uppercase font-bold rounded-md text-xs active:translate-y-px'
                    onClick={() => navigate(`/clientes/${id}`)}
                >
                    Ver
                </button>

                <button
                    type='button'
                    className='shadow-md bg-gradient-to-r from-violet-500 to-violet-700  hover:from-violet-600 hover:to-violet-800 block w-full text-white p-2 uppercase font-bold rounded-md text-xs mt-3 active:translate-y-px'
                    onClick={() => navigate(`/clientes/editar/${id}`)}
                >
                    Editar
                </button>
                <button
                    type='button'
                    className='shadow-md bg-gradient-to-r from-red-500 to-red-600  hover:from-red-600 hover:to-red-700 block w-full text-white p-2 uppercase font-bold rounded-md text-xs mt-3 active:translate-y-px'
                    onClick={() => handleEliminar(id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
};

export default Cliente;
