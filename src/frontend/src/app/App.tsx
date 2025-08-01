import LoadingScreen from '../components/LoadingScreen';
import Edit from '../edit';
import { useForgeContext } from '../hooks';
import View from '../view';

export default function App() {
  const context = useForgeContext();

  if (!context) {
    return <LoadingScreen />;
  }

  return context.extension.entryPoint === 'edit' ? <Edit /> : <View />;
}
