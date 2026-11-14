const mineflayer = require('mineflayer')
const http = require('http')

const CONFIG = {
  host: 'acorezero.qzz.io',
  port: 20055,
  username: 'ZeroxAFK',
  version: '1.21.11', // GANTI JADI 1.21.11 EXACT!
  auth: 'offline',
  password: 'aurheim123'
}

let bot = null

function createBot() {
  if (bot) return
  console.log(`[Zerox] Nyoba konek ke ${CONFIG.host}...`)

  bot = mineflayer.createBot({
    host: CONFIG.host,
    port: CONFIG.port,
    username: CONFIG.username,
    version: CONFIG.version,
    auth: CONFIG.auth,
    hideErrors: false
  })

  bot.on('messagestr', (msg) => {
    console.log('[CHAT]', msg)
    const lower = msg.toLowerCase()
    if (lower.includes('/login') || lower.includes('please login') || lower.includes('gunakan /login')) {
      setTimeout(() => {
        bot.chat(`/login ${CONFIG.password}`)
        console.log('[Zerox] -> kirim /login')
      }, 2000)
    }
    if (lower.includes('/register') || lower.includes('please register')) {
      setTimeout(() => {
        bot.chat(`/register ${CONFIG.password} ${CONFIG.password}`)
        console.log('[Zerox] -> kirim /register')
      }, 2000)
    }
  })

  bot.on('spawn', () => {
    console.log('[Zerox] BOT MASUK SUKSES!')
  })

  bot.on('kicked', (reason) => {
    console.log('=== KE-KICK FULL REASON ===')
    console.log(JSON.stringify(reason, null, 2))
    console.log('===========================')
  })

  bot.on('end', (reason) => {
    console.log(`[Zerox] END:`, reason)
    bot = null
    setTimeout(createBot, 15000)
  })

  bot.on('error', (err) => {
    console.log('[Zerox] Error:', err.message, err)
  })
}

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('Alive')
}).listen(10000)

createBot()
