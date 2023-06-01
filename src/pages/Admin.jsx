import React, { useEffect, useState } from "react";
import { useUserAuth } from "../contexts/AuthContext";
import User from "../components/UserList";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { Link } from "react-router-dom";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reload, setReload ] = useState(false)

  const { user } = useUserAuth();

  const adminID = import.meta.env.VITE_ADMIN_ID;

  const adminUrl = import.meta.env.VITE_ADMIN_URL;

  useEffect(() => {
    setUsers([])
    if (user.uid === adminID) {
      fetch(`${adminUrl}user/all`)
        .then((response) => response.json())
        .then((data) => {
          setUsers(data)
        }); 
    }
  }, [reload]);

  return (
    <div id="main" className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="grid grid-cols-12 gap-6">
              <div className="overflow-x-auto col-span-full bg-white shadow-lg rounded-sm border border-slate-200">
                <header className="flex gap-2 px-5 py-4 border-b border-slate-100">
                  Lista de Usuarios
                  <Link className="btn bg-slate-400" to="/admin/cadastro">Novo</Link>
                </header>
                <div className="px-4">
                {users.length !== 0 ? (
                  <>
                    {users.map((userData) => (
                        <User
                        key={userData.email}
                        usuario={userData}
                        reload={setReload}
                        state={reload}
                      />
                    ))}
                  </>
                ) : (
                  <div className="spinning-dots w-1 mx-auto">Carregando...</div>
                )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );

}

export default AdminPage;
