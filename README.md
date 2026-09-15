# GILL

AI를 활용해 사용자의 목표와 현재 상태에 맞는
개인화된 커리어 로드맵을 생성하고 관리하는 웹 애플리케이션입니다.

## Project Status

🚧 Level 2 — Personalized Roadmap

현재 사용자의 인증 및 상태를 기반으로
개인화된 로드맵을 생성하고 데이터베이스에 저장하는 기능을 개발하고 있습니다.

## Core Features

### Level 1
- 사용자 커리어 목표 입력
- OpenAI API를 활용한 커리어 로드맵 생성
- 생성된 로드맵 결과 표시

### Level 2
- 사용자 인증
- Supabase 기반 사용자 데이터 관리
- 사용자별 로드맵 데이터 저장
- Structured Output 기반 AI 로드맵 생성
- Zod를 활용한 AI 출력 검증
- 로드맵 진행 상태 관리

### Future
- Daily Task
- 학습 진행률 관리
- 사용자 피드백 기반 로드맵 개선
- 실제 사용자 테스트
- 배포 및 운영

## Tech Stack

- Next.js
- TypeScript
- React
- Supabase
- PostgreSQL
- OpenAI API
- Zod

## Architecture

```text
User
 ↓
Next.js
 ↓
OpenAI API
 ↓
Structured Output
 ↓
Zod Validation
 ↓
Supabase / PostgreSQL
 ↓
Personalized Roadmap
