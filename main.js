const SHA256 = require('crypto-js/sha256');

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this .previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
        
    }

    calculateHash() {
        return SHA256(this.timestamp + JSON.stringify(this. data) + this.previousHash + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty)!== Array(difficulty + 1).join('0')) {
            this.nonce ++;
            this.hash = this.calculateHash();
        }

        console.log('Block Mined '+ this.hash);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block(0, '27/05/2018', 'Genesis Block', '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);
        console.log('Block mined!');

        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];

    }
    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;

        for(const block of this.chain) {
            for(const trans of block.transactions) {
                if(address === trans.fromAddress) {
                    balance -= trans.amount;
                }
                if(address == trans.toAddress) {
                    balance += trans.amount;
                }
            }
        }
        return balance; 
    }

    isChainValid() {
        for(let i=1; i<this.chain.length; i++) {
            
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

    
}

let blockChain = new Blockchain();

blockChain.createTransaction(new Transaction('a1','a2',100));
blockChain.createTransaction(new Transaction('a2','a1',50));

console.log('Mining Started: \n');

blockChain.minePendingTransactions('ohin_a');
console.log(blockChain.getBalanceOfAddress('ohin_a'));

console.log('Mining Started: \n');

blockChain.minePendingTransactions('ohin_a');
console.log(blockChain.getBalanceOfAddress('ohin_a'));

console.log(blockChain.getBalanceOfAddress('a1'));
