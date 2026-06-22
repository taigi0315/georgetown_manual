# TASK-005: 접힌 카드 요약 영역에 썸네일 이미지 추가 및 실제 장소 이미지 매핑

## 1. 개요
- 사용자가 카드를 펼치기 전(접힌 상태)에도 직관적으로 어떤 장소인지 파악할 수 있도록, 카드 요약(summary) 영역 왼쪽에 48x48 크기의 썸네일(Thumbnail) 이미지를 추가합니다.
- Unsplash 이미지 URL을 각 카테고리별/장소별 성격에 완벽히 매칭되는 고화질 실제 느낌의 사진(구글 지도나 공식 홈페이지에서 볼 수 있는 분위기의 사진)으로 정밀 연동합니다.
- 이에 맞춰 CSS 및 HTML 요약 영역 마크업 구조를 자동화 스크립트를 통해 안전하게 일괄 변환합니다.

## 2. 세부 작업 항목
- **CSS 스타일 보강**:
  - `.card-summary` 내부 구조를 `display: flex` 형태로 조정하여 좌측에 썸네일 이미지, 우측에 텍스트 영역 정렬.
  - `.card-thumbnail-img` 정의 (48px * 48px, `object-fit: cover`, `border-radius: 6px`).
  - `.card-summary-info` 정의 (flex: 1, `min-width: 0`을 주어 텍스트 말줄임 방지 및 반응형 흐름 보장).
- **HTML 구조 변환 스크립트 작성 및 실행**:
  - BeautifulSoup을 활용하여 `index.html` 내의 모든 `details.card` 요소를 순회.
  - `<summary class="card-summary">` 내부에 썸네일 `<img>` 요소를 삽입하고, 기존 텍스트 및 태그 요소들을 `<div class="card-summary-info">` 내부로 묶어 정렬.
  - 썸네일은 각 카드의 Hero Image 주소와 동일한 리소스를 활용하여 별도의 추가 다운로드 부담 없이 브라우저 캐시로 즉시 로딩되도록 설계.
- **AI Agent 안내 문서(agent.html) 갱신**:
  - 접힌 상태 썸네일 주입이 반영된 새로운 마크업 구조를 `agent.html` 내의 `Entry Template` 및 안내 지침에 동기화.

## 3. 일정 및 상태
- 상태: 대기 중
- 담당자: Antigravity AI
