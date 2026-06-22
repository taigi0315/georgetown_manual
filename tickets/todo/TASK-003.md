# TASK-003: 개인정보 마스킹 및 GitHub Pages 배포 설정

## 1. 개요
- 최씨 가족 매뉴얼(Choi Family Manual)을 공개(Public) GitHub 저장소에 보관하고 GitHub Pages를 통해 가족들과 공유하기로 결정했습니다.
- 이에 따라 공개된 인터넷 공간에 노출되어서는 안 되는 개인 식별 정보(아이들의 실명, 개인 집 주소 등)와 가족 전용 참조(Family Reference) 섹션을 삭제 또는 일반적인 칭호로 마스킹합니다.
- 개인정보 마스킹이 완료된 최종 버전을 GitHub에 업로드(Push)하고 GitHub Pages 배포 설정을 완료합니다.

## 2. 세부 작업 항목
- **개인 식별 실명 마스킹**:
  - `Harang` -> `Older Son`으로 교체.
  - `Haneul` -> `Younger Son`으로 교체.
  - 태그 영역(`<span class="tag">`) 및 카드 설명 문구, 프리뷰 영역에 존재하는 모든 실명 텍스트를 대상 일반 칭호로 일괄 교체.
- **개인 주소 마스킹**:
  - `219 Wildwood Dr, Georgetown, TX 78633` 등 구체적인 개인 주소 텍스트를 `Georgetown, TX 78633` 또는 `[Private Address]` 형태로 마스킹.
- **가족 전용 연락처/참조 섹션 제거**:
  - `Family Reference & Key Contacts`에 해당하는 `<details class="family-ref" id="family">` 요소를 완전히 삭제. (기기 정보, HOA 비용, 개인 메모 등 포함되어 있으므로 통째로 제거)
- **자동화 마스킹 스크립트 작성 및 실행**:
  - `BeautifulSoup`을 이용해 `index.html`을 파싱한 뒤 위 개인정보 정리를 누락 및 오염 없이 완전하고 안정적으로 일괄 적용.
- **GitHub 저장소 생성 및 푸시**:
  - 작업 폴더에 `git init`을 수행하고 로컬 파일들을 커밋한 후, GitHub 원격 저장소를 연결하여 푸시. (유저가 직접 할 수 있도록 CLI 명령 제안 및 가이드)
- **GitHub Pages 활성화**:
  - GitHub Pages 서비스 설정 및 가이드 제공.
- **문서 및 버전 갱신**:
  - `index.html` 및 `agent.html` 버전을 **v2.3**으로 갱신하고, `agent.html` 내 변경 로그 및 가이드(실명 가이드 등) 동기화.

## 3. 일정 및 상태
- 상태: 대기 중
- 담당자: Antigravity AI
