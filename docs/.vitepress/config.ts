// docs/.vitepress/config.ts
import { defineConfig } from 'vitepress';
import { withMermaid } from 'vitepress-plugin-mermaid';

export default withMermaid({
  title: 'SOLIDの原則',
  description: 'TypeScriptで学ぶSOLID原則',
  base: '/Notes-on-SOLID-Principle/',
  lang: 'ja',

  themeConfig: {
    nav: [
      { text: 'ホーム', link: '/' },
      { text: '実装チェックリスト', link: '/solid-checklist.md' },
    ],
    sidebar: [
      {
        text: 'SOLID原則',
        items: [
          { text: 'SOLIDの原則とは', link: '/solid-principles' },
          { text: '単一責任の原則', link: '/single-responsibility-principle' },
          { text: 'オープンクローズドの原則', link: '/open-closed-principle' },
          {
            text: 'リスコフの置換原則',
            link: '/liskov-substitution-principle',
          },
          {
            text: 'インターフェース分離の原則',
            link: '/interface-segregation-principle',
          },
          { text: '依存性逆転の原則', link: '/dependency-inversion-principle' },
        ],
      },
      {
        items: [{ text: '実装チェックリスト', link: '/solid-checklist.md' }],
      },
      {
        text: 'ケーススタディ',
        items: [{ text: 'ECサイト機能拡張', link: '/practical-case-studies' }],
      },
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/shuji-bonji/Notes-on-SOLID-Principle',
      },
    ],

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Released under the CC-BY-4.0 license.',
      copyright: 'Copyright © 2025-present',
    },
  },
});
