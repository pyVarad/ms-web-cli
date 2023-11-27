import fs from 'fs';
import path from 'path';
import fse from 'fs-extra';

export const isValidPath = (location: string): boolean => {
    return fs.existsSync(location);
};

export const joinPathFragments = (...fragments: string[]): string => {
    return path.join(...fragments);
};

export const createNewDirectoryRecursively = (
    directoryAbsolutePath: string,
    recursive = false
): void => {
    if (isValidPath(directoryAbsolutePath)) {
        console.log('Directory already exist.');
    } else {
        fs.mkdirSync(directoryAbsolutePath, {
            recursive
        });
    }
};

export const readDirectory = (directoryAbsolutePath: string): string[] => {
    if (isValidPath(directoryAbsolutePath)) {
        return fs.readdirSync(directoryAbsolutePath);
    } else {
        throw new Error('Directory doesnot exists.');
    }
};

export const fileReader = (fileAbsolutePath: string): string => {
    if (isValidPath(fileAbsolutePath)) {
        return fs.readFileSync(fileAbsolutePath, { encoding: 'utf-8' });
    } else {
        throw new Error('File doesnot exist.');
    }
};

export const removeFilesAndFoldersRecursively = (
    fileOrFolderAbsolutePath: string
) => {
    if (isValidPath(fileOrFolderAbsolutePath)) {
        fs.rmSync(fileOrFolderAbsolutePath, { force: true });
    } else {
        throw new Error('Given path doesnot exist.');
    }
};

export const writeToFile = (data: string, targetFilePath: string): void => {
    fs.writeFileSync(targetFilePath, data);
};

export const copyFoldersRecursively = (
    source: string,
    target: string
): void => {
    fse.copySync(source, target, { overwrite: true });
};
