import {createContext, useState} from "react"


const defaultTask = {
   task_name :"",
       task_desc:"",
       task_assigDate:"",
       task_assigneby:"",
       task_status:""
}
const AppContext = createContext({
    data :defaultTask,
    setData:()=>{
    },
    task :[],
    setTask:()=>{
    }
});

const AppProvider =({children})=>{
       const [data, setData] = useState(defaultTask);
       const [task, setTask] = useState([])
     return(
        <AppContext.Provider value={{data, setData,task,setTask}}>
             {children}
        </AppContext.Provider>
     )
}
export {AppContext, AppProvider}

