import type { ComponentType } from 'react';

/**
 * The interface that Enterprise Studio plugins must implement.
 * Export this as the default export from your './plugin' module.
 */
export interface StudioPlugin {
  name: string;
  icon?: ComponentType<{ className?: string }>;
  component: ComponentType<PluginProps>;
}

/**
 * Props provided by the Enterprise Studio host to your plugin component.
 */
export interface PluginProps {
  runCypher: (query: string, params?: Record<string, unknown>) => Promise<CypherResult>;
}

export interface CypherResult {
  records: CypherRecord[];
  summary: { resultAvailableAfter: number };
}

export interface CypherRecord {
  keys: string[];
  values: unknown[];
  toObject: () => Record<string, unknown>;
}
