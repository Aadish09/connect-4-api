class Connect{
    constructor(){
        this.counter = 0;
        this.connect = new Array(6);
        for(var i=0;i<6;i++){
            this.connect[i]=new Array(7);
        }
        for(let i=0;i<6;i++){
            for(let j=0;j<7;j++){
                this.connect[i][j]=null;
                
            }
        }
    }
    getArray(){
        console.log(this.connect);
    }
    reset(){
        for(let i=0;i<6;i++){
            for(let j=0;j<7;j++){
                this.connect[i][j]=null;
                
            }
        }
    }
    isValid(col){
        if(this.connect[5][col]==null) return true;
        return false;
    }
    makeMove(col){
        this.counter=this.counter+1;
        var r = 5;
        while(r>=0){
            if(this.connect[r][col]==null)r--;
            else break;
        }
        var color;
        if(this.counter%2==0)color='red';
        else color='yellow'
        this.connect[r+1][col]=color;
        console.log(this.connect)
        return r+1;
    }
    checkWin(row,col){
        if(this.counter===42)return "draw";
        var color = this.connect[row][col];
        
        var c=0;
        var r=row-1,co=col-1;
        while(r>=0){
            if(this.connect[r][col]===color){
                r--;
                c++;
                if(c==3) return `${color} wins`
            }
            else{
                break;
            }
        }
        r=row-1,co=col-1;
        c=0;
        while(co>=0){
            if(this.connect[row][co]===color){
                co--;
                c++;
                if(c==3) return `${color} wins`
            }
            else{
                break;
            }
        }
         r=row-1,co=col-1;
        c=0;
        while( co>=0 && r>=0){
            if(this.connect[r][co]===color){
                r--;
                co--;
                c++;
                if(c==3) return `${color} wins`
            }
            else{
                break;
            }
        }
        r=row-1,co=col-1;
        c=0;
        while( co<=6 && r>=0){
            if(this.connect[r][co]===color){
                r--;
                co++;
                c++;
                if(c==3) return `${color} wins`
            }
            else{
                break;
            }
        }
        
        return "No win"
        

    }
}
module.exports = Connect;