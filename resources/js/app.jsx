import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';

const APP_NAME = 'City Island Clicker';

createInertiaApp({
    title: (title) => (title ? `${title}` : APP_NAME),
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        const page = pages[`./Pages/${name}.jsx`];

        if (!page) {
            throw new Error(`Inertia page "${name}" was not found in ./Pages/`);
        }

        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
    progress: {
        color: '#f59e0b',
        showSpinner: true,
    },
});
