import { isValidPackageName } from 'questionnaire-utils';
import { isValidApplicationName } from '../validation';

export const questions = [
    {
        type: 'input',
        name: 'project',
        message: 'What is the name of your app?',
        default: 'web-app',
        validate: isValidApplicationName
    },
    {
        type: 'list',
        name: 'programmingLanguage',
        message: 'choose your programming language',
        default: 'javascript',
        choices: ['javascript'],
        next: [
            {
                type: 'list',
                name: 'framework',
                message: 'Choose your frontend web framework?',
                default: 'react',
                choices: ['react', 'angular'],
                programmingLanguage: ['javascript']
            }
        ]
    }
];
