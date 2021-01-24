class Quiz{
    getState(){
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value",function(data){
            gameState = data.val();
        })
    }
    update(state){
        database.ref("/").update({
            gameState: state
        })
    }

    async start(){
        if(gameState === 0){
            contestant = new Contestant();
            var contestantCountRef = await database.ref("contestantCount").once("value");
            if(contestantCountRef.exists()){
                contestantCount = contestantCountRef.val();
                contestant.getCount();
            }
            question = new Question();
            question.display();
        }
    }

    play(){
        question.hide();
        background("yellow");
        textSize(30);
        fill("black")
        text("Results",350,50);
        Contestant.getContestantInfo();
        if(allContestants!=undefined){
            var displayPosition = 130;
           for(var plr in allContestants){
               var correctAns = "2";
               if(correctAns === allContestants[plr].answer){
                fill("green");
               }else{
                   fill("red");
               }
               displayPosition = displayPosition+20;
               textSize(15);
               text(allContestants[plr].name+": "+allContestants[plr].answer,120,displayPosition);
           } 
        }
    }
}