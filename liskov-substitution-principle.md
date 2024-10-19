# リスコフの置換原則

## リスコフの置換原則とは

サブタイプは、そのスーパータイプと置換可能でなければならない  
- **正しい継承 = 「Is-a 関係」+「振る舞いの同等性」**


```mermaid
classDiagram
  direction TB
  class SuperType {

  }
  class subType {

  }
  SuperType <|-- subType
```


## リスコフの置換原則に違反した例

サブタイプはスーパータイプと置換可能ではない状態

```mermaid
classDiagram
  direction TB
  class Rectangle {
    width: number
    height: number
    setWidth()
    setHeight()
    getArea()
  }
  class Square {
    width: number
    height: number
    setWidth()
    setHeight()
    getArea()

  }
  Rectangle <|-- Square
```

スーパータイプとサブタイプの継承関係が間違っている  

- オブジェクト指向設計では、一般的に継承は「Is-a」関係と言われています。
    - 「犬」は「動物」である
    - 「正方形」は「長方形」である

一見、上記にように正しく思えるが・・・  
➡️ コンパイルエラーは発生しないものの、振る舞いが意図されたものとは異なるため、正しい継承とは言えない。

つまり、「正しい継承とは」  
- **正しい継承 = 「Is-a 関係」+「振る舞いの同等性」**


## リスコフの置換原則に違反するとどうなるか

- 利用者が想定しない挙動によるバグが発生する可能性が高まる
    - 利用者はスーパータイプとサブタイプは同じ挙動を期待して利用する
    - 利用者がサブタイプまで全て理解した上で利用する必要がある
- リコリスの置換原則に違反したコードを使うと、オープンクローズドの原則に違反する可能性が高まる
    - 利用側でクラスを判別するための分岐を入れののはNG

```ts
if (r instanceof Square) {
  //...
}
```

## 振る舞いの変更に気付くには

スーパータイプとサブタイプで振る舞いが変更されていることを確認する最も簡単な方法は**単体テストを書く**こと

#### 利用者（テスト対象）
```ts
export const f = (r: Rectangle, wight: number, height: number): number => {
  r.setWidth(wight);
  r.setHeight(height);
  return r.getArea();
};
```
#### テストコード
```ts
describe('Rectangle Test', () => {
  test('Rectangle getArea', () => {
    const r1 = new Rectangle();
    expect(f(r1, 3, 4)).toBe(12);
  });
  test('Square getArea', () => {
    const r1 = new Square();
    expect(f(r1, 3, 4)).toBe(12); // 👈 16となり、テストに失敗する
  });
});

```

## 解決策

スーパータイプ／サブタイプの関係を見直す

```mermaid
classDiagram
  direction TB
  class Shape {
    << interface >>
    getArea(): number
  }
  class Rectangle {
    -wigth: nubmer
    -heght: nubmer
    setWidth()
    setHeight()
    getArea()
  }
  class Square {
    -length; number
    setWidth()
    setHeight()
    getArea()
  }
  Shape <|.. Rectangle
  Shape <|.. Square
```

## 補足

### 契約による設計

プログラムコードの中にプログラムが満たすべき仕様について記述することで、正確で眼瞼なソフトウェアとする設計技法

```mermaid
classDiagram
  direction TB
  note for 利用する側 "事前条件:\n〇〇という条件で、メソッドAを使わせてください"
  note for 利用される側 "事後条件:\n〇〇という条件でメソッドAを呼び出してくれれば、××という結果を保証します"
  class 利用する側 {
  }
  class 利用される側 {
    メソッドA()
  }
  利用する側 --> 利用される側
```


- 事前条件とは:  
メソッド開始時に保証されるべき条件
    - メソッドの引数
    - メソッド開始時のインスタンスの状態

- 事後条件とは:  
メソッド正常終了時に保証されるべき条件
    - メソッドの正常終了時のインスタンスの状態
    - クライアントに返す戻り値

### 契約による設計においての、サブタイプの事前条件と事後条件

- サブタイプの**事前条件はスーパータイプと同じかそれより弱い条件**と置き換え、
- サブタイプの**事後条件はスーパータイプと同じかそれより強い条件**と置き換える。


####  事前条件はスーパータイプと同じかそれより弱い条件

##### スーパータイプ

```ts
methoda(x: nubmer) {
  // 事前条件: x > 0
}
```
##### サブタイプ
```ts
methoda(x: nubmer) {
  // 事前条件: x > 10 👈 NG: より強い事前条件になっているため、リスコフの置換条件違反
  // 事前条件: x > -1 👈 OK: より弱い事前条件になっている
}
```

####  事後条件はスーパータイプと同じかそれより強い条件

##### スーパータイプ

```ts
setWidth(width: nubmer) {
  this.width = width;
  // 事後条件
  // this.width === width && this.height === oldHeight 👈 高さは変化しない
}
```

##### サブタイプ
```ts
setWidth(width: nubmer) {
  super.setWidth(width);
  super.setHight(width);
  // 事後条件
  // this.width === width 👈 NG: 高さが変化し、スーパータイプより事後条件となるため、リスコフの置換条件違反
}
```


## TyepScript

### 違反例
```mermaid
classDiagram
  direction TB
  class Rectangle {
    width: number
    height: number
    setWidth()
    setHeight()
    getArea()
  }
  class Square {
    width: number
    height: number
    setWidth()
    setHeight()
    getArea()

  }
  Rectangle <|-- Square
```

```ts
// スーパータイプ
export class Rectangle {
  width = 0;
  height = 0;
  setWidth(width: number) {
    this.width = width;
  }
  setHeight(height: number) {
    this.height = height;
  }
  getArea(): number {
    return this.width * this.height;
  }
}

// サブタイプ
export class Squrare extends Rectangle {
  setWidth(width: number) {
    super.setWidth(width);
    super.setHeight(width);
  }

  setHeight(height: number) {
    super.setWidth(height);
    super.setHeight(height);
  }
}

export const f = (r: Rectangle, width: number, height: number): number => {
  r.setWidth(width);
  r.setHeight(height);
  return r.getArea();
};

const run = () => {
  console.log(f(new Rectangle(), 3, 4));
  console.log(f(new Squrare(), 3, 4));
};

run();


```

##### 実行結果

```
12
16 // 想定（12）外の回答
```

#### ユニットテスト

```ts
import { f, Rectangle, Squrare } from './index';

describe('Rectangle Test', () => {
  test('Rectangle getArea', () => {
    const r1 = new Rectangle();
    expect(f(r1, 3, 4)).toBe(12);
  });
  test('Square getArea', () => {
    const r1 = new Square();
    expect(f(r1, 3, 4)).toBe(12); // 👈 16となり、テストに失敗する
  });
});

```
##### 実行結果

```
TestSuites: 1 failed, 1 total
```

### 解決策

```mermaid
classDiagram
  direction TB
  class Shape {
    << interface >>
    getArea(): number
  }
  class Rectangle {
    -wigth: nubmer
    -heght: nubmer
    setWidth()
    setHeight()
    getArea()
  }
  class Square {
    -length; number
    setWidth()
    setHeight()
    getArea()
  }
  Shape <|.. Rectangle
  Shape <|.. Square
```

```ts
interface Shape {
  getArea(): number;
}

class Rectangle implements Shape {
  constructor(private width: number = 0, private height: number = 0) {}
  setWidth(width: number) {
    this.width = width;
  }
  setHeight(height: number) {
    this.height = height;
  }
  getArea(): number {
    return this.width * this.height;
  }
}

class Square {
  constructor(private length: number = 0) {}
  setLength(length: number) {
    this.length = length;
  }
  getArea(): number {
    return this.length * this.length;
  }
}

const f = (shape: Shape) => {
  console.log(shape.getArea());
};

const run = () => {
  const rectable = new Rectangle();
  rectable.setWidth(3);
  rectable.setHeight(4);
  f(rectable);

  const square = new Square();
  square.setLength(3);
  f(square);
};

run();

```

##### 実行結果

```
12
9
```
