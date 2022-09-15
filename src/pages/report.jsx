import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserAuth } from '../contexts/AuthContext';
import Relatorios from '../components/Relatorios';
import moment from 'moment';

function Report() {

  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  async function handleSignOut() {
    await logOut();
    navigate('/');
  }

  return (
    <div id="main" className="p-4">
      <nav className="font-bold pl-2 border border-black min-h-[40px] rounded mb-2 relative bg-slate-200">
        <div className='mt-2 float-left'>Usuario: {user.email} </div>
        <div className="mt-2 float-right">
          <Link className="mx-1 py-0 hover:cursor-pointer hover:underline hover:text-blue-600" to="/dashboard">Dashboard</Link>
          <a
            className="mx-2 button hover:cursor-pointer"
            onClick={handleSignOut}
          >
            Sair
          </a>
        </div>
      </nav>
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Qnt.</th>
            <th>Venda </th>
            <th>Custo</th>
            <th>Lucro</th>
          </tr>
        </thead>
        {
          moment.months().map(mes => {
            return (
              <Relatorios key={mes} mes={mes} />
            )
          })
        }
        <tfoot>
        </tfoot>
      </table>
    </div>
  );
}

export default Report;
