const mineflayer = require('mineflayer')
const http = require('http')

const CONFIG = {
  host: 'play.aurheimsmp.my.id',
  port: 25565,
  username: 'ZeroxAFK',
  version: '1.21.1',
  auth: 'offline'
}

let bot = null
let reconnectTimeout = 90000 // 90 DETIK, JANGAN 30 DETIK

function createBot() {
  if (bot) return // cegah double bot
  console.log(`[Zerox] Nyoba konek ke ${CONFIG.host}...`)

  bot = mineflayer.createBot({
    host: CONFIG.host,
    port: CONFIG.port,
    username: CONFIG.username,
    version: CONFIG.version,
    auth: CONFIG.auth
  })

  bot.on('spawn', () => {
    console.log('[Zerox] BOT MASUK - SERVER AMAN BOS!')
    reconnectTimeout = 90000 // reset ke 90 detik kalo udah masuk
  })

  bot.on('kicked', (reason) => {
    console.log('[Zerox] KE-KICK:', reason)
  })

  bot.on('end', () => {
    console.log(`[Zerox] DC, reconnect ${reconnectTimeout/1000} detik...`)
    bot = null
    setTimeout(createBot, reconnectTimeout)
    // tiap ke-kick throttle, tambah delay nya jadi 2 menit, 3 menit
    if (reconnectTimeout < 300000) reconnectTimeout += 30000
  })

  bot.on('error', (err) => {
    console.log('[Zerox] Error:', err.message)
  })
}

// Web server buat UptimeRobot
http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('Bot is alive!')
}).listen(10000, () => {
  console.log('[WEB] Web server jalan di port 10000 buat UptimeRobot')
})

createBot()
