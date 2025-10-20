"use client"

import { useState } from "react"
import { SymbolInput } from "./symbol-input"
import { PEChart } from "./pe-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { fetchPEData } from "@/lib/pe-service"

interface PEData {
  symbol: string
  data: Array<[number, number]>
}

export function ComparePEApp() {
  const [symbols, setSymbols] = useState<string[]>([])
  const [peData, setPEData] = useState<PEData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAddSymbol = (symbol: string) => {
    if (symbols.length < 5 && !symbols.includes(symbol.toUpperCase())) {
      setSymbols([...symbols, symbol.toUpperCase()])
      setError(null)
    } else if (symbols.includes(symbol.toUpperCase())) {
      setError("Symbol already added")
    } else {
      setError("Maximum 5 symbols allowed")
    }
  }

  const handleRemoveSymbol = (symbol: string) => {
    setSymbols(symbols.filter((s) => s !== symbol))
    setPEData(peData.filter((d) => d.symbol !== symbol))
  }

  const handleCompare = async () => {
    if (symbols.length === 0) {
      setError("Please add at least one symbol")
      return
    }

    setLoading(true)
    setError(null)
    setPEData([])

    try {
      const results: PEData[] = []

      for (let i = 0; i < symbols.length; i++) {
        const symbol = symbols[i]

        // Add 2-second delay between API calls (except for the first one)
        if (i > 0) {
          await new Promise((resolve) => setTimeout(resolve, 2000))
        }

        const data = await fetchPEData(symbol)
        results.push({
          symbol,
          data,
        })
      }

      setPEData(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch PE data")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Compare PE Ratios</h1>
        <p className="text-muted-foreground">Add up to 5 symbols to compare their Price-to-Earning ratios over time</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Symbols</CardTitle>
          <CardDescription>Enter stock symbols to compare</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SymbolInput onAddSymbol={handleAddSymbol} />

          {symbols.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {symbols.map((symbol) => (
                <div
                  key={symbol}
                  className="bg-primary text-primary-foreground px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {symbol}
                  <button onClick={() => handleRemoveSymbol(symbol)} className="hover:opacity-70 transition-opacity">
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <button
            onClick={handleCompare}
            disabled={loading || symbols.length === 0}
            className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Fetching Data..." : "Compare PE Ratios"}
          </button>
        </CardContent>
      </Card>

      {peData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>PE Ratio Comparison</CardTitle>
            <CardDescription>Price-to-Earning ratios over the last 5 years</CardDescription>
          </CardHeader>
          <CardContent>
            <PEChart data={peData} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
