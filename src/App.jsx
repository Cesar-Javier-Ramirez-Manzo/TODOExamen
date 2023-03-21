import { useState } from "react";

function App() {

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  function handleSubmit(event) {

    let newTodo={
      id: Date.now(),
      text: todo,
      done: false
    }

    event.preventDefault();
    setTodos([...todos, newTodo]);

    setTodo("")
  }


  function handleChange(e) {
    setTodo(e.target.value);
  }

  function handleCheck(e){
    const {name, checked}= e.target;
    let updatedTodos = todos.map((item)=>({
      ...item,
      done: item.id == name ? checked : item.done,
    }))
    setTodos(updatedTodos);
  }


  function handleDelete (e){
    const {name, checked}= e.target;
    let filteredTodos = [];
    let updatedTodos = todos.map((item)=>(
      item.done ? null : filteredTodos.push(item)
    ))
    setTodos(filteredTodos);
  }

  return (
    <div className="container mx-auto max-w-2xl mt-20">
      <h1 className="font-bold  text-center text-2xl mb-8" >React TODO</h1>
      <form onSubmit={handleSubmit}  >

        <input placeholder="Introduce elemento a la lista" required={true} className="w-full border-2 border-gray-400 px-4 py-2 mb-8" type={"text"} name="todo" value={todo} onChange={handleChange} ></input>


      </form>
      <ul className="mb-8" >
        {todos.map(({id, text, done}) => (
          <li key={id} className="py-2 text-xl flex shadow-md"  ><input  type={"checkbox"} name={id} defaultChecked={done} onClick={handleCheck}/>{ done ? <p   className="pl-4 line-through"> {text} </p> : <p   className="pl-4"> {text} </p> }     </li>
        ))}
      </ul>
          <div className="flex justify-end" >
          <button className="bg-slate-800 px-4 py-2 text-white rounded-full" onClick={handleDelete} >Delete all completed</button>

          </div>
    </div>
  );
}

export default App;