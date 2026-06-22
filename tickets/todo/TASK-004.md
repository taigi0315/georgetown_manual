# TASK-004: 카드 상세 이미지 시스템 도입 및 에이전트 문서 갱신

## 1. 개요
- 최씨 가족 매뉴얼(Choi Family Manual)의 각 카드 상세 영역에 시각적 직관성과 premium 디자인 감성을 부여하기 위해 대표 이미지(Hero Image)를 추가합니다.
- 공식 웹사이트 또는 Google Maps Place Search 등을 통해 카드의 실제 장소를 나타내는 대표 이미지 URL을 확보하여 카드 바디 상단에 적용합니다.
- 이와 함께 AI 에이전트가 새로운 장소 카드를 생성하거나 업데이트할 때 이미지 리소스를 찾고 삽입하는 상세 규칙(Protocol)을 `agent.html`에 명시합니다.

## 2. 세부 작업 항목
- **카드 이미지 레이아웃 및 CSS 설계**:
  - 카드 확장 시 가로폭에 맞춰 깔끔하게 정렬되는 Hero Image 스타일(`.card-hero-img`) 추가.
  - `aspect-ratio`를 지정하고 `object-fit: cover`를 사용하여 다양한 이미지 크기에서도 레이아웃이 깨지지 않도록 방어 코드 설계.
  - 이미지가 없거나 로딩 실패 시 표시할 깔끔한 Placeholder(예: Unsplash 카테고리별 정적 일러스트/사진) 연동 규칙 정의.
- **카드 대표 이미지 수집 및 일괄 적용**:
  - 주요 학교, 스포츠 시설(Ninja Nation, GSA 축구장 등), 레스토랑, 주말 여행지, 공원(Garey Park, San Gabriel Park 등) 카드에 적합한 대표 이미지 URL을 검색하여 수집.
  - 변환 스크립트 또는 마크업 수정을 통해 각 카드의 `<div class="card-body">` 시작 직후에 `<img class="card-hero-img" src="..." alt="...">` 추가.
- **AI Agent 안내 문서(agent.html) 가이드라인 보강**:
  - `agent.html` 내부의 `Entry Template` 코드 블록에 `<img class="card-hero-img">` 템플릿 추가.
  - `Standard Operating Procedure`에 이미지 수집 절차 추가:
    1. 공식 웹사이트 또는 Google Maps Place Photo URL 추출 방법.
    2. 저작권에 무관한 Unsplash 또는 대표 키워드 기반 정적 이미지 매핑 가이드.
- **버전 및 변경 로그 업데이트**:
  - 버전을 **v2.4**로 갱신 및 배포.

## 3. 일정 및 상태
- 상태: 대기 중
- 담당자: Antigravity AI
