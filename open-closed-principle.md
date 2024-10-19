## オープンクローズドの原則とは

**ソフトウェアの構成要素は「拡張に開かれ」「修正に閉じられている」べき**という原則です。

- **拡張に開かれている**：新しい要件や機能を追加できる
- **修正に閉じられている**：既存の安定したコードを変更しなくてもよい


## 現実のたとえ：通知サービス

たとえば「アプリ通知システム」を考えてみましょう。  
ユーザーに対して様々な方法で通知を送る仕組みです。

```ts
class NotificationService {
  notify(type: string, message: string) {
    if (type === 'email') {
      console.log(`メール送信: ${message}`);
    } else if (type === 'sms') {
      console.log(`SMS送信: ${message}`);
    } else if (type === 'push') {
      console.log(`プッシュ通知: ${message}`);
    }
  }
}
```

### ❌ 問題点（原則に違反）

- 通知方法が増えるたびに、`NotificationService`の中身を書き換える必要がある
- テスト済みの既存コードに手を加えることになるため、バグのリスクが高まる
- 単一責任の原則にも違反している（通知種別ごとの責任が1クラスに集中）


## 原則に違反するとどうなるか

```ts
const service = new NotificationService();
service.notify('email', 'ようこそ！');
service.notify('fax', '契約完了'); // faxが新しく追加されたが、まだ対応していない
```

- `fax`に対応するには、既存クラスを開いて書き換える必要がある
- これは「修正に閉じていない」＝ OCP に違反している状態


## 解決策：通知手段を拡張できる設計にする

インターフェースで通知手段を抽象化し、通知ごとにクラスを分離すれば、  
新しい通知方式を追加しても既存コードを触らずに済みます。

```ts
interface Notifier {
  send(message: string): void;
}

class EmailNotifier implements Notifier {
  send(message: string): void {
    console.log(`メール送信: ${message}`);
  }
}

class SMSNotifier implements Notifier {
  send(message: string): void {
    console.log(`SMS送信: ${message}`);
  }
}

class PushNotifier implements Notifier {
  send(message: string): void {
    console.log(`プッシュ通知: ${message}`);
  }
}

class NotificationService {
  constructor(private notifiers: Notifier[]) {}

  notifyAll(message: string) {
    this.notifiers.forEach((notifier) => notifier.send(message));
  }
}
```

### ✅ 利点

- `FaxNotifier`を新規追加するだけで対応でき、既存のコードは一切変更しない
- 新規拡張は「開かれて」いるが、既存の動作には「閉じて」いる状態
- OCP（オープンクローズドの原則）を自然に満たしている

```ts
class FaxNotifier implements Notifier {
  send(message: string): void {
    console.log(`FAX送信: ${message}`);
  }
}

const service = new NotificationService([
  new EmailNotifier(),
  new SMSNotifier(),
  new FaxNotifier(), // 新たに追加
]);

service.notifyAll('キャンペーンのお知らせ！');
```
