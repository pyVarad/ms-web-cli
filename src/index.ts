#!/usr/bin/env node

import argumentParser from './utils/parseArgs';
import { askQuestions } from 'questionnaire-utils';
import { getQuestions } from './interactionQuestionnaire/fetchInteractionQuestions';
import { createRuntimeConfiguration } from './services/parseResponse';

const main = async () => {
    try {
        const cmdLineArgs = argumentParser();
        const questions = getQuestions(cmdLineArgs);
        const response = await askQuestions(questions);
        if (cmdLineArgs.create) {
            createRuntimeConfiguration(response);
        } else {
            //load runtime configuration file
            // merge the response with configuration file.
        }
    } catch (e) {
        console.log(e.message);
    }
};

main();
