// 각 메뉴별 설명 데이터
const menuData = [
    {
        title: '결제 관리',
        description: '결제 관리 화면에서는 고객의 결제 처리, 결제 상태 확인, 결제 취소 등의 작업을 수행할 수 있습니다.',
        features: ['실시간 결제 처리', '결제 상태 모니터링', '결제 내역 조회', '오류 처리']
    },
    {
        title: '거래 내역',
        description: '모든 거래의 상세 기록을 조회하고 필터링할 수 있는 화면입니다. 날짜, 금액, 상태 등으로 검색이 가능합니다.',
        features: ['거래 목록 조회', '검색 및 필터링', '상세 정보 확인', '내보내기']
    },
    {
        title: '통계',
        description: '판매량, 매출액, 거래 건수 등의 통계 정보를 시각적으로 보여줍니다. 날짜 범위를 선택하여 원하는 기간의 통계를 확인할 수 있습니다.',
        features: ['매출 통계', '거래 건수 분석', '일일/월간/연간 비교', '차트 다운로드']
    },
    {
        title: '설정',
        description: '시스템 전체 설정을 관리하는 화면입니다. 결제 수수료, 환율, 알림 설정 등을 조정할 수 있습니다.',
        features: ['기본 정보 수정', '수수료 설정', '환율 설정', '알림 설정']
    },
    {
        title: '고객 지원',
        description: '고객 문의사항을 처리하고 지원하는 화면입니다. FAQ, 티켓 관리, 실시간 채팅 등이 가능합니다.',
        features: ['FAQ 관리', '고객 문의 처리', '실시간 채팅', '통계 조회']
    },
    {
        title: '상세',
        description: '상품의 상세 정보를 표시하는 화면입니다. 상품 이미지, 가격, 할인 정보, 옵션 선택, 구매 기능 등을 제공합니다.',
        features: ['상품 이미지 표시', '가격 및 할인 정보', '옵션 선택', '구매 기능']
    },
    {
        title: '상품 상세',
        description: '모바일 쇼핑 앱의 상품 상세 화면입니다. 한정 수량 안내, 가격/할인율, 포인트 적립, 구매 통계, 쿠폰 수령, 장바구니 및 즉시 구매 기능을 제공합니다.',
        features: ['한정 수량 재고 표시', '할인율 및 최종가 표시', '포인트 적립 안내', '구매수량 제한 안내', '구매 통계 (구매중 · 찜 · 별점)', '쿠폰 받기', '장바구니 담기 (배송비 절약)', '즉시 구매하기']
    }
];

// 메뉴 아이템 선택 함수
function selectItem(element, index) {
    // 모든 메뉴 아이템에서 active 클래스 제거
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });

    // 클릭된 아이템에 active 클래스 추가
    element.classList.add('active');

    // 모든 화면 숨기기
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // 선택된 화면 표시
    const selectedScreen = document.getElementById(`screen-${index}`);
    if (selectedScreen) {
        selectedScreen.style.display = 'block';
        selectedScreen.classList.add('active');
    }

    // 헤더 제목 업데이트
    document.querySelector('.content-header h1').textContent = menuData[index].title;

    // 우측 설명 업데이트
    updateDescription(index);

    // 기본 동작 방지
    return false;
}

// 우측 설명 업데이트 함수
function updateDescription(index) {
    const data = menuData[index];
    
    // 제목 업데이트
    document.getElementById('current-title').textContent = data.title;
    
    // 설명 업데이트
    document.getElementById('current-description').textContent = data.description;
    
    // 기능 목록 업데이트
    const featureList = document.getElementById('current-features');
    featureList.innerHTML = data.features
        .map(feature => `<li>${feature}</li>`)
        .join('');
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 첫 번째 메뉴 항목 선택
    const firstMenuItem = document.querySelector('.menu-item.active');
    if (firstMenuItem) {
        updateDescription(0);
    }
});
