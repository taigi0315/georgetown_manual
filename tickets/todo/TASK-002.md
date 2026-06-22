# TASK-002: 카드 메타데이터 일관성 개선 및 아이콘 시스템 도입

## 1. 개요
- 최씨 가족 매뉴얼(Choi Family Manual) 메인 페이지(`index.html`) 내 80여 개 카드의 상세 영역에 위치한 메타데이터(시간, 이동 시간, 비용, 주소 등)의 레이아웃을 다듬고 가독성을 개선합니다.
- 복잡하고 일관성 없는 메타데이터의 단순 텍스트 표기 방식을 세련된 아이콘 기반의 통일된 템플릿 구조로 변환합니다.
- Apple 스타일의 미니멀 디자인 규격에 맞춰 아이콘 정렬, 글꼴 두께, 마진 및 간격을 세밀하게 조정합니다.

## 2. 세부 작업 항목
- **아이콘 시스템 설계 및 구축**:
  - `index.html` 상단에 SVG Symbol definitions `<svg style="display: none;">` 추가.
  - 다음 아이콘 정의:
    - 📍 위치/주소 (`#icon-location`): Address, Location, Fields, Locations, Where
    - 🚗 이동시간 (`#icon-drive`): Drive
    - 🕒 일정/시간 (`#icon-time`): Hours, When, Season, Seasons, Schedule
    - 💵 비용/가격 (`#icon-cost`): Cost, Tuition, Price
    - 🎓 교육/대상 학년 (`#icon-education`): Grades
    - 👤 대상 연령/인원 (`#icon-target`): Ages, Target
    - 📞 전화번호 (`#icon-phone`): Phone
    - ℹ️ 상세 정보/기타 (`#icon-info`): Format, Games, Options, Coach, Instructor, Instruments, Programs, Since, Vibe
- **카드 메타데이터 일괄 구조 변환**:
  - 기존 `<div class="card-meta">` 내 `<div class="meta-label">` 구조를 아래와 같이 아이콘 레벨로 통일:
    ```html
    <div class="card-meta">
      <div class="meta-item">
        <svg class="meta-icon"><use href="#icon-location"></use></svg>
        <span class="meta-text">210 Woodlake Dr, Georgetown, TX 78633</span>
      </div>
      ...
    </div>
    ```
  - 파이썬 자동 변환 스크립트(`update_metadata.py`)를 개발하여 80여 개 카드에 실수가 없도록 일괄 적용.
- **CSS 스타일 보강**:
  - `.card-meta` grid 구조 조정 (데스크톱 및 모바일 반응형 최적화).
  - SVG 아이콘(`.meta-icon`) 및 텍스트 정렬을 위한 Flexbox 스타일링 적용.
  - 마이크로 인터랙션 및 가독성 제고를 위해 폰트 굵기(Weight)와 투명도 조절.
- **AI Agent 안내 페이지 업데이트**:
  - `agent.html` 내 변경 로그(Changelog)에 v2.2 반영.

## 3. 일정 및 상태
- 상태: 대기 중
- 담당자: Antigravity AI
