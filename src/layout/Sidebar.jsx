import React, {useContext} from "react";
import { Link } from "react-router-dom";
import {layout} from "../layout";


function Wrapper({children}) {
        
  let {layoutState}  = useContext(layout)
    
  return (
      <div>
        <div
          className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 
          ${layoutState.sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          aria-hidden="true"></div>
        <div
          id="sidebar"
          className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${layoutState.sidebarOpen ? "translate-x-0" : "-translate-x-64"
            }`}>
              {children}
        </div>
      </div>
    )
  };

function Header({logo}){
  let {setLayoutState} = useContext(layout)
  return(
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          <button
            className="lg:hidden text-slate-500 hover:text-slate-400"
            aria-controls="sidebar"
            aria-expanded
            onClick={() => setLayoutState({ toggle: "sidebarOpen" })}
          >
            <span className="sr-only">Close sidebar</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="violet" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          </button>
          <Link to="/" className="block">
            <img src={logo} width={48} height={48} alt="" />
          </Link>
        </div>
  )
}

function MenuList({links}){
  
  return (
    <div className="space-y-8">
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Links
              </span>
            </h3>
            <ul className="mt-3">
              {links.map((link, index) => {
               return (<li
                key={index}
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0`}>
                <Link
                  to={link.path}
                  className={`block text-slate-200 hover:text-white truncate transition duration-150`}>
                  <div
                    className="flex items-center justify-between"
                    title={link.title}>
                    <div className="grow flex items-center">
                      <img className="bg-slate-500 rounded" src={link.icon} width={24} height={24} alt="" />
                      <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        {link.title}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>)
            })}
            </ul>
          </div>
        </div>
  )

}

function ExpandButton(){
  let { layoutState, setLayoutState} = useContext(layout)

  return (
         <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
           <div
             className="px-3 py-2"
           >
             <button onClick={() => setLayoutState({toggle:"sidebarOpen"})}>
               <span className="sr-only">Expand / collapse sidebar</span>
               <svg
                 className={`w-6 h-6 fill-current ${layoutState.sidebarOpen ? 'rotate-180': ''}`}
                 viewBox="0 0 24 24">
                 <path
                   className="text-slate-400"
                   d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                 />
                 <path className="text-slate-600" d="M3 23H1V1h2z" />
               </svg>
             </button>
           </div>
         </div>
  )
}
export default {Wrapper, MenuList, Header, ExpandButton};