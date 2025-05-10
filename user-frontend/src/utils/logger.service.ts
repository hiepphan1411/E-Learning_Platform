/**
 * Hàm logger mặc định sử dụng console.log
 * @en Default logger function using console.log
 */
const consoleLogger = (data: unknown): void => {
  console.log(data);
};

/**
 * Hàm logger bỏ qua không làm gì
 * @en Ignore logger function that does nothing
 */
const ignoreLogger = (_data: unknown): void => {
  // Do nothing
};

/**
 * Interface cho các tùy chọn logger
 * @en Interface for logger options
 */
interface LoggerOptions<T, LoggerFields extends keyof T> {
  logger?: {
    type?: 'omit' | 'pick';
    fields: LoggerFields[];
    loggerFn?: (data: unknown) => void;
  };
}

/**
 * Lớp dịch vụ xử lý log cho MOMO
 * @en Logger service class for MOMO
 */
export class LoggerService {
    private isEnabled = false;
    private readonly loggerFn: (data: unknown) => void = ignoreLogger;

    /**
     * Khởi tạo dịch vụ logger
     * @en Initialize logger service
     *
     * @param isEnabled - Cho phép log hay không
     * @en @param isEnabled - Enable logging or not
     *
     * @param customLoggerFn - Hàm logger tùy chỉnh
     * @en @param customLoggerFn - Custom logger function
     */
    constructor(isEnabled = false, customLoggerFn?: (data: unknown) => void) {
        this.isEnabled = isEnabled;
        this.loggerFn = customLoggerFn || (isEnabled ? consoleLogger : ignoreLogger);
    }

    /**
     * Ghi log dữ liệu
     * @en Log data
     *
     * @param data - Dữ liệu cần log
     * @en @param data - Data to log
     *
     * @param options - Tùy chọn log
     * @en @param options - Logging options
     *
     * @param methodName - Tên phương thức gọi log
     * @en @param methodName - Method name that calls the log
     */
    public log<T extends object, LoggerFields extends keyof T>(
        data: T,
        options?: LoggerOptions<T, LoggerFields>,
        methodName?: string,
    ): void {
        if (!this.isEnabled) return;

        const logData = { ...data };

        if (methodName) {
            Object.assign(logData, { method: methodName, createdAt: new Date() });
        }

        if (options?.logger && 'fields' in options.logger) {
            const { type, fields } = options.logger;

            for (const key of Object.keys(logData)) {
                const keyAssert = key as unknown as LoggerFields;
                if (
                    (type === 'omit' && fields.includes(keyAssert)) ||
                    (type === 'pick' && !fields.includes(keyAssert))
                ) {
                    delete logData[keyAssert];
                }
            }
        }

        // Execute logger function
        (options?.logger?.loggerFn || this.loggerFn)(logData);
    }
}
