// 각 메뉴별 설명 데이터
const menuData = [
    {
        title: '결정사항',
        description: '개발 진행 전 확정이 필요한 결정사항 목록입니다.',
        features: []
    },
    {
        title: '상품 상세',
        description: '모바일 쇼핑 앱의 상품 상세 화면입니다.',
        features: []
    },
    {
        title: '결제/무통장 설정',
        description: '쇼핑몰 관리자 페이지의 결제수단 설정 화면입니다.',
        features: []
    }
];

// 메뉴 아이템 선택 함수
function selectItem(element, index) {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });

    element.classList.add('active');

    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
        screen.style.display = 'none';
    });

    const selectedScreen = document.getElementById(`screen-${index}`);
    if (selectedScreen) {
        selectedScreen.style.display = 'block';
        selectedScreen.classList.add('active');
    }

    document.querySelector('.content-header h1').textContent = menuData[index].title;
    updateDescription(index);

    return false;
}

// 우측 설명 업데이트 함수
function updateDescription(index) {
    const data = menuData[index];

    document.getElementById('current-title').textContent = data.title;
    document.getElementById('current-description').textContent = data.description;

    const featureList = document.getElementById('current-features');
    featureList.innerHTML = data.features
        .map(feature => `<li>${feature}</li>`)
        .join('');
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    updateDescription(0);
});

// ===== 구매 바텀시트 =====
const UNIT_PRICE = 10000;
const SHIPPING   = 3000;
let bsheetQty = 1;

function openBuySheet() {
    bsheetQty = 1;
    renderBuySheet();

    // pdv-page 위치에 오버레이를 맞춤
    const page    = document.querySelector('.pdv-page');
    const overlay = document.getElementById('bsheetOverlay');
    if (page) {
        const rect = page.getBoundingClientRect();
        overlay.style.left  = rect.left + 'px';
        overlay.style.width = rect.width + 'px';
    }

    overlay.classList.add('active');
}

function closeBuySheet() {
    document.getElementById('bsheetOverlay').classList.remove('active');
}

function handleOverlayClick(e) {
    if (e.target === document.getElementById('bsheetOverlay')) closeBuySheet();
}

function changeQty(delta) {
    bsheetQty = Math.max(1, Math.min(10, bsheetQty + delta));
    renderBuySheet();
}

function renderBuySheet() {
    const itemTotal = UNIT_PRICE * bsheetQty;
    const total     = itemTotal + SHIPPING;
    const fmt = n => n.toLocaleString('ko-KR') + '원';
    document.getElementById('bsheetQty').textContent       = bsheetQty;
    document.getElementById('bsheetItemPrice').textContent = fmt(itemTotal);
    document.getElementById('bsheetSummaryText').textContent =
        '상품금액 ' + fmt(itemTotal) + ' + 배송비 ' + fmt(SHIPPING);
    document.getElementById('bsheetTotal').textContent     = fmt(total);
}
