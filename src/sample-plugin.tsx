import { useState } from 'react';

import type { CypherRecord, PluginProps } from './types';

export function SamplePlugin({ runCypher }: PluginProps) {
  const [query, setQuery] = useState('MATCH (n) RETURN labels(n) AS labels, count(n) AS count');
  const [results, setResults] = useState<CypherRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const result = await runCypher(query);
      setResults(result.records);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Query failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ndl-theme-light flex h-full flex-col gap-4 p-6">
      <h1 className="n-text-palette-neutral-text-default text-2xl font-semibold">Sample Query Plugin</h1>
      <p className="n-text-palette-neutral-text-weak text-sm">
        This plugin demonstrates how to run Cypher queries using the shared Neo4j connection.
      </p>

      <div className="flex flex-col gap-2">
        <label className="n-text-palette-neutral-text-default text-sm font-medium">Cypher Query</label>
        <textarea
          className="n-bg-palette-neutral-bg-weak n-text-palette-neutral-text-default rounded-md border border-neutral-300 p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <button
        className="n-bg-palette-primary-bg-strong n-text-palette-primary-text-inverse w-fit rounded-md px-4 py-2 text-sm font-medium disabled:opacity-50"
        onClick={handleRun}
        disabled={loading || !query.trim()}
      >
        {loading ? 'Running...' : 'Run Query'}
      </button>

      {error && (
        <div className="n-bg-palette-danger-bg-weak rounded-md border border-red-200 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="n-text-palette-neutral-text-default text-sm font-medium">
            Results ({results.length} records)
          </h2>
          <div className="overflow-auto rounded-md border">
            <table className="w-full text-left text-sm">
              <thead className="n-bg-palette-neutral-bg-weak">
                <tr>
                  {results[0].keys.map((key) => (
                    <th key={key} className="n-text-palette-neutral-text-default border-b px-3 py-2 font-medium">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((record, i) => (
                  <tr key={i} className="border-b last:border-b-0">
                    {record.values.map((val, j) => (
                      <td key={j} className="n-text-palette-neutral-text-default px-3 py-2">
                        {formatValue(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function formatValue(val: unknown): string {
  if (val === null || val === undefined) return 'null';
  if (Array.isArray(val)) return JSON.stringify(val);
  if (typeof val === 'object') return JSON.stringify(val);
  return String(val);
}
