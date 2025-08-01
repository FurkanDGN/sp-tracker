import StoryPointsChart from '../components/StoryPointsChart';
import type { FormValues } from '../types';

interface Props {
  storyPointsData: never[];
  config: FormValues;
}

export default function View(props: Props) {
  const defaultConfig = {
    timeNumber: '12' as const,
    timeType: { label: 'Month', value: 'month' },
    showUnassigned: false,
  };

  const config = { ...defaultConfig, ...props.config };

  return (
    <div
      style={{
        minHeight: '100vh',
      }}
    >
      <StoryPointsChart data={props.storyPointsData} config={config} />
    </div>
  );
}
