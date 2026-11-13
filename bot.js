const mineflayer = require('mineflayer')

const CONFIG = {
  host: 'play.aurheimsmp.my.id',
  port: 25565,
  username: 'ZeroxAFK',
  version: '1.21.11',
  auth: 'offline'
}

function createBot() {
  console.log('[Zerox] Nyoba konek ke ' + CONFIG.host + '...')
  const bot = mineflayer.createBot(CONFIG)

  bot.on('spawn', () => {
    console.log('[Zerox] BOT MASUK - SERVER AMAN BOS!')
    console.log('[Zerox] Anti-AFK aktif tiap 5 menit')
  })

  // Auto Login / Register SimpleLogin
  bot.on('messagestr', (msg) => {
    console.log('[CHAT] ' + msg)
    const lower = msg.toLowerCase()
    
    if (lower.includes('/login') || lower.includes('please login') || lower.includes('silahkan login')) {
      console.log('[Zerox] Auto login...')
      bot.chat('/login Ziee12345') // <-- GANTI PASSWORD LU
    }
    
    if (lower.includes('/register')) {
      console.log('[Zerox] Auto register...')
      bot.chat('/register Ziee12345 Ziee12345') // <-- GANTI PASSWORD LU
    }
  })

  // Anti-AFK: Loncat + Pukul tiap 5 menit biar gak di kick Acore
  bot.on('spawn', () => {
    setInterval(() => {
      if (!bot.entity) return
      console.log('[Zerox] Gerak anti-AFK...')
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 600)
      bot.swingArm('right')
      bot.look(Math.random() * Math.PI * 2, 0)
    }, 300000) // 5 menit
  })

  bot.on('end', () => {
    console.log('[Zerox] DC, reconnect 30 detik...')
    setTimeout(createBot, 30000)
  })

  bot.on('kicked', (reason) => {
    console.log('[Zerox] KE-KICK: ' + reason)
    setTimeout(createBot, 15000)
  })

  bot.on('error', (err) => {
    console.log('[Zerox] Error: ' + err.message)
  })
}

createBot()

// WEB SERVER BUAT UPTIMEROBOT - JANGAN DIHAPUS
// Ini yang bikin gak perlu renew host bot nya
require('http').createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('ZeroxAFK Bot is running - play.aurheimsmp.my.id Aman 24/7')
}).listen(10000, () => {
  console.log('[WEB] Web server jalan di port 10000 buat UptimeRobot')
})
