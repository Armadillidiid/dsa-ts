Data Structures and Algorithms implemented in TypeScript with a built-in practice system.

## Quick Start

### Installation

```bash
pnpm install
```

### Practice Mode

The practice system allows you to practice implementing DSAs without manually removing code.

1. **Start Practicing**: Practice files are already empty shells with TODO comments
2. **Run Tests**: `pnpm test` to see which methods need implementation
3. **Implement**: Fill in the methods in `*.practice.ts` files
4. **Reset**: When done, run `pnpm reset-practice` to start over

## Available Commands

| Command                 | Description                              |
| ----------------------- | ---------------------------------------- |
| `pnpm test`             | Run all tests                            |
| `pnpm test:file <name>` | Run specific test file                   |
| `pnpm reset`            | Reset all practice files to empty shells |
| `pnpm new`              | Create a new DSA structure               |

## Project Structure

```
src/
  <type>/                    # algo/ for algorithms, ds/ for data structures
    <dsa-name>/
      <dsa-name>.ts          # Full implementation
      <dsa-name>.practice.ts # Empty shell for practice
      <dsa-name>.test.ts     # Tests (imports from .practice.ts)

```

## Creating New DSAs

Use the generator to create a new DSA structure:

```bash
pnpm new
```

This will:

1. Prompt for DSA name and type
2. Create implementation, test, and practice files
3. Set up the basic structure

## How It Works

### Practice Files

Each DSA has a `.practice.ts` file that contains:

- Class/interface definitions
- Method signatures
- TODO comments
- No implementation logic

### Test Files

Test files import from `.practice.ts` files, ensuring you're testing your practice implementation, not the solution.

### Reset System

The `pnpm reset` command uses Plop to regenerate practice files from templates in `plop-templates/`.

## Development

### Adding a New Practice Template

1. Implement your DSA in `src/<name>/<name>.ts`
2. Create a template in `plop-templates/<name>-practice.hbs`
3. Update `plopfile.ts` to include the new practice file in the reset generator

## Contributing

1. Implement the DSA with full documentation
2. Write comprehensive tests
3. Create a practice template
4. Update the README with the new DSA

## License

See [LICENSE](./LICENSE) file for details.
