import morgan, {StreamOptions} from "morgan";
import logger from "../utils/logger";

const stream: StreamOptions = {
    write: (message) => logger.http(message)
}

const skip = () => {
    const ENV = process.env.NODE_ENV;
    return ENV !== 'development'
}

const morganmiddleware = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    {stream, skip}
)

export default morganmiddleware