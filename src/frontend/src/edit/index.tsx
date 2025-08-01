import { view } from '@forge/bridge';

import LoadingScreen from '../components/LoadingScreen';
import { useForgeContext } from '../hooks';
import Edit from './Edit';

export default function EditContext() {
  const context = useForgeContext();

  if (!context) {
    return <LoadingScreen />;
  }

  const defaultConfig = {
    timeNumber: '12' as const,
    timeType: { label: 'Month', value: 'month' },
    showUnassigned: false,
  };

  return (
    <Edit
      formValues={context.extension.gadgetConfiguration || defaultConfig}
      view={view}
    />
  );
}
