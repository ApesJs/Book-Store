import clsx from 'clsx';

function Table({children}){
    return(
    <div className="overflow-x-auto relative bg-white shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 divide-y divide-gray-200">
                {children}
        </table>
    </div>
    )
}

function Td ({children, className}) {
    return (
        <td className={clsx('py-3 px-4 whitespace-nowrap', className)}>
            {children}
        </td>
    )
}
function Th ({children, className}) {
    return (
        <th scope="col" className={clsx('py-3 px-4', className)}>
            {children}
        </th>
    )
}
function Tbody ({children}) {
    return (
        <tbody className="divide-y divide-gray-200">
            {children}
        </tbody>
    )
}
function Thead ({children}) {
    return (
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            {children}
        </thead>
    )
}
function Empty ({colSpan, message = 'The Item is Empty'}) {
    return (
        <tr>
            <td colSpan={colSpan}>
                <div className='flex items-center justify-center h-96'>
                    <div className='text-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                        </svg>
                        <div className='mt-5'>{message}</div>
                    </div>
                </div>
            </td>
        </tr>
    )
}

Table.Td = Td;
Table.Th = Th;
Table.Tbody = Tbody;
Table.Thead = Thead;
Table.Empty = Empty;

export default Table;