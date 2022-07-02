# Dancing Game

## 게임 소개

- 본 게임은 연습실에서 선생님의 뒤에 학생들이 따라다니며 춤을 추도록 하는 게임입니다. (기차놀이, Snake Game)

  게임 시작 및 재시작 버튼은 마우스 클릭도 가능하며, 스페이스바를 눌러도 동작합니다. 이동은 상하좌우 방향키를 이용합니다.

- 게임 플레이 해보기: https://by1994.github.io/dance-snake-game/

![preview.gif](https://github.com/BY1994/dance-snake-game/blob/main/assets/preview.gif?raw=true)

- javascript 를 이용하여 만들었으며, 윈도우용 실행 파일을 만들기 위하여 빌드는 electron 으로 하였습니다.
- 개발로그: https://computer-choco.tistory.com/583



## 빌드 정보

1. node.js 설치 및 환경 변수 설정

https://nodejs.org/en/

2. electon 및 electron-builder 설치

```shell
npm install electron -g
npm install electron-builder -g
```

설치된 electron 버전 확인을 cmd 창에 아래와 같이 진행한다.

```shell
> electron --version
v15.3.0
```

3. package.json 작성

이번 프로젝트에서는 직접 작성하지 않고 npm init 으로 package.json 파일이 자동 생성되게 하였고, 필요한 부분을 직접 수정하였다.

직접 작성하는 경우 위에서 설치한 electron 버전 명시가 필요하다. 아니면 빌드시 `none of the possible electron modules are installed `에러가 발생한다.

```javascript
{
  "name": "dancing-game",
  "version": "1.1.0",
  "description": "Dancing in Practice Room",
  "main": "main.js",
  "author": "BY1994",
  "icon": "assets/icon.ico",
  "devDependencies": {
    "electron": "15.3.0"
  },
  "build": {
    "asar": false,
    "win": {
      "icon": "assets/icon.ico"
    }
  },
  "scripts": {
    "start": "electron ."
  }
}
```

4. main.js 작성

```javascript
const { app, BrowserWindow } = require('electron');

function createWindow () {  // 브라우저 창을 생성
  let win = new BrowserWindow({
    width: 500,
    height: 500,
    webPreferences: {
      nodeIntegration: true
    }
  })

  //브라우저창이 읽어 올 파일 위치
  win.loadFile('index.html')
}

app.on('ready', createWindow);
```

5. 프로젝트 폴더 내에서 빌드 명령어 입력

```shell
electron-builder
```

뒤에 옵션을 붙이지 않으면 디폴트로 window exe 파일이 빌드되었다.

mac os 용이 필요한 경우 `electrong builder build -m` 을 하면 되는데, 윈도우에서는 빌드할 수 없다는 에러 메세지가 뜬다. 본 프로젝트는 윈도우 용으로만 빌드했기 때문에 package.json 에도 "win" 용만 작성해주었다.



## 저작권 정보

### 1. 배경 음악

SHANTI - Tropical Adventure

https://tunetank.com/t/7bfj/266-tropical-adventure



### 2. 효과음

Game Start - plasterbrain
Cartoon jump - Bastianhallo

https://pixabay.com/sound-effects/search/game/



### 3. Game Start, Replay 버튼

Start 버튼
http://pixelartmaker.com/art/72971ad31e78895
Replay 버튼
http://pixelartmaker.com/art/f34327dc2ac6170



### 4. Snake Game 소스 코드

https://www.educative.io/blog/javascript-snake-game-tutorial 