// src/components/telemetry.js
import React from "react";

export function initTelemetry() {
  if (!window.ABRA) window.ABRA = {};
  if (!window.ABRA.__trace) {
    window.ABRA.__trace = [];
    window.ABRA.emit = (type, payload = {}) => {
      const evt = { ts: new Date().toISOString(), type, ...payload };
      window.ABRA.__trace.push(evt);
      window.dispatchEvent(new CustomEvent("abra:trace", { detail: evt }));
      // לשמור רק את האחרונים כדי שלא יתפוצץ
      if (window.ABRA.__trace.length > 500) window.ABRA.__trace.shift();
    };
    window.ABRA.getTrace = () => window.ABRA.__trace.slice();
    window.ABRA.clearTrace = () => (window.ABRA.__trace = []);
  }
}

export function TracePanel() {
  const [rows, setRows] = React.useState(window.ABRA?.getTrace?.() || []);
  React.useEffect(() => {
    const onEvt = (e) => setRows(prev => [...prev, e.detail]);
    window.addEventListener("abra:trace", onEvt);
    return () => window.removeEventListener("abra:trace", onEvt);
  }, []);
  return (
    <div className="text-sm bg-black/40 border border-white/10 rounded-lg p-3 max-h-80 overflow-auto">
      {rows.length === 0 ? (
        <div className="text-gray-400">No trace yet…</div>
      ) : rows.map((r, i) => (
        <div key={i} className="grid grid-cols-12 gap-2 py-1 border-b border-white/5">
          <div className="col-span-3 text-gray-500">{r.ts}</div>
          <div className="col-span-3 font-medium text-emerald-300">{r.type}</div>
          <div className="col-span-6 text-gray-200 truncate">{JSON.stringify(r)}</div>
        </div>
      ))}
    </div>
  );
}
