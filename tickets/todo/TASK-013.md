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
- 상태: ✅ 완료 (2026-06-23, v3.7) — `feature/cards-json-refactor` 브랜치
- 우선순위: P3 (대형 리팩터링, 위험도 높음 — 별도 브랜치/백업 필수)
- 담당자: Antigravity AI
- 비고: 이 작업 완료 후 TASK-009(지도 좌표), TASK-011(verified) 등 후속 기능 추가가 크게 쉬워짐.
- 구현 요약:
  - jsdom 추출기로 80개 카드 → `cards.json`(섹션 13개 중첩, 95KB). 필드: id?/featured?/star?/verified/image/imageAlt?/title/brief/tags[]/previewMeta?/meta[]/desc/links[].
  - `index.html`에 렌더러(`renderCard/renderSection/renderAll`) 인라인. `DOMContentLoaded` → `fetch('./cards.json')` → `renderAll()` → `initFeatures()`. 기존 13개 섹션 마크업(852–2474줄)을 `<main id="content">`로 교체.
  - **검증**: 렌더 출력 vs 원본 DOM **카드 80/80·섹션 13/13 1:1 일치**(정규화 비교, 링크 화살표·target 파생·star·preview 포함). 전체 통합 테스트(fetch→render→검색/태그/정렬/지도/배지) PASS, fetch 실패 graceful PASS, JS 에러 0.
  - 부수 수정: 원본 `class_="tag-row"` 오타 14개 → `class="tag-row"` 정상화.
  - `sw.js` SHELL에 `cards.json` 추가(오프라인), VERSION v3.7. `agent.html` SOP·엔트리템플릿을 cards.json 스키마로 전면 개정.
- ⚠️ 한계: `cards.json`은 http(s)로 서빙해야 함(`file://` 직접 열기 시 fetch 차단 → 안내 메시지). 지도 `CARD_COORDS`는 여전히 카드 위치(index) 기준 — 카드 추가/삭제 시 realign 필요(SOP 명시). **미검증**: 실제 브라우저 렌더 — 배포 후 육안 확인 필요.
