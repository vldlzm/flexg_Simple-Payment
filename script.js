// 각 메뉴별 설명 데이터
const menuData = [
    {
        title: '상품 상세',
        description: '모바일 쇼핑 앱의 상품 상세 화면입니다. 한정 수량 안내, 가격/할인율, 포인트 적립, 구매 통계, 쿠폰 수령, 장바구니 및 즉시 구매 기능을 제공합니다.',
        features: ['한정 수량 재고 표시', '할인율 및 최종가 표시', '포인트 적립 안내', '구매수량 제한 안내', '구매 통계 (구매중 · 찜 · 별점)', '쿠폰 받기', '장바구니 담기 (배송비 절약)', '즉시 구매하기']
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
