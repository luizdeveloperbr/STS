import React, { useContext } from 'react';
import { useLayoutContext } from '../contexts/useLayoutContext'
function Header() {

  const { layoutState, setLayoutState } = useLayoutContext()

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
            {layoutState.sidebarOpened ? "sim":"não"}
            <button onClick={() => setLayoutState({toggle: "sidebarOpened"})}>»</button>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;