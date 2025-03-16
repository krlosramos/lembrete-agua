document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM - Gerais
    const waterAmountEl = document.getElementById('waterAmount');
    const targetAmountEl = document.getElementById('targetAmount');
    const progressBarEl = document.getElementById('progressBar');
    const addWaterBtn = document.getElementById('addWater');
    const editAmountBtn = document.getElementById('editAmount');
    const resetBtn = document.getElementById('resetBtn');
    const toggleReminderBtn = document.getElementById('toggleReminder');
    const reminderStatus = document.getElementById('reminderStatus');
    const reminderIndicator = document.getElementById('reminderIndicator');
    const reminderIntervalEl = document.getElementById('reminderInterval');
    const targetWaterEl = document.getElementById('targetWater');
    const soundOption = document.getElementById('soundOption');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeValue = document.getElementById('volumeValue');
    const testSoundBtn = document.getElementById('testSoundBtn');
    const saveSettingsBtn = document.getElementById('saveSettings');
    
    // Elementos de data e temperatura
    const currentDateEl = document.getElementById('currentDate');
    const currentTempEl = document.getElementById('currentTemp');
    
    // Elementos de abas
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Elementos de histórico
    const historyListEl = document.getElementById('historyList');
    const historyDateFilter = document.getElementById('historyDateFilter');
    const clearFiltersBtn = document.getElementById('clearFilters');
    const todayTotalEl = document.getElementById('todayTotal');
    const dailyAverageEl = document.getElementById('dailyAverage');
    
    // Modal elements
    const editModal = document.getElementById('editModal');
    const customAmountEl = document.getElementById('customAmount');
    const saveAmountBtn = document.getElementById('saveAmount');
    const cancelEditBtn = document.getElementById('cancelEdit');
    const closeModalBtn = document.getElementById('closeModal');
    
    // Elementos de áudio
    const dropSound = document.getElementById('dropSound');
    const bellSound = document.getElementById('bellSound');
    const chimeSound = document.getElementById('chimeSound');
    const tempoPerdidoSound = document.getElementById('tempoPerdidoSound');
    
    // Sons de lembrete (usando múltiplos formatos para maior compatibilidade)
    const sounds = {
        drop: 'data:audio/wav;base64,UklGRigBAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhHAEAAJDQ8P+w0CD/QHBw/9CgoP9wcHD/oFBQ/1BQUP+QMGD/YGBA/zAgIP9QUFD/UFAw/zAwMP9AQED/QEAg/yAgIP8wMDD/MDAg/yAgIP8gIBD/EBAg/zAgEP8QEBD/EBAQ/xAQEP8QEBD/EBAQ/xAQEP8QEBD/EBAQ/xAQEP8QEBD/EBAQ/0BQUP+wuMj/UGhw/xAgIP8QGBj/ECgo/3B4eP+wuLj/YHBw/zBAQP8wODj/MEBA/0BQUP9QaGj/cIiI/3CIiP9QaGj/IDg4/yA4OP8wSEj/QFhY/0BgYP9AYGj/gMDI/5DQ4P8=',
        bell: 'data:audio/wav;base64,UklGRiQEAABXQVZFZm10IBAAAAABAAEAESsAABErAAABAAgAZGF0YQAEAACBgIF/gn6Df4GBgYKDg4SDg4GBgH9+fX19fXx9fH18fX19fn5/f4CAgICAf35+fXx8e3t7e3t8e3x8fX5+f4CAgIGBgYGAgH9+fXx7enl4eHh3d3h5ent8fX9/gIGCg4SEhYWEg4KAfn17eXd1c3JxcHBvcHFydHZ4e32AgoWIi4yOj5CRkZCPjYqHg4B8d3RwbGhmY2FfXl5fYGJmam91eoCHjZOYnaGlp6qrrKyqqKSfmZONhoB5c2xnYl5aV1VUVFVWWF1iaG50e4SLkpienaCipKWmpqWjoZ6al5KOioWAe3ZwamVgXFlWVFNTVFVXW19jZ2xweHyBhIeJi42OkJGRkZCPjYuJh4WCgH17eHVzcXBvbm5vcHFydHV3eXt+gIKEhYeIiYqLi4uLioqJiIeGhYSCgX9+fHp5d3Z1dHNycXFxcXJzdHV2d3l6fH1+f4CBgoOEhYWGhoaHh4eGhoaFhYSEg4KBgIB/fn18e3p5eHd3dnZ2dnd3eHl6e3x9fn+AgYGCg4SEhYWFhoaGhoaGhoaGhYWFhISDgoKBgIB/fn59fHt6enl5eHh4eHh4eXl6ent8fH1+fn9/gICBgYGCgoODg4ODg4ODg4OCgoKCgYGBgIB/f35+fX18fHt7enp6enp6enp6ent7e3x8fX19fn5/f3+AgICAgICBgYGBgYGBgYGBgYGBgYCAgICAf39/f35+fn19fX18fHx8fHx8fHx8fHx8fH19fX1+fn5+fn9/f39/f39/f39/f4CAgICAgICAgICAgICAf39/f39/f39/f39+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn9/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn9/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/fw==',
        chime: 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAESsAABErAAABAAgAZGF0YQQAAAAAAAAA'
    };
    
    // Adicionar sons de backup usando oscilador (Web Audio API)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Variáveis de estado
    let currentWater = 0;
    let targetWaterAmount = 2000;
    let reminderId = null;
    let soundSetting = 'drop'; // Padrão: gota d'água
    let volumeLevel = 100; // Volume padrão: 100%
    let audioInitialized = false; // Flag para controlar se o áudio já foi inicializado
    let waterHistory = []; // Histórico de consumo de água
    let currentLocation = null; // Para armazenar a localização atual
    let currentTemperature = null; // Para armazenar a temperatura atual
    
    // Verificar se os elementos de áudio foram carregados
    const audioElements = {
        drop: dropSound,
        bell: bellSound,
        chime: chimeSound,
        tempoPerdido: tempoPerdidoSound
    };
    
    // Inicializar data e hora
    function updateDateTime() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        currentDateEl.textContent = now.toLocaleDateString('pt-BR', options);
        
        // Atualizar a cada minuto
        setTimeout(updateDateTime, 60000);
    }
    
    // Obter temperatura atual
    async function getTemperature() {
        try {
            // Primeiro, tentamos obter a localização atual
            if (!currentLocation) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        async (position) => {
                            const { latitude, longitude } = position.coords;
                            currentLocation = { latitude, longitude };
                            await fetchTemperature();
                        },
                        async (error) => {
                            console.error('Erro ao obter localização:', error);
                            // Usar IP para estimativa de localização
                            await fetchTemperatureByIP();
                        }
                    );
                } else {
                    await fetchTemperatureByIP();
                }
            } else {
                await fetchTemperature();
            }
        } catch (error) {
            console.error('Erro ao obter temperatura:', error);
            currentTempEl.textContent = 'Temperatura indisponível';
        }
        
        // Atualizar a cada 30 minutos
        setTimeout(getTemperature, 30 * 60 * 1000);
    }
    
    // Buscar temperatura com base nas coordenadas
    async function fetchTemperature() {
        try {
            if (!currentLocation) return;
            
            const { latitude, longitude } = currentLocation;
            
            // Tentar primeiro com OpenWeatherMap (tem limite de requisições na versão free)
            try {
                const apiKey = 'fd6c202adef6846dab3f25ba77867c3f'; // Chave gratuita para OpenWeatherMap
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
                
                const response = await fetch(url);
                const data = await response.json();
                
                if (data.main && data.main.temp) {
                    currentTemperature = data.main.temp;
                    currentTempEl.textContent = `${currentTemperature.toFixed(1)}°C`;
                    return; // Se deu certo, retorna e não tenta a próxima API
                }
            } catch (e) {
                console.log('Erro na primeira API de clima, tentando alternativa...');
            }
            
            // Alternativa: Usar API sem chave (weatherapi)
            try {
                const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=8cc9fc3616584a5991c201735232311&q=${latitude},${longitude}&aqi=no`;
                
                const weatherResponse = await fetch(weatherUrl);
                const weatherData = await weatherResponse.json();
                
                if (weatherData.current && weatherData.current.temp_c) {
                    currentTemperature = weatherData.current.temp_c;
                    currentTempEl.textContent = `${currentTemperature.toFixed(1)}°C`;
                    return;
                }
            } catch (e) {
                console.log('Erro na segunda API de clima, tentando última alternativa...');
            }
            
            // Última alternativa: usar API sem chave
            const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
            const openMeteoResponse = await fetch(openMeteoUrl);
            const openMeteoData = await openMeteoResponse.json();
            
            if (openMeteoData.current_weather && openMeteoData.current_weather.temperature) {
                currentTemperature = openMeteoData.current_weather.temperature;
                currentTempEl.textContent = `${currentTemperature.toFixed(1)}°C`;
            } else {
                throw new Error('Nenhuma API de clima funcionou');
            }
        } catch (error) {
            console.error('Erro ao buscar temperatura:', error);
            currentTempEl.textContent = 'Temperatura indisponível';
        }
    }
    
    // Buscar temperatura baseada no IP como fallback
    async function fetchTemperatureByIP() {
        try {
            // Obter localização aproximada pelo IP
            const ipResponse = await fetch('https://ipapi.co/json/');
            const ipData = await ipResponse.json();
            
            if (ipData.latitude && ipData.longitude) {
                currentLocation = {
                    latitude: ipData.latitude,
                    longitude: ipData.longitude
                };
                await fetchTemperature();
            }
        } catch (error) {
            console.error('Erro ao obter localização por IP:', error);
            currentTempEl.textContent = 'Temperatura indisponível';
        }
    }
    
    // Inicializar áudio no primeiro clique/toque do usuário na página
    document.body.addEventListener('click', initializeAudio, { once: true });
    document.body.addEventListener('touchstart', initializeAudio, { once: true });
    
    function initializeAudio() {
        if (audioInitialized) return;
        
        console.log('Inicializando áudio após interação do usuário');
        
        // Criar contexto de áudio em resposta à interação do usuário
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        window.audioContext = new AudioContext();
        
        // Tocar e pausar todos os sons com volume zero para "desbloqueá-los"
        for (const soundType in audioElements) {
            if (audioElements[soundType]) {
                const sound = audioElements[soundType];
                sound.volume = 0;
                
                // Tocar e pausar rapidamente
                const playPromise = sound.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        sound.pause();
                        sound.currentTime = 0;
                        sound.volume = volumeLevel / 100;
                    }).catch(err => {
                        console.log('Áudio ainda não está pronto:', err);
                    });
                }
            }
        }
        
        audioInitialized = true;
    }
    
    // Para dispositivos móveis, precisamos tocar e pausar os sons uma vez para "desbloqueá-los"
    function unlockAudio() {
        // Se o áudio já foi inicializado, retorne uma promessa resolvida
        if (audioInitialized) {
            return Promise.resolve();
        }
        
        // Tenta inicializar o áudio
        initializeAudio();
        
        // Retorna uma promessa que se resolve imediatamente
        return Promise.resolve();
    }
    
    // Controle de abas
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover classe active de todos os botões
            tabBtns.forEach(b => b.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            
            // Obter o ID da aba a ser mostrada
            const tabId = this.getAttribute('data-tab');
            
            // Esconder todas as abas
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Mostrar a aba selecionada
            document.getElementById(tabId).classList.add('active');
            
            // Se a aba de histórico foi selecionada, atualizar os dados
            if (tabId === 'history-tab') {
                renderHistoryList();
                updateHistoryStats();
            }
        });
    });
    
    // Controle de volume
    volumeSlider.addEventListener('input', function() {
        volumeLevel = this.value;
        volumeValue.textContent = `${volumeLevel}%`;
        
        // Aplicar configuração de volume a todos os elementos de áudio
        for (const sound in audioElements) {
            if (audioElements[sound]) {
                audioElements[sound].volume = volumeLevel / 100;
            }
        }
        
        // Salvar configuração no localStorage
        localStorage.setItem('volumeLevel', volumeLevel);
    });
    
    // Event listener para o botão de testar som
    testSoundBtn.addEventListener('click', function() {
        // Garante que o áudio está inicializado
        initializeAudio();
        
        const selectedSound = soundOption.value;
        if (selectedSound !== 'none') {
            playReminderSound(selectedSound);
        } else {
            alert('Você selecionou "Sem som". Nenhum som será reproduzido nos lembretes.');
        }
    });
    
    // Salvar configurações
    saveSettingsBtn.addEventListener('click', function() {
        const newTarget = parseInt(targetWaterEl.value);
        const newInterval = parseInt(reminderIntervalEl.value);
        const newSound = soundOption.value;
        
        if (!isNaN(newTarget) && newTarget >= 500) {
            targetWaterAmount = newTarget;
            targetAmountEl.textContent = targetWaterAmount;
            localStorage.setItem('targetWater', targetWaterAmount);
            updateWaterDisplay();
        }
        
        if (!isNaN(newInterval) && newInterval >= 5) {
            localStorage.setItem('reminderInterval', newInterval);
            
            // Se os lembretes estiverem ativos, reiniciá-los com o novo intervalo
            if (reminderId) {
                stopReminder();
                startReminder();
            }
        }
        
        soundSetting = newSound;
        localStorage.setItem('soundSetting', soundSetting);
        
        // Mostrar mensagem de confirmação com animação
        const container = document.querySelector('.settings');
        container.classList.add('settings-saved');
        
        setTimeout(() => {
            container.classList.remove('settings-saved');
        }, 1500);
    });
    
    // Filtrar histórico por data
    historyDateFilter.addEventListener('change', function() {
        renderHistoryList();
    });
    
    // Limpar filtros de histórico
    clearFiltersBtn.addEventListener('click', function() {
        historyDateFilter.value = '';
        renderHistoryList();
    });
    
    // Adicionar ao histórico
    function addToHistory(amount) {
        const now = new Date();
        const entry = {
            date: now.toISOString().split('T')[0], // Formato YYYY-MM-DD
            time: now.toLocaleTimeString('pt-BR'), // Formato HH:MM:SS
            amount: amount,
            temperature: currentTemperature
        };
        
        waterHistory.unshift(entry); // Adicionar ao início da lista
        
        // Salvar no localStorage
        saveHistoryToStorage();
        
        // Atualizar a lista se a aba de histórico estiver ativa
        if (document.getElementById('history-tab').classList.contains('active')) {
            renderHistoryList();
            updateHistoryStats();
        }
    }
    
    // Renderizar lista de histórico
    function renderHistoryList() {
        // Limpar a lista atual
        historyListEl.innerHTML = '';
        
        // Filtrar pelo valor do filtro de data
        let filteredHistory = [...waterHistory];
        if (historyDateFilter.value) {
            filteredHistory = waterHistory.filter(entry => entry.date === historyDateFilter.value);
        }
        
        // Se não houver histórico
        if (filteredHistory.length === 0) {
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = `<td colspan="4" style="text-align: center;">Nenhum registro encontrado</td>`;
            historyListEl.appendChild(emptyRow);
            return;
        }
        
        // Criar as linhas da tabela
        filteredHistory.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${formatDate(entry.date)}</td>
                <td>${entry.time}</td>
                <td>${entry.amount}ml</td>
                <td>${entry.temperature ? entry.temperature.toFixed(1) + '°C' : 'N/A'}</td>
            `;
            historyListEl.appendChild(row);
        });
    }
    
    // Formatar data para exibição
    function formatDate(dateString) {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    }
    
    // Atualizar estatísticas do histórico
    function updateHistoryStats() {
        // Calcular o total de hoje
        const today = new Date().toISOString().split('T')[0];
        const todayEntries = waterHistory.filter(entry => entry.date === today);
        const todayTotal = todayEntries.reduce((sum, entry) => sum + entry.amount, 0);
        
        // Calcular a média diária
        const uniqueDates = [...new Set(waterHistory.map(entry => entry.date))];
        let totalWater = waterHistory.reduce((sum, entry) => sum + entry.amount, 0);
        const averagePerDay = uniqueDates.length > 0 ? Math.round(totalWater / uniqueDates.length) : 0;
        
        // Atualizar os elementos
        todayTotalEl.textContent = `${todayTotal}ml`;
        dailyAverageEl.textContent = `${averagePerDay}ml`;
    }
    
    // Salvar histórico no localStorage
    function saveHistoryToStorage() {
        localStorage.setItem('waterHistory', JSON.stringify(waterHistory));
    }
    
    // Carregar histórico do localStorage
    function loadHistoryFromStorage() {
        const savedHistory = localStorage.getItem('waterHistory');
        if (savedHistory) {
            waterHistory = JSON.parse(savedHistory);
        }
    }
    
    // Carrega as configurações salvas
    function loadSettings() {
        const savedWater = localStorage.getItem('currentWater');
        const savedTarget = localStorage.getItem('targetWater');
        const savedInterval = localStorage.getItem('reminderInterval');
        const savedSound = localStorage.getItem('soundSetting');
        const savedVolume = localStorage.getItem('volumeLevel');
        
        if (savedWater !== null) {
            currentWater = parseInt(savedWater);
            updateWaterDisplay();
        }
        
        if (savedTarget !== null) {
            targetWaterAmount = parseInt(savedTarget);
            targetWaterEl.value = targetWaterAmount;
            targetAmountEl.textContent = targetWaterAmount;
        }
        
        if (savedInterval !== null) {
            reminderIntervalEl.value = parseInt(savedInterval);
        }
        
        if (savedSound !== null) {
            soundSetting = savedSound;
            soundOption.value = soundSetting;
        }
        
        if (savedVolume !== null) {
            volumeLevel = parseInt(savedVolume);
            volumeSlider.value = volumeLevel;
            volumeValue.textContent = `${volumeLevel}%`;
            
            // Aplicar volume salvo aos elementos de áudio
            for (const sound in audioElements) {
                if (audioElements[sound]) {
                    audioElements[sound].volume = volumeLevel / 100;
                }
            }
        }
    }
    
    // Atualiza a exibição de água consumida
    function updateWaterDisplay() {
        waterAmountEl.innerHTML = currentWater + '<span class="water-unit">ml</span>';
        
        // Atualizar a barra de progresso
        const percentage = Math.min(100, (currentWater / targetWaterAmount) * 100);
        progressBarEl.style.width = percentage + '%';
        
        // Adicionar efeito de brilho quando atingir 100%
        if (percentage >= 100) {
            progressBarEl.style.boxShadow = '0 0 15px var(--accent-color), 0 0 30px var(--accent-color)';
            waterAmountEl.style.color = 'var(--accent-color)';
        } else {
            progressBarEl.style.boxShadow = '0 0 10px var(--primary-color)';
            waterAmountEl.style.color = 'var(--primary-color)';
        }
        
        // Salvar no localStorage
        localStorage.setItem('currentWater', currentWater);
    }
    
    // Event Listeners
    addWaterBtn.addEventListener('click', function() {
        // Adicionar 250ml ao contador atual
        const amount = 250;
        currentWater += amount;
        updateWaterDisplay();
        
        // Adicionar ao histórico
        addToHistory(amount);
        
        // Adicionar animação ao botão
        this.classList.add('pulse');
        setTimeout(() => {
            this.classList.remove('pulse');
        }, 500);
        
        // Verificar se atingiu a meta
        checkGoalReached();
    });
    
    resetBtn.addEventListener('click', function() {
        if (confirm("Tem certeza que deseja zerar o contador de água? Isso não afetará o histórico.")) {
            currentWater = 0;
            updateWaterDisplay();
            
            // Animação para o botão
            this.classList.add('rotate');
            setTimeout(() => {
                this.classList.remove('rotate');
            }, 500);
        }
    });
    
    editAmountBtn.addEventListener('click', function() {
        customAmountEl.value = currentWater;
        editModal.style.display = 'flex';
        // Focar no input após abrir o modal
        setTimeout(() => {
            customAmountEl.focus();
            customAmountEl.select();
        }, 100);
    });
    
    saveAmountBtn.addEventListener('click', function() {
        const oldAmount = currentWater;
        const newAmount = parseInt(customAmountEl.value);
        
        if (!isNaN(newAmount) && newAmount >= 0) {
            // Se aumentou a quantidade, adicionar a diferença ao histórico
            if (newAmount > oldAmount) {
                const difference = newAmount - oldAmount;
                addToHistory(difference);
            }
            
            currentWater = newAmount;
            updateWaterDisplay();
            editModal.style.display = 'none';
            
            // Verificar se atingiu a meta
            checkGoalReached();
        }
    });
    
    cancelEditBtn.addEventListener('click', function() {
        editModal.style.display = 'none';
    });
    
    closeModalBtn.addEventListener('click', function() {
        editModal.style.display = 'none';
    });
    
    // Fechar o modal ao clicar fora dele
    window.addEventListener('click', function(event) {
        if (event.target === editModal) {
            editModal.style.display = 'none';
        }
    });
    
    // Permitir pressionar Enter para salvar no modal
    customAmountEl.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            saveAmountBtn.click();
        }
    });
    
    targetWaterEl.addEventListener('change', function() {
        // Nota: agora o processamento está no botão salvar
    });
    
    reminderIntervalEl.addEventListener('change', function() {
        // Nota: agora o processamento está no botão salvar
    });
    
    soundOption.addEventListener('change', function() {
        // Nota: agora o processamento está no botão salvar
    });
    
    toggleReminderBtn.addEventListener('click', function() {
        if (reminderId) {
            stopReminder();
        } else {
            requestNotificationPermission();
        }
    });
    
    // Função para verificar se a meta foi atingida
    function checkGoalReached() {
        if (currentWater >= targetWaterAmount) {
            playReminderSound(soundSetting);
            
            // Solicitar permissão para mostrar notificações, se necessário
            if (Notification.permission === 'granted') {
                const notification = new Notification('Meta de Hidratação Atingida! 🎉', {
                    body: `Parabéns! Você atingiu sua meta diária de ${targetWaterAmount}ml de água!`,
                    icon: 'https://cdn-icons-png.flaticon.com/512/3248/3248383.png'
                });
            }
            
            // Adicionar efeito de vitória à interface
            document.body.classList.add('goal-reached');
            setTimeout(() => {
                document.body.classList.remove('goal-reached');
            }, 3000);
        }
    }
    
    // Solicitar permissão para notificações
    function requestNotificationPermission() {
        if ('Notification' in window) {
            Notification.requestPermission()
                .then(permission => {
                    if (permission === 'granted') {
                        startReminder();
                    } else {
                        alert('Para receber lembretes, por favor permita as notificações.');
                    }
                });
        } else {
            alert('Seu navegador não suporta notificações.');
            startReminder(); // Ainda permitir lembretes mesmo sem notificações
        }
    }
    
    // Iniciar lembretes
    function startReminder() {
        const interval = parseInt(reminderIntervalEl.value);
        if (isNaN(interval) || interval < 1) return;
        
        // Converter para milissegundos
        const intervalMs = interval * 60 * 1000;
        
        reminderId = setInterval(() => {
            showReminder();
        }, intervalMs);
        
        reminderStatus.textContent = 'Lembretes ativados';
        reminderIndicator.classList.add('active');
        toggleReminderBtn.innerHTML = '<i class="fas fa-bell-slash"></i> Desativar Lembretes';
        
        // Mostrar imediatamente o primeiro lembrete
        showReminder();
    }
    
    // Parar lembretes
    function stopReminder() {
        clearInterval(reminderId);
        reminderId = null;
        reminderStatus.textContent = 'Lembretes desativados';
        reminderIndicator.classList.remove('active');
        toggleReminderBtn.innerHTML = '<i class="fas fa-bell"></i> Ativar Lembretes';
    }
    
    // Mostrar lembrete
    function showReminder() {
        // Tocar o som selecionado
        if (soundSetting !== 'none') {
            playReminderSound(soundSetting);
        }
        
        // Mostrar notificação se permitido
        if (Notification.permission === 'granted') {
            const notification = new Notification('Hora de se Hidratar! 💧', {
                body: 'Está na hora de beber água!',
                icon: 'https://cdn-icons-png.flaticon.com/512/3248/3248383.png'
            });
            
            // Fechar notificação automaticamente após 5 segundos
            setTimeout(() => {
                notification.close();
            }, 5000);
        }
        
        // Animação visual mesmo sem notificação
        const container = document.querySelector('.container');
        container.classList.add('reminder-flash');
        setTimeout(() => {
            container.classList.remove('reminder-flash');
        }, 1000);
    }
    
    // Função simplificada para reproduzir o som do lembrete
    function playReminderSound(soundType) {
        // Garante que o áudio está inicializado
        if (!audioInitialized) {
            initializeAudio();
        }
        
        const sound = audioElements[soundType];
        
        if (sound) {
            try {
                // Para Tempo Perdido, defina um ponto inicial aleatório para não tocar sempre do início
                if (soundType === 'tempoPerdido') {
                    // Verifica se a música foi carregada
                    if (sound.readyState >= 2 && sound.duration && !isNaN(sound.duration) && sound.duration > 30) {
                        // Escolhe um ponto aleatório nos primeiros 2 minutos da música
                        const maxStart = Math.min(120, sound.duration - 20);
                        sound.currentTime = Math.floor(Math.random() * maxStart);
                        
                        // Para músicas mais longas, tocar apenas por 20 segundos
                        setTimeout(() => {
                            // Diminuir o volume gradualmente antes de parar
                            const fadeInterval = setInterval(() => {
                                if (sound.volume > 0.1) {
                                    sound.volume = Math.max(0, sound.volume - 0.1);
                                } else {
                                    clearInterval(fadeInterval);
                                    sound.pause();
                                    sound.currentTime = 0;
                                    // Restaurar o volume para o nível original
                                    sound.volume = volumeLevel / 100;
                                }
                            }, 200);
                        }, 20000); // Toca por 20 segundos
                    } else {
                        sound.currentTime = 0;
                    }
                } else {
                    // Garantir que o som volte ao início antes de tocar
                    sound.currentTime = 0;
                }
                
                // Definir o volume apropriado
                sound.volume = volumeLevel / 100;
                
                // Tocar o som sem o Promise para evitar problemas em alguns navegadores
                sound.play();
                
                // Em caso de erro, tenta novamente após um pequeno delay
                sound.onerror = function() {
                    console.error('Erro ao tocar o som. Tentando novamente...');
                    setTimeout(() => {
                        sound.currentTime = 0;
                        sound.play();
                    }, 500);
                };
            } catch (error) {
                console.error('Erro ao reproduzir o som:', error);
                // Tenta uma abordagem diferente se falhar
                setTimeout(() => {
                    sound.currentTime = 0;
                    sound.play();
                }, 100);
            }
        }
    }
    
    // Adicionar classes CSS animadas ao documento
    function addAnimationStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            
            @keyframes rotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            @keyframes reminder-flash {
                0% { box-shadow: 0 0 0 0 rgba(0, 255, 163, 0.7); }
                50% { box-shadow: 0 0 30px 5px rgba(0, 255, 163, 0.7); }
                100% { box-shadow: 0 0 0 0 rgba(0, 255, 163, 0.7); }
            }
            
            @keyframes goal-reached {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            
            @keyframes settings-saved {
                0% { box-shadow: 0 0 0 0 rgba(0, 255, 163, 0.7); }
                50% { box-shadow: 0 0 30px 5px rgba(0, 255, 163, 0.7); }
                100% { box-shadow: 0 0 0 0 rgba(0, 255, 163, 0.7); }
            }
            
            .pulse {
                animation: pulse 0.5s ease;
            }
            
            .rotate {
                animation: rotate 0.5s ease;
            }
            
            .reminder-flash {
                animation: reminder-flash 1s ease;
            }
            
            .goal-reached {
                background: linear-gradient(270deg, #00C8FF, #6A11CB, #00FFA3);
                background-size: 600% 600%;
                animation: goal-reached 3s ease infinite;
            }
            
            .settings-saved {
                animation: settings-saved 1.5s ease;
            }
        `;
        document.head.appendChild(styleElement);
    }
    
    // Inicialização
    function init() {
        loadSettings();
        loadHistoryFromStorage();
        updateWaterDisplay();
        updateDateTime();
        getTemperature();
        addAnimationStyles();
        
        // Atualizar estatísticas do histórico
        updateHistoryStats();
        
        // Verificar se havia lembretes ativos anteriormente
        const reminderWasActive = localStorage.getItem('reminderActive') === 'true';
        if (reminderWasActive) {
            requestNotificationPermission();
        }
    }
    
    // Iniciar aplicação
    init();
    
    // Salvar estado dos lembretes
    window.addEventListener('beforeunload', function() {
        localStorage.setItem('reminderActive', reminderId !== null);
    });
}); 