import main from './src/server'
import setEnvironments from './src/shared/config/environments'

const { GRAPHQL_CORS_ORIGIN, GRAPHQL_PATH, PORT_SERVER, WEBSOCKET_PATH } =
  setEnvironments()

main(GRAPHQL_CORS_ORIGIN, WEBSOCKET_PATH, GRAPHQL_PATH, PORT_SERVER)
