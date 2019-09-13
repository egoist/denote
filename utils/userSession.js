import { UserSession, AppConfig } from 'blockstack'

export const appConfig = new AppConfig(['store_write', 'publish_data'])
export const userSession = new UserSession({ appConfig })

if (process.env.NODE_ENV === 'development' && process.browser) {
  window.userSession = userSession
}