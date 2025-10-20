import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { symbol } = await request.json()

    if (!symbol) {
      return NextResponse.json({ error: "Symbol is required" }, { status: 400 })
    }

    const response = await fetch(`https://www.screener.in/company/${symbol}/`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: `Failed to fetch company page for ${symbol}` }, { status: response.status })
    }

    const html = await response.text()

    // Extract data-row-company-id from the HTML
    const match = html.match(/data-row-company-id="(\d+)"/)
    if (!match || !match[1]) {
      return NextResponse.json({ error: `Could not find company ID for ${symbol}` }, { status: 404 })
    }

    return NextResponse.json({ companyId: match[1] })
  } catch (error) {
    console.error("Error in company-id route:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
