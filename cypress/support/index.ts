import './commands';
import '@cypress/code-coverage/support';
import 'cypress-real-events';
import { darkSber } from '@salutejs/plasma-tokens/themes';
import '../fixtures/css/plasmaGlobalStyle.css';

require('cypress-plugin-tab');

beforeEach(() => {
    cy.document().then((document) => {
        Object.entries(darkSber[':root']).forEach(([property, value]) => {
            if (property.startsWith('--')) {
                document.documentElement.style.setProperty(property, value);
            }
        });
    });
});
