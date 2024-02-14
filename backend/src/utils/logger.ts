import winston from "winston"
import {context, trace} from "@opentelemetry/api"
import dotenv from 'dotenv'
dotenv.config()

const levels = {
  error: 0,
  warn : 1,
  info : 2,
  http : 3,
  debug: 4,
};

const colors = {
    error: 'red',
    warn : 'yellow',
    info : 'green',
    http : 'magenta',
    debug: 'white',
  }

winston.addColors(colors)

// DEVELOPMENT
const developmentFormat = winston.format.combine(
    winston.format.colorize({all: true}),
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss:ms'}),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    )
)

// PRODUCTION
const productionFormat = winston.format.combine(
    winston.format((info) => {
        const currentSpan = trace.getSpan(context.active())
        if (currentSpan) {
            const {traceId} = currentSpan.spanContext()
            // eslint-disable-next-line no-param-reassign
            info.message = `[TraceID: ${traceId}] ${info.message}`
        }
        return info
    })(),
    winston.format.json(),
)

const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        process.env.NODE_ENV === 'development'
            ? developmentFormat
            : productionFormat
);

const transports = [
    new winston.transports.Console()
]

const level = 'debug'

// Create Logger
const logger = winston.createLogger({
    level,
    levels,
    format,
    transports,
})

export default logger