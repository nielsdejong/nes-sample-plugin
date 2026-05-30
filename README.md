# Enterprise Studio Sample Plugin

A minimal sample plugin for Neo4j Enterprise Studio, demonstrating the plugin system powered by Module Federation.

## What This Does

This plugin adds a "Sample Query" tool to Enterprise Studio's sidebar. It provides a simple textarea where you can write Cypher queries and execute them against the connected Neo4j database.

## Plugin Interface

Every Enterprise Studio plugin must expose a `./plugin` module with a default export conforming to `StudioPlugin`:

```typescript
interface StudioPlugin {
  name: string; // Displayed in the sidebar
  icon?: ComponentType<{ className?: string }>; // Optional sidebar icon
  component: ComponentType<PluginProps>; // Your main component
}

interface PluginProps {
  runCypher: (query: string, params?: Record<string, unknown>) => Promise<CypherResult>;
}
```

The host provides a `runCypher` function that executes queries using the active Neo4j connection.

## Development

```bash
npm install
npm run dev
```

This starts the plugin dev server on `http://localhost:3001`, exposing the `remoteEntry.js` for Module Federation.

## Registering With Enterprise Studio

Add the plugin to your Enterprise Studio `config.yaml`:

```yaml
plugins:
  - id: sample_plugin        # must match the 'name' in vite.config.ts federation()
    name: Sample Query Plugin # display name in the admin config
    url: http://localhost:3001 # where the plugin dev server is running
```

Then restart the Enterprise Studio backend. The plugin will appear in the sidebar under "Plugins".

## Building for Production

```bash
npm run build
```

Serve the `dist/` folder from any static file server. Update `url` in the Enterprise Studio config to point to the production URL.

## Creating Your Own Plugin

1. Copy this project
2. Update `name` in `vite.config.ts` federation config (this is the container scope ID)
3. Update `src/plugin.tsx` to export your custom `StudioPlugin`
4. Implement your component using the `runCypher` prop for Neo4j access
5. Add your plugin to Enterprise Studio's `config.yaml`
