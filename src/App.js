import React, { useState } from "react";
import "./styles.css";
import MaterialTable from "material-table";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";

const columns = [
  {
    title: "ID",
    field: "id"
  },
  {
    title: "Title",
    field: "title"
  }
];

export default function App() {
  const { handleSubmit, register } = useForm();
  const [data] = useState([
    {
      id: 1,
      title: "Title 1"
    },
    {
      id: 2,
      title: "Title 2"
    }
  ]);

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <div className="App">
      <MaterialTable
        columns={columns}
        data={data}
        options={{
          paging: false,
          search: false,
          draggable: false
        }}
        components={{
          EditField: ({ columnDef, value, onChange }) => (
            <TextField
              type="text"
              name={columnDef.field}
              inputRef={register({ required: true })}
              defaultValue={value}
            />
          )
        }}
        editable={{
          // This function needs to return a promise, and it does,
          // but it's always resolved, as the edit row closes
          // I need it to be rejected if validation fails
          onRowUpdate: (newData, oldData) => handleSubmit(onSubmit)()
        }}
      />
    </div>
  );
}
