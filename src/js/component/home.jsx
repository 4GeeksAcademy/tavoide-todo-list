import React from "react";
import TodoList from "./TodoList.jsx";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	return (
		<div className="container my-4">
			<h1 className="text-center ">TODO LIST CON FETCH</h1>
			<TodoList/>
		</div>
	);
};

export default Home;
