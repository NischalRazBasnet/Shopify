import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(<App />);
