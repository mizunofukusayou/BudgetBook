const formatter = new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
});

// Service Workerの登録
async function registUpdateSW() {
    if (!('serviceWorker' in navigator)) return;
    
    const reg = await navigator.serviceWorker.register('./sw.js');
    
    // 1. すでに待機中のSWがある場合（別のタブで更新済みなど）
    if (reg.waiting) {
        showUpdateConfirm(reg.waiting);
    }
    
    // 2. 新しいSWがインストールされ始めたら監視
    reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        newWorker.addEventListener('statechange', () => {
            // インストールが完了して「待機状態」になったタイミングで通知
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                showUpdateConfirm(newWorker);
            }
        });
    });
}

function showUpdateConfirm(worker) {
    if (confirm('新しいバージョンが利用可能です。更新しますか？')) {
        // Service Worker側に「待機をやめて起動しろ」とメッセージを送る
        worker.postMessage({ type: 'SKIP_WAITING' });
        
        // 切り替わったらページをリロードする
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            location.reload();
        });
    }
}

registUpdateSW();

const inputForm = document.querySelector('.input-form');
const itemNameInput = document.getElementById('item-name');
const itemPriceInput = document.getElementById('item-price');
const historyList = document.getElementById('history-list');
const totalAmountDisplay = document.getElementById('total-amount');

let records = JSON.parse(localStorage.getItem('kakeibo_data')) || [];

// 画面表示の更新
function updateUI() {
    historyList.innerHTML = '';
    let total = 0;

    records.forEach((record, index) => {
        const li = document.createElement('li');
        const displayDate = record.date || '';
        li.innerHTML = `<span>${displayDate}</span><span>${record.name}</span><span>¥${record.price.toLocaleString()}</span>`;
        historyList.prepend(li);
        total += record.price;
    });

    totalAmountDisplay.innerText = `¥${total.toLocaleString()}`;
}

// データの追加
inputForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = itemNameInput.value;
    const price = parseInt(itemPriceInput.value);

    if (name && price) {
        const date = formatter.format(new Date());
        records.push({date, name, price});
        localStorage.setItem('kakeibo_data', JSON.stringify(records));
        updateUI();
        
        // 入力欄を空にする
        itemNameInput.value = '';
        itemPriceInput.value = '';
    } else {
        alert('項目と金額を入力してください');
    }
});

const resetBtn = document.getElementById('reset-btn');
// 履歴削除
resetBtn.addEventListener('click', () => {
    if (confirm('履歴を削除しますか？')) {
        records = [];
        localStorage.removeItem('kakeibo_data');
        updateUI();
    }
});

// 初期表示
updateUI();