import { NextApiRequest, NextApiResponse } from 'next'
import { IDecodedToken } from './../app/utils/interface'
import jwt from 'jsonwebtoken'
import User from './../app/models/user'
import Organization from '../app/models/organization'
import Jobseeker from '../app/models/job-seeker'

export const isAuthenticated = async(req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.authorization
  if (!token)
    return res.status(401).json({ msg: 'Invalid authentication.' })

  const decoded = <IDecodedToken>jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
  if (!decoded.id)
    return res.status(401).json({ msg: 'Invalid authentication.' })

  const user = await User.findById(decoded.id)
  if (!user)
    return res.status(401).json({ msg: 'Invalid authentication.' })

  return user
}

export const authorizeRoles = async(userId: string, res: NextApiResponse, ...roles: string[]) => {
  const user = await User.findById(userId)
  if (!roles.includes(user.role)) {
    return res.status(401).json({ msg: `${user.role} role don\'t have access to this resource.` })
  }

  let userDetail
  if (user.role === 'organization') {
    userDetail = await Organization.findOne({ user: userId }).populate('user')
    return userDetail
  } else if (user.role === 'jobseeker') {
    userDetail = await Jobseeker.findOne({ user: userId }).populate('user')
    return userDetail
  }

  return true
}