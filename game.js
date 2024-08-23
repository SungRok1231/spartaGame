import chalk from 'chalk';
import figlet from 'figlet';
import readlineSync from 'readline-sync';
import { start } from './server.js';

class Player {
  constructor() {
    this.hp = 100;
    this.damage = 10;
    this.gold = 0;
    this.weapon = ``;
    this.costume = ``;
  }
}

class Monster {
  constructor() {
    this.hp = 100;
    this.damage = 10;
  }

  attack(player) {

  }
}

//----------------함수모음------------------
/**랜덤함수 : min, max의값을 메게변수고 받음*/
function randomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//플레이어 기본 데미지는 공격력의 -1% ~ +1%사이 랜덤반환
function playerDamageValue(player) {
  let damageMax = player.damage + (50 / 100) * player.damage; // 기본파워의 +1퍼센트
  let damageMin = player.damage - (50 / 100) * player.damage; // 기본파워의 -1퍼센트
  let val = Math.random() * (damageMax - damageMin) + damageMin;
  return val.toFixed(2);
}
function monsterDamageValue(monster) {
  let monsterMax = monster.damage + (50 / 100) * monster.damage; // 기본파워의 +1퍼센트
  let monsterMin = monster.damage - (50 / 100) * monster.damage; // 기본파워의 +1퍼센트
  let val = Math.random() * (monsterMax - monsterMin) + monsterMin;
  return val.toFixed(2);
}

//hp바 생성
function createHpBar(currentHp, maxHp, barLength = 20) {
  const hpPercentage = currentHp / maxHp; //현재 HP를 최대 HP로 나누어 HP 퍼센티지 계산
  const filledLength = Math.round(barLength * hpPercentage); //HP 퍼센티지를 바의 길이에 곱해, 채워져야 할 바의 길이를 계산
  const emptyLength = barLength - filledLength; //바 길이 에서 채워져야할 길이만큼 뺌
  
  const filledBar = '#'.repeat(filledLength);
  const emptyBar = ` `.repeat(emptyLength); //바 길이에 모자란 부분만큼 .repeat메서드를 사용해서 반복적으로 채워넣을거 정의
  
  return `[${filledBar}${emptyBar}] ${currentHp}/${maxHp} HP`;
}

function displayStatus(lv, player, monster) {
  console.log(chalk.magentaBright(`\n=== 이세계 로그나이트 ===`));
  //플레이어 정보
  let maxHp = 100;
  console.log(
    chalk.cyanBright(`| lv: ${lv} |`) +
    chalk.yellow(`| 보유골드: ${player.gold} |`) +
    chalk.red(`| 공격력: ${player.damage} |`)
  );
  console.log(chalk.blueBright(`| 착용중인무기 ${player.weapon} |`));
  console.log(chalk.blueBright(`| 회사원  ${createHpBar(player.hp.toFixed(2), maxHp)} |`));
  
  //몬스터 정보
  console.log(chalk.redBright(`

| 몬스터  ${createHpBar(monster.hp.toFixed(2), maxHp)} |
    
    `))
  console.log(chalk.magentaBright(`=====================\n`));
}

//lv, player, monster들어오는곳
const battle = async (lv, player, monster) => {
  let logs = [];
  let turnCount = 0; //턴 카운트
  monster.damage = 4*lv;

  while(player.hp > 0 && monster.hp > 0) {
    console.clear();
    displayStatus(lv, player, monster);

    logs.forEach((log) => console.log(log));

    console.log(
      chalk.green(
        `\n1. 공격한다 2. 아무것도 하지않는다.`,
      ),
    );
    const choice = readlineSync.question('당신의 선택은? ');
    // 플레이어의 선택에 따라 다음 행동 처리
    switch (choice) {
      case '1':
        turnCount++
        logs.push(chalk.green(`${turnCount}번째 턴`));
        const playerDamage = playerDamageValue(player);
        monster.hp -= playerDamage; //몬스터 HP차감 소수점2자리까지
        logs.push(chalk.cyanBright(`회사원 데미지 : ${playerDamage}`));
        if(monster.hp > 0){
            const monsterDamage = monsterDamageValue(monster)
            player.hp -= monsterDamage; //플레이어 HP차감 소수점2자리까지
            logs.push(chalk.red(`몬스터 데미지 : ${monsterDamage}`));
        }
        if (logs.length > 8) {
          logs.splice(0, 3);
        }
      break;
    
      default:
        console.log(chalk.red('올바른 선택을 하세요.'));
        break;
    }
  }
  //   상점
  function shop() {
    console.clear();
    console.log(
      chalk.cyan(
        figlet.textSync('SHOP', {
          font: 'Standard',
          horizontalLayout: 'default',
          verticalLayout: 'default',
        }),
      ),
    );
    console.log(`상점에 오신걸 환영합니다.`);
    console.log(chalk.yellow(`┌─────────────────────────┐`));
    console.log(
      chalk.cyanBright(`| lv: ${lv} `) +
      chalk.yellow(`| 보유골드: ${player.gold} |`)
    );
    console.log(chalk.yellow(` 착용중인무기: ${player.weapon}`));
    console.log(chalk.yellow(`└─────────────────────────┘`));
    console.log(chalk.yellow(`┌─────────────────────────┐`));
    console.log(`  
  ◎==||::::::::::::>
  1: 일반무기(공격력 +5)
  `);
    console.log(chalk.blue(`
  (]xxx[}:::::::::::::::>
  2: 희귀무기(공격력 +10)
  `));
    console.log(chalk.red(`
  cxxx{}:;:;:;:;:;:;:;:;:;:;:;:;:;:;:;:;:;:;>
  3: 전설무기(공격력 +20)
  `));
    console.log(chalk.yellow(`└─────────────────────────┘`));
    logs.forEach((log) => console.log(log));
    console.log(
      chalk.green(
        `\n1. 상품번호1~3을 입력 하세요. 9. 다음전투 시작`,
      ),
    );
    const choice = readlineSync.question('입력 : ');
    switch (choice) {
      case '1': 
      if (player.gold >= 40000) {
        player.weapon = `◎==||::::::::::::>`
        player.damage += 5;
        player.gold -= 40000;
        logs.push(`일반무기(공격력 +5)를 구매 하셨습니다.`);
      } else {
        logs.push(chalk.red(`골드가 부족합니다.`));
      }
        break;

      case '2': 
      if (player.gold >= 100000) {
        player.weapon = `(]xxx[}:::::::::::::::>`
        player.damage += 10;
        player.gold -= 100000;
        logs.push(`희귀무기(공격력 +10)를 구매 하셨습니다.`);
      } else {
        logs.push(chalk.red(`골드가 부족합니다.`));
      }
        break;

      case '3': 
      if (player.gold >= 200000) {
        player.weapon = `cxxx{}:;:;:;:;:;:;:;:;:;:;:;:;:;:;:;:;:;:;>`
        player.damage += 20;
        player.gold -= 200000;
        logs.push(`전설무기(공격력 +20)를 구매 하셨습니다.`);
      } else {
        logs.push(chalk.red(`골드가 부족합니다.`));
      }
        break;

      case '9': 
        monster.hp = 100;
        break;
    
      default:
        break;
    }
  };
  let wingold = randomValue(10000, 20000);
  if (player.hp < 0) {
    console.clear();
    console.log(
      chalk.cyan(
        figlet.textSync('GameOver', {
          font: 'Standard',
          horizontalLayout: 'default',
          verticalLayout: 'default',
        }),
      ),
    );
    console.log(
      chalk.green(
        `\n1. 로비로 돌아가기.`,
      ),
    );
    const choice = readlineSync.question('입력 : ');
    switch (choice) {
      case '1':
        start()
        break;
    
      default:
        console.log(chalk.red('올바른 선택을 하세요.'));
        break;
    }
  }
  if (monster.hp < 0) {
    player.hp = 100;
    monster.hp = 0;
    player.gold += wingold;
  }
  //몬스터 잡았을 경우
  while(monster.hp <= 0 && player.hp == 100){
    //승리 골드 지급
    console.clear();
    logs = [];
    console.log(
      chalk.cyan(
        figlet.textSync('WIN', {
          font: 'Standard',
          horizontalLayout: 'default',
          verticalLayout: 'default',
        }),
      ),
    );
    
    console.log(chalk.yellow(`    ┌─────────────────────┐`));
    console.log(chalk.yellow(`    ${wingold}골드를 획득했습니다.`));
    console.log(chalk.yellow(`    └─────────────────────┘`));
    console.log(chalk.cyanBright(`
    몬스터를 처치했습니다
      상점에 방문하여 아이템을
              구매할 수 있습니다.`));
    console.log(
      chalk.green(
        `\n1. 상점방문하기 2. 다음전투시작.`,
      ),
    );
    const choice = readlineSync.question('입력 : ');
    switch (choice) {
      case '1':
        monster.hp = 1000;
        break;
      case '2':
        monster.hp = 100;
        break;
    
      default:
        console.log(chalk.red('올바른 선택을 하세요.'));
        break;
    }
  }

  //몬스터 hp를 일종의 api URL처럼 사용ㅋ
  while (monster.hp == 1000) {
    shop();
  }

};

export async function startGame() {
  console.clear();
  const player = new Player();
  let lv = 1;

  while (lv <= 10) {
    const monster = new Monster(lv);
    await battle(lv, player, monster);
    

    lv++;
  }
}