class Portfolio {
    constructor(){
        this.stockList = [];
    }

    isMT(){
        return this.stockList.length === 0;
    }

    size(){
        return this.stockList.length;
    }

    howMany(name){
        let stock = this.stockList.find(obj => obj.name === name);
        if (stock){
            return stock.shares;
        }
        else{
            return 0;
        }
    }

    buy(name, shares){
        var stock = {};
        stock.name = name;
        stock.shares = shares;
        for (var i = 0; i < this.stockList.length; i++){
            if (this.stockList[i].name === name){
                this.stockList[i].shares += shares;
                return;
            }
        }
        this.stockList.push(stock);
    }

    sell(name, shares){
        for (var i = 0; i < this.stockList.length; i++){
            if (this.stockList[i].name === name){
                if (this.stockList[i].shares >= shares){
                    this.stockList[i].shares -= shares;
                    if (this.stockList[i].shares === 0){
                        this.stockList.splice(i, 1);
                    }
                }
                else
                    throw('ShareSaleException');
            }
        }
    }
};

exports.Portfolio = Portfolio;