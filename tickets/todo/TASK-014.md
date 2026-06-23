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
- 상태: ✅ 완료 (2026-06-23, v3.5)
- 우선순위: P3
- 담당자: Antigravity AI
- 비고: HTTPS 필요 — GitHub Pages는 기본 충족. TASK-013(cards.json) 이후 캐시 목록 확정이 깔끔.
- 구현 요약: `manifest.webmanifest`(name/short_name/standalone/테마색/아이콘) + Pillow로 생성한 아이콘 4종(192·512·maskable_512·apple_touch 180, 액센트 블루 위치핀). `sw.js` 서비스워커 — **HTML은 network-first**(온라인 최신/오프라인 캐시 폴백), 동일출처 자산은 cache-first+백그라운드 갱신, 폰트는 stale-while-revalidate, activate 시 구버전 캐시 정리. `index.html` head에 manifest/theme-color/apple 메타, load 시 SW 등록(실패는 무시 → 미지원 시 기존과 동일). agent.html에도 PWA 메타 추가. SOP "Update the masthead" 단계에 sw.js VERSION 갱신 규칙 추가.
- 검증: manifest JSON·sw.js 문법·아이콘/참조 존재·jsdom 스모크(에러 0, 메타 존재, 기존 기능 유지) 통과. **미검증**: 실제 설치/오프라인 동작 — 샌드박스에 HTTPS 브라우저가 없어 못 함. GitHub Pages 배포 후 모바일에서 "홈 화면에 추가" + 비행기모드 확인 필요.
