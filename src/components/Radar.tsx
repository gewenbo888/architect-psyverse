"use client";

import { AXIS_ORDER, AXIS_LABEL_KEY, type AxisKey } from "@/data/civilizations";
import { useA } from "@/lib/providers";

interface RadarProps {
  values: Record<AxisKey, number>;
  compareValues?: Record<AxisKey, number>;
  size?: number;
  primaryColor?: string;
  compareColor?: string;
  showLabels?: boolean;
  primaryLabel?: string;
  compareLabel?: string;
}

export function Radar({
  values,
  compareValues,
  size = 360,
  primaryColor = "#C9926D",
  compareColor = "#82A09C",
  showLabels = true,
  primaryLabel,
  compareLabel,
}: RadarProps) {
  const { tr, lang } = useA();
  const cx = size / 2;
  const cy = size / 2;
  const maxR = (size / 2) - 50;

  const pointAt = (axisIdx: number, value: number) => {
    const a = (axisIdx / AXIS_ORDER.length) * Math.PI * 2 - Math.PI / 2;
    const r = (value / 100) * maxR;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  };

  const polygonPath = (vals: Record<AxisKey, number>) => {
    const pts = AXIS_ORDER.map((k, i) => pointAt(i, vals[k]));
    return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ") + " Z";
  };

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="block w-full" style={{ maxHeight: size }}>
      {/* concentric heptagons */}
      {[20, 40, 60, 80, 100].map((v) => (
        <polygon
          key={v}
          points={AXIS_ORDER.map((k, i) => pointAt(i, v).join(",")).join(" ")}
          fill="none"
          stroke="#272A33"
          strokeWidth="0.5"
        />
      ))}
      {/* spokes */}
      {AXIS_ORDER.map((k, i) => {
        const [x, y] = pointAt(i, 100);
        return <line key={k} x1={cx} y1={cy} x2={x} y2={y} stroke="#272A33" strokeWidth="0.5" />;
      })}

      {/* compare polygon (drawn first/back) */}
      {compareValues && (
        <path d={polygonPath(compareValues)} fill={compareColor + "30"} stroke={compareColor} strokeWidth="1.5" />
      )}
      {/* primary polygon */}
      <path d={polygonPath(values)} fill={primaryColor + "33"} stroke={primaryColor} strokeWidth="1.8" />

      {/* axis dots */}
      {AXIS_ORDER.map((k, i) => {
        const [x, y] = pointAt(i, values[k]);
        return <circle key={`p-${k}`} cx={x} cy={y} r="3" fill={primaryColor} />;
      })}
      {compareValues && AXIS_ORDER.map((k, i) => {
        const [x, y] = pointAt(i, compareValues[k]);
        return <circle key={`c-${k}`} cx={x} cy={y} r="2.5" fill={compareColor} />;
      })}

      {/* labels */}
      {showLabels && AXIS_ORDER.map((k, i) => {
        const [x, y] = pointAt(i, 110);
        return (
          <text
            key={k}
            x={x}
            y={y}
            fontSize="9.5"
            fill="#A39E91"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="ui-monospace, monospace"
            style={{ letterSpacing: "0.05em" }}
          >
            {tr(AXIS_LABEL_KEY[k]).split(" ")[0]}
          </text>
        );
      })}

      {/* legend */}
      {(primaryLabel || compareLabel) && (
        <g>
          {primaryLabel && (
            <g transform={`translate(${size - 130}, ${size - 36})`}>
              <rect width="10" height="10" fill={primaryColor} />
              <text x="16" y="9" fontSize="10" fill="#E8E2D2" fontFamily="ui-monospace, monospace">
                {primaryLabel}
              </text>
            </g>
          )}
          {compareLabel && (
            <g transform={`translate(${size - 130}, ${size - 18})`}>
              <rect width="10" height="10" fill={compareColor} />
              <text x="16" y="9" fontSize="10" fill="#E8E2D2" fontFamily="ui-monospace, monospace">
                {compareLabel}
              </text>
            </g>
          )}
        </g>
      )}
    </svg>
  );
}
