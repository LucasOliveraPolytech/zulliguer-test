import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import '../styles.css'

export default function StartView({ testEntry }) {
  const history = useHistory()

  const formik = useFormik({
    initialValues: {
      subjectFirstName: '',
      subjectLastName: '',
    },
    onSubmit: values => {
      testEntry.setFullName(values.subjectFirstName, values.subjectLastName)
      history.push('/text0')
    },
  })

  return (
    <Container className='centeredContent'>
      <h1>Test de Zulliger Online</h1>
      <h5 className='text-justify'>
        El test de Zulliger se compone de 3 etapas y en esta aplicación se lo guiará a través de las mismas. Por favor, lea atentamente las instrucciones de cada etapa y asegúrese de comprenderlas antes de comenzar. En caso de ocurrir algún error con su conexión recomendamos que vuelva a esta página y rehaga el test completamente.
      </h5>
      <Form>
        <Form.Group controlId="formBasicExplaination">
          <Form.Label>
            Completar con sus datos
          </Form.Label>
        </Form.Group>

        <Form.Group controlId="subjectFirstName">
          <Form.Control 
            placeholder="Nombre" 
            onChange={formik.handleChange}
          />
        </Form.Group>
      
        <Form.Group controlId="subjectLastName">
          <Form.Control 
            placeholder="Apellido" 
            onChange={formik.handleChange}
          />
        </Form.Group>

        <Button variant="primary" type='submit' onClick={formik.handleSubmit} block>
          Comenzar
        </Button>
      </Form>
    </Container>
  )
}