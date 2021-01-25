import React from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'
import SubmitEntryButton from '../components/SubmitEntryButton'
import '../styles.css'

export default function TextView({ testEntry, testPhase }) {
  const history = useHistory()

  function handleClick() {
    history.push('/test' + testPhase)
  }

  var title = ''
  var question = ''
  var text = ''

  switch(testPhase){
    case 0:
      question = '¿Qué podría ser esto?'
      title = 'Primera Etapa: Respuesta'
      text = 'En esta etapa se mostraran 3 imágenes y usted contará con 5 minutos (por imagen) para responder a la pregunta "' + question + '". Tómese su tiempo, la imagen puede ser considerada total o parcialmente y sepa que la mayoria de las personas otorgan mas de una respuesta.'
      break
    case 1:
      question = '¿Qué es lo que hay en la imagen que hace que parezca eso que usted respondió?'
      title = 'Segunda Etapa: Encuesta'
      text = 'En esta etapa se volveran a mostrar las mismas 3 imágenes y usted contará con 10 minutos (por imagen) para responder, por cada una de las respuestas que otorgó previamente, "' + question + '". No confundir con dónde está ubicada la respuesta, para eso está la etapa subsiguiente. Nuevamente, tómese su tiempo, estas descripciones son de vital importancia dado que ayudan a la interpretación del test.'
      break
    case 2:
      title = 'Tercera Etapa: Localización'
      text = 'En esta etapa se mostraran 3 esquemas que representan a las imagenes que antes examinó. Contará con 1 minuto (por imagen) para enmarcar el área en que se encontraba cada respuesta. Las respuestas que usted otorgó apareceran nombradas una a una, a medida que presiona el botón "Guardar". En caso de cometer algún error, se le provee con un boton "Deshacer" para reintentar del dibujo de la respuesta en curso.'
      break
    default:
  }

  if(testEntry.isEmpty()) {
    history.push('/')
    return null
  }
  
  if (testPhase < 3) {
    return(
      <Container className='centeredConted'>
        <h2>{title}</h2>
        <h5 className='text-justify'>{text}</h5>
        {(testPhase < 2) ? 
          <h3 className='text-justify'>Por favor recuerde que la pregunta es "{question}"</h3> : null
        }
        <Button onClick={handleClick}>Comenzar</Button>
      </Container>
    )
  }

  return(
    <Container>
      <h2>Muchas gracias por participar!</h2>
      <h4 className='text-justify'>
        Por favor, pulse en "Enviar respuestas" para concluir con el test.
      </h4>
      <SubmitEntryButton testEntry={testEntry}/>
    </Container>
  )
}