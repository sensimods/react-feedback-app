import RatingSelect from "./RatingSelect"
import Card from "./shared/Card"
import Button from "./shared/Button"
import { useState, useContext, useEffect } from "react"
import FeedbackContext from "../context/FeedbackContext"

const FeedbackForm = () => {
  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')

  const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

  /*
    useEffect takes in a callback, and then a dependancy array. If the dependancy array is empty then the code within the callback function in useEffect will run once automatically. This can be useful to leave the array empty if we want to fecth initial data. However, if we set the dependancy array then the code within the callback in useEffect will only execute when something changes in the dependancy array. So in this case we are passing in 'feebackEdit' as our dependancy array. 'feedbackEdit' has its values changed when the edit button is clicked. We click the edit button, it triggers the 'setFeedbackEdit' function in our useState in FeedbackContext.js which in turn chhanges the item, and edit property values meaning something has changed in our dependancy array and useEffect will now run
  */
  useEffect(() => {
    if(feedbackEdit.edit === true) {
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])

  const handleTextChange = (e) => {
    if(text === '') {
      setBtnDisabled(true)
      setMessage(null)
    } else if(text !== '' && text.trim().length <= 10) {
      setMessage('Text must be at least 10 characters')
      setBtnDisabled(true)
    } else {
      setMessage(null)
      setBtnDisabled(false)
    }

    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(text.trim().length > 10) {
      const newFeedback = {
        text,
        rating
      }

      if(feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback)
      } else {
        addFeedback(newFeedback)
      }
      setText('')
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input 
            onChange={handleTextChange} 
            type="text" 
            placeholder="Write a review" 
            value={text}
          />
          
          <Button type='submit' isDisabled={btnDisabled}>
            Send
          </Button>

        </div>

        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm