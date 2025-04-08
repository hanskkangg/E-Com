import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {

    const { token } = req.headers;

    // Check if token is missing
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again' })
    }

    try {

        // Verify token and get user ID
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export default authUser