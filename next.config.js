require('dotenv').config()

module.exports = {
  env: {
    GITHUB_ID:process.env.GITHUB_ID,
    GITHUB_SECRET:process.env.GITHUB_SECRET,
    SECRET:process.env.SECRET,
    NEXTAUTH_URL:process.env.NEXTAUTH_URL
  } ,images: {
    domains: ['lh3.googleusercontent.com'],
  },
}
