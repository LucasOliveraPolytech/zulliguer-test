export default class TestAnswer {
  constructor() {
    this.image = ''
    this.whatIsIt = ''
    this.whyIsThat = ''
    this.whereIsIt = ''
  }

  setImage(image) {
    this.image = image
  }

  setWhatIsIt(whatIsIt) {
    this.whatIsIt = whatIsIt
  }

  setWhyIsThat(whyIsThat) {
    this.whyIsThat = whyIsThat
  }

  setWhereIsIt(whereIsIt) {
    this.whereIsIt = whereIsIt
  }

  getImage() {
    return this.image
  }

  getWhatIsIt() { 
    return this.whatIsIt
  }

  getWhyIsThat() {
    return this.whyIsThat
  }
  
  getWhereIsIt() {
    return this.whereIsIt
  }

  toJSON() {
    var answer = {
      image: this.getImage(),
      whatIsIt: this.getWhatIsIt(),
      whyIsThat: this.getWhyIsThat(),
      whereIsIt: this.getWhereIsIt()
    }

    return answer
  }
}