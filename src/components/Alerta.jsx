const Alerta = ({ children }) => {
    return (
        <div className='text-center my-4  bg-gradient-to-r from-red-600 to-red-700 text-white font-bold p-3 uppercase rounded-md'>
            {children}
        </div>
    );
};

export default Alerta;
