const mineflayer = require('mineflayer')
const http = require('http')

const CONFIG = {
  host: 'play.aurheimsmp.my.id',
  port: 25565,
  username: 'ZeroxAFK',
  version: false, // AUTO DETECT 1.21.11 biar gak ke-kick ViaVersion
  auth: 'offline',
  password: 'aurheim123' // GANTI PASSWORD BOT LU DISINI
}

let bot = null
let reconnectTimeout = 90000

function createBot() {
  if (bot) return
  console.log(`[Zerox] Nyoba konek ke ${CONFIG.host}...`)

  bot = mineflayer.createBot({
    host: CONFIG.host,
    port: CONFIG.port,
    username: CONFIG.username,
    version: CONFIG.version,
    auth: CONFIG.auth
  })

  // AUTO LOGIN / REGISTER SimpleLogin
  bot.on('messagestr', (msg) => {
    console.log('[CHAT]', msg)
    if (msg.includes('/login') || msg.includes('/l ') || msg.includes('gunakan /login')) {
      bot.chat(`/login ${CONFIG.password}`)
      console.log('[Zerox] Auto LOGIN!')
    }
    if (msg.includes('/register') || msg.includes('/reg ')) {
      bot.chat(`/register ${CONFIG.password} ${CONFIG.password}`)
      console.log('[Zerox] Auto REGISTER!')
    }
  })

  bot.on('spawn', () => {
    console.log('[Zerox] BOT MASUK - SERVER AMAN BOS!')
    reconnectTimeout = 90000
    
    // Anti-AFK biar gak di kick ClearLag
    bot.setControlState('jump', true)
    setTimeout(() => bot.setControlState('jump', false), 1000)

    // Gerak tiap 5 menit
    setInterval(() => {
      bot.setControlState('sneak', true)
      setTimeout(() => bot.setControlState('sneak', false), 500)
    }, 300000)
  })

  bot.on('kicked', (reason) => {
    console.log('[Zerox] KE-KICK:', reason)
    // kalo ke-kick karna "You are already connected" tunggu lebih lama
    if (reason.includes('already connected')) reconnectTimeout = 180000
  })

  bot.on('end', () => {
    console.log(`[Zerox] DC, reconnect ${reconnectTimeout/1000} detik...`)
    bot = null
    setTimeout(createBot, reconnectTimeout)
    if (reconnectTimeout < 300000) reconnectTimeout += 30000
  })

  bot.on('error', (err) => {
    console.log('[Zerox] Error:', err.message)
  })
}

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('Bot ZeroxAFK alive! 38 plugins OK')
}).listen(10000, () => {
  console.log('[WEB] Web server jalan di port 10000 buat UptimeRobot')
})

createBot()
