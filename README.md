##### 이세계 로그나이트

### 게임 기획 일지

**전투 기획**
### 던전

#  (공격, 도망)

#   공격 - 공격시 마다 골드를 회득한다([랜덤]500~1000골드)

- 최소공격력 : 공격력-1% / 최대공격력 : 공격력+1%

#   도망 - 도망시 플레이어의 hp차감 [랜덤]-10% ~ -30%

- (경고창 : HP 30%미만 일 때 도망가면 죽을 수 도 있음)

- 도망으로 죽지 않았을 경우 HP100%회복

- 도망시 골드획득 취소

#   던전은 턴제로 진행하며 플레이어의 공격이 끝나면 몬스터가 자동공격1~2회 진행

#   스테이지레벨에 따라 몬스터가 랜덤으로 점차 강해짐 공격력 += LV*0.5

### 상점

#   스테이지 클리어시 상점 버튼 확성화(뒤로가기로 로비이동가능)

#   골드를 사용해서 무기와 방어구를 구입할 수 있다.

#   물가기준

- 한판당 10000골드~30000골드를 랜덤획득 할 수 있다는 기준

#   아이템

-   일반무기 : 공격력 5 40,000골드

-   희귀무기 : 공격력 10 10만골드

-   전설무기 : 공격력 20 20만골드

**골드 획득량 평균 10~20스테이지 플레이지 희귀~전설무기 구매가능 예상**

-   일반방어구 : HP += LV *2

-   희귀방어구 : HP += LV *3

-   전설방어구 : HP += LV *4



#### 개발노트
- 플레이어 공격로직 구축
    __1.Math.random()함수로 공격데미지 범위설정 : 공격력의 -3% ~ +3%__
    __2.Math.random()함수로 매 공격마다 랜덤골드 획득 : 500골드~1000골드__
    __3.몬스터HP 플레이어의 랜덤데미지 만큼 차감__
    __4.toFixed(2)함수 사용으로 몬스터HP소수점2자리 까지만 표시__

- 전투로그 줄 제한
    __splice()메서드 사용해서 logs어레이의 length조절__

- 플레이어 사망시
    __server.js파일의 로비를 game.js에 import해서 로비이동 구현__

- 유저가 선택사항 외 다른번호를 입력시
    __스위치문의 디폴트값을 이용해서 안내문보여주고 다시선택기능추가__

- 골드시스템 추가

- 상점시스템 추가

- 레벨업시 몬스터 강해짐 추가

- 무기,몬스터데미지 벨런스패치
    __랜덤데미지량 범위 3에서 10으로 수정__
    __골드 획득량 수정__
    __몬스터데이지 상승률 수정__
    __플레이거 기본데미지 20 -> 10__