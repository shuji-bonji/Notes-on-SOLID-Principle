# リスコフの置換原則（LSP）におけるOOPとFPの比較

リスコフの置換原則（LSP: Liskov Substitution Principle）は、「派生クラスは基底クラスと置き換えてもプログラムの正しさが保たれるべきである」という設計原則です。OOPでは継承の安全性が問われるのに対し、関数型では型の整合性と構造の一貫性に注目が集まります

## OOPにおけるLSPの実装例
```ts
interface Flyer {
  fly(): void;
}

class Bird {
  // 共通の鳥の性質（例: 鳴くなど）
}

class Sparrow extends Bird implements Flyer {
  fly(): void {
    console.log('スズメが飛んだ');
  }
}

class Penguin extends Bird {
  // fly() は実装しない
}
```
```ts
function makeFly(flyer: Flyer): void {
  flyer.fly();
}

const sparrow = new Sparrow();
makeFly(sparrow); // ✅ OK

const penguin = new Penguin();
// makeFly(penguin); // ❌ コンパイルエラー（型不一致）
```

このようにすれば、`Flyer` 型に対してのみ `fly()` を呼び出せるようになるため、**置き換え可能な設計＝リスコフの置換原則に準拠した設計**になります。


## FPにおけるLSPの実装例
関数型では「型ごとの明確な分離」と「構造の保証」により、LSP違反を事前に防ぎやすくなっています。

```ts
type Bird = { kind: 'bird'; fly: () => string };
type Ostrich = { kind: 'ostrich' };

type Animal = Bird | Ostrich;

const isBird = (a: Animal): a is Bird => a.kind === 'bird';

const makeFly = (animal: Animal): string =>
  isBird(animal) ? animal.fly() : 'I cannot fly';
```

- 明示的に `Ostrich` の飛行不能を表現することで、「安全に置換できる前提」を避けている。
- ユニオン型とパターンマッチにより、型の置換が意味的にも安全。


## 比較まとめ

| 観点 | OOP | FP |
|------|-----|----|
| 抽象化手段 | 継承とインターフェース | ユニオン型・タグ付き構造 |
| LSP違反の危険 | 実行時に現れる | 型で表現され防止しやすい |
| 置換の安全性 | 意図しないオーバーライドに注意 | 明示的な分岐で安全な選択 |
| テスト性 | モックによる検証が必要 | 型の分離により検証容易 |

継承や共通インターフェースを使うOOPでは、意味的な一致まで注意が必要です。関数型では構造的に明示することで、LSPのリスクを低減できます。