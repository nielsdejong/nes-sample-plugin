# Enterprise Studio Sample Plugin

A sample plugin for Neo4j Enterprise Studio using Module Federation.

## Quick Start

```bash
npm install
npm run dev       # Standalone dev server at http://localhost:3002
npm run serve     # Production build + preview at http://localhost:3001
```

## How It Works

- **Port 3002** (`npm run dev`) — Runs the plugin standalone with a mock Enterprise Studio shell. No federation, no host needed. Use this for development.
- **Port 3001** (`npm run serve`) — Builds the federation remote and serves it. This can't run standalone — it must be loaded by Enterprise Studio as a plugin, or you'll see an info page explaining this.

## Plugin Interface

Plugins export a `./plugin` module with a default `StudioPlugin`:

```typescript
interface StudioPlugin {
  name: string;
  component: ComponentType<PluginProps>;
}

interface PluginProps {
  runCypher: (query: string, params?: Record<string, unknown>) => Promise<CypherResult>;
}
```

The host provides `runCypher` to execute queries against the active Neo4j connection.

## Registering With Enterprise Studio

Add your plugin to Enterprise Studio's config:

```yaml
plugins:
  - id: sample-plugin
    name: Sample Plugin
    url: http://localhost:3001
```

## Creating Your Own Plugin

1. Copy this project
2. Update `name` in `vite.config.ts` federation config
3. Edit `src/plugin.tsx` — implement your component using the `runCypher` prop
4. Register it in Enterprise Studio's config
