// import fs from 'fs/promises'
// import path from 'path'
// import { fileURLToPath } from 'url'
// import { spawn } from 'child_process'

// const __dirname = path.dirname(fileURLToPath(import.meta.url))
// const LOG_DIR = path.join(__dirname, 'run_log')
// const LOG_FILE = path.join(LOG_DIR, 'current_run.json')

// // Расширенные данные системы
// async function getSystemInfo() {
//   return {
//     cpu: (await import('node:os')).cpus()[0].model,
//     memory: (await import('node:os')).totalmem() / 1024 / 1024 + ' MB',
//     uptime: (await import('node:os')).uptime(),
//     nodePath: process.execPath,
//     pid: process.pid,
//     argv: process.argv,
//     execArgv: process.execArgv
//   }
// }

// // Сбор данных о зависимостях
// async function getDepsInfo() {
//   try {
//     const pkg = JSON.parse(await fs.readFile(path.join(__dirname, '../package.json')))
//     return {
//       dependencies: Object.keys(pkg.dependencies || {}),
//       devDependencies: Object.keys(pkg.devDependencies || {})
//     }
//   } catch {
//     return { error: 'Не удалось прочитать package.json' }
//   }
// }

// // Мониторинг ресурсов
// class ResourceMonitor {
//   constructor() {
//     this.start = Date.now()
//     this.usage = {
//       cpu: process.cpuUsage(),
//       memory: process.memoryUsage()
//     }
//   }

//   getMetrics() {
//     const cpu = process.cpuUsage(this.usage.cpu)
//     const memory = process.memoryUsage()
//     return {
//       uptime: (Date.now() - this.start) / 1000 + 's',
//       cpuUsage: `${(cpu.user + cpu.system) / 1000}ms`,
//       memory: {
//         rss: memory.rss / 1024 / 1024 + 'MB',
//         heapTotal: memory.heapTotal / 1024 / 1024 + 'MB',
//         heapUsed: memory.heapUsed / 1024 / 1024 + 'MB'
//       }
//     }
//   }
// }

// async function startLogging() {
//   await fs.mkdir(LOG_DIR, { recursive: true })
  
//   const systemInfo = await getSystemInfo()
//   const depsInfo = await getDepsInfo()
//   const monitor = new ResourceMonitor()

//   const logData = {
//     startTime: new Date().toISOString(),
//     system: systemInfo,
//     dependencies: depsInfo,
//     command: process.argv.join(' '),
//     status: 'running',
//     updates: [],
//     exitCode: null,
//     endTime: null
//   }

//   // Запись начальных данных
//   await fs.writeFile(LOG_FILE, JSON.stringify(logData, null, 2))

//   // Функция обновления лога
//   const updateLog = async (update) => {
//     const data = JSON.parse(await fs.readFile(LOG_FILE))
//     data.updates.push({
//       timestamp: new Date().toISOString(),
//       metrics: monitor.getMetrics(),
//       ...update
//     })
//     await fs.writeFile(LOG_FILE, JSON.stringify(data, null, 2))
//   }

//   // Обновляем лог каждые 5 секунд
//   const interval = setInterval(() => updateLog({ type: 'heartbeat' }), 5000)

//   // Обработка завершения
//   const cleanup = async (exitCode = 0) => {
//     clearInterval(interval)
//     const finalData = JSON.parse(await fs.readFile(LOG_FILE))
//     finalData.status = 'finished'
//     finalData.exitCode = exitCode
//     finalData.endTime = new Date().toISOString()
//     finalData.finalMetrics = monitor.getMetrics()
    
//     // Архивируем завершенный лог
//     const archiveFile = path.join(LOG_DIR, 
//       `run_${finalData.startTime.replace(/[:.]/g, '-')}_exit-${exitCode}.json`)
//     await fs.writeFile(archiveFile, JSON.stringify(finalData, null, 2))
//     await fs.unlink(LOG_FILE)
//   }

//   // Перехватываем сигналы завершения
//   process.on('SIGINT', async () => {
//     await updateLog({ type: 'signal', signal: 'SIGINT' })
//     await cleanup(0)
//     process.exit(0)
//   })

//   process.on('SIGTERM', async () => {
//     await updateLog({ type: 'signal', signal: 'SIGTERM' })
//     await cleanup(0)
//     process.exit(0)
//   })

//   process.on('exit', async (code) => {
//     await updateLog({ type: 'exit', code })
//     await cleanup(code)
//   })

//   return { updateLog }
// }

// // Запуск основной команды через spawn
// async function runCommand() {
//   const { updateLog } = await startLogging()
  
//   const cmd = process.argv[2]
//   const args = process.argv.slice(3)
  
//   const child = spawn(cmd, args, { 
//     stdio: 'inherit',
//     shell: true
//   })

//   child.on('data', (data) => {
//     updateLog({ type: 'output', data: data.toString() })
//   })

//   child.on('error', async (err) => {
//     await updateLog({ type: 'error', error: err.message })
//   })

//   child.on('exit', async (code) => {
//     await updateLog({ type: 'childExit', code })
//   })
// }

// runCommand().catch(console.error)