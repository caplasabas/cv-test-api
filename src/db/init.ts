import { Resume, Education, Experience } from './models'
const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => {
  Resume.sync({ alter: isDev }),
  Education.sync({ alter: isDev })
  Experience.sync({ alter: isDev })
}
export default dbInit 