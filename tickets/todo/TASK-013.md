# TASK-013: 데이터/뷰 분리 (cards.json)

## 1. 개요
- 현재 약 160KB의 단일 `index.html`에 80개 카드 데이터가 마크업과 함께 하드코딩되어 있습니다.
- 에이전트가 카드를 추가/수정할 때마다 거대한 HTML을 직접 편집해 레이아웃이 깨질 위험이 큽니다(실제로 v2.x 핫픽스 다수가 이로 인함).
- 카드 데이터를 `cards.json`으로 분리하고 JS가 렌더링하도록 전환하여, 에이전트는 JSON 항목만 추가하면 되도록 유지보수 난이도를 대폭 낮춥니다.

## 2. 세부 작업 항목
- **데이터 스키마 정의 (`cards.json`)**:
  - 카드당 필드: `id`, `category`, `title`, `brief`, `tags[]`, `featured`(bool), `address`, `drive_min`, `cost`, `desc`, `links[]`(label+url), `thumbnail`, `hero`, `verified`(YYYY-MM), 선택 `lat`/`lng`.
- **마이그레이션 스크립트**:
  - 기존 `index.html`의 `<details>` 카드를 파싱해 `cards.json`으로 1회 추출하는 스크립트 작성(수작업 80개 방지). 추출 후 원본과 1:1 대조 검증.
- **렌더러 (JS)**:
  - `cards.json`을 fetch해 섹션/카드 DOM을 생성하는 렌더 함수. 기존 카드 템플릿(`agent.html` 엔트리 템플릿)과 동일한 마크업 산출.
  - 기존 검색/카테고리/태그 필터(TASK-007/008)와 호환되도록 렌더 후 필터 파이프라인 초기화.
- **호환성/안전장치**:
  - GitHub Pages는 정적 호스팅이므로 `fetch('./cards.json')` 가능(file:// 직접 열기 시 CORS 주의 — 문서화).
  - 작업 전 `index.html` 전체 백업, 렌더 결과를 기존 화면과 시각 비교(QA).
- **에이전트 SOP 전면 개정**:
  - `agent.html`의 "Entry Template" 및 업데이트 절차를 "HTML 편집"에서 "`cards.json`에 객체 추가"로 교체.

## 3. 일정 및 상태
- 상태: 대기 중
- 우선순위: P3 (대형 리팩터링, 위험도 높음 — 별도 브랜치/백업 필수)
- 담당자: Antigravity AI
- 비고: 이 작업 완료 후 TASK-009(지도 좌표), TASK-011(verified) 등 후속 기능 추가가 크게 쉬워짐.
