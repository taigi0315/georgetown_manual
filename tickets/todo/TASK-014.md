# TASK-014: 모바일 PWA / 오프라인 지원

## 1. 개요
- 실제 사용 환경은 외출 중 스마트폰입니다. 차량 이동 중 신호가 약한 곳에서도 매뉴얼을 열 수 있어야 합니다.
- "홈 화면에 추가"(PWA)와 오프라인 캐싱을 도입하여 앱처럼 설치·실행 가능하게 합니다.

## 2. 세부 작업 항목
- **웹 앱 매니페스트**:
  - `manifest.webmanifest` 추가: `name`, `short_name`(예: "Choi Manual"), `start_url`, `display: standalone`, 테마/배경 색(다크 테마 `--bg`), 아이콘(192/512 PNG + maskable).
  - `index.html` `<head>`에 manifest 링크 및 `theme-color` 메타 추가.
- **서비스 워커**:
  - `sw.js` 추가: 앱 셸(`index.html`, `agent.html`, 폰트, cards.json 도입 시 포함) 사전 캐시 + 이미지 stale-while-revalidate.
  - 등록 스크립트는 GitHub Pages 경로(서브패스) 고려한 `scope`/상대경로 처리.
- **오프라인 동작 확인**:
  - 네트워크 차단 상태에서 핵심 콘텐츠가 열리는지 검증. 외부 이미지 미수신 시 TASK-012 폴백과 연동.
- **설치 안내(선택)**:
  - iOS Safari "홈 화면에 추가" 안내 힌트(미설치 시 1회 노출).

## 3. 일정 및 상태
- 상태: 대기 중
- 우선순위: P3
- 담당자: Antigravity AI
- 비고: HTTPS 필요 — GitHub Pages는 기본 충족. TASK-013(cards.json) 이후 캐시 목록 확정이 깔끔.
