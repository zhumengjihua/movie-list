

export default defineEventHandler(async (event) => {
  try {
    // For local auth, logout is mainly handled on the client side
    // by clearing the token. This endpoint can be used for any server-side cleanup.

    return ApiResponse.success({}, 'Logged out successfully')
  } catch (error) {
    ApiResponse.handleException(error, event)
  }
})