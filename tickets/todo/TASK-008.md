# TASK-008: 다중 태그 필터 (대상자별 보기) 추가

## 1. 개요
- 카드에는 이미 대상자 태그(`tag-haneul`/Younger Son, `tag-harang`/Older Son, `tag-family`, `tag-adult`, `tag-featured`/Top Pick, `tag-new`)가 부여되어 있으나, 이를 기준으로 필터링하는 기능이 없습니다.
- "오늘 8살이랑 뭐하지?" → Younger Son 태그만 보기처럼, 대상자/속성별로 카드를 추려 보는 토글 필터를 추가합니다.

## 2. 세부 작업 항목
- **태그 필터 UI**:
  - 카테고리 바 하단(또는 검색창 옆)에 토글 가능한 태그 칩(chip) 행 배치. 각 칩은 기존 태그 색상 체계(`tag-s-*`)를 재사용.
  - 칩: Younger Son · Older Son · Family · Adult · Top Pick · New.
  - 다중 선택 지원(여러 칩 동시 활성화). 활성 칩은 시각적으로 강조(채워진 배경).
- **필터 로직 (Vanilla JS)**:
  - 카드의 `.tag` 클래스를 읽어 선택된 태그 중 **하나라도** 포함하면 노출(OR 조건). 선택 없으면 전체 노출.
  - 매칭 카드가 0개인 섹션 헤더 숨김 처리.
- **검색·카테고리와의 결합**:
  - 최종 노출 = (카테고리 필터) AND (검색어) AND (태그 필터). 세 조건을 한 곳에서 평가하는 `applyFilters()` 함수로 통합 권장.
  - TASK-007과 동일한 필터 파이프라인을 공유하도록 구현.
- **상태 표시**:
  - 활성 필터가 하나라도 있으면 "Clear filters" 버튼 노출.

## 3. 일정 및 상태
- 상태: ✅ 완료 (2026-06-23, v3.0)
- 우선순위: P1
- 담당자: Antigravity AI
- 의존성: TASK-007과 동일 필터 파이프라인 공유 (함께 구현됨)
- 구현 요약: 6개 태그 칩(Younger Son/Older Son/Family/Adult/Top Pick/New) 다중 선택. 선택 태그 중 하나라도 가진 카드 노출(OR). 활성 칩은 해당 태그 색상으로 채워짐. `applyFilters()`에서 (카테고리 AND 검색 AND 태그)로 평가, "Clear filters" 버튼으로 전체 초기화.
