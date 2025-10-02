---
description: 開放/閉鎖原則（OCP）をOOPと関数型で比較。ポリモーフィズムとデータ駆動設計、それぞれの拡張手法を具体例で学び、既存コードを守る設計力を養います。
---

# 開放/閉鎖原則（OCP）におけるOOPとFPの比較

開放/閉鎖原則（OCP: Open-Closed Principle）は、「ソフトウェア実体は拡張に対して開かれており、修正に対して閉じられているべきである」という設計原則です。本記事では、OOPとFPそれぞれにおけるOCPの捉え方と実装スタイルを比較します。

OOPでは、共通のインターフェースを定義し、それを実装するクラスを追加することで、既存コードを変更せずに機能拡張することが可能です。これは典型的な「開放/閉鎖原則」の実践です。

## OOPにおけるOCPの実装例

```ts
// OOPの例：ポリモーフィズムを使った拡張
interface Shape {
  kind: string;
  area(): number;
}

class Circle implements Shape {
  kind = 'circle';
  constructor(private radius: number) {}
  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Square implements Shape {
  kind = 'square';
  constructor(private side: number) {}
  area(): number {
    return this.side * this.side;
  }
}

function totalArea(shapes: Shape[]): number {
  return shapes.reduce((sum, shape) => sum + shape.area(), 0);
}
```

- 新しい図形を追加する場合、`Shape` インターフェースを実装したクラスを追加するだけでよい。
- `totalArea` 関数の修正は不要。これはOCPに適合した設計です。

::: info ポリモーフィズムとは
異なるクラスのオブジェクトが同じインターフェースやメソッドを共有し、それぞれ異なる方法でそれを実装できる特性のことです。
オブジェクト指向の三大要素（カプセル化、継承、ポリモーフィズム）の一つです。
:::

### 利用例
```ts
const shapes = [new Circle(4),new Square(4)];
shapes.forEach(shape => console.log(shape.kind, shape.area()));
console.log('total:', totalArea(shapes));
// [LOG]: "circle",  50.26548245743669 
// [LOG]: "square",  16 
// [LOG]: "total:",  66.26548245743669 
```

一方で関数型では、分岐の集中を避けるために関数のマッピング（関数ディスパッチ）を用いて、データ駆動で拡張を行う構成が有効です。これにより、既存の分岐や処理を修正せずに拡張が可能になります。

## FPにおけるOCPの実装例

関数型プログラミング（FP）では、**データ型の定義**と**関数のマッピング**によってOCPを実現します。

```ts
// FPの例：パターンマッチングとデータ駆動の拡張
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; side: number }

const areaMap: Record<Shape["kind"], (s: any) => number> = {
  circle: (s) => Math.PI * s.radius ** 2,
  square: (s) => s.side ** 2,
};

const totalArea = (shapes: Shape[]): number =>
  shapes.reduce((sum, s) => sum + area(s), 0);

const area = (shape: Shape): number => areaMap[shape.kind](shape)
```

::: tip ポイント
- **Union型**（`Shape`）で図形の種類を定義
- **`areaMap`**で各図形の面積計算ロジックを関数として登録
- `area()`関数は`kind`プロパティを使って適切な関数を選択（**関数ディスパッチ**）
- if/switch分岐を使わず、データ駆動で処理を振り分ける
:::

### 利用例
```ts
const shapes: Shape[] = [
 { kind: 'circle',  radius: 4 },
 { kind: 'square',  side: 4 }
]

shapes.forEach((shape: Shape) => {
  console.log(`${shape.kind}:  ${area(shape)}`)
} )

console.log('total:',totalArea(shapes));

// [LOG]: "circle:  50.26548245743669" 
// [LOG]: "square:  16" 
// [LOG]: "total:",  66.26548245743669 
```


## 拡張例：新しい図形の追加

ここでは、新たに「三角形（Triangle）」を追加する場合を見ていきましょう。OOPとFPでどのように拡張するかを比較します。

### OOPの拡張例

OOPでは、`Shape`インターフェースを実装した新しいクラスを追加するだけで拡張できます。**既存のコード（`totalArea`関数など）は一切変更不要**です。

```ts
// 新しい図形の追加
class Triangle implements Shape {
  kind = 'triangle';
  constructor(private base: number, private height: number) {}
  area(): number {
    return (this.base * this.height) / 2;
  }
}
```

### 利用例
```ts
const shapes = [
  new Circle(4),
  new Square(4),
  new Triangle(3, 6) // 👈 新しい図形の追加
];

shapes.forEach(shape => console.log(shape.kind, shape.area()));
console.log('total:', totalArea(shapes));

// [LOG]: "circle",  50.26548245743669 
// [LOG]: "square",  16 
// [LOG]: "triangle",  9 
// [LOG]: "total:",  75.26548245743669 
```

### FPの拡張例

関数型では、**型定義（Union型）と関数マップを拡張**することで新しい図形を追加します。

```ts
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; side: number }
  | { kind: 'triangle'; base: number; height: number }; // 👈 Union型に追加

const areaMap: Record<Shape["kind"], (s: any) => number> = {
  circle: (s) => Math.PI * s.radius ** 2,
  square: (s) => s.side ** 2,
  triangle: (s) => (s.base * s.height) / 2 // 👈 関数マップに追加
};
```

::: tip ポイント
- `Shape`型に新しいバリアント（`triangle`）を追加
- `areaMap`に三角形用の面積計算関数を追加
- `area()`や`totalArea()`関数は**変更不要**（データ駆動なので自動的に対応）
:::

::: warning 注意点
**型定義の変更**が必要になる点で、OOPの「完全に閉じた拡張」とは異なります。しかし、**処理ロジック（関数本体）は変更せずに済む**ため、OCPの精神には近い設計と言えます。
:::

### 利用例
```ts
const shapes: Shape[] = [
  { kind: 'circle', radius: 4 },
  { kind: 'square', side: 4 },
  { kind: 'triangle', base: 3, height: 6 }
];

shapes.forEach((shape: Shape) => {
  console.log(`${shape.kind}:  ${area(shape)}`)
} )
console.log('total:', totalArea(shapes));
// [LOG]: "circle:  50.26548245743669" 
// [LOG]: "square:  16" 
// [LOG]: "triangle:  9" 
// [LOG]: "total:",  75.26548245743669 
```

## まとめ：OOPとFPのOCP実現方法の違い

このように、OOPとFPでは異なるアプローチを取りますが、どちらも「既存のロジックを変更せずに新しい振る舞いを追加する」というOCPの目的を実現できます。

#### OOPのアプローチ
- インターフェースを実装した新しいクラスを追加
- 既存のコードは **完全に** 変更不要
- ポリモーフィズムによる動的ディスパッチ

#### FPのアプローチ
- Union型と関数マップを拡張
- 型定義は変更するが、**処理ロジックは変更不要**
- データ駆動による関数ディスパッチ

どちらの手法も、適切に設計すればOCPの精神「拡張に開かれ、修正に閉じる」を実現できます。

## OCPにおける比較まとめ

| 観点 | OOP | FP |
|------|-----|----|
| 拡張の単位 | クラスの継承・実装 | データ型と関数の追加 |
| 構造 | 継承とポリモーフィズム | 関数合成とパターンマッチ |
| OCPの達成方法 | インターフェースを通じた拡張 | 関数の分離と合成で対応 |
| 柔軟性 | 高い（特にDIと併用時） | 柔軟だが型の設計が重要 |
| 注意点 | 抽象の乱用 | 型の肥大化とcaseの集中化 |
