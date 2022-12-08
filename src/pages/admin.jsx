import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useUserAuth } from "../contexts/AuthContext";
import User from "../components/UserList";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { user } = useUserAuth();

  const adminID = import.meta.env.VITE_ADMIN_ID;

  const adminUrl = import.meta.env.VITE_ADMIN_URL;
  useEffect(() => {
    if (user.uid === adminID) {
      console.log('effect');
      fetch(`${adminUrl}/list-users`)
        .then((response) => response.json())
        .then((data) => {
          setUsers(data)
        });
    }
  }, []);

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
                  lista de usuarios
                </header>
                <table className="w-[900px] m-5 bg-white text-black">
                  <thead>
                    <tr>
                      <th className="border border-gray-700">Email</th>
                      <th className="border border-gray-700">Senha</th>
                      <th className="border border-gray-700">Confirmar</th>
                    </tr>
                  </thead>
                  <tbody >
                    {users.length !== 0 ? (
                      users.map((userData) => (
                        <User
                          key={users.indexOf(userData)}
                          usuario={userData}
                        />
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="h-16">
                          <div className="ring-of-dots w-1 mx-auto">Carregando...</div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminPage;
