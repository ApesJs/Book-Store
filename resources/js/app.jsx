import './bootstrap';
import '../css/app.css';

import React from 'react';
import { render } from 'react-dom';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Inertia } from '@inertiajs/inertia';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

Inertia.on('navigate', () => window.scrollTo(0, 0))

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        return render(<App {...props} />, el);
    },
});

InertiaProgress.init({ color: '#4B5563' });
