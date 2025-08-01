import { invoke } from '@forge/bridge';
import { useEffect, useState } from 'react';

import LoadingScreen from '../components/LoadingScreen';
import { log } from '../helpers';
import { useForgeContext } from '../hooks';
import View from './View';

export default function ViewContext() {
  const context = useForgeContext();
  const [sp, setSp] = useState<never>();

  useEffect(() => {
    if (!context?.extension?.gadgetConfiguration) return;

    const config = context.extension.gadgetConfiguration;
    const payload = {
      timeNumber: config.timeNumber || '12',
      timeType: config.timeType.value || 'month',
      showUnassigned: config.showUnassigned || false,
    };

    invoke('getStoryPointsData', payload)
      .then((val) => {
        return setSp(val as never);
      })
      .catch(log.error);
  }, [context]);

  if (!context || !sp) {
    return <LoadingScreen />;
  }

  return (
    <View storyPointsData={sp} config={context.extension.gadgetConfiguration} />
  );
}
