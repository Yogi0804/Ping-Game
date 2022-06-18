let Player = [0, 1];
let Cache_Score = [0, 0];
//VALUES
const player_1 = document.querySelector(".player--0");
const player_2 = document.querySelector(".player--1");
const dice_image = document.querySelector(".dice");
const roll_dice = document.querySelector(".btn--roll");
const new_btn = document.querySelector(".btn--new");

let total_players = 2;
let player_num = 0;
var curr_idx = 0;
let score = 0;
let current_score = document.querySelector(`#current--${player_num}`);
// FUNCTIONS
const AddHidden = function () {
  dice_image.classList.add("hidden");
};

const RemoveHidden = function () {
  dice_image.classList.remove("hidden");
};

const GetRandom = () => Math.floor(Math.random() * 6) + 1;

const update_score = function UpdateScore(score, player_num) {
  document.querySelector(`#score--${player_num}`).textContent = score;
};

AddHidden();

// turn();
let Switch_Player = (current_score, player_num, score, curr_idx) => {
  player_1.classList.toggle("player--active");
  player_2.classList.toggle("player--active");
  Cache_Score[player_num] = score;
  current_score.textContent = 0;
  curr_idx++;
  player_num = Player[curr_idx % total_players];
  score = Cache_Score[player_num];
  return {
    first: current_score,
    second: score,
    third: player_num,
    fourth: curr_idx,
  };
};
const Base = (current_score, player_num, dice_num, score) => {
  current_score = document.querySelector(`#current--${player_num}`);
  //   console.log(
  //     `player_num ${player_num}`,
  //     `curr_idx ${curr_idx}`,
  //     `Cache_Store ${Cache_Score}`
  //   );
  dice_image.src = `dice-${dice_num}.png`;
  current_score.textContent = dice_num;
  score += dice_num;
  update_score(score, player_num);

  return {
    current_score: current_score,
    score: score,
    player_num: player_num,
  };
};
const RollDice = () => {
  roll_dice.addEventListener("click", function () {
    const dice_num = GetRandom();
    RemoveHidden();
    if (dice_num != 0) {
      if (dice_num === 1) {
        let value = Switch_Player(current_score, player_num, score, curr_idx);
        current_score = value.first;
        score = value.second;
        player_num = value.third;
        curr_idx = value.fourth;
      }
      console.log(current_score, player_num, score, curr_idx);
      let val = Base(current_score, player_num, dice_num, score);
      current_score = val.current_score;
      score = val.score;
      player_num = val.player_num;
    }
  });
};

const Hold_button = () => {
  document.querySelector(".btn--hold").addEventListener("click", function () {
    let value = Switch_Player(current_score, player_num, score, curr_idx);
    current_score = value.first;
    score = value.second;
    player_num = value.third;
    curr_idx = value.fourth;
  });
};

const NewGame = function () {
  new_btn.addEventListener("click", function () {
    document.location.reload(true);
  });
};
RollDice();
Hold_button();
NewGame();
