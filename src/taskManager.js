 import React, {useEffect, useState} from "react";
 import TaskList from "./taskList";
 import EditTask from "./EditTask";

 const TaskManager=()=>{
     const[tasks, setTasks]=useState([]);
     
     useEffect(()=>{
        const fetchTasks= async()=>{
            try { 
                const response = await fetch(`http://localhost:5000/api/tasks`);
                if(response.ok){
                   const taskList = await response.json();
                   setTasks(taskList);
                }
                else {
                   console.error("Failed to display tasks")
                }}
                catch(error){
                   console.error('Error:', error)
                } }
                fetchTasks();
            }, [])
         const updateComplete= async (taskid)=>{
              const taskToUpdate = tasks.find(task => task.id === taskid);
              const updatedTask = {...taskToUpdate, completed:!taskToUpdate.completed}
              const response = await fetch(`api/tasks/${taskid}`, {
                method:"PUT",
                headers:{
                    "Content-Type": "application/json",
                 },
                 body:
                    JSON.stringify(updatedTask),   
            })
            if(response.ok){
                setTasks(tasks.map(task=> 
                    task.id === taskid ? updatedTask: task
                ))
            } else {
                console.error("Failed to update task")
            }
            
        }
         const deleteTask= async(taskid)=>{
             try {
                const response = await fetch(`http://localhost:5000/api/tasks/${taskid}`, {
                    method:"DELETE",
                })
             if(response.ok){
                setTasks(tasks.filter(task=> task.id !==taskid))

             } else {
                console.error("Failed to delete task")
             }

             }catch(error){
                console.error("Error:", error)
            }
        }
    return(
        <div>
            <TaskList 
                tasks={tasks}
                onUpdate={updateComplete}
                onDelete={deleteTask}
                onEdit= {EditTask}
            ></TaskList>
            
        </div>
    )
    }
export default TaskManager;