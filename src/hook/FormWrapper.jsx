import React from "react"

export function FormWrapper({ title, children }) {
  return (
    <div >
      <div >
        <div className="text-center font-bold text-2xl mb-8">
          {title}
        </div>
        {children}
      </div>
    </div>
  )
}