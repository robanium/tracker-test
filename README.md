### Как запустить?

Работа скриптов запуска и приложения была протестирована на `Debian GNU/Linux 11 (bullseye)` и `node V18.10.0`

Поддерживаются следующие команды:

- `npm run-script start` - соберет проект, запустит сервер `mongodb-memory-server` и затем запустит приложение (В консоль будут логироваться входящие запросы с клиента, это сделано для удобства демонстрации работы приложения).
- `npm run-script test` - выполнит все тесты
- `npm run-script build` - выполнит сборку проекта в папку **.build**.
- `npm run-script develop` - запустит режим разработки с режимом отслеживания изменения файлов и последующией пересборкой и перезапуском (**nodemon**) приложения.

### Структура директорий

```
tracker-test
├── client # Статичные страницы отдаваемые express с http://localhost:8000/
├── server # Реализация сервера принимающего запросы к http://localhsot:8001/track
├── tracker # Реализация Tracker
├── README
├── index.ts
├── Gulpfile.js # Таски для сборки проекта
├── rollup.tracker.js # Конфигурация rollup для Tracker
├── config.node.json # Общая конфигурация для client/server
├── config.tracker.json # Конфигурация для настройки поведения Tracker (интервал отправки и.т д)
├── tsconfig.json
├── tsconfig.node.json # Настройки транслятора для server/client
└── tsconfig.tracker.json # Настройки транслятора для Tracker

```
