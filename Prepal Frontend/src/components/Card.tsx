import type React from "react"

interface CardProps {
  title: string
  children: React.ReactNode
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {children}
      </div>
    </div>
  )
}

export default Card