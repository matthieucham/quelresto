// the version is used to resolved the selenium server jar path
var seleniumServerJarVersion = require('../node_modules/selenium-server-standalone-jar/package.json').version,
    seleniumBinaries         = require('selenium-binaries');

module.exports = {
    options: {
        "src_folders":            ["./tests/nightwatch/tests"],
        "output_folder":          "./tests/nightwatch/reports",
        "custom_commands_path":   "",
        "custom_assertions_path": "",
        "page_objects_path":      "./tests/nightwatch/pages",
        "globals_path":           "./tests/nightwatch/globalsModule.js",
        "selenium":               {
            "start_process": true,
            "server_path":   "./node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-" + seleniumServerJarVersion + ".jar",
            "log_path":      "./tests/nightwatch/logs",
            "host":          "127.0.0.1",
            "port":          4444,
            "cli_args":      {
                "webdriver.chrome.driver": seleniumBinaries.chromedriver,
                "webdriver.ie.driver":     seleniumBinaries.iedriver
            }
        },
        "test_settings":          {
            "default": {
                "launch_url":          "http://localhost:3001/#/",
                "selenium_port":       4444,
                "selenium_host":       "localhost",
                "silent":              true,
                "screenshots":         {
                    "enabled": false,
                    "path":    "./tests/nightwatch/screenshots"
                },
                "desiredCapabilities": {
                    "browserName":       "chrome",
                    "javascriptEnabled": true,
                    "acceptSslCerts":    true
                }
            },
            "ie":      {
                "desiredCapabilities": {
                    "browserName":       "internet explorer",
                    "javascriptEnabled": true,
                    "acceptSslCerts":    true
                }
            },
            "chrome":  {
                "desiredCapabilities": {
                    "browserName":       "chrome",
                    "javascriptEnabled": true,
                    "acceptSslCerts":    true
                }
            },
            "firefox": {
                "desiredCapabilities": {
                    "browserName":       "firefox",
                    "javascriptEnabled": true,
                    "acceptSslCerts":    true
                }
            }
        }
    }
};
