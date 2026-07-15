# Contributing

## Development

```bash
npm install
cp .env.local.example .env.local
docker compose up redis -d
npm run dev
npm run worker   # separate terminal
```

## Code Quality

```bash
npm run typecheck
npm run lint
npm run format
npm run test
```

## Commit Hooks

Husky runs lint-staged on every commit:
- ESLint + Prettier on `.ts`/`.tsx`
- Prettier on `.json`/`.md`

## Making Changes

1. Create a feature branch
2. Make your changes
3. Ensure all checks pass
4. Open a pull request
