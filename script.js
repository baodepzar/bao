// Game State Management
let currentGame = '';
let gameStates = {
    redLight: {
        isRunning: false,
        timeLeft: 30,
        currentLight: 'red',
        playerPosition: 0,
        gameInterval: null,
        lightInterval: null,
        canMove: false
    },
    dalgona: {
        isRunning: false,
        timeLeft: 60,
        lives: 3,
        precision: 100,
        gameInterval: null,
        canvas: null,
        ctx: null,
        shape: 'star',
        isDrawing: false,
        path: [],
        targetPath: []
    },
    tugOfWar: {
        isRunning: false,
        playerPower: 0,
        opponentPower: 0,
        clickCount: 0,
        gameInterval: null,
        ropePosition: 0
    },
    marbles: {
        isRunning: false,
        playerMarbles: 10,
        opponentMarbles: 10,
        currentBet: 1,
        opponentChoice: null,
        gamePhase: 'betting' // betting, guessing, result
    },
    glassBridge: {
        isRunning: false,
        currentStep: 0,
        totalSteps: 10,
        bridgePattern: [],
        playerAlive: true
    }
};

// Screen Navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function showMenu() {
    showScreen('mainMenu');
    resetAllGames();
}

function showGame(gameId) {
    currentGame = gameId;
    showScreen(gameId);
    initializeGame(gameId);
}

function showGameOver(message) {
    document.getElementById('gameOverMessage').textContent = message;
    showScreen('gameOver');
}

function showWin() {
    showScreen('winScreen');
}

function restartCurrentGame() {
    if (currentGame) {
        showGame(currentGame);
    }
}

// Game Initialization
function initializeGame(gameId) {
    resetAllGames();
    
    switch(gameId) {
        case 'redLight':
            initRedLightGame();
            break;
        case 'dalgona':
            initDalgonaGame();
            break;
        case 'tugOfWar':
            initTugOfWarGame();
            break;
        case 'marbles':
            initMarblesGame();
            break;
        case 'glassBridge':
            initGlassBridgeGame();
            break;
    }
}

function resetAllGames() {
    // Clear all intervals
    Object.values(gameStates).forEach(state => {
        if (state.gameInterval) {
            clearInterval(state.gameInterval);
            state.gameInterval = null;
        }
        if (state.lightInterval) {
            clearInterval(state.lightInterval);
            state.lightInterval = null;
        }
    });
    
    // Reset all states
    gameStates.redLight = {
        isRunning: false,
        timeLeft: 30,
        currentLight: 'red',
        playerPosition: 0,
        gameInterval: null,
        lightInterval: null,
        canMove: false
    };
    
    gameStates.dalgona = {
        isRunning: false,
        timeLeft: 60,
        lives: 3,
        precision: 100,
        gameInterval: null,
        canvas: null,
        ctx: null,
        shape: 'star',
        isDrawing: false,
        path: [],
        targetPath: []
    };
    
    gameStates.tugOfWar = {
        isRunning: false,
        playerPower: 0,
        opponentPower: 0,
        clickCount: 0,
        gameInterval: null,
        ropePosition: 0
    };
    
    gameStates.marbles = {
        isRunning: false,
        playerMarbles: 10,
        opponentMarbles: 10,
        currentBet: 1,
        opponentChoice: null,
        gamePhase: 'betting'
    };
    
    gameStates.glassBridge = {
        isRunning: false,
        currentStep: 0,
        totalSteps: 10,
        bridgePattern: [],
        playerAlive: true
    };
}

// Red Light Green Light Game
function initRedLightGame() {
    const state = gameStates.redLight;
    state.isRunning = true;
    state.timeLeft = 30;
    state.playerPosition = 0;
    state.currentLight = 'red';
    state.canMove = false;
    
    updateRedLightUI();
    
    // Start timer
    state.gameInterval = setInterval(() => {
        state.timeLeft--;
        updateRedLightUI();
        
        if (state.timeLeft <= 0) {
            if (state.playerPosition >= 100) {
                showWin();
            } else {
                showGameOver("Time's up! You didn't reach the finish line!");
            }
            clearInterval(state.gameInterval);
            state.isRunning = false;
        }
    }, 1000);
    
    // Start light switching
    state.lightInterval = setInterval(() => {
        state.currentLight = state.currentLight === 'red' ? 'green' : 'red';
        state.canMove = state.currentLight === 'green';
        updateRedLightUI();
    }, Math.random() * 3000 + 2000); // Random interval between 2-5 seconds
    
    // Keyboard controls
    document.addEventListener('keydown', handleRedLightKeydown);
    
    // Touch controls for mobile
    document.addEventListener('touchstart', handleRedLightTouch);
    document.addEventListener('click', handleRedLightClick);
    
    // Add specific move button listener
    const moveButton = document.getElementById('moveButton');
    if (moveButton) {
        moveButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            movePlayer();
        });
        moveButton.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            movePlayer();
        });
    }
}

function handleRedLightKeydown(e) {
    if (e.code === 'Space' && gameStates.redLight.isRunning) {
        e.preventDefault();
        movePlayer();
    }
}

// New touch handler for mobile
function handleRedLightTouch(e) {
    if (gameStates.redLight.isRunning && e.target.closest('#redLight')) {
        e.preventDefault();
        movePlayer();
    }
}

// New click handler for mobile
function handleRedLightClick(e) {
    if (gameStates.redLight.isRunning && e.target.closest('#redLight')) {
        e.preventDefault();
        movePlayer();
    }
}

function movePlayer() {
    const state = gameStates.redLight;
    
    if (state.canMove) {
        state.playerPosition += 5;
        if (state.playerPosition >= 100) {
            state.playerPosition = 100;
            showWin();
            clearInterval(state.gameInterval);
            clearInterval(state.lightInterval);
            state.isRunning = false;
        }
    } else {
        // Player moved during red light - game over
        showGameOver("You moved during red light! You've been eliminated!");
        clearInterval(state.gameInterval);
        clearInterval(state.lightInterval);
        state.isRunning = false;
    }
    
    updateRedLightUI();
}

function updateRedLightUI() {
    const state = gameStates.redLight;
    
    document.getElementById('redLightTimer').textContent = state.timeLeft;
    document.getElementById('distance').textContent = state.playerPosition;
    
    // Update traffic light
    document.getElementById('redLightBulb').classList.toggle('active', state.currentLight === 'red');
    document.getElementById('greenLightBulb').classList.toggle('active', state.currentLight === 'green');
    
    // Update player position
    document.getElementById('player').style.left = state.playerPosition + '%';
    document.getElementById('playerProgress').style.width = state.playerPosition + '%';
}

// Dalgona Cookie Game
function initDalgonaGame() {
    const state = gameStates.dalgona;
    state.isRunning = true;
    state.timeLeft = 60;
    state.lives = 3;
    state.precision = 100;
    state.canvas = document.getElementById('cookieCanvas');
    state.ctx = state.canvas.getContext('2d');
    
    drawCookieShape();
    updateDalgonaUI();
    
    // Start timer
    state.gameInterval = setInterval(() => {
        state.timeLeft--;
        updateDalgonaUI();
        
        if (state.timeLeft <= 0) {
            if (state.precision >= 70) {
                showWin();
            } else {
                showGameOver("Time's up! Your cookie broke!");
            }
            clearInterval(state.gameInterval);
            state.isRunning = false;
        }
    }, 1000);
    
    // Mouse events for drawing
    state.canvas.addEventListener('mousedown', startDrawing);
    state.canvas.addEventListener('mousemove', draw);
    state.canvas.addEventListener('mouseup', stopDrawing);
    state.canvas.addEventListener('mouseout', stopDrawing);
    
    // Touch events for mobile
    state.canvas.addEventListener('touchstart', startTouchDrawing);
    state.canvas.addEventListener('touchmove', touchDraw);
    state.canvas.addEventListener('touchend', stopDrawing);
}

function drawCookieShape() {
    const state = gameStates.dalgona;
    const ctx = state.ctx;
    const canvas = state.canvas;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw cookie background
    ctx.fillStyle = '#FFAB40';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw star shape outline
    ctx.strokeStyle = '#8D6E63';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const outerRadius = 80;
    const innerRadius = 40;
    const spikes = 5;
    
    for (let i = 0; i < spikes * 2; i++) {
        const angle = (i * Math.PI) / spikes;
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    
    ctx.closePath();
    ctx.stroke();
}

function startDrawing(e) {
    const state = gameStates.dalgona;
    if (!state.isRunning) return;
    
    state.isDrawing = true;
    const rect = state.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    state.path = [{ x, y }];
}

function draw(e) {
    const state = gameStates.dalgona;
    if (!state.isDrawing || !state.isRunning) return;
    
    const rect = state.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    state.path.push({ x, y });
    
    // Draw the path
    const ctx = state.ctx;
    ctx.strokeStyle = '#5D4037';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(state.path[state.path.length - 2].x, state.path[state.path.length - 2].y);
    ctx.lineTo(x, y);
    ctx.stroke();
    
    // Check precision (simplified)
    if (Math.random() < 0.1) { // 10% chance to lose precision
        state.precision = Math.max(0, state.precision - Math.random() * 10);
        updateDalgonaUI();
        
        if (state.precision < 30) {
            state.lives--;
            if (state.lives <= 0) {
                showGameOver("Your cookie broke! You've been eliminated!");
                clearInterval(state.gameInterval);
                state.isRunning = false;
            } else {
                state.precision = 100;
                drawCookieShape();
            }
        }
    }
}

function stopDrawing() {
    const state = gameStates.dalgona;
    state.isDrawing = false;
    
    if (state.path.length > 100 && state.precision > 70) {
        showWin();
        clearInterval(state.gameInterval);
        state.isRunning = false;
    }
}

// Touch drawing functions for mobile
function startTouchDrawing(e) {
    e.preventDefault();
    const state = gameStates.dalgona;
    if (!state.isRunning) return;
    
    state.isDrawing = true;
    const rect = state.canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    state.path = [{ x, y }];
}

function touchDraw(e) {
    e.preventDefault();
    const state = gameStates.dalgona;
    if (!state.isDrawing || !state.isRunning) return;
    
    const rect = state.canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    state.path.push({ x, y });
    
    // Draw the path
    const ctx = state.ctx;
    ctx.strokeStyle = '#5D4037';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(state.path[state.path.length - 2].x, state.path[state.path.length - 2].y);
    ctx.lineTo(x, y);
    ctx.stroke();
    
    // Check precision (simplified)
    if (Math.random() < 0.1) { // 10% chance to lose precision
        state.precision = Math.max(0, state.precision - Math.random() * 10);
        updateDalgonaUI();
        
        if (state.precision < 30) {
            state.lives--;
            if (state.lives <= 0) {
                showGameOver("Your cookie broke! You've been eliminated!");
                clearInterval(state.gameInterval);
                state.isRunning = false;
            } else {
                state.precision = 100;
                drawCookieShape();
            }
        }
    }
}

function updateDalgonaUI() {
    const state = gameStates.dalgona;
    
    document.getElementById('dalgonaTimer').textContent = state.timeLeft;
    document.getElementById('precision').textContent = Math.round(state.precision);
    document.getElementById('cookieLives').textContent = '❤️'.repeat(state.lives);
}

// Tug of War Game
function initTugOfWarGame() {
    const state = gameStates.tugOfWar;
    state.isRunning = true;
    state.playerPower = 0;
    state.opponentPower = 0;
    state.clickCount = 0;
    state.ropePosition = 0;
    
    updateTugOfWarUI();
    
    // Start opponent AI
    state.gameInterval = setInterval(() => {
        state.opponentPower += Math.random() * 2 + 1;
        
        // Calculate rope position
        const powerDiff = state.playerPower - state.opponentPower;
        state.ropePosition = Math.max(-100, Math.min(100, powerDiff * 2));
        
        updateTugOfWarUI();
        
        // Check win/lose conditions
        if (state.ropePosition >= 100) {
            showWin();
            clearInterval(state.gameInterval);
            state.isRunning = false;
        } else if (state.ropePosition <= -100) {
            showGameOver("You were pulled over the edge! You've been eliminated!");
            clearInterval(state.gameInterval);
            state.isRunning = false;
        }
        
        // Decay player power over time
        state.playerPower = Math.max(0, state.playerPower - 0.5);
    }, 100);
    
    // Add click event to tug button
    document.getElementById('tugButton').addEventListener('click', pullRope);
}

function pullRope() {
    const state = gameStates.tugOfWar;
    if (!state.isRunning) return;
    
    state.clickCount++;
    state.playerPower += 3;
    
    updateTugOfWarUI();
}

function updateTugOfWarUI() {
    const state = gameStates.tugOfWar;
    
    document.getElementById('clickCount').textContent = state.clickCount;
    document.getElementById('playerPower').style.width = Math.min(100, (state.playerPower / 50) * 100) + '%';
    document.getElementById('ropeMarker').style.transform = `translateX(${state.ropePosition}px)`;
}

// Marbles Game
function initMarblesGame() {
    const state = gameStates.marbles;
    state.isRunning = true;
    state.playerMarbles = 10;
    state.opponentMarbles = 10;
    state.currentBet = 1;
    state.gamePhase = 'betting';
    
    updateMarblesUI();
    updateOpponentSpeech("I'm hiding marbles. Guess odd or even!");
}

function confirmBet() {
    const state = gameStates.marbles;
    if (!state.isRunning || state.gamePhase !== 'betting') return;
    
    state.currentBet = parseInt(document.getElementById('betAmount').value);
    state.gamePhase = 'guessing';
    
    // Generate opponent's hidden marbles (1-10)
    state.opponentChoice = Math.floor(Math.random() * 10) + 1;
    
    updateOpponentSpeech(`I'm holding ${state.opponentChoice} marbles. Odd or even?`);
}

function makeGuess(guess) {
    const state = gameStates.marbles;
    if (!state.isRunning || state.gamePhase !== 'guessing') return;
    
    const isOdd = state.opponentChoice % 2 === 1;
    const correctGuess = (guess === 'odd' && isOdd) || (guess === 'even' && !isOdd);
    
    if (correctGuess) {
        state.playerMarbles += state.currentBet;
        state.opponentMarbles -= state.currentBet;
        updateOpponentSpeech(`Correct! You won ${state.currentBet} marbles.`);
    } else {
        state.playerMarbles -= state.currentBet;
        state.opponentMarbles += state.currentBet;
        updateOpponentSpeech(`Wrong! You lost ${state.currentBet} marbles.`);
    }
    
    updateMarblesUI();
    
    // Check win/lose conditions
    if (state.playerMarbles <= 0) {
        showGameOver("You lost all your marbles! You've been eliminated!");
        state.isRunning = false;
    } else if (state.opponentMarbles <= 0) {
        showWin();
        state.isRunning = false;
    } else {
        // Continue game
        setTimeout(() => {
            state.gamePhase = 'betting';
            state.currentBet = 1;
            document.getElementById('betAmount').value = 1;
            updateOpponentSpeech("Let's play again! I'm hiding marbles.");
        }, 2000);
    }
}

function updateMarblesUI() {
    const state = gameStates.marbles;
    
    document.getElementById('yourMarbles').textContent = state.playerMarbles;
    document.getElementById('opponentMarbles').textContent = state.opponentMarbles;
    document.getElementById('marblesLeft').textContent = state.playerMarbles;
    
    // Update bet amount limits
    document.getElementById('betAmount').max = Math.min(state.playerMarbles, state.opponentMarbles);
}

function updateOpponentSpeech(message) {
    document.getElementById('opponentSay').textContent = message;
}

// Glass Bridge Game
function initGlassBridgeGame() {
    const state = gameStates.glassBridge;
    state.isRunning = true;
    state.currentStep = 0;
    state.totalSteps = 10;
    state.playerAlive = true;
    
    // Generate random bridge pattern (true = safe, false = break)
    state.bridgePattern = [];
    for (let i = 0; i < state.totalSteps; i++) {
        state.bridgePattern.push(Math.random() < 0.5 ? 'left' : 'right');
    }
    
    generateBridgePanels();
    updateGlassBridgeUI();
}

function generateBridgePanels() {
    const state = gameStates.glassBridge;
    const bridge = document.getElementById('bridge');
    bridge.innerHTML = '';
    
    for (let i = 0; i < state.totalSteps; i++) {
        const leftPanel = document.createElement('div');
        leftPanel.className = 'glass-panel';
        leftPanel.textContent = 'LEFT';
        leftPanel.onclick = () => chooseBridgePanel(i, 'left');
        
        const rightPanel = document.createElement('div');
        rightPanel.className = 'glass-panel';
        rightPanel.textContent = 'RIGHT';
        rightPanel.onclick = () => chooseBridgePanel(i, 'right');
        
        bridge.appendChild(leftPanel);
        bridge.appendChild(rightPanel);
    }
}

function chooseBridgePanel(step, side) {
    const state = gameStates.glassBridge;
    if (!state.isRunning || step !== state.currentStep) return;
    
    const panels = document.querySelectorAll('.glass-panel');
    const leftPanel = panels[step * 2];
    const rightPanel = panels[step * 2 + 1];
    
    if (side === state.bridgePattern[step]) {
        // Safe choice
        if (side === 'left') {
            leftPanel.classList.add('safe');
            rightPanel.classList.add('broken');
        } else {
            rightPanel.classList.add('safe');
            leftPanel.classList.add('broken');
        }
        
        state.currentStep++;
        
        if (state.currentStep >= state.totalSteps) {
            showWin();
            state.isRunning = false;
        }
    } else {
        // Wrong choice - game over
        if (side === 'left') {
            leftPanel.classList.add('broken');
        } else {
            rightPanel.classList.add('broken');
        }
        
        showGameOver("You chose the wrong glass! You fell through!");
        state.isRunning = false;
    }
    
    updateGlassBridgeUI();
}

function updateGlassBridgeUI() {
    const state = gameStates.glassBridge;
    
    document.getElementById('bridgeProgress').textContent = state.currentStep;
    
    // Update player position indicator
    const playerPos = state.currentStep === 0 ? '🏃‍♂️' : `🏃‍♂️ (Step ${state.currentStep})`;
    document.getElementById('playerPosition').textContent = playerPos;
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    showMenu();
    
    // Remove event listeners when leaving games
    window.addEventListener('beforeunload', function() {
        document.removeEventListener('keydown', handleRedLightKeydown);
    });
});

// Remove event listeners when switching games
function removeEventListeners() {
    document.removeEventListener('keydown', handleRedLightKeydown);
    document.removeEventListener('touchstart', handleRedLightTouch);
    document.removeEventListener('click', handleRedLightClick);
    
    const tugButton = document.getElementById('tugButton');
    if (tugButton) {
        tugButton.removeEventListener('click', pullRope);
    }
    
    const canvas = document.getElementById('cookieCanvas');
    if (canvas) {
        canvas.removeEventListener('mousedown', startDrawing);
        canvas.removeEventListener('mousemove', draw);
        canvas.removeEventListener('mouseup', stopDrawing);
        canvas.removeEventListener('mouseout', stopDrawing);
        canvas.removeEventListener('touchstart', startTouchDrawing);
        canvas.removeEventListener('touchmove', touchDraw);
        canvas.removeEventListener('touchend', stopDrawing);
    }
}