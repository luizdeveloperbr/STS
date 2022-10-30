import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserAuth } from "../contexts/AuthContext";
import User from '../components/UserList';



function AdminPage() {
  const [users, setUsers] = useState([]);
  const {user} = useUserAuth()
  const adminID = import.meta.env.VITE_ADMIN_ID
  useEffect(() => {
    if(user.uid === adminID){
      fetch('https://admin.meucontroledevendas.net/v1/list-users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
    }
  }, []);

  return (
    <div id="main" className="p-4">
      <nav className="font-bold pl-2 border border-black min-h-[40px] rounded mb-2 relative bg-slate-200">
        <div className='mt-2 float-left'>Usuario: {user.email} </div>
        <div className="mt-2 float-right">
          {/* <Link className="mx-1 py-0 hover:cursor-pointer hover:underline hover:text-blue-600" to="/relatorio">Relatorios</Link> */}

          <Link className="mx-1 button hover:cursor-pointer" to="/dashboard">Dashboard</Link>
        </div>
      </nav>
     <div className='bg-slate-200 border-2 border-black p-2 m-16 mt-8 rounded-md shadow-lg'>
       <table className='w-full bg-white'>
         <thead>
           <tr>
             <th className='border border-gray-700'>Email</th>
             <th className='border border-gray-700'>Senha</th>
             <th className='border border-gray-700'>Confirmar</th>
           </tr>
         </thead>
         <tbody>
             {
             users.length !== 0 ? users.map(userData => <User key={users.indexOf(userData)} usuario={userData} />)
             :
             <tr>
              <td colSpan="3" className="h-16">
                <div className="ring-of-dots w-1 mx-auto"></div>
              </td>
             </tr>
             }
         </tbody>
       </table>
     </div>
    </div>
  );
}

export default AdminPage;
