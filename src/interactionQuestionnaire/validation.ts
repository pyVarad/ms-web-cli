/**
 * Valid application names.
 * @param input
 * @returns
 */
export const isValidApplicationName = (input: string): boolean => {
    const valid = /^[a-zA-Z\-\_]+$/.test(input);
    if (valid) {
        return true;
    } else {
        console.log(
            '.  Please enter an valid application name. Allowed charachters include "a-z" , "A-Z", "_,-".'
        );
        return false;
    }
};
