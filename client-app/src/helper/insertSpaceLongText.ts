const insertSpaceLongText: (text: string, limitText: number) => string = (
    text: string,
    limitText: number
) => {
    // base case: when text not longger length of split text should return itselfs.
    if (text.split("\n")[0].length < limitText) {
        return text;
    }
    // another case: insert "new charactor" on long text
    else {
        const firstCharacter = text.slice(0, limitText);
        const endCharacter = text.slice(limitText) || "";
        return (
            firstCharacter + "\n" + insertSpaceLongText(endCharacter, limitText)
        );
    }
};
export default insertSpaceLongText;
