import mongoose from 'mongoose'
import { app } from './app'
import config from './config/index'
import { errorLogger, logger } from './shared/logger'
async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('DB Connected on Successfully')
    app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error(error)
    throw error
  }
}
main().catch(err => logger.error(err))
