import { SamplePlugin } from './sample-plugin';
import type { StudioPlugin } from './types';

const plugin: StudioPlugin = {
  name: 'Sample Plugin',
  component: SamplePlugin,
};

export default plugin;
