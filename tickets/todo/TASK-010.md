# TASK-010: 링크·이미지 자동 검증 (GitHub Action)

## 1. 개요
- git 로그 기준 v2.6~v2.8 릴리스가 전부 깨진 이미지/URL 핫픽스이며, 수동으로 대응 중입니다.
- 죽은 링크와 404 이미지를 자동으로 탐지해 이슈로 보고하는 CI를 도입하여, 반복되는 핫픽스 릴리스를 근본적으로 줄입니다.

## 2. 세부 작업 항목
- **링크 체커 워크플로**:
  - `.github/workflows/link-check.yml` 추가. 트리거: 주 1회 스케줄(cron) + `index.html`/`agent.html` 변경 PR.
  - `lycheeverse/lychee-action` 등으로 `index.html`, `agent.html` 내 모든 `href`/`src` URL 검사.
  - 외부 일시 오류로 인한 오탐 방지를 위해 재시도/타임아웃 설정, 알려진 봇 차단 도메인은 예외 처리.
- **결과 리포팅**:
  - 깨진 링크 발견 시 워크플로 실패 + 자동 이슈 생성(`lychee` 출력 첨부) 또는 PR 코멘트.
- **에이전트 SOP 반영**:
  - `agent.html` SOP의 "Verify the information" 단계에, 신규/수정 링크는 머지 전 link-check 통과를 전제로 한다는 규칙 추가.

## 3. 일정 및 상태
- 상태: ✅ 완료 (2026-06-23, v3.3)
- 우선순위: P2
- 담당자: Antigravity AI
- 비고: GitHub Pages 공개 저장소이므로 Actions 무료 사용 범위 내.
- 구현 요약: `.github/workflows/link-check.yml` 추가(lycheeverse/lychee-action). 트리거: 매주 월요일 cron + index/agent/images 변경 push·PR + 수동 dispatch. 모든 외부 href와 로컬 `images/…` src 검사, 깨지면 `peter-evans/create-issue-from-file`로 이슈 자동 생성(fail: false로 잡 실패 대신 이슈). `.lycheeignore`로 봇 차단 도메인(소셜, Google Maps 딥링크) 오탐 제외. YAML 유효성 검증 완료. 로컬 시뮬레이션: 80개 로컬 이미지 전부 존재(missing 0), 외부 URL 124개가 검사 대상. SOP "Verify the information" 단계에 link-check 통과 전제 명시.
