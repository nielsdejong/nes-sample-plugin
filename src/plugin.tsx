import { useState } from 'react';

import { Banner, CodeBlock, Flex, FilledButton, TextArea, Typography } from '@neo4j-ndl/react';

import type { CypherRecord, PluginProps, StudioPlugin } from './types';

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
    <Flex flexDirection="column" gap="6" style={{ height: '100%', padding: '24px' }}>
        <Flex flexDirection="column" gap="2">
          <Typography variant="subheading-large">Sample Plugin</Typography>
          <Typography variant="body-medium">
            This plugin demonstrates how to run Cypher queries using the shared Neo4j connection.
          </Typography>
        </Flex>

        <TextArea
          label="Cypher Query"
          isFluid
          value={query}
          htmlAttributes={{
            rows: 3,
            onChange: (e) => setQuery(e.target.value),
            style: { fontFamily: 'monospace' },
          }}
        />

        <FilledButton onClick={handleRun} isLoading={loading} isDisabled={!query.trim()}>
          Run Query
        </FilledButton>

        {error && (
          <Banner variant="danger">
            <Banner.Header>Query Error</Banner.Header>
            <Banner.Description>{error}</Banner.Description>
          </Banner>
        )}

        {results.length > 0 && (
          <Flex flexDirection="column" gap="4">
            <Typography variant="body-medium">
              Results ({results.length} records)
            </Typography>
            <CodeBlock
              code={JSON.stringify(results.map((r) => r.toObject()), null, 2)}
              language="json"
            />
          </Flex>
        )}
      </Flex>
  );
}

const plugin: StudioPlugin = {
  name: 'Sample Plugin',
  component: SamplePlugin,
};

export default plugin;
