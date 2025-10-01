---
description: 依存性逆転の原則（DIP）をOOPと関数型で比較。インターフェース注入と高階関数、それぞれの依存管理手法でテスト容易性と柔軟性を実現する設計を学びます。
---

# 依存性逆転の原則（DIP）におけるOOPとFPの比較

依存性逆転の原則（DIP: Dependency Inversion Principle）は、「上位モジュールは下位モジュールに依存すべきではない。両者は抽象に依存すべきである」という考え方です。OOPではインターフェースと依存性注入（DI）を通じてこの原則を実現しますが、関数型プログラミングにおいても、関数と高階関数を用いてこの原則を適用することができます。


## OOPにおけるDIPの典型例

```ts
interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(message);
  }
}

class Application {
  constructor(private logger: Logger) {}

  run() {
    this.logger.log('Application started');
  }
}

const app = new Application(new ConsoleLogger());
app.run();
```

- `Application` は `Logger` という抽象に依存しており、`ConsoleLogger` に直接依存していません。
- これにより、テスト用のモックロガーなど、他の実装と容易に差し替えが可能です。


## 関数型におけるDIPの応用

関数型では「関数を依存対象として注入する」ことでDIPの考え方を自然に実現できます。

```ts
type Logger = (message: string) => void;

const consoleLogger: Logger = (msg) => console.log(msg);

const runApplication = (logger: Logger) => {
  logger('Application started');
};

runApplication(consoleLogger);
```

- `runApplication` は `Logger` 関数に依存しており、具体的な出力方法には依存していません。
- テスト時には以下のように差し替えることができます：

```ts
const testLogger: Logger = (msg) => {
  // メッセージを配列などに記録することで検証できる
  logs.push(msg);
};
```


## 比較まとめ

| 観点 | OOP | FP |
|------|-----|----|
| 抽象化の単位 | インターフェース | 関数の型 |
| 依存性の注入 | コンストラクタやSetterなど | 関数引数として渡す |
| 拡張性 | 実装クラスの追加で対応 | 別の関数を注入することで対応 |
| テスト容易性 | モックオブジェクトの注入 | テスト用関数の差し替え |
| 注意点 | 抽象と具象のバランス | 関数の引数が多くなると読みにくいこともある |


関数型でも、責務分離や抽象化を適切に設計することで、依存性逆転の原則を自然な形で実現できます。