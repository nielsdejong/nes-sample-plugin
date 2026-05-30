import { createRoot } from 'react-dom/client';

import './index.css';
import { SamplePlugin } from './sample-plugin';

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

const themeClass = 'ndl-theme-light';

const rootEl = document.getElementById('root')!;
rootEl.className = themeClass;

const root = createRoot(rootEl);
root.render(<SamplePlugin runCypher={mockRunCypher} />);
