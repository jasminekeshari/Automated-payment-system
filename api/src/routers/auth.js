// api/src/routers/auth.js
import express from 'express'
import { authAdmin } from '../lib/firebaseAdmin'
import User from '../models/User.js'

const router = express.Router()

// body: { idToken, role }
router.post('/register', async (req, res) => {
  try {
    const { idToken, role } = req.body
    // 1) verify Firebase token
    const { uid, email } = await authAdmin.verifyIdToken(idToken)

    // 2) save to Mongo (skip if already exists)
    let user = await User.findOne({ uid })
    if (!user) {
      user = await User.create({ uid, email, role })  
    }

    res.json({ ok: true, user })
  } catch (e) {
    console.error(e)
    res.status(400).json({ ok: false, error: e.message })
  }
})

export default router