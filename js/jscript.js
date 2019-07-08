var game={
    sozler:["poison","pink","car","computer","beautiful","desktop","refrigerator","helicopter","banana","pineapple","paradise","monitor","invasion","university",
    "administration","attention","behavior","benefit","brother","candidate","character","church","daughter","development","everybody","generation","government","history","husband","information","knowledge","language","magazine","necessary","newspaper",
    "design","little","unique","new","silver","sea","height","star","number","very","woman","girl","way","system",
],
    wins:0,
    losses:0,
    yourletter:[],
    unknown:[],
    chances:10,
    allowed:'qwertyuiopasdfghjklzxcvbnm',
    comp_select:function(){
        let word = this.sozler[Math.floor(Math.random() * this.sozler.length)]
        this.chances=10
        this.unknown=[]
        this.yourletter=[]
        for(let i=0;i<word.length;i++){
            this.unknown.push('_');
        }
        return word;
    },
    xeberdarliq:function(){
        document.querySelector('.mistakeschances').innerHTML=""
        document.querySelector('.mistakeable').innerHTML=""
        let chances_count=10-this.chances
        for(let i=0;i<chances_count;i++){
            document.querySelector('.mistakeschances').innerHTML+="X "
        }
        for(let i=0;i<this.chances;i++){
            
            document.querySelector('.mistakeable').innerHTML+="X "
            document.querySelector('.mistakeable').style.opacity="0.4"
        }
    },
    lost:function(word){
        //oyunu uduzsa
        this.losses++
        let html="<img src='https://emojis.slackmojis.com/emojis/images/1500426414/2652/allo-crying.gif?1500426414' id='reaction'>"
        document.querySelector('.image').innerHTML=html
        document.querySelector('.info').innerHTML="YOU LOST!"
        document.querySelector('.info').style.color="red"
        document.querySelector('.divinfo').style.display="inline-block"
        document.querySelector('.previous').innerHTML=word
    },
    check:function(event,word)
    {
        let tapilibsa=word.indexOf(event);
        let isledilibse=this.yourletter.indexOf(event)
        let qaydali_herf=this.allowed.indexOf(event)
        
        if(tapilibsa!==-1 && isledilibse===-1 && qaydali_herf!==-1)
        {
            for(let i=tapilibsa;i<word.length;i++)
            {
                if(event===word[i])
                {
                    this.unknown[i]=event;
                    if(this.unknown.indexOf("_")===-1)
                    {
                        this.wins++
                        let html="<img src='https://emojis.slackmojis.com/emojis/images/1531849430/4246/blob-sunglasses.gif?1531849430' id='reaction'>"
                        document.querySelector('.image').innerHTML=html
                        document.querySelector('.info').innerHTML="YOU WON!"
                        document.querySelector('.previous').innerHTML=word
                        return true;
                    }else{
                        document.querySelector('.info').style.color="green"
                        document.querySelector('.info').innerHTML="YES";
                    }   
                }
            }
            this.yourletter.push(event);
        }
        else if(tapilibsa===-1 && isledilibse===-1 && qaydali_herf!==-1)
        {
            this.chances--;
            this.yourletter.push(event);
            if(this.chances===0){
                this.lost(word)
                return false;
            }
            else
            {
                document.querySelector('.info').style.color="red"
                document.querySelector('.info').innerHTML="NO";
            }
        }
        else if(qaydali_herf===-1)
        {
            document.querySelector('.divinfo').style.display="inline-block"
            document.querySelector('.info').innerHTML="only english letters"
            document.querySelector('.info').style.color="red"
        }
        else if(isledilibse!==-1 && qaydali_herf!==-1)
        {
            document.querySelector('.divinfo').style.display="inline-block"
            document.querySelector('.info').innerHTML="Already written"
            document.querySelector('.info').style.color="red"
        }
    },
    go_print:function(){
        document.querySelector('.word').innerHTML=" "
        document.querySelector('.mistakes').innerHTML=""
        document.querySelector('.wins').innerHTML=this.wins
        document.querySelector('.losses').innerHTML=this.losses
        document.querySelector('.divinfo').style.display="block";
        for(let i=0;i<this.unknown.length;i++){
            document.querySelector('.word').innerHTML+=this.unknown[i]+" "
        }
        document.querySelector('.word').innerHTML+="&nbsp;&nbsp; ( "+this.unknown.length+" )"

        this.xeberdarliq()
        for(let i=0;i<this.yourletter.length;i++){
            document.querySelector('.mistakes').innerHTML+=game.yourletter[i]+", "
        }
        
    }
}
var comp_choise=game.comp_select();
let count=comp_choise.length;
game.go_print();
let html="<img src='https://emojis.slackmojis.com/emojis/images/1500425901/2646/allo-happy.gif?1500425901' id='reaction'>";
document.querySelector('.image').innerHTML=html
document.onkeydown=function(e){
    
    let your_choise=e.key
    your_choise=your_choise.toLowerCase();
    let test=game.check(your_choise,comp_choise)
    if(test===true||test===false){
        game.go_print();
        setTimeout(function(){  
            comp_choise=game.comp_select();
            
            game.go_print();
        
        }, 2000);  
    }
    else
    {
        if(game.chances>=9&&game.chances<10){
            let html="<img src='https://emojis.slackmojis.com/emojis/images/1500425901/2646/allo-happy.gif?1500425901' id='reaction'>";
            document.querySelector('.image').innerHTML=html
        }
        else if(game.chances>6 && game.chances<9){
            let html="<img src='https://emojis.slackmojis.com/emojis/images/1531847584/4234/blob-eyeroll.gif?1531847584' id='reaction'>"
            document.querySelector('.image').innerHTML=html
        }
        else if(game.chances>3&&game.chances<=6){
            let html="<img src='https://emojis.slackmojis.com/emojis/images/1531847626/4236/blobl-grimace.gif?1531847626' id='reaction'>"
            document.querySelector('.image').innerHTML=html
        }
        else if(game.chances<=3 && game.chances>1){
            let html="<img src='https://emojis.slackmojis.com/emojis/images/1536350928/4591/blob-worry.gif?1536350928' id='reaction'>"
            document.querySelector('.image').innerHTML=html
        }
        game.go_print();
    }
}

