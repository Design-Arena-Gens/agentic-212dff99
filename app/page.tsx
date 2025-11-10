'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Activity, DollarSign, Zap, Target, Clock, BarChart3, Flame } from 'lucide-react'

interface CryptoSignal {
  id: number
  symbol: string
  name: string
  currentPrice: number
  entryPrice: number
  targetPrice: number
  stopLoss: number
  multiplier: string
  roi: number
  confidence: number
  timeframe: string
  status: 'hot' | 'active' | 'pending'
  volume24h: string
  marketCap: string
  sentiment: 'bullish' | 'extremely-bullish'
}

export default function Home() {
  const [signals, setSignals] = useState<CryptoSignal[]>([])
  const [filter, setFilter] = useState<'all' | 'hot' | 'active'>('all')
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  useEffect(() => {
    // Generate realistic crypto signals
    const cryptoList = [
      { symbol: 'PEPE', name: 'Pepe Coin', base: 0.0000089 },
      { symbol: 'SHIB', name: 'Shiba Inu', base: 0.0000245 },
      { symbol: 'FLOKI', name: 'Floki Inu', base: 0.0001567 },
      { symbol: 'BONK', name: 'Bonk', base: 0.0000134 },
      { symbol: 'DOGE', name: 'Dogecoin', base: 0.0875 },
      { symbol: 'WIF', name: 'Dogwifhat', base: 1.45 },
      { symbol: 'TURBO', name: 'Turbo Token', base: 0.00234 },
      { symbol: 'MEME', name: 'Memecoin', base: 0.0145 },
      { symbol: 'BRETT', name: 'Brett', base: 0.089 },
      { symbol: 'WOJAK', name: 'Wojak', base: 0.00067 },
      { symbol: 'MONG', name: 'MongCoin', base: 0.0000234 },
      { symbol: 'AIDOGE', name: 'AI Doge', base: 0.0000000456 },
      { symbol: 'SPONGE', name: 'SpongeBob', base: 0.00089 },
      { symbol: 'COPE', name: 'Cope', base: 0.234 },
      { symbol: 'BOBBY', name: 'Bobby', base: 0.0123 },
      { symbol: 'TOSHI', name: 'Toshi', base: 0.000456 },
      { symbol: 'DUKO', name: 'Duko', base: 0.00234 },
      { symbol: 'MYRO', name: 'Myro', base: 0.0456 },
      { symbol: 'POPCAT', name: 'Popcat', base: 0.345 },
      { symbol: 'MOG', name: 'Mog Coin', base: 0.0000123 }
    ]

    const multipliers = ['10X', '25X', '50X', '75X', '100X', '150X', '200X', '300X', '500X']
    const timeframes = ['1-3 months', '2-4 months', '3-6 months', '6-12 months']
    const statuses: ('hot' | 'active' | 'pending')[] = ['hot', 'hot', 'active', 'active', 'active', 'pending']

    const generatedSignals: CryptoSignal[] = cryptoList.map((crypto, index) => {
      const multiplierStr = multipliers[Math.floor(Math.random() * multipliers.length)]
      const multiplierNum = parseInt(multiplierStr)
      const currentPrice = crypto.base * (0.85 + Math.random() * 0.3)
      const entryPrice = currentPrice * (0.95 + Math.random() * 0.1)
      const targetPrice = entryPrice * multiplierNum
      const stopLoss = entryPrice * (0.7 + Math.random() * 0.2)
      const roi = ((targetPrice - entryPrice) / entryPrice) * 100
      const confidence = 75 + Math.floor(Math.random() * 20)
      const volume = (Math.random() * 500 + 50).toFixed(1)
      const marketCap = (Math.random() * 1000 + 100).toFixed(1)

      return {
        id: index + 1,
        symbol: crypto.symbol,
        name: crypto.name,
        currentPrice,
        entryPrice,
        targetPrice,
        stopLoss,
        multiplier: multiplierStr,
        roi,
        confidence,
        timeframe: timeframes[Math.floor(Math.random() * timeframes.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        volume24h: `$${volume}M`,
        marketCap: `$${marketCap}M`,
        sentiment: (multiplierNum > 100 ? 'extremely-bullish' : 'bullish') as 'bullish' | 'extremely-bullish'
      }
    }).sort((a, b) => b.roi - a.roi)

    setSignals(generatedSignals)

    // Update last refresh time every 30 seconds
    const interval = setInterval(() => {
      setLastUpdate(new Date())
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const filteredSignals = filter === 'all'
    ? signals
    : signals.filter(s => s.status === filter)

  const formatPrice = (price: number) => {
    if (price < 0.001) return price.toFixed(10)
    if (price < 1) return price.toFixed(6)
    return price.toFixed(4)
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'hot': return 'bg-red-500'
      case 'active': return 'bg-green-500'
      case 'pending': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getMultiplierColor = (multiplier: string) => {
    const value = parseInt(multiplier)
    if (value >= 200) return 'text-purple-400'
    if (value >= 100) return 'text-pink-400'
    if (value >= 50) return 'text-orange-400'
    return 'text-green-400'
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
              🚀 Crypto Signals Dashboard
            </h1>
            <p className="text-gray-400 text-lg">Top 20 Most Profitable Opportunities • 10X to 500X Potential</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-green-400 mb-1">
              <Activity className="w-5 h-5 animate-pulse" />
              <span className="text-sm font-semibold">LIVE</span>
            </div>
            <p className="text-xs text-gray-500">
              Updated {lastUpdate.toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-400">Active Signals</span>
            </div>
            <p className="text-2xl font-bold text-green-400">{signals.filter(s => s.status === 'active').length}</p>
          </div>
          <div className="bg-gradient-to-br from-red-900/40 to-red-800/20 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-red-400" />
              <span className="text-sm text-gray-400">Hot Signals</span>
            </div>
            <p className="text-2xl font-bold text-red-400">{signals.filter(s => s.status === 'hot').length}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 border border-purple-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-gray-400">Avg ROI</span>
            </div>
            <p className="text-2xl font-bold text-purple-400">
              {(signals.reduce((acc, s) => acc + s.roi, 0) / signals.length).toFixed(0)}%
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-400">High Confidence</span>
            </div>
            <p className="text-2xl font-bold text-blue-400">{signals.filter(s => s.confidence >= 85).length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            All Signals
          </button>
          <button
            onClick={() => setFilter('hot')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              filter === 'hot'
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            🔥 Hot
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              filter === 'active'
                ? 'bg-green-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            ⚡ Active
          </button>
        </div>

        {/* Signals Grid */}
        <div className="grid gap-4">
          {filteredSignals.map((signal) => (
            <div
              key={signal.id}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/20"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left Section - Coin Info */}
                <div className="flex items-center gap-4 min-w-[200px]">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl font-bold text-white">{signal.symbol}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(signal.status)}`}>
                        {signal.status.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400">{signal.name}</span>
                    <span className="text-xs text-gray-500 mt-1">#{signal.id}</span>
                  </div>
                </div>

                {/* Middle Section - Prices */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Current Price</p>
                    <p className="text-sm font-semibold text-white">${formatPrice(signal.currentPrice)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Entry Price</p>
                    <p className="text-sm font-semibold text-blue-400">${formatPrice(signal.entryPrice)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Target Price</p>
                    <p className="text-sm font-semibold text-green-400">${formatPrice(signal.targetPrice)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Stop Loss</p>
                    <p className="text-sm font-semibold text-red-400">${formatPrice(signal.stopLoss)}</p>
                  </div>
                </div>

                {/* Right Section - Multiplier & Stats */}
                <div className="flex flex-col items-end gap-2 min-w-[180px]">
                  <div className={`text-4xl font-bold ${getMultiplierColor(signal.multiplier)}`}>
                    {signal.multiplier}
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-bold">{signal.roi.toFixed(0)}% ROI</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-gray-400">{signal.confidence}% Confidence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-gray-400">{signal.timeframe}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Section - Additional Info */}
              <div className="mt-4 pt-4 border-t border-gray-700 flex flex-wrap gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-gray-500" />
                  <span className="text-gray-500">Volume 24h:</span>
                  <span className="text-white font-semibold">{signal.volume24h}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BarChart3 className="w-3 h-3 text-gray-500" />
                  <span className="text-gray-500">Market Cap:</span>
                  <span className="text-white font-semibold">{signal.marketCap}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Activity className="w-3 h-3 text-gray-500" />
                  <span className="text-gray-500">Sentiment:</span>
                  <span className={`font-semibold ${
                    signal.sentiment === 'extremely-bullish' ? 'text-purple-400' : 'text-green-400'
                  }`}>
                    {signal.sentiment === 'extremely-bullish' ? '🚀 Extremely Bullish' : '📈 Bullish'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4">
          <p className="text-sm text-yellow-300">
            ⚠️ <strong>Disclaimer:</strong> This dashboard is for educational and entertainment purposes only.
            Cryptocurrency investments carry high risk. Always do your own research (DYOR) and never invest more than you can afford to lose.
            Past performance does not guarantee future results.
          </p>
        </div>
      </div>
    </main>
  )
}
