export default class TestEntry {
  
  constructor() {
    this.subjectName = ''
    this.subjectLastName = ''
    this.answers = []
  }

  setFullName(subjectName, subjectLastName) {
    this.subjectName = subjectName
    this.subjectLastName = subjectLastName
  }

  setAnswers(answers){
    this.answers = answers
  }
  
  addAnswer(answer) {
    this.answers.push(answer)
  }

  getAnswers() {
    return this.answers
  }
  
  getSubjectName() {
    return this.subjectName
  }

  getSubjectLastName() {
    return this.subjectLastName
  }

  isEmpty() {
    return (this.getSubjectName() === '' || this.getSubjectLastName() === '')
  }

  toJSON() {
    var entry = {
      subjectName: this.getSubjectName(),
      subjectLastName: this.getSubjectLastName(),
      answers: []
    }
    this.answers.forEach((answer) => {
      entry.answers.push(answer.toJSON())
    })
    
    return entry
  }
}
