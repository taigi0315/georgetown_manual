# TASK-001: 매뉴얼 카테고리 필터 탑바 추가, URL 검증 및 링크 보완

## 1. 개요
- 최씨 가족 매뉴얼(Choi Family Manual) 메인 페이지(`index.html`)에 카테고리별로 카드를 필터링할 수 있는 상단 고정(sticky) 카테고리 바를 추가합니다.
- 사용자가 보고한 잘못된 URL(Boys & Girls Club 등)을 수정하고, kidsActing Studio의 다중 위치 정보를 반영합니다.
- 링크가 없거나 비어있는 모든 카드에 공식 웹사이트 또는 Google 지도 검색 링크를 추가하여 사용 편의성을 극대화합니다.
- 전체 URL을 검증하고 비정상적인 링크를 올바르게 수정합니다.

## 2. 세부 작업 항목
- **상단 카테고리 필터 바 추가**:
  - 카테고리 정의: 전체(All), 학교 & 돌봄(School & Care), 스포츠 & 활동(Sports & Activities), 레스토랑(Restaurants), 공원 & 지역 정보(Parks & Local), 서비스 & 커뮤니티(Services & Community), 여행 & 축제(Trips & Events).
  - 스타일링: Apple 스타일의 유리 모피즘(glassmorphism) 효과가 적용된 가로 스크롤 가능 sticky 탑바 구현.
  - 필터링 로직: CSS와 간단한 JavaScript를 이용해 선택한 카테고리의 `<section>`만 부드러운 애니메이션과 함께 노출.
- **URL 검증 및 수정**:
  - Boys & Girls Club: 기존 `https://bgcct.org/` -> `https://bgctx.org/`로 수정.
  - kidsActing Studio: Round Rock, Cedar Park, Pflugerville 등 다중 위치 정보 텍스트 반영 및 `https://www.kidsactingstudio.com/locations` 링크 업데이트.
  - Ninja Nation Austin: `https://ninjanation.com/austin`으로 수정.
  - School of Rock RR: `https://www.schoolofrock.com/locations/roundrock`으로 수정.
  - Escapology RR: `https://www.escapology.com/en/austin-tx`로 수정 (Round Rock 지점의 실제 위치 페이지).
  - Georgetown Library: `https://georgetowntexas.gov/library/`로 수정.
- **구글 지도 링크 및 공식 사이트 링크 보강**:
  - 링크가 없는 40여 개 카드 전체에 공식 웹사이트가 있는 경우 공식 사이트 링크를, 없는 경우 Google Maps 검색 API 링크(`https://www.google.com/maps/search/?api=1&query=...`)를 추가.
  - 레스토랑 중 El Monumento가 영구 폐업하고 Encantada Cocina + Cantina로 변경된 최신 정보를 반영.
- **AI Agent 안내 페이지 업데이트**:
  - `agent.html` 내 변경 로그(Changelog)에 v2.1 반영.

## 3. 일정 및 상태
- 상태: 대기 중
- 담당자: Antigravity AI
