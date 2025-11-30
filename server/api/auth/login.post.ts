import { compare, hash } from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password } = body

    if (!email || !password) {
      throw new ValidationError('Email and password are required')
    }

    const db = hubDatabase()

    // 查询数据库中的用户
    const userQuery = 'SELECT id, uuid, email, password_hash, full_name, nickname, status FROM users WHERE email = ? AND status = "active"'
    const user = await db.prepare(userQuery).bind(email).first()

    if (!user) {
      throw new UnauthorizedError('Invalid credentials')
    }
    // 验证密码
    const isPasswordValid = compare(password, user.password_hash)
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials')
    }

    // 更新最后登录时间
    await db.prepare('UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?').bind(user.id).run()

    // 生成JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        userUuid: user.uuid,
        email: user.email
      },
      process.env.JWT_SECRET || 'your-secret-key',
      {
        expiresIn: '7d'
      }
    )

    return ApiResponse.success({
      user: {
        id: user.id,
        uuid: user.uuid,
        email: user.email,
        fullName: user.full_name,
        nickname: user.nickname
      },
      token: token
    }, 'Login successful')
  } catch (error) {
    ApiResponse.handleException(error, event)
  }
})