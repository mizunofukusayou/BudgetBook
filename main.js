// Service Workerの登録
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(() => console.log('Service Worker Registered'));
}

const addBtn = document.getElementById('add-btn');
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
        li.innerHTML = `<span>${record.name}</span><span>¥${record.price.toLocaleString()}</span>`;
        historyList.appendChild(li);
        total += record.price;
    });

    totalAmountDisplay.innerText = `¥${total.toLocaleString()}`;
}

// データの追加
addBtn.addEventListener('click', () => {
    const name = itemNameInput.value;
    const price = parseInt(itemPriceInput.value);

    if (name && price) {
        records.push({ name, price });
        localStorage.setItem('kakeibo_data', JSON.stringify(records));
        updateUI();
        
        // 入力欄を空にする
        itemNameInput.value = '';
        itemPriceInput.value = '';
    } else {
        alert('項目と金額を入力してください');
    }
});

// 初期表示
updateUI();