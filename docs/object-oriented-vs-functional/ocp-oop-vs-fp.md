# 開放/閉鎖原則（OCP）におけるOOPとFPの比較

開放/閉鎖原則（OCP: Open-Closed Principle）は、「ソフトウェア実体は拡張に対して開かれており、修正に対して閉じられているべきである」という設計原則です。本記事では、OOPとFPそれぞれにおけるOCPの捉え方と実装スタイルを比較します。

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

> ポリモーフィズム とは
> 異なるクラスのオブジェクトが同じインターフェースやメソッドを共有し、それぞれ異なる方法でそれを実装できる特性のことです。
> オブジェクト指向の三大要素（カプセル化、継承、ポリモーフィズム）の一つです。

### 利用例
```ts
const shapes = [new Circle(4),new Square(4)];
shapes.forEach(shape => console.log(shape.kind, shape.area()));
console.log('total:', totalArea(shapes));
// [LOG]: "circle",  50.26548245743669 
// [LOG]: "square",  16 
// [LOG]: "total:",  66.26548245743669 
```


## FPにおけるOCPの実装例

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
### OOPの拡張例

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

```ts
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; side: number }
  | { kind: 'triangle'; base: number; height: number };

const areaMap: Record<Shape["kind"], (s: any) => number> = {
  circle: (s) => Math.PI * s.radius ** 2,
  square: (s) => s.side ** 2,
  triangle: (s) => (s.base * s.height) / 2
};
```

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


## OCPにおける比較まとめ

| 観点 | OOP | FP |
|------|-----|----|
| 拡張の単位 | クラスの継承・実装 | データ型と関数の追加 |
| 構造 | 継承とポリモーフィズム | 関数合成とパターンマッチ |
| OCPの達成方法 | インターフェースを通じた拡張 | 関数の分離と合成で対応 |
| 柔軟性 | 高い（特にDIと併用時） | 柔軟だが型の設計が重要 |
| 注意点 | 抽象の乱用 | 型の肥大化とcaseの集中化 |
