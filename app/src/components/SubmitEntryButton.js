import React, { useState, useEffect } from 'react'
import store from '../firestore'
import Button from 'react-bootstrap/Button'

export default function SubmitEntryButton({ testEntry }) {
  const [isLoading,setLoading] = useState(false)
  const [isLoaded,setLoaded] = useState(false)
  
  /*async function handleClick() {
    await store.collection("entries").add(testEntry.toJSON())
  }*/

  useEffect(() => {
    if (isLoading) {
      store.collection("entries").add(testEntry.toJSON()).then(() => {
        setLoading(false)
        setLoaded(true)
      });
    }
  }, [isLoading, testEntry]);

  const handleClick = () => setLoading(true)
  
  var buttonText = ''
  if(isLoading) {
    buttonText = 'Cargando...'
  } else if (isLoaded) {
    buttonText = 'Gracias!'
  } else buttonText = 'Enviar respuestas'

  return (
    <Button
      disabled={isLoading || isLoaded}
      onClick={handleClick}
    >
      {buttonText}
    </Button>
  )
}