import { createRoot } from 'react-dom/client';

import '@neo4j-ndl/base/lib/neo4j-ds-styles.css';
import { NeedleThemeProvider, SideNavigation, Typography } from '@neo4j-ndl/react';
import { PuzzlePieceIconOutline } from '@neo4j-ndl/react/icons';
import { SamplePlugin } from './plugin';

// Standalone dev mode - renders the plugin with a mock runCypher for local testing
const mockRunCypher = async (query: string) => {
  console.log('[mock] Running query:', query);
  return {
    records: [
      {
        keys: ['message'],
        values: ['This is a mock result. Connect via Enterprise Studio for real data.'],
        toObject: () => ({ message: 'This is a mock result. Connect via Enterprise Studio for real data.' }),
      },
    ],
    summary: { resultAvailableAfter: 0 },
  };
};

const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
// This is just a wrapper to simulate the Enterprise Studio environment for local development.
// In production, the plugin will be rendered by the host app and should not include this wrapper.
function DevShell() {
  return (
    <NeedleThemeProvider
      theme={theme}
      wrapperProps={{
        style: { height: '100vh', display: 'flex', flexDirection: 'column' },
        isWrappingChildren: true,
      }}
    >
      {/* Header */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          height: '48px',
          flexShrink: 0,
          padding: '0 16px',
          backgroundColor: 'var(--theme-color-neutral-bg-weak)',
          borderBottom: '1px solid var(--theme-color-neutral-border-weak)',
        }}
      >
        <Typography variant="subheading-medium">Enterprise Studio</Typography>
        <Typography variant="body-small" style={{ opacity: 0.6 }}>(Plugin Development Mock)</Typography>
      </header>
      {/* Body */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Sidebar */}
        <SideNavigation isExpanded={true} expandedWidth={212} ariaLabel="Main side navigation">
          <SideNavigation.CategoryHeader>Plugins</SideNavigation.CategoryHeader>
          <SideNavigation.ListItem>
            <SideNavigation.NavItem
              icon={<PuzzlePieceIconOutline />}
              label="Sample Plugin"
              isActive={true}
            />
          </SideNavigation.ListItem>
        </SideNavigation>
        {/* Main content */}
        <main style={{ flex: 1, overflow: 'auto', backgroundColor: 'var(--theme-color-neutral-bg-default)' }}>
          <SamplePlugin runCypher={mockRunCypher} />
        </main>
      </div>
    </NeedleThemeProvider>
  );
}

function bootstrap() {
  const root = createRoot(document.getElementById('root')!);
  root.render(<DevShell />);
}

bootstrap();
