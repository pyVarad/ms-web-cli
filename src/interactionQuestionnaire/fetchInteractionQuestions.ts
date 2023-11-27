import { errorMessage } from '../constants';
import { isValidPath, joinPathFragments } from '../utils';
import { questions as createQuestions } from './create';
import { questions as updateQuestions } from './update';

const interactionQuestions = {
    create: createQuestions,
    update: updateQuestions
};

export const getQuestions = (opt: {
    [longOption: string]: string | boolean | (string | boolean)[];
}) => {
    if (opt.create) {
        return interactionQuestions.create;
    } else if (opt.update) {
        const rcFile = joinPathFragments(__dirname, '.ms-utils-rc.json');
        if (!isValidPath(rcFile)) {
            throw Error('Cannot update a project without `.ms-utils-rc.json`.');
        }
        return interactionQuestions.update;
    } else {
        throw Error(errorMessage);
    }
};
