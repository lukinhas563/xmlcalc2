import 'dotenv/config'

export type Environments = {
  GRAPHQL_CORS_ORIGIN: string
  WEBSOCKET_PATH: string
  GRAPHQL_PATH: string
  PORT_SERVER: number
}

export default function setEnvironments(): Environments {
  let GRAPHQL_CORS_ORIGIN = process.env.GRAPHQL_CORS_ORIGIN
  let WEBSOCKET_PATH = process.env.GRAPHQL_WEBSOCKET_PATH
  let GRAPHQL_PATH = process.env.GRAPHQL_CLIENT_PATH
  let PORT_SERVER = Number(process.env.GRAPHQL_SERVER_PORT)

  if (GRAPHQL_CORS_ORIGIN === undefined) {
    GRAPHQL_CORS_ORIGIN = '*'
  }

  if (WEBSOCKET_PATH === undefined) {
    WEBSOCKET_PATH = '/graphql'
  }

  if (GRAPHQL_PATH === undefined) {
    GRAPHQL_PATH = '/graphql'
  }

  if (PORT_SERVER === undefined) {
    PORT_SERVER = 4000
  }

  return {
    GRAPHQL_CORS_ORIGIN,
    WEBSOCKET_PATH,
    GRAPHQL_PATH,
    PORT_SERVER,
  }
}
