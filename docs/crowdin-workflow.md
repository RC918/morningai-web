# Crowdin Translation Workflow

## Overview

This project uses Crowdin for managing translations with English as the source language. The workflow is designed to support the English-first approach while maintaining high-quality translations for Traditional Chinese (zh-TW) and Simplified Chinese (zh-CN).

## Configuration

### Source Language
- **English (en)** is the source of truth for all translations
- Located at: `src/locales/en.json`

### Target Languages
- **Traditional Chinese (zh-TW)**: `src/locales/zh-TW.json`
- **Simplified Chinese (zh-CN)**: `src/locales/zh-CN.json`

## Workflow

### 1. Automatic Synchronization

The Crowdin GitHub Action runs automatically in the following scenarios:

- **On Push**: When changes are made to `src/locales/en.json` on the main branch
- **Daily Sync**: Every day at 5:00 AM UTC to pull latest translations
- **Manual Trigger**: Can be triggered manually via GitHub Actions

### 2. Translation Process

1. **Source Updates**: When English content is updated, it's automatically uploaded to Crowdin
2. **Translation**: Translators work on the content in Crowdin platform
3. **Download**: Completed translations are automatically downloaded and created as a PR
4. **Review**: The PR is reviewed and merged to update the translation files

### 3. Pull Request Creation

When new translations are available, the action creates a PR with:
- Title: `feat(i18n): New Crowdin Translations`
- Detailed description of changes
- Updated translation files

## Setup Requirements

### GitHub Secrets

The following secrets must be configured in the GitHub repository:

- `CROWDIN_PROJECT_ID`: Your Crowdin project ID
- `CROWDIN_PERSONAL_TOKEN`: Your Crowdin API token

### Crowdin Project Setup

1. Create a Crowdin project with English as the source language
2. Add Traditional Chinese (zh-TW) and Simplified Chinese (zh-CN) as target languages
3. Configure the project settings to match the file structure

## Best Practices

### For Developers

1. **Always update English first**: Make changes to `src/locales/en.json` first
2. **Use descriptive keys**: Use clear, descriptive keys for new translation strings
3. **Test locally**: Ensure all languages display correctly before pushing
4. **Review PRs**: Always review Crowdin-generated PRs before merging

### For Translators

1. **Use Crowdin platform**: All translations should be done through Crowdin
2. **Maintain consistency**: Keep terminology consistent across the application
3. **Context awareness**: Consider the UI context when translating
4. **Quality assurance**: Review translations before marking as complete

## File Structure

```
src/locales/
├── en.json      # Source language (English)
├── zh-TW.json   # Traditional Chinese translations
└── zh-CN.json   # Simplified Chinese translations
```

## Troubleshooting

### Common Issues

1. **Translation conflicts**: If there are conflicts, prioritize the Crowdin version
2. **Missing keys**: Ensure all new keys are added to the English source first
3. **Encoding issues**: Ensure all files are saved in UTF-8 encoding

### Manual Sync

If automatic sync fails, you can manually trigger the workflow:

1. Go to GitHub Actions
2. Select "Crowdin Action" workflow
3. Click "Run workflow"
4. Select the main branch and run

## Monitoring

- Check GitHub Actions for workflow status
- Monitor Crowdin project for translation progress
- Review PRs promptly to keep translations up to date
