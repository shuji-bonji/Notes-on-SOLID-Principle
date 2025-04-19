# 単一責任の原則 (Single Responsibility Principle)
## 単一責任の原則とは

**クラスは「たった一人のアクター（利用者・責任者）」に対して責任を持つべき**という原則です。

> [!CAUTION]  
> 「単一の責任を持つべき」は 簡略化された表現 で、「たった一人のアクター（利用者・利害関係者）に対して責任を持つべき」が 本質的な意味です。　　
> 本来の意図は、「1つの変更理由（=1人のアクター）に対してのみ責任を持つ」ということです。

> [!NOTE]  
> 単一責任の原則（Single Responsibility Principle）は、ロバート・C・マーティン（Uncle Bob）によって提唱された概念ですが、実はいくつかの表現方法があります。
> マーティン自身は「クラスを変更する理由は1つだけであるべき」という定義をしており、これを「1つのアクター」という観点から説明しています。アクターとは、変更を要求する利害関係者（ステークホルダー）や役割を指します。つまり、1つのクラスは1人のアクター（ユーザーや関係者）からの変更要求にのみ対応すべきという意味です。

## なぜ「アクター」の観点が重要か？

Robert C. Martin（提唱者）の原文ではこう言われています。

> “A class should have only one reason to change.”
（クラスには変更理由がひとつだけであるべき）

ここでの「理由」とは アクター（責任を要求する人、つまり変更理由） のことを意味しています。

### アクターとは？

アクターとは「そのクラスの変更を要求する主体」のことです。  
システムを利用するユーザーだけでなく、開発・保守を行う運用者や管理者、外部インターフェースの仕様策定者なども含まれます。

たとえば、以下のようなものがアクターとなり得ます。

- 経営層（売上レポートの形式変更を要求）
- DBA（データベース保存仕様の変更を要求）
- インフラ運用担当（メール送信サーバの変更を要求）
- エンドユーザー（UIや出力内容の変更を希望）

クラスが複数のアクターに対応していると、それぞれのアクターによる変更要求が互いに干渉し、保守性が下がります。  
このため「1クラス＝1アクターへの責任」とするのが単一責任の原則の本質です。

> 💡 アクターとは、そのクラスを利用する「人・システム・他のクラス」など、  
> クラスの振る舞いや構造に対して**変更を要求し得る主体**を指します。  
> つまり「そのクラスを利用している者（人・モジュール・他のシステム）」と言い換えることもできます。

### たとえば

```
class ReportManager {
  generateReport()  // 経営層が求める機能
  saveToDatabase()  // DBAが関心を持つ処理
  sendEmail()       // 通信インフラ担当が関わる部分
}
```
これは「1クラスが3つのアクターに責任を持っている」ので SRP違反 です。  
各機能を別クラスに分離するのが望ましい設計です。



## 単一責任に違反している例

以下は、レポートを印刷・保存・送信する処理を1つのクラスに詰め込んだ例です。

```ts
class ReportManager {
  constructor(private title: string, private content: string) {}

  print() {
    console.log(`印刷: ${this.title}\n${this.content}`);
  }

  saveToFile() {
    console.log(`ファイル保存: ${this.title}.txt`);
  }

  sendEmail() {
    console.log(`メール送信: ${this.title}`);
  }
}
```

### 問題点

- `print()` → プリンタ担当者の責任
- `saveToFile()` → ファイル管理者の責任
- `sendEmail()` → 通信・メール担当の責任

アクターが異なる処理が1つのクラスに混在しており、単一責任の原則に違反しています。


## 原則に違反するとどうなるか

- 一部の修正（例: メール送信仕様変更）が他の処理（印刷や保存）にも影響する
- どの責任に影響があるかを特定するのに時間がかかる
- テスト対象が多く、修正のリスクが高くなる

```ts
// メール送信仕様を変更したいが、他の処理も巻き込んでしまう例
class ReportManager {
  constructor(private title: string, private content: string) {}

  print() {
    console.log(`印刷: ${this.title}\n${this.content}`);
  }

  saveToFile() {
    console.log(`ファイル保存: ${this.title}.txt`);
  }

  sendEmail() {
    // メール仕様変更：宛先やフォーマット変更を行いたい
    const recipient = 'admin@example.com';
    const message = `件名: ${this.title}\n本文: ${this.content}`;
    console.log(`新メール仕様で送信: To=${recipient}\n${message}`);
  }
}

// → メール送信の仕様を変更するだけなのに、
//    ReportManager そのものを変更してしまう。
//    その結果、印刷処理や保存処理のテスト・挙動にも影響が出る可能性がある。
```

## 解決策：責任を分離する

```ts
class Report {
  constructor(public title: string, public content: string) {}
}

class Printer {
  print(report: Report) {
    console.log(`印刷: ${report.title}\n${report.content}`);
  }
}

class FileSaver {
  save(report: Report) {
    console.log(`ファイル保存: ${report.title}.txt`);
  }
}

class EmailSender {
  send(report: Report) {
    console.log(`メール送信: ${report.title}`);
  }
}
```

### 実行例

```ts
const report = new Report('売上レポート', '売上は前年比120%でした。');
const printer = new Printer();
const saver = new FileSaver();
const sender = new EmailSender();

printer.print(report);
saver.save(report);
sender.send(report);
```


## 補足：DRY原則との関係

DRY（Don’t Repeat Yourself）原則は「同じコードやロジックを繰り返さない」ことを推奨しますが、  
**単一責任の原則（SRP）と混同すると、設計が複雑になる危険があります。**

### ❌ よくある誤解

「同じ処理をしているから」といって、**異なる責任を持つ処理を1つの関数やクラスにまとめる**のは危険です。

```ts
class ReportManager {
  print(report: Report) {
    this.log('印刷');
    console.log(`印刷: ${report.title}`);
  }

  save(report: Report) {
    this.log('保存');
    console.log(`保存: ${report.title}.txt`);
  }

  send(report: Report) {
    this.log('送信');
    console.log(`送信: ${report.title}`);
  }

  private log(action: string) {
    // ログ出力を共通化したつもりが…
    console.log(`[LOG]: ${action}`);
  }
}
```

このようにログ出力をDRYの観点から共通化すると、一見よさそうに見えますが、  
ログ出力の責任が印刷・保存・送信それぞれの機能に密結合してしまっています。


### ✅ 正しい構成例：責任の分離

```ts
class Report {
  constructor(public title: string) {}
}

// ログ機能を専用クラスとして分離
class Logger {
  log(action: string) {
    console.log(`[LOG]: ${action}`);
  }
}

class Printer {
  constructor(private logger: Logger) {}

  print(report: Report) {
    this.logger.log('印刷');
    console.log(`印刷: ${report.title}`);
  }
}

class FileSaver {
  constructor(private logger: Logger) {}

  save(report: Report) {
    this.logger.log('保存');
    console.log(`保存: ${report.title}.txt`);
  }
}

class EmailSender {
  constructor(private logger: Logger) {}

  send(report: Report) {
    this.logger.log('送信');
    console.log(`送信: ${report.title}`);
  }
}
```

#### 実行例

```ts
const report = new Report('月次レポート');
const logger = new Logger();

const printer = new Printer(logger);
const saver = new FileSaver(logger);
const sender = new EmailSender(logger);

printer.print(report);
saver.save(report);
sender.send(report);
```

このように「ログ出力の責任」を `Logger` クラスに分離し、他のクラスは自身の本来の責任（印刷・保存・送信）に集中することで、  
**SRPに準拠しつつ、DRYも保たれる**設計になります。

### 📝 まとめ

- DRYとSRPはどちらも重要ですが、**優先すべきはSRP（責任の分離）**です
- まず「その処理は誰の責任か？」を明確にしましょう
