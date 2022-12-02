import { useNavigate, Form, redirect } from 'react-router-dom'
import { eliminarCliente } from '../data/clientes'

export async function action({params}) {
    await eliminarCliente(params.clienteId)
    return redirect('/')
}

function Cliente({cliente}) {

    const navigate = useNavigate()

    const { nombre, empresa, email, telefonia, id } = cliente

    return (
        <div>
            <tr className="border-b">
                <td className="p-6 space-y-2">
                    <p className="text-2xl text-gray-800">{nombre}</p>
                    <p>{empresa}</p>
                </td>
                <td className="p-6">
                    <p className="text-gray-600"> <span className="text-gray-800 uppercase font-bold">Email: </span>{email}</p>
                    <p className="text-gray-600"> <span className="text-gray-800 uppercase font-bold">TEL: </span>{telefonia}</p>
                </td>
                <td className="p-6 flex gap-3">
                    <button 
                        type="button"
                        className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs"
                        onClick={ () => navigate(`/clientes/${id}/editar`) }
                    >Editar</button>
                    <Form 
                        method='POST' 
                        action={`/clientes/${id}/eliminar`} 
                        onSubmit={(e) => {
                            if(!confirm('¿Deseas eliminar este registro?')) {
                                e.preventDefault()
                            }
                        }}
                    >
                        <button
                            type="submit"
                            className="text-red-600 hover:text-red uppercase font-bold text-xs"
                        >Eliminar</button>
                    </Form>
                </td>
            </tr>
        </div>
    )
}

export default Cliente