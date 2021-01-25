import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'

export default function DynamicList({ items }) {
  return(
    <ListGroup>
      {items.map((item,index) => <ListGroup.Item key={index}>{item.whatIsIt}</ListGroup.Item>)}
    </ListGroup>
  )
}