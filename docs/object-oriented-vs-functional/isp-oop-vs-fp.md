---
description: インターフェース分離の原則（ISP）におけるOOPとFPの比較
---

# インターフェース分離の原則（ISP）におけるOOPとFPの比較

インターフェース分離の原則（ISP: Interface Segregation Principle）は、「クライアントは自分が使用しないメソッドへの依存を強制されるべきではない」という原則です。これは、肥大化したインターフェースから生じる影響を避け、小さく目的ごとに分割されたインターフェースを使うことを推奨します。

OOPではインターフェースの分割と実装によって、FPでは関数の構成と引数単位の依存注入によってISPを達成できます。


## OOPにおけるISPの実装例

```ts
interface Printer {
  print(): void;
}

interface Scanner {
  scan(): void;
}

class MultiFunctionPrinter implements Printer, Scanner {
  print(): void {
    console.log('Printing...');
  }

  scan(): void {
    console.log('Scanning...');
  }
}

class SimplePrinter implements Printer {
  print(): void {
    console.log('Printing...');
  }
}
```
必要な機能だけを持つインターフェースを定義し、クラスはそれを選んで実装することで、余計な依存を避けることができます。

## FPにおけるISPの実装例

```ts
type Print = () => void;
type Scan = () => void;

const createMultiFunctionPrinter = (print: Print, scan: Scan) => ({
  print,
  scan,
});

const createSimplePrinter = (print: Print) => ({
  print,
});
```

- 必要な関数だけを構成要素として渡すことで、不要な依存を避ける構成が自然に実現されます。
- 各機能（副作用）を関数単位で分離して注入するため、モジュールの関心が明確になります。


## 比較まとめ

| 観点 | OOP | FP |
|------|-----|----|
| 分割の単位 | インターフェース | 関数と構造体 |
| 実装方法 | 実装クラスが必要なものを選択 | 必要な関数だけを構成する |
| 拡張性 | インターフェース追加と実装切り替え | 関数の合成・組み合わせで対応 |
| テスト容易性 | 不要な機能を含まないことで容易になる | 最小構成の関数をテスト可能 |
| 注意点 | 分割しすぎると煩雑化 | 関数注入の構造がわかりづらくなる場合がある |

OOPではインターフェースの肥大化を避け、FPでは関数の責任を明示的に分離することで、インターフェース分離の原則はどちらのパラダイムでも自然に適用できます。