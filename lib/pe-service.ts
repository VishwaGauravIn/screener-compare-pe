/**
 * Service to fetch PE (Price-to-Earning) data from screener.in via Next.js API routes
 */

/**
 * Fetch the company ID by calling our API route
 */
async function getCompanyId(symbol: string): Promise<string> {
  try {
    const response = await fetch("/api/company-id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ symbol }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || `Failed to fetch company ID for ${symbol}`)
    }

    const data = await response.json()
    return data.companyId
  } catch (error) {
    throw new Error(
      `Error fetching company ID for ${symbol}: ${error instanceof Error ? error.message : "Unknown error"}`,
    )
  }
}

/**
 * Fetch PE data by calling our API route
 */
async function getPEChartData(companyId: string): Promise<Array<[number, number]>> {
  try {
    const response = await fetch("/api/pe-chart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ companyId }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to fetch PE chart data")
    }

    const data = await response.json()
    return data.values
  } catch (error) {
    throw new Error(`Error fetching PE chart data: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

/**
 * Main function to fetch PE data for a symbol
 * Combines company ID fetching and PE data fetching
 */
export async function fetchPEData(symbol: string): Promise<Array<[number, number]>> {
  try {
    // console.log(`Fetching PE data for symbol: ${symbol}`)

    const companyId = await getCompanyId(symbol)
    // console.log(`Found company ID: ${companyId}`)

    const peData = await getPEChartData(companyId)
    // console.log(`Fetched ${peData.length} PE data points for ${symbol}`)

    return peData
  } catch (error) {
    throw new Error(
      `Failed to fetch PE data for ${symbol}: ${error instanceof Error ? error.message : "Unknown error"}`,
    )
  }
}
