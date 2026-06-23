# TASK-012: 이미지 로드 실패 폴백(Fallback) 처리

## 1. 개요
- 외부 이미지(URL 엔티티 깨짐, 404 등)가 실패하면 화면에 깨진 이미지 아이콘이 그대로 노출됩니다(v2.6~v2.8 반복 이슈).
- 이미지 로드 실패 시 카테고리별 placeholder로 자동 대체하여, 깨진 이미지가 사용자에게 보이지 않도록 합니다.

## 2. 세부 작업 항목
- **폴백 메커니즘**:
  - 썸네일(`.card-thumbnail-img`)과 히어로(`.card-hero-img`)에 `onerror` 핸들러 연결.
  - 실패 시 카테고리에 맞는 정적 placeholder(Unsplash 카테고리 일러스트 또는 로컬 SVG)로 `src` 교체. 무한 루프 방지를 위해 한 번 교체 후 `onerror` 제거.
  - 전역 핸들러(`addEventListener('error', …, true)`) 또는 이미지별 인라인 핸들러 중 유지보수 쉬운 방식 선택.
- **카테고리 매핑**:
  - 카드가 속한 `<section data-category>` 기준으로 placeholder 선택(예: 음식/공원/스포츠/학교 등).
- **디자인**:
  - placeholder는 카드 톤(다크 테마, `--accent`)과 어울리는 미니멀한 이미지/그라데이션.
- **에이전트 SOP 반영**:
  - `agent.html` 이미지 프로토콜에 "폴백이 있으므로 깨진 URL이라도 레이아웃은 안전하나, 정상 URL 검증은 여전히 필수" 명시.

## 3. 일정 및 상태
- 상태: ✅ 완료 (2026-06-23, v3.1)
- 우선순위: P2 (구현 비용 매우 낮음 — 빠른 효과)
- 담당자: Antigravity AI
- 구현 요약: `<head>`에 캡처 단계 `error` 핸들러 등록(파싱 중 실패 이미지도 포착). 실패한 `.card-thumbnail-img`/`.card-hero-img`를 카테고리별 색상·라벨이 들어간 **인라인 data-URI SVG**로 교체 → 네트워크 요청이 없어 폴백 자체가 404날 수 없음. `dataset.phApplied` 가드로 onerror 무한루프 방지. jsdom으로 카테고리 매핑·루프가드·정상이미지 미변경 검증 완료. `agent.html` 이미지 프로토콜 및 체인지로그 반영.
