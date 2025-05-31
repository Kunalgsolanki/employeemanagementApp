import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const Form = () => {
    const {data,setData,setTask,task} = useContext(AppContext);
    const handleData = (e)=>{
          e.preventDefault();
         const name = e.target.name;
         const value = e.target.value;
         setData((pre)=>{
             return {...pre, [name]:value}
         })
    }
   const handleAdd =()=>{
    setTask((pre)=>[...pre,data])
    window.localStorage.setItem("task",JSON.stringify(task))
   }
  return (
    <form  className="w-full bg-slate-200 shadow-2xl p-6 rounded-xl flex flex-col justify-center items-center gap-8">
      <h1 className="font-bold text-3xl text-center">Task Form</h1>
      <div className="flex flex-col lg:flex-row gap-4 w-full max-w-xl">
        <label htmlFor="task" className="text-xl w-full lg:w-1/3">Task Name:</label>
        <input
        onChange={(e)=>handleData(e)}
         value={data.task_name}
         required
          type="text"
          name="task_name"
          id="task"
          placeholder="Task Name"
          className="p-2 border rounded w-full"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 w-full max-w-xl">
        <label htmlFor="desc" className="text-xl w-full lg:w-1/3">Description:</label>
        <input
        onChange={handleData}
         value={data.task_desc}
          required
          type="text"
          name="task_desc"
          id="desc"
          placeholder="Task Description"
          className="p-2 border rounded w-full"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 w-full max-w-xl">
        <label htmlFor="assignedDate" className="text-xl w-full lg:w-1/3">Assigned Date:</label>
        <input
        onChange={handleData}
         value={data.task_assigDate}
          required
          type="datetime-local"
          name="task_assigDate"
          id="assignedDate"
          className="p-2 border rounded w-full"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 w-full max-w-xl">
        <label htmlFor="assignedBy" className="text-xl w-full lg:w-1/3">Assigned By:</label>
        <input
        onChange={handleData}
           value={data.task_assigneby}
          required
          type="text"
          name="task_assigneby"
          id="assignedBy"
          placeholder="Assigned By"
          className="p-2 border rounded w-full"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 w-full max-w-xl">
        <label htmlFor="status" className="text-xl w-full lg:w-1/3">Task Status:</label>
        <select name="task_status" defaultValue="Pending" id="status" onChange={handleData} value={data.task_status} className="p-2 border rounded w-full">
          <option value="Completed">Completed</option>
          <option value="InProcess">In Process</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <div  className='flex justify-center '>
     <button onClick={handleAdd} type='button' className="bg-gray-900 text-white text-xl rounded-lg px-6 py-3 hover:bg-slate-600 hover:text-black transition duration-200">
    Add Task
    </button>

      </div>
    </form>
  );
};

export default Form;
