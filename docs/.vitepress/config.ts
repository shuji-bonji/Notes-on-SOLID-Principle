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
      { text: 'OOPと関数型の比較', link: '/object-oriented-vs-functional/' },
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
      {
        text: 'OOPと関数型の比較',
        items: [
          {
            text: 'OOPとFPの比較概要',
            link: '/object-oriented-vs-functional/index.md',
          },
          {
            text: 'SRPにおけるOOPとFPの比較',
            link: '/object-oriented-vs-functional/srp-oop-vs-fp.md',
          },
          {
            text: 'OCPにおけるOOPとFPの比較',
            link: '/object-oriented-vs-functional/ocp-oop-vs-fp.md',
          },
          {
            text: 'LSPにおけるOOPとFPの比較',
            link: '/object-oriented-vs-functional/lsp-oop-vs-fp.md',
          },
          {
            text: 'ISPにおけるOOPとFPの比較',
            link: '/object-oriented-vs-functional/isp-oop-vs-fp.md',
          },
          {
            text: 'DIPにおけるOOPとFPの比較',
            link: '/object-oriented-vs-functional/dip-oop-vs-fp.md',
          },
          {
            text: 'まとめ：適用可能な原則と限界',
            link: '/object-oriented-vs-functional/summary.md',
          },
        ],
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
