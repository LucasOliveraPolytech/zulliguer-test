import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Entry from './Entry'

export default function EntriesReport({ entries }) {
  return (
    <Tab.Container id="entries-report" defaultActiveKey='0' mountOnEnter unmountOnExit>
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            {entries.map((entry,index) => {
              return ( 
                <Nav.Item key={index}>
                  <Nav.Link eventKey={index}>{entry.getSubjectName() + ' ' + entry.getSubjectLastName()}</Nav.Link>
                </Nav.Item>
              )
            })}
          </Nav>
        </Col>
        <Col sm={7}>
          <Tab.Content>
            {entries.map((entry,index) => {
              return(
                <Tab.Pane key={index} eventKey={index}>
                  <Entry testEntry={entry} />
                </Tab.Pane>
              )
            })}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  )
}