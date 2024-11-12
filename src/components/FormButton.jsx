import React from 'react'

const FormButton = ({bg,title,type,text,h, }) => {
  return (
    <div className={`w-full ${h} rounded-lg ${bg} ${text}`}>
        <button type={type} className='font-bold w-full h-full'>{title}</button>
    </div>
  )
}

export default FormButton