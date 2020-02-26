import React, { useEffect, useState, useContext } from "react";
import useFetch from "../../hooks/fetch.js";
import { When } from "../if";
import TodoForm from "./form.js";
import TodoList from "./list.js";
import TodoItem from "./item.js";

import "./todo.scss";
import { SettingsContext } from "../../context/context";

const todoAPI = "https://api-js401.herokuapp.com/api/v1/todo";

const ToDo = () => {
  const settings = useContext(SettingsContext);
  const [todoList, setToDoList] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [showItem, setShowItem] = useState({});
  const [itemsPerPage] = useState(3);
  const { request, response} = useFetch();

  const _addItem = item => {
    const addRequest = {
      url: todoAPI,
      options: {
        method: "post",
        body: JSON.stringify(item)
      }
    };
    request(addRequest);
  };

  const _deleteItem = id => {
    const deleteRequest = {
      url: `${todoAPI}/${id}`,
      options: {
        method: "delete"
      }
    };
    request(deleteRequest);
  };

  const _toggleComplete = id => {
    let item = todoList.filter(i => i._id === id)[0] || {};
    item.complete = !item.complete;
    const updateRequest = {
      url: `${todoAPI}/${id}`,
      options: {
        method: "put",
        body: JSON.stringify(item)
      }
    };
    request(updateRequest);
  };

  const _toggleDetails = id => {
    setShowDetails(!showDetails); //whatever
    let item = todoList.filter(item => item._id === id)[0];
    setShowItem(item);
  };

  // The function to re-fetch data so the display is current
  // Called on intial load and afer every write operation
  const _getAll = () => {
    const req = {
      url: todoAPI,
      options: {
        method: "get"
      }
    };
    request(req);
  };

  // On mount ... get the list
  useEffect(() => {
    _getAll();
  }, []);

  //  Set the full state if it's in the response or re-fetch anytime the response is updated
  useEffect(() => {
    // Anytime we get a list, update our state
    if (response.count >= 0) {
      setToDoList(response.results);
    }
    // Otherwise, re-fetch
    else {
      _getAll();
    }
  }, [response]);

  return (
    <>
      <header>
        <h2>
          There are {todoList.filter(item => !item.complete).length} Items To
          Complete
        </h2>
      </header>

      <section className="todo">
        <div>
          <TodoForm handleSubmit={_addItem} />
        </div>

        <div>
          <TodoList
            list={todoList}
            handleComplete={_toggleComplete}
            handleDelete={_deleteItem}
            handleDetails={_toggleDetails}
          />
        </div>
      </section>

      <div>
        <div>Total items: {todoList.length}</div>
        <div>Items per page: {itemsPerPage}</div>
        <div>Current page is {settings.currentPage + 1}</div>
        <div>Total pages: {Math.ceil(todoList.length / itemsPerPage)}</div>
        <When condition={settings.currentPage > 0}>
          <input
            type="button"
            value="back"
            onClick={() => settings.currentPageSubtract()}
          />
        </When>
        <When condition={(settings.currentPage = 1)}>
          <input
            type="button"
            value="next"
            onClick={() => settings.currentPageAdd()}
          />
        </When>
      </div>

      <When condition={showDetails}>
        <TodoItem handleDetails={_toggleDetails} item={showItem} />
      </When>
    </>
  );
};

export default ToDo;
