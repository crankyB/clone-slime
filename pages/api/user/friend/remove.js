import { mongoose } from 'mongoose'
import { authenticate } from "../../../../utils/authenticate"
import { checkUserType } from '../../../../utils/checkUserType'
import connectDB from '../../../../utils/connectDB'
import User from '../../../../models/userModel'

/**
 * @desc    Remove friend
 * @route   POST /api/user/friend/remove
 * @access  Private - Students
 * @param   {string} req.body.friendId - Account id of friend you want delete
 */
export default async function (req, res) {
  try {
    if(req.method !== 'POST') {
      throw new Error(`${req.method} is an invalid request method`)
    }

    // Connect to database
    await connectDB()

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization)

    // Make sure user is a student
    checkUserType(user, 1)
    
    const { friendId } = req.body

    const friendIdObj = new mongoose.Types.ObjectId(friendId)

    const simpleUser = await User.findById(user._id, {password: 0})

    if(!simpleUser.friends.includes(friendIdObj)) {
      throw new Error('You already were not friends with anyone of that id')
    }

    const friend = await User.findById(friendIdObj, {password: 0})

    // This shouldn't happen usually, but if a user gets deleted, it could happen
    if(!friend) {
      throw new Error('Could not find that friend')
    }

    simpleUser.friends = simpleUser.friends.filter((element) => element == friendIdObj)
    friend.friends = friend.friends.filter((element) => element == user._id)

    await User.findByIdAndUpdate(user._id, {
      friends: simpleUser.friends,
    })
    await User.findByIdAndUpdate(friendIdObj, {
      friends: friend.friends,
    })

    const friends = (await User.findById(user._id)
      .select('friends')
      .populate({
        path: 'friends',
        select: '_id userType username',
      })
      .exec()
    ).friends

    res.status(200).json({
      friends: friends,
    })

  } catch(error) {
    res.status(400).json({message: error.message})
  }
}
