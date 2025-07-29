const sendCookies = ({res, refreshToken, accessToken})=>{
    res.cookie("refreshToken", refreshToken , {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.SAMESITE,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.SAMESITE,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
}

module.exports = sendCookies;