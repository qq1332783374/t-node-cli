/**
 * 配置项说明：
 * level - 要记录的消息级别。
 * filename - 用于将日志数据写入的文件
 * handleExceptions - 捕获并记录未处理的异常。
 * json - 以JSON格式记录日志数据。
 * maxsize - 在创建新文件之前，日志文件的最大大小（以字节为单位）。
 * maxFiles - 限制超出日志文件大小时创建的文件数。
 * colorize - 着色输出。这在查看控制台日志时很有用。
 */
/**
 * 记录级别表示消息优先级，0到5（从最高到最低）
 *
 * 0：error
 * 1：warn
 * 2：info
 * 3：verbose
 * 4：debug
 * 5：silly
 */
const appRoot = require('app-root-path');
const winston = require('winston');

// 为每个传输(文件、控制台)定义自定义设置
const options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false, // 在处理异常时不退出
});

// 创建一个带有'write'函数的流对象，' morgan '将使用该函数
logger.stream = {
    write: function (message, encoding) {
        // 使用 info 级别打印信息
        logger.info(message);
    },
};

module.exports = logger;