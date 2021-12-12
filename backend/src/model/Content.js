class Content {
    constructor(id, text, files) {
        this.seq = 0
        this.id = id
        this.text = text
        let str = ""
        for (const item of files) {
            str += item.filename + " "
        }
        this.file = str
    }

    getHashtag() {
        try {
            return this.text.match(/#[^\s]+/g).map(x => x.slice(1)) || []
        } catch(e){
            return []
        }
    }
}

module.exports = Content