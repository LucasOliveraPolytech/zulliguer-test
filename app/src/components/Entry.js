import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import CanvasDraw from 'react-canvas-draw'
import getImages from '../images/images'

const images = getImages(0)

export default function Entry({ testEntry }) {
  return (
    <Container>
      <h2>{'Nombre completo: ' + testEntry.getSubjectName() + ' ' + testEntry.getSubjectLastName()}</h2>
      <h3>Respuestas</h3>
      {testEntry.getAnswers().map(
        (answer, index) => {
          return (
            <Container key={index}>
              <h4>{index + 1 + ': ' + answer.getWhatIsIt()}</h4>
              <h6 className='text-justify'>{answer.getWhyIsThat()}</h6>
              <CanvasDraw
                imgSrc={images[answer.getImage()]}
                canvasWidth={800}
                canvasHeight={600}
                saveData={answer.getWhereIsIt()}
                hideInterface
                immediateLoading
                disabled
              />
            </Container>
          )
        }
      )}
    </Container>
  )
}