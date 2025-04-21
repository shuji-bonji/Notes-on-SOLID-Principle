# 単一責任の原則（SRP）におけるOOPとFPの比較

単一責任の原則（SRP: Single Responsibility Principle）は、「クラスはたった1つの理由でのみ変更されるべきである」という考え方です。本記事では、オブジェクト指向プログラミング（OOP）と関数型プログラミング（FP）におけるSRPの捉え方と実装方法を比較します。

## OOPにおけるSRPの実装例

```ts
// OOPの例：クラスごとに責務を分離する
class ReportGenerator {
  generate(data: any): string {
    return `Report: ${JSON.stringify(data)}`;
  }
}

class ReportPrinter {
  print(report: string): void {
    console.log(report);
  }
}

// 使用例
const data = { id: 1, content: '内容' };
const generator = new ReportGenerator();
const printer = new ReportPrinter();
const report = generator.generate(data);
printer.print(report);
```
このように、生成と出力という異なる責務を別クラスに分けることで、クラス単位での責任の明確化を図ります。

## FPにおけるSRPの実装例

```ts
// FPの例：関数ごとに責務を分離する
const generateReport = (data: any): string => `Report: ${JSON.stringify(data)}`;
const printReport = (report: string): void => console.log(report);

// 使用例
const data = { id: 1, content: '内容' };
const report = generateReport(data);
printReport(report);
```

関数型では、副作用を分離することで「関数ごとの責任の明確化」がSRPの応用となります。
また、関数を合成して処理フローを作ることが容易です。

## SRPにおける比較まとめ

|観点|OOP|FP|
|---|---|---|
|単位|クラス|関数|
|責務の分離|クラスを分ける|関数を分ける・副作用を分離する|
|拡張性|サブクラス化や委譲|関数の合成や高階関数で拡張|
|テストのしやすさ|テスト用モックや依存注入|関数単位でテストしやすい|
|注意点|クラスの肥大化|状態共有がない代わりにパイプライン管理が必要|

