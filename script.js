// 각 메뉴별 설명 데이터
const menuData = [
    {
        title: '결정사항',
        sections: []
    },
    {
        title: '상품 상세',
        sections: [
            {
                title: '동작 방식',
                items: [
                    '버튼 영역은 장바구니 / 간편결제 / 바로구매 3개로 구성된다',
                    '간편결제 버튼은 어드민 설정값에 따라 노출 여부가 결정된다',
                    '사용안함 설정 시 간편결제 버튼은 노출되지 않는다',
                    'SDK 로드 실패 시 해당 버튼은 노출되지 않는다'
                ]
            },
            {
                title: '버튼 구성',
                items: [
                    '장바구니: 항상 노출',
                    '간편결제: 어드민 설정에 따라 노출 (네이버페이 / 카카오페이 / 토스페이 중 1개)',
                    '바로구매: 항상 노출'
                ]
            }
        ]
    },
    {
        title: '결제/무통장 설정',
        sections: [
            {
                title: '동작 방식',
                items: [
                    '간편결제 버튼은 네이버페이 / 카카오페이 / 토스페이 중 1개만 선택 가능하다 (단일 선택)',
                    '사용안함 선택 시 간편결제 버튼은 노출되지 않는다',
                    '하단 미리보기 영역에서 선택한 버튼이 실시간으로 반영되어 보여진다',
                    '변경사항 적용 버튼 클릭 시 프론트에 반영된다'
                ]
            },
            {
                title: '비활성 조건',
                items: [
                    'PG 서비스 신청이 완료되지 않은 페이사는 선택 불가(disabled) 처리된다'
                ]
            }
        ]
    }
];

// 메뉴 아이템 선택 함수
function selectItem(element, index) {
    // 바텀시트가 열려 있으면 닫기
    closeBuySheet();

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

    const extra = document.getElementById('extra-sections');
    if (data.sections && data.sections.length > 0) {
        extra.innerHTML = data.sections.map(sec => `
            <div class="description-section">
                <h4>${sec.title}</h4>
                <ul>${sec.items.map(item => `<li>${item}</li>`).join('')}</ul>
            </div>
        `).join('');
    } else {
        extra.innerHTML = '';
    }
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
