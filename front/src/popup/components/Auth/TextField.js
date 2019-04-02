import React from 'react'
import { Form } from 'react-bootstrap';

export default ({name, label, error, type, ...rest}) => {
  const id = `id_${name}`,
        input_type = type?type:"text"
  return (
    <Form.Group color={error?"danger":""}>
      {label?<Form.Label htmlFor={id}>{label}</Form.Label>: ""}
      <Form.Control type={input_type} name={name}
             id={id} className={error?"is-invalid":""}
             {...rest} />
      {error?
         <Form.Control.Feedback type="invalid">
             {error}
          </Form.Control.Feedback>
         : ""
      }
    </Form.Group>
  )
}