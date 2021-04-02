import React, { useState, useRef, useCallback, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Figure from 'react-bootstrap/Figure'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Timer from 'react-compound-timer'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import TestAnswer from '../components/TestAnswer'
import DynamicList from '../components/DynamicList'
import '../styles.css'

export default function TestView({ images, time, testPhase, testEntry }) {
  const [imageState,setImageState] = useState(0)
  const timerRef = useRef(null)
  const timerStoppedRef = useRef(null)
  const history = useHistory()
  const formik = useFormik({
    initialValues: {
      slideAnswers: '',
    },
    onSubmit: (values, { resetForm }) => {
      switch(testPhase){
        case 0: 
          addAnswersToEntry(values)
          break
        case 1:
          addSurveysToEntry(values)
          break
        default:
          break
        }
      if (imageState < 2) {
        resetForm(formik.initialValues)
        setImageState(imageState + 1)
      }
    },
  })

  var textPlaceholder = ''
  switch(testPhase){
    case 0: 
      textPlaceholder = '¿Qué podría ser esto?'
      break
    case 1:
      textPlaceholder = '¿Qué hay en la imagen que hace que parezca eso?'
      break
    default:
  }

  function addAnswersToEntry(answers) {
    answers.slideAnswers.trim().split('\n').forEach((answer) => {
      const answerWrapper = new TestAnswer()
      answerWrapper.setImage(imageState)
      answerWrapper.setWhatIsIt(answer)
      testEntry.addAnswer(answerWrapper)
    })
  }

  function addSurveysToEntry(answers) {
    const answerWrappers = testEntry.getAnswers().filter((answer) => answer.getImage() === imageState)
    const surveyAnswers = answers.slideAnswers.trim().split('\n')
    for(var i = 0; i < answerWrappers.length; i++){
      answerWrappers[i].setWhyIsThat(surveyAnswers[i])
    }
  }
  
  function finish() {
    console.log("Test entry: ", testEntry)
    history.push('/text'+ ++testPhase)
  }

  const timerStopped = useCallback(
    () => {
      formik.handleSubmit()
      if (imageState === images.length - 1) {
        finish()
      } else {   
        timerRef.current.reset()
        timerRef.current.start()
      }
    },
    [imageState,images.length,finish,formik]
  )

  useEffect(
    () => {
      timerStoppedRef.current = timerStopped
    },
    [timerStopped]
  )

  if(testEntry.isEmpty()){ 
    history.push('/')
    return null
  }

  return (
    <Container fluid>
      <Row>
        <Col xs={8}>
          <Figure.Image
            src={images[imageState]}
            width={800}
            height={600}
          />
        </Col>
        <Col className='answersColumn'>
          {(testPhase > 0 ) 
            ? <DynamicList 
                items={testEntry.getAnswers().filter((answer) => answer.getImage() === imageState)}
                imageState={imageState}
              /> 
            : null}
          <Timer
            ref={timerRef}
            initialTime={time} 
            direction="backward" 
            checkpoints={[
              {
                time: 0,
                callback: () => timerStoppedRef.current()
              }]}> 
            {/*({ reset }) => (
              <Container>
                <h1>
                  <Timer.Minutes />m
                  <Timer.Seconds />s
                </h1>
              </Container>
            )*/}
          </Timer>
        </Col>
      </Row>
      
      <Form>
        <Form.Row>
          <Form.Text className='text-muted'>
            Separar cada respuesta con salto de línea.
          </Form.Text>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Group controlId="slideAnswers">
              <Form.Control
                placeholder={textPlaceholder}
                as="textarea"
                rows="2"
                value={formik.values.slideAnswers}
                onChange={formik.handleChange}
              />
            </Form.Group>
          </Col>
        </Form.Row>
      </Form>
    </Container>
  )
}