import jwt from 'jsonwebtoken'

const adminAuth = async (req,res,next) => {
    try {
        const { token } = req.headers
        
        // If token is missing
        if (!token) {
            return res.json({success:false,message:"Not Authorized Login Again"})
        }
        
        // Decode token
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        
        // Check if decoded token matches admin credentials
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({success:false,message:"Not Authorized Login Again"})
        }
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default adminAuth