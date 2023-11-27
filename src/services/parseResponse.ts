import {
    createNewDirectoryRecursively,
    isValidPath,
    joinPathFragments,
    writeToFile
} from '../utils';
import { create, postCreate, preCreate } from './javascript/create/reactApp';

const actions = {
    javascript: {
        react: {
            preCreate: preCreate,
            create: create,
            postCreate: postCreate
        }
    }
};

export const createRuntimeConfiguration = (response: {
    [id: string]: string;
}) => {
    const target = joinPathFragments(process.cwd(), response['project']);
    const runtimeConfig = joinPathFragments(target, '.ms-utils-rc.json');
    createNewDirectoryRecursively(target, true);
    process.chdir(target);
    writeToFile(JSON.stringify(response), runtimeConfig);

    const programmingLanguage = response['programmingLanguage'];
    const framework = response['framework'];

    console.log(response);

    if (
        programmingLanguage in actions &&
        framework in actions[programmingLanguage]
    ) {
        const preCreate = actions[programmingLanguage][framework]['preCreate'];
        const create = actions[programmingLanguage][framework]['create'];
        const postCreate =
            actions[programmingLanguage][framework]['postCreate'];

        preCreate(response);
        create(response);
        postCreate(response);
    }
};
