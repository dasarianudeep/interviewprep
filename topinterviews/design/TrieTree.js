class TrieNode {
    constructor() {
        this.children = {};
        this.isWord = false
    }
}

class TrieTree {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for(let i=0; i<word.length; i++) {
            if (!node.children[word[i]]) {
                node.children[word[i]] = new TrieNode();
            }
            node = node.children[word[i]]
        }
        node.isWord = true
    }

    suggest(prefix) {
        let node = this.root, current = ';'
        for (let i=0; i<prefix.length; i++) {
            if (!node.children[prefix[i]]) return [];
            node = node.children[prefix[i]];
            current += prefix[i];
        }
        const list = [];
        this.helper(node, list, current);
        return list;
    } 

    helper(root, list, current) {
        if (current.isWord) list.push(current);

        if (Object.keys(root.children).length === 0) return;

        for (let char in root.children) {
            this.helper(root.children[char], list, current + char);
        }
    }
}