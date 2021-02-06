class Helper {
    static validateBlockId(blockId) {
        if (Helper.isEmptyBlockId(blockId) || /^[0-9]*$/.test(blockId)) {
            return true;
        }
        else
            return false;
    }

    static isEmptyBlockId(blockId) {
        if (blockId === undefined || blockId === '' || blockId === null) {
            return true;
        }
        else
            return false;
    }
}

export default Helper;
