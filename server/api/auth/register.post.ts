import { hash } from 'bcryptjs'
import jwt from 'jsonwebtoken'


export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password, name } = body

    if (!email || !password || !name) {
      throw new ValidationError('Email, password, and name are required')
    }

    // TODO: Check if user already exists in database
    // This is a placeholder - you'll need to implement based on your database schema
    // For now, we'll just create a mock user
    const hashedPassword = await hash(password, 12)

    // TODO: Create new user in database
    // This is a placeholder - you'll need to implement based on your database schema
    const newUser = {
      id: 'user-id-' + Date.now(), // Replace with actual user ID generation
      email,
      name,
      password: hashedPassword
    }

    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email
      },
      process.env.JWT_SECRET || 'your-secret-key',
      {
        expiresIn: '7d'
      }
    )

    return ApiResponse.success({
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      },
      token: {
        access: token
      }
    }, 'Registration successful')
  } catch (error) {
    ApiResponse.handleException(error, event)
  }
})