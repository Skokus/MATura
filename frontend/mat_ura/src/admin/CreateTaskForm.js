import React, { useState, useEffect, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import Form from 'react-jsonschema-form';

function CreateTaskForm(){

    const schema = `{
        "title": "A list of tasks",
        "type": "object",
        "required": [
          "title"
        ],
        "properties": {
          "title": {
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

    return(
        <Form schema={schemaAsObject}/>
    );

}

export default CreateTaskForm;