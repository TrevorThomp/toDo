import React, { useState, useEffect, useContext } from "react";
import useForm from "../hooks/useForm";
import { When, If, Then, Else } from "../if";
import Modal from "../modal";
import useFetch from "../hooks/useFetch";
import { SettingsContext } from "../../context/settings";
import Auth from "../../auth/auth";

import "./todo.scss";

const ToDo = props => {
  const settingsContext = useContext(SettingsContext);

  const [todoList, setTodoList] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState({});
  const [handleSubmit, handleChange] = useForm(addItem);
  const [setRequest, response] = useFetch();

  const url = "https://api-js401.herokuapp.com/api/v1/todo";

  // set todo list from data if data exists else get all
  useEffect(() => {
    if (response.count >= 0) {
      setTodoList(response.results);
    } else {
      getAll();
    }
  }, [response]);

  // update document title
  useEffect(() => {
    let complete = todoList.filter(item => !item.complete).length;
    let incomplete = todoList.filter(item => item.complete).length;

    document.title = `ToDo:${complete} Done:${incomplete}`;

    !settingsContext.displayCompleted
      ? settingsContext.setCurrentDisplayed(todoList.length)
      : settingsContext.setCurrentDisplayed(todoList.length - complete);
  });

  const getAll = () => {
    const request = {
      url: url,
      options: {
        method: "GET"
      }
    };
    setRequest(request);
  };

  // get data from API on mount
  useEffect(() => {
    getAll();
  }, []);

  function addItem(data) {
    const request = {
      url: url,
      options: {
        method: "POST",
        body: JSON.stringify(data)
      }
    };
    setRequest(request);
  }

  const deleteItem = id => {
    console.log(id);
    const request = {
      url: `${url}/${id}`,
      options: {
        method: "DELETE"
      }
    };
    setRequest(request);
  };

  const saveItem = updatedItem => {
    const request = {
      url: `${url}/${updatedItem._id}`,
      options: {
        method: "PUT",
        body: JSON.stringify(updatedItem)
      }
    };
    setRequest(request);
  };

  const toggleComplete = id => {
    let item = todoList.filter(i => i._id === id)[0] || {};
    if (item._id) {
      item.complete = !item.complete;
      saveItem(item);
    }
  };

  const toggleDetails = id => {
    let showDetailsState = !showDetails;
    let itemDetails = todoList.filter(item => item._id === id)[0] || {};

    setDetails(itemDetails);
    setShowDetails(showDetailsState);
  };

  const togglePageNumber = e => {
    if (e.target.name === "nextButton") {
      settingsContext.setPageNumber(settingsContext.pageNumber + 1);
    }
    if (e.target.name === "prevButton") {
      settingsContext.setPageNumber(settingsContext.pageNumber - 1);
    }
  };

  const toggleHideComplete = e => {
    if (e.target.name === "hideCompleteButton") {
      settingsContext.setDisplayCompleted(!settingsContext.displayCompleted);
    }
  };

  return (
    <>
      <Auth capbility="read">
        <header>
          <h2>
            There are {todoList.filter(item => !item.complete).length} Items To
            Complete
          </h2>
        </header>
      </Auth>

      <section className="todo">
        <Auth capability="create">
          <div>
            <h3>Add Item</h3>
            <form onSubmit={handleSubmit}>
              <label>
                <span>To Do Item</span>
                <input
                  name="text"
                  placeholder="Add To Do List Item"
                  onChange={handleChange}
                />
              </label>
              <label>
                <span>Difficulty Rating</span>
                <input
                  type="range"
                  min="1"
                  max="5"
                  name="difficulty"
                  defaultValue="3"
                  onChange={handleChange}
                />
              </label>
              <label>
                <span>Assigned To</span>
                <input
                  type="text"
                  name="assignee"
                  placeholder="Assigned To"
                  onChange={handleChange}
                />
              </label>
              <label>
                <span>Due</span>
                <input type="date" name="due" onChange={handleChange} />
              </label>
              <button>Add Item</button>
            </form>
          </div>
        </Auth>

        <Auth capbilith="read">
          <div>
            <button name="hideCompleteButton" onClick={toggleHideComplete}>
              Display Completed
            </button>
            <ul>
              <If condition={settingsContext.displayCompleted === true}>
                <Then>
                  {todoList
                    .filter(item => item.complete === false)
                    .slice(
                      settingsContext.pageNumber *
                        settingsContext.itemsDisplayed,
                      settingsContext.pageNumber *
                        settingsContext.itemsDisplayed +
                        settingsContext.itemsDisplayed
                    )
                    .map(item => (
                      <li
                        className={`complete-${item.complete.toString()}`}
                        key={item._id}
                      >
                        <span onClick={() => toggleComplete(item._id)}>
                          {item.text}
                        </span>
                        <Auth capability="update">
                          <button onClick={() => toggleDetails(item._id)}>
                            Details
                          </button>
                        </Auth>
                        <Auth capability="delete">
                          <button onClick={() => deleteItem(item._id)}>
                            Delete
                          </button>
                        </Auth>
                      </li>
                    ))}
                </Then>
                <Else>
                  {todoList
                    .slice(
                      settingsContext.pageNumber *
                        settingsContext.itemsDisplayed,
                      settingsContext.pageNumber *
                        settingsContext.itemsDisplayed +
                        settingsContext.itemsDisplayed
                    )
                    .map(item => (
                      <li
                        className={`complete-${item.complete.toString()}`}
                        key={item._id}
                      >
                        <span onClick={() => toggleComplete(item._id)}>
                          {item.text}
                        </span>
                        <Auth capability="update">
                          <button onClick={() => toggleDetails(item._id)}>
                            Details
                          </button>
                        </Auth>
                        <Auth capability="delete">
                          <button onClick={() => deleteItem(item._id)}>
                            Delete
                          </button>
                        </Auth>
                      </li>
                    ))}
                </Else>
              </If>
              <If condition={settingsContext.pageNumber >= 1}>
                <Then>
                  <button name="prevButton" onClick={togglePageNumber}>
                    Previous
                  </button>
                </Then>
              </If>
              <If
                condition={
                  settingsContext.currentDisplayed > 5 &&
                  settingsContext.currentDisplayed /
                    (settingsContext.pageNumber + 1) >
                    settingsContext.itemsDisplayed
                }
              >
                <Then>
                  <button name="nextButton" onClick={togglePageNumber}>
                    Next
                  </button>
                </Then>
              </If>
            </ul>
          </div>
        </Auth>
      </section>

      <When condition={showDetails}>
        <Modal title="To Do Item" close={toggleDetails}>
          <div className="todo-details">
            <header>
              <span>Assigned To: {details.assignee}</span>
              <span>Due: {details.due}</span>
            </header>
            <div className="item">{details.text}</div>
          </div>
        </Modal>
      </When>
    </>
  );
};

export default ToDo;
