import { registerRootComponent } from 'expo';
import App from './App';

// This explicitly registers the app, fixing the "Module not registered" error
registerRootComponent(App);
