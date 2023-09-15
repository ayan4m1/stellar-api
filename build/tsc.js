System.register("modules/config", ["dotenv/config"], function (exports_1, context_1) {
    "use strict";
    var auth, logging, mongo, http;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (_1) {
            }
        ],
        execute: function () {
            exports_1("auth", auth = {
                jwtSecret: process.env.STELLAR_AUTH_JWT_SECRET
            });
            exports_1("logging", logging = {
                level: process.env.STELLAR_LOG_LEVEL || 'info',
                timestampFormat: process.env.STELLAR_LOG_TIME_FMT
            });
            exports_1("mongo", mongo = {
                uri: process.env.STELLAR_MONGO_URI
            });
            exports_1("http", http = {
                port: parseInt(process.env.STELLAR_HTTP_PORT || '8080', 10),
                corsOrigin: process.env.STELLAR_HTTP_CORS_ORIGIN
            });
        }
    };
});
System.register("modules/logging", ["winston", "modules/config"], function (exports_2, context_2) {
    "use strict";
    var winston_1, config_js_1, Container, format, transports, combine, label, prettyPrint, printf, timestamp, loggers, container, createLogger, getLogger;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (winston_1_1) {
                winston_1 = winston_1_1;
            },
            function (config_js_1_1) {
                config_js_1 = config_js_1_1;
            }
        ],
        execute: function () {
            Container = winston_1.default.Container, format = winston_1.default.format, transports = winston_1.default.transports;
            combine = format.combine, label = format.label, prettyPrint = format.prettyPrint, printf = format.printf, timestamp = format.timestamp;
            loggers = {};
            container = new Container();
            createLogger = (category, categoryLabel) => {
                let formatter = (data) => `[${data.level}][${data.label}] ${data.message}`;
                const formatters = [label({ label: categoryLabel })];
                if (config_js_1.logging.timestampFormat) {
                    formatters.push(timestamp({ format: config_js_1.logging.timestampFormat }));
                    formatter = (data) => `${data.timestamp} [${data.level}][${data.label}] ${data.message}`;
                }
                formatters.push(prettyPrint(), printf(formatter));
                container.add(category, {
                    transports: [
                        new transports.Console({
                            level: config_js_1.logging.level,
                            format: combine.apply(null, formatters)
                        })
                    ]
                });
                return container.get(category);
            };
            exports_2("getLogger", getLogger = (category, categoryLabel = category) => {
                if (!loggers[category]) {
                    loggers[category] = createLogger(category, categoryLabel);
                }
                return loggers[category];
            });
        }
    };
});
System.register("index", ["express", "modules/logging", "modules/config"], function (exports_3, context_3) {
    "use strict";
    var express_1, logging_js_1, config_js_2, isProduction, app, log;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (express_1_1) {
                express_1 = express_1_1;
            },
            function (logging_js_1_1) {
                logging_js_1 = logging_js_1_1;
            },
            function (config_js_2_1) {
                config_js_2 = config_js_2_1;
            }
        ],
        execute: function () {
            isProduction = process.env.NODE_ENV === 'production';
            app = express_1.default();
            log = logging_js_1.getLogger('app');
            app.get('/', (req, res) => res.send('API Running'));
            app.use((err, res) => {
                console.log(err, 'ln 15 index.ts');
                res.status(500).send('Server Error');
            });
            app.listen(config_js_2.http.port, () => log.info(`Listening on port ${config_js_2.http.port}`));
        }
    };
});
//# sourceMappingURL=tsc.js.map