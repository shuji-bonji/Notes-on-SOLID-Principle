# 単一責任の原則

## 単一責任の原則とは

**クラスは「たった一人のアクター（利用者・責任者）」に対して責任を持つべき**という原則です。

> [!CAUTION]
> 「ひとつのことだけをする」ではなく、「ひとつのアクターに対して責任を持つ」という点に注意してください。


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

DRY（Don’t Repeat Yourself）原則は「重複を避ける」ことを推奨しますが、  
**異なるアクターの責任を無理に1つの関数でまとめるのは逆効果**です。

単一責任の原則を満たすには、ビジネス上の責任範囲を理解することが重要です。
