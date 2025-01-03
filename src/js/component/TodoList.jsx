import React, { useEffect, useState } from 'react';

const TodoList = () => {

    const [inputValue, setInputValue] = useState("");
    const [list, setList] = useState([]);

    const[userName, setUserName] = useState("mariajara929")
    const[turn, setTurn]= useState(false)

    const addTask = (event) => {

        if (event.which === 13) {

            setList([...list, inputValue]);

            setInputValue(' ');

            return
        };

    };

    const deleteTask = (index) => {
        const updatedTasks = list.filter((_, item) => item !== index);
        setList(updatedTasks);
    };
    const handleMouseOver = (e) => {
        const button = e.currentTarget.querySelector('button');
        button.style.display = 'inline-block';
    };

    const handleMouseOut = (e) => {
        const button = e.currentTarget.querySelector('button');
        button.style.display = 'none';
    };

    const handlerGetList = async () => {
        try {
        let response = await fetch(`https://playground.4geeks.com/todo/users/${userName}`)  
        if (!response.ok){
            throw new Error("algo malio sal")
        }
        let data = await response.json()
        if (Array.isArray(data.todos) && data.todos.length >0){
            setList(data.todos)
        }
        
        } catch (error) {
            console.error(error)
        }
    }

    const handlerSearch= async () => {
        try {
            if (setUserName.lengh < 3) {
                alert ("debe contener mas de 2 caracteres")
                return
            }
            setTurn(prev =>!prev)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() =>{
   handlerGetList()
    },[turn])

    return (
        <div>
        <div className="d-grid col-8 mx-auto mt-4">

            <input className="my-2" type="text" id='usuario' placeholder='ESCRIBA SU USUARIO' onChange={(e) => setUserName(e.target.value)}/>
            <button className='btn btn-outline-success mt-2 mb-4' onClick={handlerSearch}>Buscar</button>

            <input type="text"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                onKeyDown={addTask}
                className="list-group-item-light mb-2"
            />

            <ul className="list-group">
                {list.length === 0 ? (<li className="list-group-item-success text-start text-muted">No hay tareas. Agrega una tarea arriba! :)</li>) : (list.map((item, index) => (
                    <li
                        key={index}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                        className="list-group-item-success d-flex justify-content-between"> {item.label}

                        <button
                            className="boton"
                            onClick={() => deleteTask(index)}
                            style={{ display: 'none', cursor: 'pointer' }}>x

                        </button>
                    </li>

                ))
                )}

            </ul>

        </div>
        </div>
    );
};

export default TodoList;