const mineflayer = require('mineflayer')

const CONFIG = {
  host: 'play.aurheimsmp.my.id',
  port: 25565,
  username: 'ZeroxAFK',
  version: false, // biar auto ngikutin versi server lu
}

function createBot() {
  console.log('Nyoba konek ke Aurheim...')
  const bot = mineflayer.createBot(CONFIG)
  
  bot.on('spawn', () => {
    console.log('BOT MASUK - SERVER AURHEIM AMAN BOS!')
    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)
    }, 300000)
  })
  
  bot.on('end', () => {
    console.log('BOT KE-DISCONNECT, RECONNECT 30 DETIK')
    setTimeout(createBot, 30000)
  })
  
  bot.on('error', (err) => console.log(err))
  bot.on('kicked', (reason) => console.log('KE-KICK: ' + reason))
}

createBot()

require('http').createServer((req, res) => res.end('Bot Aurheim is running')).listen(10000)
