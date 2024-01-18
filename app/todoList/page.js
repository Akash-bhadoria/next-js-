"use client";
import { useEffect, useState } from "react";

export default function ApiRun() {
  const [todos, setTodos] = useState([]);

  async function getTodoList() {
    try {
      const res = await fetch("http://localhost:3000/api/todos");
      const data = await res.json();

      if (res.ok) setTodos(data);
    } catch (error) {
      console.error("Error fetching todo list:", error);
    }
  }

  useEffect(function () {
    getTodoList();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <td>Id</td>
          <td>Title</td>
          <td>Status</td>
        </tr>
      </thead>
      <tbody>
        {todos.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>
              {item.completed ? <strike>{item.title}</strike> : item.title}
            </td>
            <td>{item.completed ? "Completed" : "Not Completed"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
