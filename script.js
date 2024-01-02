let cards = [
    {   image : "https://i.natgeofe.com/k/66d3a80c-f4c3-4410-845c-3543375eaa85/cheetah-watching_2x3.jpg",
        value : 1,
        state : "closed" }, 

    {   image : "https://i.natgeofe.com/k/66d3a80c-f4c3-4410-845c-3543375eaa85/cheetah-watching_2x3.jpg",
        value : 1,
        state : "closed" }, 

    {   image : "https://animal-club.co.uk/wp-content/uploads/2020/08/Are-Chimps-More-Intelligent-than-Other-Mammals-1.jpg",
        value : 2,
        state : "closed" },

    {   image : "https://animal-club.co.uk/wp-content/uploads/2020/08/Are-Chimps-More-Intelligent-than-Other-Mammals-1.jpg",
        value : 2,
        state : "closed" },

    {   image : "https://images.fineartamerica.com/images-medium-large-5/giraffe-headshot-nairobi-kenya-fat-tony.jpg",
        value : 3,
        state : "closed" },

    {   image : "https://images.fineartamerica.com/images-medium-large-5/giraffe-headshot-nairobi-kenya-fat-tony.jpg",
        value : 3,
        state : "closed" },

    {   image : "https://dkt6rvnu67rqj.cloudfront.net/cdn/ff/hvHgj8uSGaDazYhL_zLH2HW8ntL-kEfpIF7WQugFQUo/1579231719/public/styles/322x405/public/media/int_files/1013320-elephant-tanzania.jpg?h=e6409126&itok=13ikBq1Q",
        value : 4,
        state : "closed" },

    {   image : "https://dkt6rvnu67rqj.cloudfront.net/cdn/ff/hvHgj8uSGaDazYhL_zLH2HW8ntL-kEfpIF7WQugFQUo/1579231719/public/styles/322x405/public/media/int_files/1013320-elephant-tanzania.jpg?h=e6409126&itok=13ikBq1Q",
        value : 4,
        state : "closed" },

    {   image : "https://i.pinimg.com/236x/c0/67/04/c06704f864a37ba3aae0016890d5b98c--peacocks-friends.jpg",
        value : 5,
        state : "closed" },

    {   image : "https://i.pinimg.com/236x/c0/67/04/c06704f864a37ba3aae0016890d5b98c--peacocks-friends.jpg",
        value : 5,
        state : "closed" },

    {   image : "https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg",
        value : 6,
        state : "closed" },

    {   image : "https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg",
        value : 6,
        state : "closed" },

    {   image : "https://dkt6rvnu67rqj.cloudfront.net/sites/default/files/styles/322x405/public/media/int_files/1008357.jpg?itok=c5qoLzeh",
        value : 7,
        state : "closed" },
    
    {   image : "https://dkt6rvnu67rqj.cloudfront.net/sites/default/files/styles/322x405/public/media/int_files/1008357.jpg?itok=c5qoLzeh",
        value : 7,
        state : "closed" },

    {   image : "https://images.pexels.com/photos/40984/animal-ara-macao-beak-bird-40984.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        value : 8,
        state : "closed" },
    
    {   image : "https://images.pexels.com/photos/40984/animal-ara-macao-beak-bird-40984.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        value : 8,
        state : "closed" }
];

            // Suffling the cards randomly
for(let i=0; i<cards.length; i++)
{
    let j, tmp;
    j = Math.floor(Math.random() * (i+1));    // generating random integer value

                // swaping the cards randomly
    tmp = cards[i];
    cards[i] = cards[j];
    cards[j] = tmp;
}

function removeButton()
{
    document.getElementById("start").className = "stop";
    alert('You need to guess 2 cards that are similar. If your guess is correct your score will increase by 10, else heart will decrease by 1 (if score is 0) or score will decrease by 3 (if score is greater than 3).');
    updateCards(cards);
}

            // Displaying cards on the page
function updateCards(data)
{
    let htmlCards = "";
    for(let i=0;i<cards.length; i++)
    {
        htmlCards += `
        <div class="card" style="background-image: url(${cards[i].image});" onclick="openCard(${i})"> 
        <div class="${cards[i].state}"> </div>    
        </div> 
        `;
    }
    document.getElementById("cards").innerHTML = htmlCards;
}

function gameWon()
{
    for(let i=0;i<cards.length; i++)
    {
        if(cards[i].state == "closed")
        {
            return(0);
        }
    }
    return(1);
}

// Opeining & Checking Cards
let val1, val2, score = 0, cardCount = 0, heart = 8;
function openCard(val)
{
    if(heart > 0)
    {
        if(cardCount == 0 && cards[val].state == "closed")
        {
            cards[val].state = "opened";
            val1 = cards[val].value;
            cardCount += 1;
        }
        else if(cardCount == 1 && cards[val].state == "opened" && cards[val].value == val1)
        {
            cards[val].state = "closed";
            cardCount -= 1;
            if(score >= 3)
                score -= 3;
            else
                heart -= 1;
        }
        else if(cardCount == 1 && cards[val].state == "closed")
        {
            cards[val].state = "opened";
            val2 = cards[val].value;

            if(val1 == val2)       //checking for correct guess
            {
                score += 10;
                cardCount -= 1;
                heart += 1;
            }
            else
            {
                heart -= 1;
                cards[val].state = "closed";
            }
        }
    }
    if(heart < 1)
    {
        alert("Game Over !!        SCORE - '"+score+"'");
        location.reload();
    }
    else if(gameWon())
    {
        alert("Hurray, You won the game !!      SCORE - '"+score+"'");
        location.reload();
    }

    document.getElementById("score").innerText = score;
    document.getElementById("heart").innerText = heart;
    updateCards(cards);
}
