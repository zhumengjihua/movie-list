import jwt from 'jsonwebtoken'


export default defineEventHandler(async (event) => {
  try {
    const authorization = getHeader(event, 'authorization')

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError('No token provided')
    }

    const token = authorization.split(' ')[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any

    // 从数据库查询真实的用户信息
    const db = hubDatabase()
    const userQuery = 'SELECT id, uuid, email, full_name, nickname, username, avatar_url, phone, status FROM users WHERE id = ?'
    const user = await db.prepare(userQuery).bind(decoded.userId).first()

    if (!user) {
      throw new NotFoundError('User')
    }

    return ApiResponse.success({
      user: {
        id: user.id,
        uuid: user.uuid,
        email: user.email,
        fullName: user.full_name,
        nickname: user.nickname,
        username: user.username,
        avatarUrl: user.avatar_url,
        phone: user.phone,
        status: user.status
      }
    }, 'User info retrieved successfully')
  } catch (error) {
    ApiResponse.handleException(error, event)
  }
})