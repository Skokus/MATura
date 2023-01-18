import React, { useState, useEffect, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import { addTask } from '../../api/TaskService';
import Form from 'react-jsonschema-form';

function AddTaskForm(){

    const navigate = useNavigate();
    const schema = `{
        "title": "Utwórz zadanie",
        "type": "object",
        "required": [
          "title"
        ],
        "properties": {
          "question": {
            "type": "string",
            "title": "Task list title"
          },
          "tasks": {
            "type": "array",
            "title": "Tasks",
            "items": {
              "type": "object",
              "required": [
                "title"
              ],
              "properties": {
                "title": {
                  "type": "string",
                  "title": "Title",
                  "description": "A sample title"
                },
                "details": {
                  "type": "string",
                  "title": "Task details",
                  "description": "Enter the task details"
                },
                "done": {
                  "type": "boolean",
                  "title": "Done?",
                  "default": false
                }
              }
            }
          }
        }
      }`;

    const schemaAsObject = JSON.parse(schema);

    const onSubmit = ({formData}, e) => {addTask(formData); navigate("/admin/tasks");};

    return(
        <Form schema={schemaAsObject} onSubmit={onSubmit}/>
    );

}

export default AddTaskForm;