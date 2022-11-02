import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserAuth } from "../contexts/AuthContext";
import Relatorios from "../components/Relatorios";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import moment from "moment";

function Report() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div
      id="main"
      className="flex h-screen overflow-hidden"
    >
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="grid grid-cols-12 gap-6">
              <div className="overflow-x-auto col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
                <header className="px-5 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-800">tabela</h2>
                </header>
                {moment.months().map((mes) => {
                  return (
                    <Relatorios
                      key={mes}
                      mes={mes}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
  // return (
  //   <div id="main" className="p-4">
  //     <nav className="font-bold pl-2 border border-black min-h-[40px] rounded mb-2 relative bg-slate-200">
  //       <div className='mt-2 float-left'>Usuario: {user.email} </div>
  //       <div className="mt-2 float-right">
  //         <Link className="mx-1 py-0 hover:cursor-pointer hover:underline hover:text-blue-600" to="/dashboard">Dashboard</Link>
  //         <a
  //           className="mx-2 button hover:cursor-pointer"
  //           onClick={handleSignOut}
  //         >
  //           Sair
  //         </a>
  //       </div>
  //     </nav>
  //     <table>
  //       <thead>
  //         <tr>
  //           <th></th>
  //           <th></th>
  //           <th>Qnt.</th>
  //           <th>Venda </th>
  //           <th>Custo</th>
  //           <th>Lucro</th>
  //         </tr>
  //       </thead>
  //       {
  //         moment.months().map(mes => {
  //           return (
  //             <Relatorios key={mes} mes={mes} />
  //           )
  //         })
  //       }
  //       <tfoot>
  //       </tfoot>
  //     </table>
  //   </div>
  // );
}

export default Report;
