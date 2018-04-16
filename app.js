"use strict"
const Discord = require('discord.js');
const client = new Discord.Client();
//const settings = require('./settings.json');
const token = process.env.DISCORD_TOKEN;
const binance = require('node-binance-api');

binance.options({
  APIKEY: process.env.BN_APIKEY,
  APISECRET: process.env.BN_SECRET,
  useServerTime: true,
  test: true
});

/*binance.prices('BNBBTC', (error, ticker) => {
  console.log(ticker);
  console.log("Price of BNB: ", ticker.BNBBTC);
});*/

binance.prices((error, ticker) => {
  let relevantTickers = Object.keys(ticker).reduce((tickers, pair) => {

    if (pair.endsWith('BTC') || pair.endsWith('USDT')) {
      tickers.push(pair);
    }

    //console.log(tickers);
    return tickers;
  }, [])

  //console.log(relevantTickers);

  relevantTickers.map((each) => {
    binance.candlesticks(each, "5m",(error, ticks, symbol) => {
      //console.log("candleSticks() ", ticks);
      let last_tick = ticks[ticks.length -1];
      let first_tick = ticks[0];
      let change = (parseFloat(last_tick[4]) - parseFloat(first_tick[4]))/parseFloat(first_tick[4]);
      //console.log(change*100);
      let last_close = last_tick[4];
      let first_close = first_tick[4];
      if (change*100 > 1) {
        //console.log(change*100);
        //console.log(each);
        console.log(symbol+" last close: " + last_close + ' and change was ' + change*100);
      }
      //console.log("for symbol " + each + " last_tick is " +last_tick);
      //let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
    },{limit: 3})
  })
  //console.log(BtcUsdtTickers.length);
  // console.log("Price of BTC: ", ticker.BTCUSDT);
});


//console.log(typeof(relevantTickers));
/*relevantTickers.map((ticker) => {
  //console.log(ticker);
  binance.candlesticks(ticker, "5m", (error, ticks, symbol) => {
    console.log("candlesticks() ", ticks);

  })
})*/


/*client.on('ready', () => {
  console.log("I'm Online!!!");
});

client.on('message', message => {
  if (message.content === 'ping') {
    message.channel.sendMessage('pong');
  }
});

client.login(token);*/
