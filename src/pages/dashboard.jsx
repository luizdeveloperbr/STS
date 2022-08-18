import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Timestamp,
  collection,
  setDoc,
  doc
} from 'firebase/firestore';
import { db } from '../firebase';
import { dashboardRealtime } from '../firebase/controller';
import { useUserAuth } from '../contexts/AuthContext';
import VendaColuna from '../components/VendaColuna';
import moment from 'moment';
import { orderBy } from "lodash"
import { Form, Formik, Field } from 'formik';

function Dashboard() {
  const [todos, setTodos] = useState([])
  const [custoUnitario, setCustoUnitario] = useState(4)
  const [reload, setReload] = useState(true)


  const ontem = moment.unix(Timestamp.now().seconds).subtract(1, "d").format("YYYY-MM-DD")
  const hoje = moment.unix(Timestamp.now().seconds).format("YYYY-MM-DD")

  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  async function novoRegistro(values) {
    const docRef = doc(collection(db, user.uid));
    const mesSubmit = moment(values.datetime).format("YYYY-MM")
    await setDoc(docRef, { ...values, created_at: Timestamp.now(), mes: mesSubmit, custoUnitario, id: docRef.id });
  }

  async function handleSignOut() {
    await logOut();
    navigate('/');
  }
  const todosOrder = orderBy(todos, ["created_at"], "desc")

  useEffect(() => {
    dashboardRealtime(user.uid, [ontem, hoje], setTodos)
  }, [reload]);

  return (
    <div id="main" className="p-4">
      <nav className="font-bold pl-2 border border-black min-h-[40px] rounded mb-2 relative bg-slate-200">
        <div className='mt-2 float-left'>Usuario: {user.email} </div>
        <div className="mt-2 float-right">
          <Link className="mx-1 py-0 hover:cursor-pointer hover:underline hover:text-blue-600" to="/relatorio">Relatorios</Link>
          <a
            className="mx-1 button hover:cursor-pointer"
            onClick={handleSignOut}
          >
            Sair
          </a>
          <Link className="mx-1 button hover:cursor-pointer" to="/trocar-senha">trocar senha</Link>
        </div>
      </nav>
      <Formik
        initialValues={{
          userID: '',
          userName: '',
          banco: '',
          tipo: 'R',
          datetime: moment.unix(Timestamp.now().seconds).format('YYYY-MM-DD'),
          quantidade: 0,
          valorVenda: 0,
          confirmado: false
        }}
        onSubmit={novoRegistro}
      >
        {({ isSubmitting }) => (
          <Form className="w-full flex">
            <label className="m-1 grid text-sm" htmlFor="datetime">
              Data
              <Field
                type="date"
                min={moment.unix(Timestamp.now().seconds).format('YYYY-MM-DD')}
                name="datetime"
                className="form-input"
                required
              />
            </label>
            <label className="m-1 grid text-sm" htmlFor="userID">
              Usuario
              <Field
                required
                className="form-input min-w-[160px]"
                name="userID"
                placeholder="Br1234"
              />
            </label>
            <label className="m-1 grid text-sm" htmlFor="userName">
              Nome
              <Field
                required
                className="form-input min-w-[160px]"
                name="userName"
                placeholder="Ex. João"
              />
            </label>
            <label className="m-1 grid text-sm" htmlFor="custoUnitario">
              Custo Unitario
              <input
                required
                onChange={e => setCustoUnitario(e.target.value)}
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
              <button type="reset" className="clear min-w-[25px] text-[#fff0]">.
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="tabela table border-collapse overflow-y-hidden">
        <div className="flex justify-start" id="h">
          <div className="header w-[150px]">Data</div>
          <div className="header w-[150px]">Usuario</div>
          <div className="header w-[150px]">Nome</div>
          <form className="flex" action="">
            <div className="header w-[90px]">Tipo</div>
            <div className="header w-[150px]">Banco</div>
            <div className="header w-[90px]">Licenças</div>
            <div className="header w-[110px]">$ - Venda</div>
            <div className="header w-[110px]">$ - Custo</div>
            <div className="header w-[110px]">Lucro</div>
            <div className="header w-[110px]">Confirmado</div>
            <div className="header w-[40px]">
              {todos.length === 0 ? <a onClick={() => setReload(!reload)} className="p-2 reload hover:cursor-pointer">
              </a> : <></>}
            </div>
          </form>
        </div>
        {
          todosOrder.map(vendaID => {
            return <VendaColuna key={vendaID.id} venda={vendaID} />
          })
        }
      </div>
    </div>
  );
}

export default Dashboard;
