import {motion, AnimatePresence} from 'framer-motion'
import { useContext } from 'react'
import FeedbackItem from './FeedbackItem'
import FeedbackContext from '../context/FeedbackContext'

const FeedbackList = () => {
  const {feedback} = useContext(FeedbackContext)

  if(!feedback || feedback.length === 0) {
    return <p>No feeback yet</p>
  }

  // Without framer-motion
  // return (
  //   <div className="feeback-list">
  //     {feedback.map((item) => (

  //       <FeedbackItem 
  //         key={item.id} 
  //         item={item} 
  //         handleDelete={handleDelete} 
  //       />

  //     ))}
  //   </div>
  // )

  return (
    <div className='feeback-list'>
      <AnimatePresence>
        {feedback.map((item) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FeedbackItem
              key={item.id}
              item={item}
            />

          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

/*
'feedback' takes in an array, and we could just set the PropType to array. Although here we are specifiying that it's an array, and describing what the array should contain and then setting the proptypes of each key
*/


export default FeedbackList