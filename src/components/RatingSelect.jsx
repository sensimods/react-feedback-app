import { useState, useContext, useEffect } from "react"
import FeedbackContext from "../context/FeedbackContext"


const RatingSelect = ({select}) => {
  const [selected, setSelected] = useState(10)

  const { feedbackEdit } = useContext(FeedbackContext)

  useEffect(() => {
    if(feedbackEdit.edit === true) {
      setSelected(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])


  /* By default the e.currentTarget.value will be a string but by adding '+' just     before the e.currentTarget.value it will convert it to a number
  */
  const handleChange = (e) => {
    setSelected(+e.currentTarget.value)
    select(+e.currentTarget.value)
  }

  return (
    <ul className='rating'>
      {Array.from({ length: 10 }, (_, i) => (
        <li key={`rating-${i + 1}`}>
          <input
            type='radio'
            id={`num${i + 1}`}
            name='rating'
            value={i + 1}
            onChange={handleChange}
            checked={selected === i + 1}
          />
          <label htmlFor={`num${i + 1}`}>{i + 1}</label>
        </li>
      ))}
    </ul>
  )
}

export default RatingSelect