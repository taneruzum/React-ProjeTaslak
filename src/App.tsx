import { AppProvider } from './providers';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

export default function App() {
    return (
        <AppProvider>
            <RouterProvider router={router} />
        </AppProvider>
    );
}