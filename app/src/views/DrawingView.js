import React, { useState, useRef, useCallback, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Timer from 'react-compound-timer'
import { useHistory } from 'react-router-dom'
import CanvasDraw from 'react-canvas-draw'
import DynamicList from '../components/DynamicList'
import '../styles.css'

export default function DrawingView({ images, time, testPhase, testEntry }) {
  const [imageState, setImageState] = useState(0)
  const timerRef = useRef(null)
  const timerStoppedRef = useRef(null)
  const canvasDrawingRef = useRef(null)
  const history = useHistory()
  const answers = testEntry.getAnswers().filter((answer) => answer.getImage() === imageState)
  const [currentAnswer, setCurrentAnswer] = useState(0)
  const [canvasDisabled, setCanvasDisabled] = useState(false)
  
  function finish() {
    history.push('/text'+ ++testPhase)
  }

  const timerStopped = useCallback(
    () => {
      if (imageState === images.length - 1) {
        finish()
      } else {
        setCurrentAnswer(0)
        setImageState(imageState + 1)
        setCanvasDisabled(false)
        timerRef.current.reset()
        canvasDrawingRef.current.clear()
        canvasDrawingRef.current.drawImage()
        timerRef.current.start()
      }
    },
    [imageState,setImageState,images.length,finish]
  )
  

  const addLocationToEntry = useCallback(
    (location) => {
      answers[currentAnswer].setWhereIsIt(location)
    },
    [answers,currentAnswer]
  )

  const handleClick = useCallback(
    () => {
      addLocationToEntry(canvasDrawingRef.current.getSaveData())
      canvasDrawingRef.current.clear()
      if (currentAnswer < answers.length - 1) {
        setCurrentAnswer(currentAnswer + 1)
      } else {
        setCanvasDisabled(true)
      }
    },
    [canvasDrawingRef,currentAnswer,setCurrentAnswer,answers.length,addLocationToEntry]
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
          <CanvasDraw 
            ref={canvasDrawingRef} 
            imgSrc={images[imageState]}
            brushRadius={2}
            brushColor={'#0000ff'}
            lazyRadius={10}
            canvasWidth={800}
            canvasHeight={600}
            disabled={canvasDisabled}
          />
        </Col>
        <Col className='answersColumn'>
          <DynamicList 
            items={answers}
            imageState={imageState}
          />
          <h3>{'Dibujando: ' + answers[currentAnswer].getWhatIsIt()}</h3>
          <ButtonGroup vertical>
            <Button
              onClick={handleClick}
              disabled={canvasDisabled}
            >
              Guardar
            </Button>
            <Button
              variant="danger"
              onClick={() => canvasDrawingRef.current.undo()}
              disabled={canvasDisabled}
            >
              Deshacer
            </Button>
          </ButtonGroup>
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
    </Container>
  )
}