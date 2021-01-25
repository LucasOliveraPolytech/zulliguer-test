import zulligerFirst from './FirstImage.png'
import zulligerSecond from './SecondImage.png'
import zulligerThird from './ThirdImage.png'
import shallowFirst from './FirstImageShallow.png'
import shallowSecond from './SecondImageShallow.png'
import shallowThird from './ThirdImageShallow.png'

const images = [zulligerFirst, zulligerSecond, zulligerThird]
const shallowImages = [shallowFirst, shallowSecond, shallowThird]

export default function getImages(phaseNumber) {
  return (phaseNumber === 2) ? shallowImages : images
} 