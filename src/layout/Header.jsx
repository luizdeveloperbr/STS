import React, { useContext } from "react";
import { layout } from "../layout";
import logo from "../style/icons/logo.png"

function Header() {

  const { layoutState, setLayoutState } = useContext(layout)

  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
      <div className="
        px-4 
        sm:px-6 
        lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          <div className="flex">
            <button
              className="
              text-slate-500 
              hover:text-slate-600 
              lg:hidden"
              onClick={() => setLayoutState({ toggle: "sidebarOpen" })}
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>
          <div className="flex items-center">
            <hr className="w-px h-6 bg-slate-200 mx-3" />

            {/* inicio */}
            <div className="relative inline-flex">
              <button
                className="inline-flex justify-center items-center group"
                aria-haspopup="true"
                onClick={() => setLayoutState({ toggle: "userMenu" })}
              >
                <img className="w-8 h-8 rounded-full" src={logo} width="32" height="32" alt="User" />
                <div className="flex items-center truncate">
                  <span className="truncate ml-2 text-sm font-medium group-hover:text-slate-800">:username:</span>
                  <svg className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400" viewBox="0 0 12 12">
                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                  </svg>
                </div>
              </button>
              <div
                className={`${layoutState.userMenu ? '' : 'hidden'} origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1`}
              >
                {/* <Transition
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      > */}
                <div>
                  <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200">
                    <div className="font-medium text-slate-800">email@site.com</div>
                    <div className="text-xs text-slate-500 italic">TEXTO</div>
                  </div>
                  <ul>
                    <li>
                      {/* <Link
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                to="/"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Sign Out
              </Link> */}
                      <a
                        className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3 hover:cursor-pointer"
                      >Sair</a>
                    </li>
                  </ul>
                </div>
                {/* </Transition> */}
              </div>
            </div>
            {/* fim */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;