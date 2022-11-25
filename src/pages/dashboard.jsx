import { useEffect, useState } from "react";
// import { useNavigate, Link } from 'react-router-dom';
import { Timestamp, collection, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { dashboardRealtime } from "../firebase/controller";
import { useUserAuth } from "../contexts/AuthContext";
import VendaColuna from "../components/VendaColuna";
import moment from "moment";
import { orderBy } from "lodash";
import { Form, Formik, Field } from "formik";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
// import Trash from "../assets/open-iconic-master/svg/trash.svg";
function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [custoUnitario, setCustoUnitario] = useState(4);
  const [reload, setReload] = useState(true);
  // layout sidepanel
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const ontem = moment
    .unix(Timestamp.now().seconds)
    .subtract(1, "d")
    .format("YYYY-MM-DD");
  const hoje = moment.unix(Timestamp.now().seconds).format("YYYY-MM-DD");

  const { user } = useUserAuth();

  async function novoRegistro(values) {
    const docRef = doc(collection(db, user.uid));
    const mesSubmit = moment(values.datetime).format("YYYY-MM");
    await setDoc(docRef, {
      ...values,
      created_at: Timestamp.now(),
      mes: mesSubmit,
      custoUnitario,
      id: docRef.id,
    });
  }

  const todosOrder = orderBy(todos, ["created_at"], "desc");

  useEffect(() => {
    dashboardRealtime(user.uid, [ontem, hoje], setTodos);
  }, [reload]);

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
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <Formik
                  initialValues={{
                    userID: "",
                    userName: "",
                    banco: "",
                    tipo: "R",
                    datetime: moment
                      .unix(Timestamp.now().seconds)
                      .format("YYYY-MM-DD"),
                    quantidade: 0,
                    valorVenda: 0,
                    confirmado: false,
                  }}
                  onSubmit={novoRegistro}
                >
                  {({ isSubmitting }) => (
                    <Form className="w-full flex">
                      <label
                        className="m-1 grid text-sm"
                        htmlFor="datetime"
                      >
                        Data
                        <Field
                          type="date"
                          min={moment
                            .unix(Timestamp.now().seconds)
                            .format("YYYY-MM-DD")}
                          name="datetime"
                          className="form-input"
                          required
                        />
                      </label>
                      <label
                        className="m-1 grid text-sm"
                        htmlFor="userID"
                      >
                        Usuario
                        <Field
                          required
                          className="form-input min-w-[160px]"
                          name="userID"
                          placeholder="Br1234"
                        />
                      </label>
                      <label
                        className="m-1 grid text-sm"
                        htmlFor="userName"
                      >
                        Nome
                        <Field
                          required
                          className="form-input min-w-[160px]"
                          name="userName"
                          placeholder="Ex. João"
                        />
                      </label>
                      <label
                        className="m-1 grid text-sm"
                        htmlFor="custoUnitario"
                      >
                        Custo Unitario
                        <input
                          required
                          onChange={(e) => setCustoUnitario(e.target.value)}
                          type="number"
                          step="0.5"
                          min="4"
                          className="form-input w-[90px]"
                          name="custoUnitario"
                          value={custoUnitario}
                          placeholder="R$ X,XX"
                        />
                      </label>
                      <div className="self-end pb-2">
                        <button
                          type="submit"
                          className="hidden"
                          disabled={isSubmitting}
                        ></button>
                        <button
                          type="reset"
                          className="min-w-[25px]"
                        >
                          <svg
                          className="fill-slate-600"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 8 8"
                          >
                            <path d="M3 0c-.55 0-1 .45-1 1h-1c-.55 0-1 .45-1 1h7c0-.55-.45-1-1-1h-1c0-.55-.45-1-1-1h-1zm-2 3v4.81c0 .11.08.19.19.19h4.63c.11 0 .19-.08.19-.19v-4.81h-1v3.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-3.5h-1v3.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-3.5h-1z" />
                          </svg>
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <div className="overflow-x-auto col-span-full bg-white shadow-lg rounded-sm border border-slate-200">
                <header className="px-5 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-800">Clientes</h2>
                </header>
                <div className="tabela table border-collapse">
                  <div
                    className="flex justify-start font-semibold text-slate-600 bg-slate-50"
                    id="h"
                  >
                    <div className="p-2  text-center w-[150px]">Data</div>
                    <div className="p-2  text-center w-[150px]">Usuario</div>
                    <div className="p-2  text-center w-[150px]">Nome</div>
                    <form
                      className="flex"
                      action=""
                    >
                      <div className="p-2 text-center  w-[90px]">Tipo</div>
                      <div className="p-2 text-center  w-[140px]">Banco</div>
                      <div className="p-2 text-center  w-[90px]">Licenças</div>
                      <div className="p-2 text-center  w-[110px]">
                        $ - Venda
                      </div>
                      <div className="p-2 text-center  w-[110px]">
                        $ - Custo
                      </div>
                      <div className="p-2 text-center  w-[110px]">Lucro</div>
                      <div className="p-2 text-center  w-[110px]">
                        Confirmado
                      </div>
                      <div className="p-2 text-center  w-[40px]">
                        {todos.length === 0 ? (
                          <a
                            onClick={() => setReload(!reload)}
                            className="my-auto text-center hover:cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 8 8"
                            >
                              <path
                                d="M4 0c-1.65 0-3 1.35-3 3h-1l1.5 2 1.5-2h-1c0-1.11.89-2 2-2v-1zm2.5 1l-1.5 2h1c0 1.11-.89 2-2 2v1c1.65 0 3-1.35 3-3h1l-1.5-2z"
                                transform="translate(0 1)"
                              />
                            </svg>
                          </a>
                        ) : (
                          <></>
                        )}
                      </div>
                    </form>
                  </div>
                  {todosOrder.map((vendaID) => {
                    return (
                      <VendaColuna
                        key={vendaID.id}
                        venda={vendaID}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
