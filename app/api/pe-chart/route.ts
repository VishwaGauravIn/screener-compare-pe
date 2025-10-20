import { type NextRequest, NextResponse } from "next/server"

interface ChartDataset {
  metric: string
  values?: Array<[number, number]>
  meta?: Record<string, unknown>
}

interface ChartResponse {
  datasets?: ChartDataset[]
}

export async function POST(request: NextRequest) {
  try {
    const { companyId } = await request.json()

    if (!companyId) {
      return NextResponse.json({ error: "Company ID is required" }, { status: 400 })
    }

    const response = await fetch(
      `https://www.screener.in/api/company/${companyId}/chart/?q=Price+to+Earning-Median+PE-EPS&days=1825`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      },
    )

    if (!response.ok) {
      return NextResponse.json({ error: `API returned status ${response.status}` }, { status: response.status })
    }

    const data: ChartResponse = await response.json()

    if (!data.datasets || !Array.isArray(data.datasets)) {
      return NextResponse.json({ error: "Invalid response format from API" }, { status: 500 })
    }

    // Find the "Price to Earning" metric
    const peMetric = data.datasets.find((item) => item.metric === "Price to Earning")

    if (!peMetric || !peMetric.values) {
      return NextResponse.json({ error: "Price to Earning data not found in response" }, { status: 404 })
    }

    return NextResponse.json({ values: peMetric.values })
  } catch (error) {
    console.error("Error in pe-chart route:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
