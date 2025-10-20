"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SymbolInputProps {
  onAddSymbol: (symbol: string) => void
}

export function SymbolInput({ onAddSymbol }: SymbolInputProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onAddSymbol(input.trim())
      setInput("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="Enter symbol (e.g., INFY, TCS, RELIANCE)"
        value={input}
        onChange={(e) => setInput(e.target.value.toUpperCase())}
        className="flex-1"
      />
      <Button type="submit" disabled={!input.trim()}>
        Add Symbol
      </Button>
    </form>
  )
}
