import React from 'react'
import Form from './Form'
import Table from './Table'

const Employee = () => {
  return (
    <React.Fragment>
      <div   className="flex flex-col  lg:flex-row justify-center items-start gap-10 lg:gap-20 px-4 py-10  min-h-screen">
         <div className='flex lg:w-1/2  w-full'>
         <Form/>
       </div>
       <div className='flex lg:w-1/2 overflow-x-auto"'>
        <Table/>
       </div>
      </div>
    </React.Fragment>
  )
}

export default Employee