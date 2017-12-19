/*
* 属性
*   字母表、几个字符、生命、关卡、速度
* 方法
*   开始、产生、下落、消失、进入下一关、重新开始
*/
class Code {
    constructor() {
        this.bbq = [['A','img/A.png'],['B','img/B.png'],['C','img/C.png'],['D','img/D.png'],['E','img/E.png'],['F','img/F.png'],['G','img/G.png'],['H','img/H.png'],['I','img/I.png'],['J','img/J.png'],['K','img/K.png'],['L','img/L.png'],['M','img/M.png'],['N','img/N.png'],['O','img/O.png'],['P','img/P.png'],['Q','img/Q.png'],['R','img/R.png']];
        this.length = 5;
        this.current = [];
        this.speed = 5;
        this.scroe = 0;
        this.scroeobj = document.querySelector('.box>span');
        this.pass = 5;
        this.life = 5;
        this.lifeobj = document.querySelector('.boxx>span');
        this.position = [];
    }
    start() {
        this.getChars(this.length);
        this.drop();
        this.keys();
    }
    getChars(length) {
        for (let i = 0; i < length; i++) {
            this.getChar();
        }
    }
    cheakExist(bbq){
        return this.current.some(element => element.innerText == bbq);
    }
    cheakPosition(pos){
        return this.position.some(element =>Math.abs(element-pos)<=50);
    }
    getChar(){
        let num = Math.floor(Math.random() * this.bbq.length);
        let divs = document.createElement('div');
        let tops = Math.floor(Math.random() * 100);
        let lefts = Math.floor((window.innerWidth - 400) * Math.random() + 200);

        do{
            num = Math.floor(Math.random() * this.bbq.length);
        }while(this.cheakExist(this.bbq[num])[0]);
        do{
            lefts = Math.floor((window.innerWidth - 400) * Math.random() + 200);
        }while(this.cheakPosition(lefts));
            /*
             * 判断current 产生相同的字母以及位置。
             *this.char[num] 与 this.current[i].innerText比较
             *
             *
             *
             *
             */





        divs.style.cssText =`width:50px;height:50px;
                            background:url(${this.bbq[num][1]})center/cover;
                            ;border-radius:50%;
                            border:0;
                            position:absolute;font-size:0px;top:${tops}px;left:${lefts}px;
                            text-align:center;line-height: 50px;`;
        divs.innerText = this.bbq[num][0];
        document.body.appendChild(divs);
        this.current.push(divs);
        this.position.push(lefts);
    }
    drop() {
        let that = this;
        that.t = setInterval(function () {
            for (let i = 0; i < that.current.length; i++) {
                let tops = that.current[i].offsetTop + that.speed;
                that.current[i].style.top = tops + 'px';
                if(tops>=500){
                    document.body.removeChild(that.current[i]);
                    that.current.splice(i,1);
                    that.position.splice(i,1);
                    that.getChar();
                    that.life--;
                    that.lifeobj.innerHTML = that.life;
                    if(that.life <=0){
                      let flag = confirm('是否重新开始');
                        if(flag){
                            that.restart();
                        }else{
                            close();
                        }
                    }
                }
            }
        }, 100);
    }
    keys(){
        let that = this;
        document.onkeydown = function(e){
            let code = String.fromCharCode(e.keyCode);
            for(let i = 0;i < that.current.length;i++){
                if(code == that.current[i].innerText){
                    document.body.removeChild(that.current[i]);
                    that.current.splice(i,1);
                    that.position.splice(i,1);
                    that.getChar();
                    that.scroeobj.innerHTML = ++that.scroe;
                    if(that.scroe >= that.pass){
                        that.next();
                    }
                }
            }
        }
    }
    next(){
        //先停止时间函数
        clearInterval(this.t);
        this.current.forEach(element=>{
            document.body.removeChild(element);
        });
        this.current = [];
        this.position = [];
        this.length++;
        this.pass +=10;
        this.getChars(this.length);
        this.drop();
        //再清除五个块元素的视图
        //在清除五个块元素的数据。如果先删数据，那么就无法访问视图。
        //数量++；
        //峰值更新同步
        //产生字符
        //字符下落
    }
    restart(){
        clearInterval(this.t);
        this.current.forEach(element=>{
            document.body.removeChild(element);
    });
        this.current = [];
        this.position = [];
        this.scroe = 0;
        this.scroeobj.innerHTML = this.scroe;
        this.life = 5;
        this.lifeobj.innerHTML = this.life;
        this.pass = 5;
        this.length = 5;
        this.getChars(this.length);
        this.drop();
        //视图清零
        //数据清零
        //峰值归零
        //生命之恢复初始
        //关卡
        //this.length = 5;
        //生成
    }
    gameover(){
        clearInterval(this.t);
        this.current.forEach(element=>{
            document.body.removeChild(element);
        })
        this.current = [];
        this.position = [];
    }
}
