import React from "react";
import { useLayoutContext } from '../contexts/useLayoutContext'
import { Link } from "react-router-dom";

function Wrapper({children}) {
        
  let { layoutState } = useLayoutContext()
    
  return (
      <div>
        <div
          className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 
          ${layoutState.sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          aria-hidden="true"></div>
        <div
          id="sidebar"
          className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:overflow-y-scroll lg:left-auto lg:top-auto lg:translate-x-0 h-screen no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${layoutState.sidebarOpen ? "translate-x-0" : "-translate-x-64"
            }`}>
              {children}
        </div>
      </div>
    )
  };

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
                      <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                        <path
                          className="fill-current text-slate-600 false"
                          d="M8 1v2H3v19h18V3h-5V1h7v23H1V1z"></path>
                        <path
                          className="fill-current text-slate-600 false"
                          d="M1 1h22v23H1z"></path>
                        <path
                          className="fill-current text-slate-400 false"
                          d="M15 10.586L16.414 12 11 17.414 7.586 14 9 12.586l2 2zM5 0h14v4H5z"></path>
                      </svg>
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


export default {Wrapper, MenuList};


// function Sidebarf() {

//   let { layoutState, setLayoutState } = useLayoutContext()

//   return (
//     <div>
//       {/* Sidebar backdrop (mobile only) */}
//       <div
//         className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${layoutState.sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//           }`}
//         aria-hidden="true"></div>

//       {/* Sidebar */}
//       <div
//         id="sidebar"
//         className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:overflow-y-scroll lg:left-auto lg:top-auto lg:translate-x-0 h-screen no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${layoutState.sidebarOpen ? "translate-x-0" : "-translate-x-64"
//           }`}>
//         {/* Sidebar header */}
//         <div className="flex justify-between mb-10 pr-3 sm:px-2">
//           {/* Close button */}
//           <button
//             className="lg:hidden text-slate-500 hover:text-slate-400"
//             // onClick={() => setSidebarOpen(!sidebarOpen)}
//             aria-controls="sidebar"
//             aria-expanded
//             onClick={() => setLayoutState({ toggle: "sidebarOpen" })}
//           >
//             <span className="sr-only">Close sidebar</span>
//             <svg
//               className="w-6 h-6 fill-current"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg">
//               <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
//             </svg>
//           </button>
//           {/* Logo */}
//           <Link to="/" className="block">
//             <svg width="32" height="32" viewBox="0 0 32 32">
//               <defs>
//                 <linearGradient
//                   x1="28.538%"
//                   y1="20.229%"
//                   x2="100%"
//                   y2="108.156%"
//                   id="logo-a">
//                   <stop
//                     stopColor="#A5B4FC"
//                     stopOpacity="0"
//                     offset="0%"></stop>
//                   <stop stopColor="#A5B4FC" offset="100%"></stop>
//                 </linearGradient>
//                 <linearGradient
//                   x1="88.638%"
//                   y1="29.267%"
//                   x2="22.42%"
//                   y2="100%"
//                   id="logo-b">
//                   <stop
//                     stopColor="#38BDF8"
//                     stopOpacity="0"
//                     offset="0%"></stop>
//                   <stop stopColor="#38BDF8" offset="100%"></stop>
//                 </linearGradient>
//               </defs>
//               <rect fill="#6366F1" width="32" height="32" rx="16"></rect>
//               <path
//                 d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
//                 fill="#4F46E5"></path>
//               <path
//                 d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
//                 fill="url(#logo-a)"></path>
//               <path
//                 d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
//                 fill="url(#logo-b)"></path>
//             </svg>
//           </Link>
//         </div>

//         {/* Links */}
//         <div className="space-y-8">
//           {/* Pages group */}
//           <div>
//             <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
//               <span
//                 className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
//                 aria-hidden="true">
//                 •••
//               </span>
//               <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
//                 Links
//               </span>
//             </h3>
//             <ul className="mt-3">
//               <li
//                 id="dashboard"
//                 // data-content="Efetuar Venda"
//                 className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0`}>
//                 <Link
//                   to="/dashboard"
//                   className={`block text-slate-200 hover:text-white truncate transition duration-150`}>
//                   <div
//                     className="flex items-center justify-between"
//                     title="Vendas">
//                     <div className="grow flex items-center">
//                       <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
//                         <path
//                           className="fill-current text-slate-600 false"
//                           d="M8 1v2H3v19h18V3h-5V1h7v23H1V1z"></path>
//                         <path
//                           className="fill-current text-slate-600 false"
//                           d="M1 1h22v23H1z"></path>
//                         <path
//                           className="fill-current text-slate-400 false"
//                           d="M15 10.586L16.414 12 11 17.414 7.586 14 9 12.586l2 2zM5 0h14v4H5z"></path>
//                       </svg>
//                       <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
//                         Vendas
//                       </span>
//                     </div>
//                   </div>
//                 </Link>
//               </li>
//               {/* Messages */}
//               <li
//                 className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 `}>
//                 <Link
//                   to="/venda-por-usuario"
//                   className={`block text-slate-200 hover:text-white truncate transition duration-150`}>
//                   <div
//                     className="flex items-center justify-between"
//                     title="Vendas por Usuario">
//                     <div className="grow flex items-center">
//                       <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
//                         <path
//                           className="fill-current text-slate-600 false"
//                           d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"></path>
//                         <path
//                           className="fill-current text-slate-400 false"
//                           d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"></path>
//                       </svg>
//                       <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
//                         Vendas por Usuario
//                       </span>
//                     </div>
//                   </div>
//                 </Link>
//               </li>
//               <li
//                 className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0`}>
//                 <Link
//                   to="/relatorio"
//                   className={`block text-slate-200 hover:text-white truncate transition duration-150 `}>
//                   <div
//                     className="flex items-center justify-between"
//                     title="Relatorios">
//                     <div className="grow flex items-center">
//                       <svg
//                         className="fill-slate-400"
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 8 8">
//                         <path d="M7.03 0l-3.03 3-1-1-3 3.03 1 1 2-2.03 1 1 4-4-.97-1zm-7.03 7v1h8v-1h-8z" />
//                       </svg>
//                       <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
//                         Relatorios
//                       </span>
//                     </div>
//                   </div>
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//         {/* <Tooltip
//                   anchorId="dashboard"
                  
//                   place="right"
//                   // events={['hover']}
//                 /> */}
//         {/* Expand / collapse button */}
//         <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
//           <div
//             className="px-3 py-2"
//           >
//             <button onClick={() => undefined}>
//               <span className="sr-only">Expand / collapse sidebar</span>
//               <svg
//                 className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
//                 viewBox="0 0 24 24">
//                 <path
//                   className="text-slate-400"
//                   d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
//                 />
//                 <path className="text-slate-600" d="M3 23H1V1h2z" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

