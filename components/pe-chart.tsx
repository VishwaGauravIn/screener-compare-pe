"use client";

import { useEffect, useRef } from "react";
import Highcharts from "highcharts";
import { Card } from "@/components/ui/card";

interface PEData {
  symbol: string;
  data: Array<[number, number]>;
}

const COLORS = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"];

export function PEChart({ data }: { data: PEData[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Highcharts.Chart | null>(null);

  useEffect(() => {
    if (!containerRef.current || data.length === 0) return;

    const series = data.map((item, index) => ({
      name: item.symbol,
      data: item.data.map(([timestamp, value]) => [
        timestamp,
        Number.parseFloat((value ?? 0).toFixed(2)),
      ]),
      color: COLORS[index % COLORS.length],
    }));

    const options: Highcharts.Options = {
      chart: {
        type: "line",
        backgroundColor: "transparent",
        height: 400,
      },
      title: {
        text: "PE Ratio Comparison",
        style: {
          fontSize: "18px",
          fontWeight: "bold",
        },
      },
      xAxis: {
        type: "datetime",
        title: {
          text: "Date",
        },
        labels: {
          format: "{value:%b %y}",
        },
      },
      yAxis: {
        title: {
          text: "PE Ratio",
        },
        min: 0,
      },
      tooltip: {
        shared: true,
        crosshairs: true,
        formatter: function () {
          let result = `<b>${new Date(this.x).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}</b><br/>`;
          this.points?.forEach((point) => {
            result += `<span style="color:${point.color}">${
              point.series.name
            }: ${(point.y ?? 0).toFixed(2)}</span><br/>`;
          });
          return result;
        },
      },
      legend: {
        enabled: true,
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: false,
          },
          enableMouseTracking: true,
          lineWidth: 2,
        },
      },
      series: series,
      credits: {
        enabled: false,
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
              },
            },
          },
        ],
      },
    };

    // chartRef.current?.destroy();

    chartRef.current = Highcharts.chart(containerRef.current, options);

    return () => {
      chartRef.current?.destroy();
    };
  }, [data]);

  if (data.length === 0) {
    return (
      <Card className="p-8 text-center text-muted-foreground">
        No data available
      </Card>
    );
  }

  return <div ref={containerRef} className="w-full" />;
}
