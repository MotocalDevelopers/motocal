import { configure } from '@storybook/react';

import '../css/style.css';

function loadStories() {
    require('../src/stories');
}

configure(loadStories, module);
