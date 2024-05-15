window.addEventListener('DOMContentLoaded',()=>{
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerdisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const annoucer = document.querySelector('.winner');

    let board=['','','','','','','','',''];
    let curplayer='X';
    let gameactive = true;
    
    const playerX='playerX_Won';
    const playerO='playerO_ Won';
    const tie='Tie';

    const winningchances = [
        [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
    ];

    const announce=(type)=>{
        switch(type){
            case playerX:
                annoucer.innerHTML='player <span class="playerX">X </span> Won';
                break;
            case playerO:
                annoucer.innerHTML='player <span class="playerO">O</span> Won';
                
                break;
            case tie:
                annoucer.innerText='Tie!!!!!';
        }
        annoucer.classList.remove('hide');
    };

    function handleResultValidation(){
        let won=false;
        for(let i=0;i<=7;i++)
        {
            const winchance=winningchances[i];
            const a=board[winchance[0]];
            const b=board[winchance[1]];
            const c=board[winchance[2]];
            if(a==''|| b==''||c==''){
                continue;
            }
            if(a==b && b==c){
                won=true;
                break;
            }
        }
        if(won){
            announce(curplayer==='X'?playerX:playerO);
            gameactive=false;
            return;
        }
        if(!board.includes(''))
        announce(tie);
    }

    const isvalidAction=(tile)=>{
        if(tile.innerText==='X'||tile.innerText==='O'){
            return false;
        }
        return true;
    };

    const updateBoard=(index)=>{
        board[index]=curplayer;
    };
    const changeplayer= () => {
        playerdisplay.classList.remove(`player${curplayer}`);
        curplayer=curplayer==='X'?'O':'X';
        playerdisplay.innerText=curplayer;
        playerdisplay.classList.add(`player${curplayer}`);
    }

    const userAction=(tile,index)=>{
        if(isvalidAction(tile)&&gameactive){
            tile.innerText = curplayer;
            tile.classList.add(`player${curplayer}`);
            updateBoard(index);
            handleResultValidation();
            changeplayer();
        }
    }

    const resetBoard = ()=>{
        board=['','','','','','','','',''];
        gameactive=true;
        annoucer.classList.add('hide');

        if(curplayer === 'O'){
            changeplayer();
        }

        tiles.forEach(tile=>{
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    tiles.forEach((tile,index)=>{
        tile.addEventListener('click',()=>userAction(tile,index));
    });

    resetButton.addEventListener('click',resetBoard);
});