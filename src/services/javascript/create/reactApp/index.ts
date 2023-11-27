import {
    createNewDirectoryRecursively,
    ipcPipeEvent,
    isValidPath,
    joinPathFragments,
    removeFilesAndFoldersRecursively,
    spawnOnCompleteEvent
} from '../../../../utils';

export const preCreate = (response: { [id: string]: string }) => {
    const targetFolder = joinPathFragments(process.cwd(), response['project']);
    if (isValidPath(targetFolder)) {
        removeFilesAndFoldersRecursively(targetFolder);
    }
};

export const create = (response: { [id: string]: string }) => {
    ipcPipeEvent(
        'npx -y',
        'create-react-ts-app',
        true,
        `create-vite@latest app --template react-ts`
    );
};

export const postCreate = (response: { [id: string]: string }) => {
    spawnOnCompleteEvent.on('process-create-react-ts-app-finished', () => {
        console.log('Successfully created react application.');
    });
};
