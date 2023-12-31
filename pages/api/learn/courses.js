import { authenticate } from "../../../utils/authenticate"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import Course from '../../../models/courseModel'

/**
 * @desc    Get courses for course selection
 * @route   GET /api/learn/courses
 * @access  Private - Students
 */
export default async function (req, res) {
  try {
    if(req.method !== 'GET') {
      throw new Error(`${req.method} is an invalid request method`)
    }

    // Connect to database
    await connectDB()

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization)

    // Make sure user is a student
    checkUserType(user, 1)

    const courses = await Course.find({})
      .populate({
        path: 'units',
        select: '_id courseName',
      })
    
    // Check user for completed
    for(let i in user.completedCourses) {
      console.log(i)
    }

    res.json({ courses: courses })
  } catch(error) {
    res.status(400).json({message: error.message})
  }
}


