import { useEffect, useState } from "react"

function TodoList(){

    function getTask(){
        let data=localStorage.getItem("todos")
        let json=JSON.parse(data)
        if(json){
            return json
        }
        return []
    }

    const [todos, setTodos]=useState(getTask())

    useEffect(()=>{
        localStorage.setItem=("todos",JSON.stringify(todos))
    },[todos])

    function addTask(event){

        event.preventDefault();
        let task = event.target.task.value;
        if (!task) {
            alert("Please provide a valid task");
            return;
        }
        setTodos([...todos, { task: task, completed: false }]);
        event.target.reset();

    }

    function changeStatus(index) {
        let newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    }

    function deleteIndex(index) {
        let newTodos = [...todos];
        newTodos.splice(index,1);
        setTodos(newTodos);
    }
    

    return(
        <div className ="container m-5">
            <div className="mx-auto rounded border p-4" style={{width: "500px", backgroundColor: "black"}}>
                <h2 style={{color: "white", textAlign: "center", marginBottom: "20px"}}>To-Do List</h2>
                <div className="container-fluid" style={{marginBottom: "20px"}}>
                    <form className="d-flex" role="search" onSubmit={addTask}> 
                        <input className="form-control me-2" type="search" name="task" placeholder="Add New Task" />
                        <button className="btn" type="submit" style={{ color: "white", backgroundColor: "purple" }}>Add</button>
                    </form>
                </div>


                {
                    todos.map((todo, index) => {
                        return (
                            <div key={index} className={`rounded mt-4 p-2 d-flex ${todo.completed ? "bg-success-subtle" : "#d1a7f3"}`} style={{backgroundColor: "#d1a7f3"}}>
                                <div className={`me-auto ${todo.completed ? "text-decoration-line-through" : ""}`}>
                                    {todo.task}
                                </div>
                                <div>
                                    <i className={`h5 me-2 ${todo.completed ? "bi bi-check2-square" : "bi bi-square"}`} onClick={() => changeStatus(index)} style={{ cursor: "pointer" }}/>
                                    <i className="bi bi-trash text-danger h5" onClick={() => deleteIndex(index)} style={{ cursor: "pointer"}}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TodoList;