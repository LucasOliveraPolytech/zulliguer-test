import React, { useState } from 'react'
import store from '../firestore'
import TestEntry from '../components/TestEntry'
import TestAnswer from '../components/TestAnswer'
import EntriesReport from '../components/EntriesReport'
import Button from 'react-bootstrap/Button'
import '../styles.css'
import Container from 'react-bootstrap/esm/Container'

export default function EntriesReportView() {
  const [entriesQueried,setEntriesQueried] = useState(false)
  const [entries,setEntries] = useState([])
  const [isLoading,setLoading] = useState(false)

  async function queryEntries() {
    var entries = []
    var query = await store.collection("entries").get()
    if(query.docs.length > 0) {
      query.docs.forEach(entry => {
        const entryObject = new TestEntry()
        entryObject.setFullName(entry.data().subjectName, entry.data().subjectLastName)
        const answers = []
        entry.data().answers.forEach((answer) => {
          const answerObject = new TestAnswer()
          answerObject.setImage(answer.image)
          answerObject.setWhatIsIt(answer.whatIsIt)
          answerObject.setWhyIsThat(answer.whyIsThat)
          answerObject.setWhereIsIt(answer.whereIsIt)
          answers.push(answerObject)
        })
        entryObject.setAnswers(answers)
        entries.push(entryObject)
      })
    }
    return entries
  }

  async function handleClick() {
    setLoading(true)
    const entriesResult = await queryEntries()
    if(entriesResult.length > 0){
      setEntries(entriesResult)
      setEntriesQueried(true)
    } else {
      setLoading(false)
    }
  }

  if(entriesQueried) {
    return <EntriesReport entries={entries} />
  } else {
    return (
      <Container className='centeredContent'>
        <h3>Aún no hay respuestas</h3>
        <Button disabled={isLoading} onClick={handleClick}>
          {!isLoading ? 'Obtener respuestas' : 'Cargando...'}
        </Button>
      </Container>
    )
  }
}